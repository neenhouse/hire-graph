import Anthropic from '@anthropic-ai/sdk';

export interface ParsedJD {
  title: string;
  required_skills: string[];
  nice_to_have: string[];
  experience_level: string;
  responsibilities: string[];
  salary_range?: string;
}

const SYSTEM_PROMPT = `You are an expert job description parser. Extract structured information from job descriptions and return it as valid JSON.

Return a JSON object with this exact schema:
{
  "title": "string - the job title",
  "required_skills": ["array of required technical skills and qualifications"],
  "nice_to_have": ["array of preferred/bonus skills"],
  "experience_level": "string - e.g. 'Senior (5+ years)', 'Junior (0-2 years)', 'Mid-level (3-5 years)'",
  "responsibilities": ["array of key job responsibilities"],
  "salary_range": "string or null - salary range if mentioned"
}

Return ONLY valid JSON, no markdown or explanation.`;

export async function parseJD(
  client: Anthropic,
  jdText: string,
  onProgress?: (text: string) => void
): Promise<ParsedJD> {
  let fullText = '';

  const stream = client.messages.stream({
    model: 'claude-opus-4-5',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Parse this job description:\n\n${jdText}`,
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

  return JSON.parse(fullText) as ParsedJD;
}
