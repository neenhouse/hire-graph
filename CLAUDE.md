# HireGraph

AI recruiting pipeline — parse JDs, generate candidate profiles, score resumes, draft outreach, and detect bias with specialized agents.

## Tech Stack

- **Agents**: Custom agent system using @anthropic-ai/sdk directly
- **AI**: Anthropic Claude (claude-opus-4-5)
- **Frontend**: React 19, TypeScript, Vite 7
- **Backend**: Node.js HTTP server with SSE streaming
- **Deploy**: Fly.io via GitHub Actions

## Commands

- `pnpm dev` — Start API server + Vite dev server
- `pnpm build` — TypeScript check + Vite production build
- `pnpm start` — Start production server

## Project Structure

- `src/agents/` — Agent definitions (jd-parser, profile-generator, resume-scorer, outreach-writer, bias-detector)
- `src/workflows/` — Pipeline orchestration + sample data
- `src/server/` — HTTP API server with SSE streaming
- `src/app/` — React frontend (dashboard with sidebar)

## API

- `POST /api/analyze` — Accepts `{ jd: string, resumes?: ResumeInput[] }`, streams SSE events

## Environment

- `ANTHROPIC_API_KEY` — Required for live analysis. Demo mode works without it.
