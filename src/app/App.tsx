import { useState, useCallback } from 'react';
import { SAMPLE_JD, SAMPLE_RESUMES, DEMO_RESULTS } from '../workflows/sample-data.js';
import type { PipelineResult } from '../workflows/hiring-pipeline.js';
import './styles.css';

type NavItem = 'pipeline' | 'results' | 'outreach' | 'bias';

interface AgentNode {
  id: string;
  label: string;
  status: 'idle' | 'working' | 'complete' | 'error';
}

const INITIAL_NODES: AgentNode[] = [
  { id: 'jd-parser', label: 'JD Parser', status: 'idle' },
  { id: 'bias-detector', label: 'Bias Detector', status: 'idle' },
  { id: 'profile-generator', label: 'Profile Generator', status: 'idle' },
  { id: 'resume-scorer', label: 'Resume Scorer', status: 'idle' },
  { id: 'outreach-writer', label: 'Outreach Writer', status: 'idle' },
];

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 70 ? '#22c55e' : score >= 40 ? '#eab308' : '#ef4444';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div
        style={{
          width: 80,
          height: 8,
          borderRadius: 4,
          background: '#27272a',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${score}%`,
            height: '100%',
            background: color,
            borderRadius: 4,
            transition: 'width 0.5s ease',
          }}
        />
      </div>
      <span style={{ color, fontWeight: 600, fontSize: 14, minWidth: 28 }}>
        {score}
      </span>
    </div>
  );
}

function BiasGauge({ score }: { score: number }) {
  const color =
    score >= 70 ? '#22c55e' : score >= 40 ? '#eab308' : '#ef4444';
  const label =
    score >= 70 ? 'Low Bias' : score >= 40 ? 'Moderate Bias' : 'High Bias';

  // Compute needle angle: score 0 = leftmost (-90 deg from vertical), score 100 = rightmost (+90 deg from vertical)
  const angleRad = ((score / 100) * Math.PI) - Math.PI; // -PI to 0 on the unit circle top
  const cx = 100;
  const cy = 95;
  const r = 65;
  const nx = cx + r * Math.cos(angleRad + Math.PI / 2);
  const ny = cy + r * Math.sin(angleRad + Math.PI / 2);

  return (
    <div style={{ textAlign: 'center', padding: '24px 0' }}>
      <svg width="200" height="120" viewBox="0 0 200 120">
        <path
          d="M 15 95 A 85 85 0 0 1 185 95"
          fill="none"
          stroke="#27272a"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 15 95 A 85 85 0 0 1 185 95"
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${(score / 100) * 267} 267`}
        />
        <line
          x1={cx}
          y1={cy}
          x2={nx}
          y2={ny}
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="5" fill="white" />
      </svg>
      <div style={{ fontSize: 40, fontWeight: 700, color, marginTop: -16 }}>
        {score}
      </div>
      <div style={{ fontSize: 14, color: '#71717a', marginTop: 4 }}>{label}</div>
    </div>
  );
}

