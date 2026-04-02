import http from 'node:http';
import Anthropic from '@anthropic-ai/sdk';
import { runHiringPipeline } from '../workflows/hiring-pipeline.js';
import type { ResumeInput } from '../workflows/hiring-pipeline.js';

const PORT = process.env.PORT ?? 3001;

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? '',
});

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url ?? '/', `http://localhost:${PORT}`);

  if (req.method === 'POST' && url.pathname === '/api/analyze') {
    // Parse body
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(chunk as Buffer);
    }
    const body = JSON.parse(Buffer.concat(chunks).toString()) as {
      jd: string;
      resumes?: ResumeInput[];
    };

    if (!body.jd) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'jd is required' }));
      return;
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          error: 'ANTHROPIC_API_KEY not set. Use demo mode in the UI.',
        })
      );
      return;
    }

    // Set up SSE
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    const sendEvent = (data: unknown) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    try {
      const resumes = body.resumes ?? [];
      const generator = runHiringPipeline(client, body.jd, resumes);

      for await (const event of generator) {
        sendEvent(event);
      }
    } catch (err) {
      sendEvent({
        type: 'error',
        message: err instanceof Error ? err.message : 'Unknown error',
      });
    }

    res.end();
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`HireGraph API server running on http://localhost:${PORT}`);
});
