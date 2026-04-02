import Anthropic from '@anthropic-ai/sdk';
import type { IdealCandidateProfile } from './profile-generator.js';

export interface MatchBreakdownItem {
  skill: string;
  weight: number;
  score: number;
  notes: string;
}

export interface ResumeScore {
  candidate_name: string;
  score: number;
  strengths: string[];
  gaps: string[];
  reasoning: string;
  match_breakdown: MatchBreakdownItem[];
}

const SYSTEM_PROMPT = `You are an expert technical recruiter and resume evaluator. Score a resume against an ideal candidate profile on a scale of 0-100.

Return a JSON object with this exact schema:
{
  "candidate_name": "string - extract the candidate's full name from resume",
  "score": number (0-100),
  "strengths": ["array of 3-5 key strengths relevant to the role"],
  "gaps": ["array of 2-4 notable gaps or concerns"],
  "reasoning": "string - 2-3 sentence summary of the overall assessment",
  "match_breakdown": [
    { "skill": "string", "weight": number, "score": number (0-100), "notes": "brief evaluation note" }
  ]
}

Be objective and specific. Score 90+ only for exceptional matches. Score below 40 for poor matches.
Return ONLY valid JSON, no markdown or explanation.`;

export async function scoreResume(
  client: Anthropic,
  resumeText: string,
  profile: IdealCandidateProfile,
  onProgress?: (text: string) => void
): Promise<ResumeScore> {
  let fullText = '';

  const stream = client.messages.stream({
    model: 'claude-opus-4-5',
    max_tokens: 1500,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Score this resume against the ideal candidate profile.

IDEAL CANDIDATE PROFILE:
${JSON.stringify(profile, null, 2)}

RESUME:
${resumeText}`,
      },
    ],
  });

  for await (const chunk of stream) {
    if (
      chunk.type === 'content_block_delta' &&
      chunk.delta.type === 'text_delta'
    ) {
      fullText += chunk.delta.text;
      onProgress?.(chunk.delta.text);
    }
  }

  return JSON.parse(fullText) as ResumeScore;
}