function WorkflowDAG({ nodes }: { nodes: AgentNode[] }) {
  const getNode = (id: string) => nodes.find((n) => n.id === id);
  const statusColor = (status: AgentNode['status']) =>
    status === 'complete'
      ? '#22c55e'
      : status === 'working'
        ? '#f97316'
        : status === 'error'
          ? '#ef4444'
          : '#3f3f46';
  const statusLabel = (status: AgentNode['status']) =>
    status === 'complete'
      ? 'complete'
      : status === 'working'
        ? 'working...'
        : status === 'error'
          ? 'error'
          : 'idle';

  const positions: Record<string, { x: number; y: number }> = {
    'jd-parser': { x: 70, y: 60 },
    'bias-detector': { x: 290, y: 60 },
    'profile-generator': { x: 180, y: 175 },
    'resume-scorer': { x: 70, y: 295 },
    'outreach-writer': { x: 290, y: 295 },
  };

  return (
    <div style={{ padding: '16px 0' }}>
      <svg width="100%" viewBox="0 0 420 375" style={{ maxWidth: 420, display: 'block' }}>
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#3f3f46" />
          </marker>
        </defs>
        {/* Parallel bracket */}
        <line x1="70" y1="32" x2="290" y2="32" stroke="#3f3f46" strokeWidth="1" strokeDasharray="4,3" />
        <text x="180" y="26" textAnchor="middle" fill="#52525b" fontSize="10" fontFamily="Inter, sans-serif">parallel</text>
        {/* Edges */}
        <line x1="110" y1="78" x2="162" y2="156" stroke="#3f3f46" strokeWidth="2" markerEnd="url(#arrow)" />
        <line x1="250" y1="78" x2="198" y2="156" stroke="#3f3f46" strokeWidth="2" markerEnd="url(#arrow)" />
        <line x1="162" y1="194" x2="110" y2="276" stroke="#3f3f46" strokeWidth="2" markerEnd="url(#arrow)" />
        <line x1="198" y1="194" x2="250" y2="276" stroke="#3f3f46" strokeWidth="2" markerEnd="url(#arrow)" />
        {/* Nodes */}
        {Object.entries(positions).map(([id, pos]) => {
          const node = getNode(id);
          if (!node) return null;
          const color = statusColor(node.status);
          return (
            <g key={id}>
              <rect x={pos.x - 58} y={pos.y - 22} width={116} height={44} rx={8} fill="#18181b" stroke={color} strokeWidth={2} />
              <text x={pos.x} y={pos.y - 5} textAnchor="middle" fill="white" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600">{node.label}</text>
              <text x={pos.x} y={pos.y + 12} textAnchor="middle" fill={color} fontSize="9" fontFamily="Inter, sans-serif">{statusLabel(node.status)}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function App() {
  const [nav, setNav] = useState<NavItem>('pipeline');
  const [jd, setJd] = useState(SAMPLE_JD);
  const [resumes, setResumes] = useState(SAMPLE_RESUMES);
  const [expandedResume, setExpandedResume] = useState<string | null>(null);
  const [expandedResult, setExpandedResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<PipelineResult | null>(null);
  const [nodes, setNodes] = useState<AgentNode[]>(INITIAL_NODES);
  const [showUnderHood, setShowUnderHood] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const updateNodeStatus = useCallback(
    (agentId: string, status: AgentNode['status']) => {
      setNodes((prev) =>
        prev.map((n) => {
          if (agentId === n.id || agentId.startsWith(n.id + '-')) {
            return { ...n, status };
          }
          return n;
        })
      );
    },
    []
  );

  const runDemo = useCallback(() => {
    setIsAnalyzing(true);
    setNodes(INITIAL_NODES.map((n) => ({ ...n, status: 'idle' })));
    setStatusMessage('Running demo mode (pre-computed results)...');

    setTimeout(() => {
      updateNodeStatus('jd-parser', 'working');
      updateNodeStatus('bias-detector', 'working');
      setStatusMessage('Step 1: Parsing JD + detecting bias (parallel)...');
    }, 300);
    setTimeout(() => {
      updateNodeStatus('jd-parser', 'complete');
      updateNodeStatus('bias-detector', 'complete');
      updateNodeStatus('profile-generator', 'working');
      setStatusMessage('Step 2: Generating ideal candidate profile...');
    }, 1600);
    setTimeout(() => {
      updateNodeStatus('profile-generator', 'complete');
      updateNodeStatus('resume-scorer', 'working');
      setStatusMessage('Step 3: Scoring 5 resumes...');
    }, 2900);
    setTimeout(() => {
      updateNodeStatus('resume-scorer', 'complete');
      updateNodeStatus('outreach-writer', 'working');
      setStatusMessage('Step 4: Drafting outreach for top 3 candidates...');
    }, 4300);
    setTimeout(() => {
      updateNodeStatus('outreach-writer', 'complete');
      setResults(DEMO_RESULTS as unknown as PipelineResult);
      setIsAnalyzing(false);
      setStatusMessage('Pipeline complete. View results in the sidebar.');
      setNav('results');
    }, 5600);
  }, [updateNodeStatus]);

  const runLive = useCallback(async () => {
    setIsAnalyzing(true);
    setNodes(INITIAL_NODES.map((n) => ({ ...n, status: 'idle' })));
    setStatusMessage('Starting live analysis...');

    try {
      const response = await fetch('http://localhost:3001/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jd, resumes }),
      });

      if (!response.ok) {
        const err = (await response.json()) as { error: string };
        throw new Error(err.error);
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let finalResult: PipelineResult | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        for (const line of text.split('\n')) {
          if (!line.startsWith('data: ')) continue;
          const event = JSON.parse(line.slice(6)) as {
            type: string;
            agent?: string;
            status?: AgentNode['status'];
            data?: unknown;
            message?: string;
          };

          if (event.type === 'agent_status' && event.agent) {
            updateNodeStatus(event.agent, event.status ?? 'working');
          } else if (event.type === 'agent_complete' && event.agent) {
            updateNodeStatus(event.agent, 'complete');
            if (event.message) setStatusMessage(event.message);
          } else if (event.type === 'pipeline_complete' && event.data) {
            finalResult = event.data as PipelineResult;
          } else if (event.type === 'error') {
            throw new Error(event.message ?? 'Unknown pipeline error');
          }
        }
      }

      if (finalResult) {
        setResults(finalResult);
        setStatusMessage('Live analysis complete.');
        setNav('results');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setStatusMessage(`Error: ${msg}. Falling back to demo mode.`);
      runDemo();
      return;
    }

    setIsAnalyzing(false);
  }, [jd, resumes, runDemo, updateNodeStatus]);

  const copyToClipboard = (text: string, id: string) => {
    void navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const navItems: { id: NavItem; label: string }[] = [
    { id: 'pipeline', label: 'New Pipeline' },
    { id: 'results', label: 'Results' },
    { id: 'outreach', label: 'Outreach' },
    { id: 'bias', label: 'Bias Report' },
  ];

  const navIcons: Record<NavItem, string> = {
    pipeline:
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
    results:
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 12h8M8 8h8M8 16h5"/></svg>',
    outreach:
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    bias: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <svg width="22" height="22" viewBox="0 0 32 32">
            <circle cx="8" cy="10" r="5" fill="#f97316" />
            <circle cx="24" cy="10" r="5" fill="#f97316" />
            <circle cx="16" cy="24" r="5" fill="#fb923c" />
            <line x1="8" y1="10" x2="24" y2="10" stroke="#f97316" strokeWidth="2" />
            <line x1="8" y1="10" x2="16" y2="24" stroke="#f97316" strokeWidth="2" />
            <line x1="24" y1="10" x2="16" y2="24" stroke="#f97316" strokeWidth="2" />
          </svg>
          <span className="sidebar-title">HireGraph</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item${nav === item.id ? ' active' : ''}`}
              onClick={() => setNav(item.id)}
            >
              <span
                className="nav-icon"
                dangerouslySetInnerHTML={{ __html: navIcons[item.id] }}
              />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="demo-badge">Demo Mode</span>
          <p className="demo-note">
            Pre-computed results. Add ANTHROPIC_API_KEY for live AI analysis.
          </p>
        </div>
      </aside>

      <main className="main">
        {nav === 'pipeline' && (
          <div className="view">
            <h1 className="view-title">New Pipeline</h1>
            <p className="view-subtitle">
              Paste a job description and resumes to run the full AI recruiting pipeline.
            </p>

            <section className="section">
              <label className="label">Job Description</label>
              <textarea
                className="textarea"
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                rows={14}
                placeholder="Paste job description here..."
              />
            </section>

            <section className="section">
              <label className="label">Sample Resumes ({resumes.length})</label>
              <div className="resume-list">
                {resumes.map((resume) => (
                  <div key={resume.id} className="resume-card">
                    <button
                      className="resume-card-header"
                      onClick={() =>
                        setExpandedResume(expandedResume === resume.id ? null : resume.id)
                      }
                    >
                      <span className="resume-name">{resume.name}</span>
                      <span
                        className="chevron"
                        style={{
                          transform: expandedResume === resume.id ? 'rotate(180deg)' : 'none',
                        }}
                      >
                        ▾
                      </span>
                    </button>
                    {expandedResume === resume.id && (
                      <textarea
                        className="resume-textarea"
                        value={resume.text}
                        onChange={(e) =>
                          setResumes((prev) =>
                            prev.map((r) =>
                              r.id === resume.id ? { ...r, text: e.target.value } : r
                            )
                          )
                        }
                        rows={10}
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>

            <div className="action-row">
              <button className="btn-primary" onClick={runDemo} disabled={isAnalyzing}>
                {isAnalyzing ? 'Analyzing...' : 'Run Demo Mode'}
              </button>
              <button
                className="btn-secondary"
                onClick={() => void runLive()}
                disabled={isAnalyzing}
              >
                Run Live (needs API key)
              </button>
            </div>

            {statusMessage && <div className="status-message">{statusMessage}</div>}
          </div>
        )}

        {nav === 'results' && (
          <div className="view">
            <h1 className="view-title">Candidate Results</h1>
            {!results ? (
              <div className="empty-state">Run a pipeline first to see results.</div>
            ) : (
              <div className="results-table">
                <div className="table-header">
                  <span>Candidate</span>
                  <span>Score</span>
                  <span>Top Strength</span>
                  <span>Top Gap</span>
                </div>
                {results.scores.map((score) => (
                  <div key={score.candidate_name}>
                    <button
                      className={`table-row${expandedResult === score.candidate_name ? ' expanded' : ''}`}
                      onClick={() =>
                        setExpandedResult(
                          expandedResult === score.candidate_name ? null : score.candidate_name
                        )
                      }
                    >
                      <span className="candidate-name">{score.candidate_name}</span>
                      <ScoreBar score={score.score} />
                      <span className="cell-preview">{score.strengths[0]}</span>
                      <span className="cell-preview gap-text">{score.gaps[0]}</span>
                    </button>

                    {expandedResult === score.candidate_name && (
                      <div className="row-detail">
                        <div className="detail-grid">
                          <div>
                            <h4 className="detail-heading strengths-heading">Strengths</h4>
                            <ul className="detail-list">
                              {score.strengths.map((s, i) => (
                                <li key={i}>{s}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="detail-heading gaps-heading">Gaps</h4>
                            <ul className="detail-list">
                              {score.gaps.map((g, i) => (
                                <li key={i}>{g}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <p className="reasoning">{score.reasoning}</p>
                        <h4 className="detail-heading" style={{ marginTop: 16 }}>
                          Skill Breakdown
                        </h4>
                        <div className="breakdown-grid">
                          {score.match_breakdown.map((item, i) => (
                            <div key={i} className="breakdown-item">
                              <div className="breakdown-label">
                                <span>{item.skill}</span>
                                <span className="breakdown-weight">weight: {item.weight}%</span>
                              </div>
                              <ScoreBar score={item.score} />
                              <span className="breakdown-notes">{item.notes}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {nav === 'outreach' && (
          <div className="view">
            <h1 className="view-title">Outreach Emails</h1>
            <p className="view-subtitle">Personalized outreach for the top 3 candidates.</p>
            {!results ? (
              <div className="empty-state">Run a pipeline first to generate outreach.</div>
            ) : (
              <div className="email-list">
                {results.outreach.map((email, i) => (
                  <div key={i} className="email-card">
                    <div className="email-card-header">
                      <div>
                        <div className="email-rank">#{i + 1} candidate</div>
                        <div className="email-name">{email.candidate_name}</div>
                      </div>
                      <button
                        className="copy-btn"
                        onClick={() =>
                          copyToClipboard(
                            `Subject: ${email.subject_line}\n\n${email.body}`,
                            email.candidate_name
                          )
                        }
                      >
                        {copiedId === email.candidate_name ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div className="email-subject">
                      <span className="subject-label">Subject: </span>
                      {email.subject_line}
                    </div>
                    <pre className="email-body">{email.body}</pre>
                    <div className="email-meta">
                      <span className="email-tone">Tone: {email.tone}</span>
                      <div className="personalization-tags">
                        {email.personalization_notes.map((note, j) => (
                          <span key={j} className="tag">{note}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {nav === 'bias' && (
          <div className="view">
            <h1 className="view-title">Bias Report</h1>
            {!results ? (
              <div className="empty-state">Run a pipeline first to see the bias report.</div>
            ) : (
              <>
                <div className="bias-overview">
                  <div className="bias-gauge-container">
                    <BiasGauge score={results.biasReport.overall_score} />
                    <p className="bias-summary">{results.biasReport.summary}</p>
                  </div>

                  <div>
                    <h3 className="section-heading">
                      Issues Found ({results.biasReport.issues.length})
                    </h3>
                    <div className="issue-list">
                      {results.biasReport.issues.map((issue, i) => (
                        <div key={i} className={`bias-issue severity-${issue.severity}`}>
                          <div className="bias-issue-header">
                            <span className="bias-type">{issue.bias_type}</span>
                            <span className={`severity-badge sev-${issue.severity}`}>
                              {issue.severity}
                            </span>
                          </div>
                          <div className="bias-text">"{issue.text}"</div>
                          <div className="bias-suggestion">
                            <span className="suggestion-label">Suggestion: </span>
                            {issue.suggestion}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="jd-comparison">
                  <h3 className="section-heading">Before / After Comparison</h3>
                  <div className="comparison-grid">
                    <div>
                      <div className="comparison-label bad">Original (Biased)</div>
                      <pre className="comparison-text original">{jd}</pre>
                    </div>
                    <div>
                      <div className="comparison-label good">Rewritten (Inclusive)</div>
                      <pre className="comparison-text rewritten">
                        {results.biasReport.rewritten_jd}
                      </pre>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      <div className="under-hood-bar">
        <button
          className="under-hood-toggle"
          onClick={() => setShowUnderHood((v) => !v)}
        >
          <span>Under the Hood</span>
          <span className="under-hood-subtitle">
            {showUnderHood ? '▾' : '▸'} Agent Workflow DAG
          </span>
        </button>
        {showUnderHood && (
          <div className="under-hood-panel">
            <WorkflowDAG nodes={nodes} />
            <div className="dag-legend">
              <span className="legend-item">
                <span className="legend-dot idle-dot" /> idle
              </span>
              <span className="legend-item">
                <span className="legend-dot working-dot" /> working
              </span>
              <span className="legend-item">
                <span className="legend-dot complete-dot" /> complete
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
