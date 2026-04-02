import Anthropic from '@anthropic-ai/sdk';
import type { ParsedJD } from './jd-parser.js';

export interface ScoringRubricItem {
  criterion: string;
  weight: number;
  description: string;
}

export interface SkillWeight {
  skill: string;
  weight: number;
  importance: 'critical' | 'important' | 'nice-to-have';
}

export interface IdealCandidateProfile {
  key_skills: SkillWeight[];
  experience_requirements: string[];
  cultural_indicators: string[];
  scoring_rubric: ScoringRubricItem[];
}

const SYSTEM_PROMPT = `You are an expert talent acquisition strategist. Given a parsed job description, create an ideal candidate profile with weighted skill requirements and a scoring rubric.

Return a JSON object with this exact schema:
{
  "key_skills": [
    { "skill": "string", "weight": number (0-100), "importance": "critical" | "important" | "nice-to-have" }
  ],
  "experience_requirements": ["array of specific experience requirements"],
  "cultural_indicators": ["array of cultural fit indicators to look for"],
  "scoring_rubric": [
    { "criterion": "string", "weight": number (0-100), "description": "how to evaluate this criterion" }
  ]
}

Weights in key_skills should sum to 100. Weights in scoring_rubric should sum to 100.
Return ONLY valid JSON, no markdown or explanation.`;

export async function generateProfile(
  client: Anthropic,
  parsedJD: ParsedJD,
  onProgress?: (text: string) => void
): Promise<IdealCandidateProfile> {
  let fullText = '';

  const stream = client.messages.stream({
    model: 'claude-opus-4-5',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Create an ideal candidate profile for this parsed job description:\n\n${JSON.stringify(parsedJD, null, 2)}`,
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

  return JSON.parse(fullText) as IdealCandidateProfile;
}
