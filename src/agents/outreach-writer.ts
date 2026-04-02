import Anthropic from '@anthropic-ai/sdk';
import type { ResumeScore } from './resume-scorer.js';
import type { ParsedJD } from './jd-parser.js';

export interface OutreachEmail {
  candidate_name: string;
  subject_line: string;
  body: string;
  tone: string;
  personalization_notes: string[];
}

const SYSTEM_PROMPT = `You are an expert recruiting outreach specialist. Write personalized, compelling outreach emails to top candidates based on their resume match and the job requirements.

Return a JSON object with this exact schema:
{
  "candidate_name": "string",
  "subject_line": "string - compelling, specific subject line (under 60 chars)",
  "body": "string - full email body with proper formatting using \\n for line breaks",
  "tone": "string - describe the tone (e.g. 'professional and warm', 'technical and direct')",
  "personalization_notes": ["array of specific personalization elements used"]
}

Guidelines:
- Reference specific skills/experience from their resume
- Highlight why they're a great fit for this specific role
- Keep it concise (under 200 words in body)
- Avoid generic phrases like "I came across your profile"
- End with a clear, low-pressure call to action

Return ONLY valid JSON, no markdown or explanation.`;

export async function writeOutreach(
  client: Anthropic,
  candidateScore: ResumeScore,
  parsedJD: ParsedJD,
  onProgress?: (text: string) => void
): Promise<OutreachEmail> {
  let fullText = '';

  const stream = client.messages.stream({
    model: 'claude-opus-4-5',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Write a personalized outreach email for this candidate.

JOB DETAILS:
${JSON.stringify(parsedJD, null, 2)}

CANDIDATE ASSESSMENT:
${JSON.stringify(candidateScore, null, 2)}`,
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

  return JSON.parse(fullText) as OutreachEmail;
}
