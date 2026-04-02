import Anthropic from '@anthropic-ai/sdk';

export interface BiasIssue {
  text: string;
  bias_type: string;
  severity: 'low' | 'medium' | 'high';
  suggestion: string;
}

export interface BiasReport {
  issues: BiasIssue[];
  overall_score: number;
  rewritten_jd: string;
  summary: string;
}

const SYSTEM_PROMPT = `You are an expert in inclusive hiring practices and employment discrimination law. Analyze job descriptions for biased language and patterns.

Return a JSON object with this exact schema:
{
  "issues": [
    {
      "text": "exact text from JD that is problematic",
      "bias_type": "string - e.g. 'age bias', 'gender bias', 'cultural bias', 'ability bias', 'socioeconomic bias'",
      "severity": "low" | "medium" | "high",
      "suggestion": "specific replacement or improvement"
    }
  ],
  "overall_score": number (0-100, where 100 = perfectly inclusive, 0 = highly biased),
  "rewritten_jd": "string - full rewritten version of the JD with all bias removed",
  "summary": "string - 2-3 sentence overall assessment"
}

Common bias patterns to check:
- Age-related: "young", "energetic", "digital native", "fresh", years of experience requirements that exclude older workers
- Gender-coded: "rockstar", "ninja", "aggressive", "dominant", "nurturing", "passionate"
- Cultural fit language that excludes diverse candidates
- Unnecessary physical requirements
- Socioeconomic barriers: unpaid internship experience, specific school prestige
- Ability bias: phrases implying specific physical/cognitive abilities not required for the role

Return ONLY valid JSON, no markdown or explanation.`;

export async function detectBias(
  client: Anthropic,
  jdText: string,
  onProgress?: (text: string) => void
): Promise<BiasReport> {
  let fullText = '';

  const stream = client.messages.stream({
    model: 'claude-opus-4-5',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Analyze this job description for bias:\n\n${jdText}`,
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

  return JSON.parse(fullText) as BiasReport;
}
