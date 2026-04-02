import Anthropic from '@anthropic-ai/sdk';
import { parseJD, type ParsedJD } from '../agents/jd-parser.js';
import { generateProfile, type IdealCandidateProfile } from '../agents/profile-generator.js';
import { scoreResume, type ResumeScore } from '../agents/resume-scorer.js';
import { writeOutreach, type OutreachEmail } from '../agents/outreach-writer.js';
import { detectBias, type BiasReport } from '../agents/bias-detector.js';

export type AgentStatus = 'idle' | 'working' | 'complete' | 'error';

export interface PipelineEvent {
  type: 'agent_status' | 'agent_progress' | 'agent_complete' | 'pipeline_complete' | 'error';
  agent?: string;
  status?: AgentStatus;
  data?: unknown;
  message?: string;
}

export interface PipelineResult {
  parsedJD: ParsedJD;
  biasReport: BiasReport;
  profile: IdealCandidateProfile;
  scores: ResumeScore[];
  outreach: OutreachEmail[];
}

export interface ResumeInput {
  id: string;
  name: string;
  text: string;
}

export async function* runHiringPipeline(
  client: Anthropic,
  jdText: string,
  resumes: ResumeInput[]
): AsyncGenerator<PipelineEvent> {
  try {
    // Step 1: JD Parser + Bias Detector run in PARALLEL
    yield { type: 'agent_status', agent: 'jd-parser', status: 'working' };
    yield { type: 'agent_status', agent: 'bias-detector', status: 'working' };

    let parsedJDResult: ParsedJD | undefined;
    let biasReportResult: BiasReport | undefined;
    let jdError: Error | undefined;
    let biasError: Error | undefined;

    const jdParsePromise = parseJD(client, jdText, (text) => {
      // Progress updates are buffered internally
      void text;
    })
      .then((result) => {
        parsedJDResult = result;
      })
      .catch((err: Error) => {
        jdError = err;
      });

    const biasDetectPromise = detectBias(client, jdText, (text) => {
      void text;
    })
      .then((result) => {
        biasReportResult = result;
      })
      .catch((err: Error) => {
        biasError = err;
      });

    await Promise.all([jdParsePromise, biasDetectPromise]);

    if (jdError || !parsedJDResult) {
      yield {
        type: 'error',
        agent: 'jd-parser',
        message: jdError?.message ?? 'JD parsing failed',
      };
      return;
    }

    if (biasError || !biasReportResult) {
      yield {
        type: 'error',
        agent: 'bias-detector',
        message: biasError?.message ?? 'Bias detection failed',
      };
      return;
    }

    yield {
      type: 'agent_complete',
      agent: 'jd-parser',
      status: 'complete',
      data: parsedJDResult,
    };
    yield {
      type: 'agent_complete',
      agent: 'bias-detector',
      status: 'complete',
      data: biasReportResult,
    };

    // Step 2: Profile Generator (needs JD Parser output)
    yield { type: 'agent_status', agent: 'profile-generator', status: 'working' };

    const profile = await generateProfile(client, parsedJDResult, (text) => {
      void text;
    });

    yield {
      type: 'agent_complete',
      agent: 'profile-generator',
      status: 'complete',
      data: profile,
    };

    // Step 3: Resume Scorer (runs for each resume)
    const scores: ResumeScore[] = [];
    for (const resume of resumes) {
      yield {
        type: 'agent_status',
        agent: `resume-scorer-${resume.id}`,
        status: 'working',
        message: `Scoring resume for ${resume.name}`,
      };

      const score = await scoreResume(client, resume.text, profile, (text) => {
        void text;
      });

      scores.push(score);

      yield {
        type: 'agent_complete',
        agent: `resume-scorer-${resume.id}`,
        status: 'complete',
        data: score,
        message: `Scored ${resume.name}: ${score.score}/100`,
      };
    }

    // Step 4: Sort scores and generate outreach for top 3
    const sortedScores = [...scores].sort((a, b) => b.score - a.score);
    const topCandidates = sortedScores.slice(0, 3);

    const outreachEmails: OutreachEmail[] = [];
    for (const candidate of topCandidates) {
      yield {
        type: 'agent_status',
        agent: `outreach-writer-${candidate.candidate_name}`,
        status: 'working',
        message: `Writing outreach for ${candidate.candidate_name}`,
      };

      const email = await writeOutreach(client, candidate, parsedJDResult, (text) => {
        void text;
      });

      outreachEmails.push(email);

      yield {
        type: 'agent_complete',
        agent: `outreach-writer-${candidate.candidate_name}`,
        status: 'complete',
        data: email,
      };
    }

    const result: PipelineResult = {
      parsedJD: parsedJDResult,
      biasReport: biasReportResult,
      profile,
      scores: sortedScores,
      outreach: outreachEmails,
    };

    yield { type: 'pipeline_complete', data: result };
  } catch (err) {
    yield {
      type: 'error',
      message: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}
