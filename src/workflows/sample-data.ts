export const SAMPLE_JD = `Senior Frontend Engineer at TechCo

We're a young and energetic startup looking for a rockstar frontend engineer to join our team! If you're a digital native who bleeds code, this is your chance to make a massive impact.

About the Role:
We need someone who's a culture fit — someone who thrives in our fast-paced, bro-friendly environment. You'll be part of a passionate, driven team of ninjas who ship fast and break things.

Requirements:
- 5+ years of React experience (we mean real experience, not hobby projects)
- Must be a self-starter with an aggressive can-do attitude
- TypeScript, Next.js, CSS-in-JS (styled-components or Emotion)
- Experience with GraphQL and REST APIs
- Node.js backend experience preferred
- Strong computer science fundamentals
- Must be able to hit the ground running on day one
- Young, energetic personality that fits our startup culture
- Must be comfortable working long hours when needed

Nice to Have:
- Experience with Three.js or WebGL
- Knowledge of performance optimization techniques
- AWS or Cloudflare experience
- Previous startup experience (not corporate experience)

Responsibilities:
- Build and maintain complex React applications
- Collaborate with design team to implement pixel-perfect UIs
- Write clean, testable, maintainable code
- Participate in code reviews and architectural decisions
- Mentor junior engineers

Salary: $140,000 - $180,000 (depending on experience)

TechCo is an equal opportunity employer who values culture fit above all else.`;

export const SAMPLE_RESUMES = [
  {
    id: '1',
    name: 'Alex Chen',
    text: `Alex Chen
alex.chen@email.com | linkedin.com/in/alexchen | github.com/alexchen
San Francisco, CA

SUMMARY
Senior Frontend Engineer with 8 years of experience building scalable React applications. Passionate about performance optimization, accessibility, and developer experience.

EXPERIENCE
Staff Frontend Engineer — Stripe (2021–Present)
- Led migration of core dashboard to React 18 with concurrent features, reducing TTI by 40%
- Architected and built component library used by 50+ engineers across 3 product teams
- Implemented comprehensive TypeScript types for all API interfaces
- Mentored 4 junior engineers and conducted 100+ code reviews

Senior Frontend Engineer — Airbnb (2018–2021)
- Built high-traffic listing pages serving 50M+ monthly users with Next.js SSR
- Created real-time availability calendar using WebSockets and React Query
- Led accessibility initiative bringing WCAG 2.1 AA compliance across key flows

Frontend Engineer — Lyft (2016–2018)
- Developed driver app dashboard using React and Redux
- Built internal data visualization tools with D3.js

SKILLS
React, TypeScript, Next.js, GraphQL, Node.js, CSS-in-JS, Webpack, Vite, Jest, Cypress, Three.js, WebGL, AWS, Performance Optimization

EDUCATION
B.S. Computer Science — UC Berkeley (2016)`,
  },
  {
    id: '2',
    name: 'Jordan Park',
    text: `Jordan Park
jordan.park@email.com | github.com/jordanpark
Austin, TX

EXPERIENCE
Frontend Engineer — HubSpot (2020–Present)
- Built customer-facing analytics dashboard using React and TypeScript
- Integrated GraphQL API layer replacing legacy REST endpoints
- Improved Lighthouse performance score from 42 to 84 across core pages
- Collaborated with 3 design systems teams

Frontend Developer — Dell Technologies (2018–2020)
- Maintained React component library used across enterprise products
- Implemented responsive layouts for e-commerce product pages
- Participated in weekly code review sessions

SKILLS
React, TypeScript, JavaScript, GraphQL, REST APIs, CSS Modules, Styled-Components, Git, Figma, Jest

EDUCATION
B.S. Information Technology — UT Austin (2018)

NOTES
Still building testing experience — mostly unit tests, working toward E2E coverage. Node.js experience limited to hobby projects. Eager to grow in backend integration.`,
  },
  {
    id: '3',
    name: 'Dr. Sarah Williams',
    text: `Dr. Sarah Williams
sarah.williams@email.com | linkedin.com/in/sarahwilliams-eng
New York, NY

SUMMARY
Distinguished Engineer and Technical Fellow with 15 years of frontend architecture experience. PhD in Human-Computer Interaction. Former VP Engineering at two unicorn startups.

EXPERIENCE
Principal Engineer / Technical Fellow — Google (2018–Present)
- Defined frontend architecture standards adopted by 2,000+ engineers
- Led development of internal UI framework powering Google Workspace
- Published 3 research papers on web performance and accessibility
- Managed team of 12 senior engineers

VP Engineering — Series B startup (2015–2018)
- Grew engineering team from 8 to 60 engineers
- Led complete platform rewrite to React/TypeScript/GraphQL
- Raised $45M Series B on the strength of technical execution

Senior Staff Engineer — Microsoft (2012–2015)
- Core contributor to TypeScript compiler
- Architected Azure portal UI (React, TypeScript)

SKILLS
React, TypeScript, Next.js, GraphQL, Node.js, Performance Engineering, Accessibility, WebGL, Three.js, AWS, Kubernetes, Python, C++

EDUCATION
Ph.D. Human-Computer Interaction — Carnegie Mellon (2012)
B.S. Computer Science — MIT (2008)`,
  },
  {
    id: '4',
    name: 'Marcus Thompson',
    text: `Marcus Thompson
marcus.thompson@email.com | github.com/marcusdev
Chicago, IL

ABOUT ME
Aspiring frontend developer with 2 years of experience. Recent bootcamp graduate passionate about building web experiences. Currently working my first job in tech.

EXPERIENCE
Junior Frontend Developer — Regional Insurance Company (2023–Present)
- Build and maintain Vue.js components for internal claims portal
- Work with REST APIs to display policy information
- Participate in sprint planning and daily standups

Freelance Web Developer (2022–2023)
- Built WordPress websites for local small businesses
- Created landing pages using HTML, CSS, JavaScript

SKILLS
Vue.js, JavaScript (basic TypeScript), HTML, CSS, WordPress, REST APIs, Git (basic)

EDUCATION
Fullstack Web Development Bootcamp — General Assembly (2022)
B.A. Communications — University of Illinois (2021)

NOTES
React experience: worked through React tutorial on Udemy, built a todo app. Eager to learn and grow quickly. No professional React or TypeScript experience yet.`,
  },
  {
    id: '5',
    name: 'Priya Sharma',
    text: `Priya Sharma
priya.sharma@email.com | linkedin.com/in/priyasharma-ds
Seattle, WA

SUMMARY
Data Scientist with 6 years of experience in ML/AI systems, now pivoting to frontend engineering. Completed intensive React/TypeScript self-study over past 8 months. Strong mathematical foundation and Python expertise.

EXPERIENCE
Senior Data Scientist — Amazon (2019–Present)
- Built ML recommendation systems serving 100M+ users daily
- Created Python/FastAPI backend services for model serving
- Developed internal data visualization dashboards using React (self-initiated project)
- Led team of 5 data scientists

Data Scientist — Microsoft Research (2017–2019)
- Developed NLP models using TensorFlow and PyTorch
- Built interactive research demos using D3.js and basic React

SKILLS
Python, React (self-taught, 8 months), TypeScript (learning), JavaScript, D3.js, FastAPI, REST APIs, SQL, Machine Learning, Statistics, Data Visualization

FRONTEND PROJECTS (Personal)
- Built personal portfolio with React + TypeScript (deployed on Vercel)
- Created data visualization dashboard using React and D3.js
- Completed freeCodeCamp React certification

EDUCATION
M.S. Statistics — University of Washington (2017)
B.Tech Computer Science — IIT Delhi (2015)`,
  },
];

export const DEMO_RESULTS = {
  parsedJD: {
    title: 'Senior Frontend Engineer',
    required_skills: [
      'React (5+ years)',
      'TypeScript',
      'Next.js',
      'GraphQL',
      'REST APIs',
      'CSS-in-JS (styled-components/Emotion)',
      'Node.js',
    ],
    nice_to_have: [
      'Three.js or WebGL',
      'Performance optimization',
      'AWS or Cloudflare',
      'Startup experience',
    ],
    experience_level: 'Senior (5+ years)',
    responsibilities: [
      'Build and maintain complex React applications',
      'Implement pixel-perfect UIs from design specs',
      'Write clean, testable, maintainable code',
      'Participate in code reviews and architectural decisions',
      'Mentor junior engineers',
    ],
    salary_range: '$140,000 - $180,000',
  },
  profile: {
    key_skills: [
      { skill: 'React', weight: 30, importance: 'critical' },
      { skill: 'TypeScript', weight: 20, importance: 'critical' },
      { skill: 'Next.js', weight: 15, importance: 'important' },
      { skill: 'GraphQL', weight: 10, importance: 'important' },
      { skill: 'CSS-in-JS', weight: 10, importance: 'important' },
      { skill: 'Node.js', weight: 8, importance: 'nice-to-have' },
      { skill: 'Testing', weight: 7, importance: 'nice-to-have' },
    ],
    experience_requirements: [
      '5+ years professional frontend development',
      'Production React experience at scale',
      'TypeScript in a team environment',
      'Code review and mentorship experience',
    ],
    cultural_indicators: [
      'Comfort with ambiguity and fast-paced environments',
      'Strong communication and collaboration skills',
      'Ownership mentality and self-direction',
      'Continuous learning and improvement mindset',
    ],
    scoring_rubric: [
      {
        criterion: 'Core React/TypeScript Skills',
        weight: 40,
        description: 'Depth and recency of React and TypeScript experience',
      },
      {
        criterion: 'Production Scale Experience',
        weight: 25,
        description: 'Experience building high-traffic, production applications',
      },
      {
        criterion: 'Full Stack / API Integration',
        weight: 20,
        description: 'GraphQL, REST, Node.js backend integration experience',
      },
      {
        criterion: 'Team & Leadership',
        weight: 15,
        description: 'Code review, mentorship, and collaborative work experience',
      },
    ],
  },
  scores: [
    {
      id: '1',
      candidate_name: 'Alex Chen',
      score: 92,
      strengths: [
        '8 years of React experience at Stripe and Airbnb',
        'Strong TypeScript and Next.js SSR expertise',
        'Proven performance optimization skills (40% TTI reduction)',
        'Mentorship and leadership experience at scale',
        'Three.js experience is a bonus match',
      ],
      gaps: [
        'No explicit GraphQL experience mentioned',
        'AWS experience not highlighted',
      ],
      reasoning:
        'Alex is an exceptional match. Their 8 years of React experience at high-scale companies like Stripe and Airbnb directly aligns with requirements. The performance optimization track record and mentorship experience are particularly strong indicators of senior-level competency.',
      match_breakdown: [
        { skill: 'React', weight: 30, score: 95, notes: '8 years, Stripe + Airbnb' },
        { skill: 'TypeScript', weight: 20, score: 92, notes: 'Explicitly typed API interfaces' },
        { skill: 'Next.js', weight: 15, score: 88, notes: 'SSR for 50M+ users' },
        { skill: 'GraphQL', weight: 10, score: 70, notes: 'Not explicitly mentioned' },
        { skill: 'CSS-in-JS', weight: 10, score: 85, notes: 'Used in projects' },
        { skill: 'Node.js', weight: 8, score: 80, notes: 'Backend experience' },
        { skill: 'Testing', weight: 7, score: 90, notes: 'Jest + Cypress mentioned' },
      ],
    },
    {
      id: '2',
      candidate_name: 'Jordan Park',
      score: 74,
      strengths: [
        '5 years of React and TypeScript experience',
        'GraphQL integration experience at HubSpot',
        'Proven performance optimization (Lighthouse 42→84)',
        'Design systems collaboration experience',
      ],
      gaps: [
        'Limited testing experience (mainly unit tests)',
        'Node.js experience limited to hobby projects',
        'No explicit Next.js SSR experience',
        'Less scale/complexity than ideal',
      ],
      reasoning:
        "Jordan is a solid match with the core React, TypeScript, and GraphQL requirements covered. The Lighthouse optimization work is impressive. The gaps in testing depth and Node.js could be concerns for a senior role, but they're learnable gaps.",
      match_breakdown: [
        { skill: 'React', weight: 30, score: 80, notes: '5 years, HubSpot dashboard' },
        { skill: 'TypeScript', weight: 20, score: 78, notes: 'Used in current role' },
        { skill: 'Next.js', weight: 15, score: 55, notes: 'Not mentioned' },
        { skill: 'GraphQL', weight: 10, score: 85, notes: 'API integration work' },
        { skill: 'CSS-in-JS', weight: 10, score: 82, notes: 'Styled-components listed' },
        { skill: 'Node.js', weight: 8, score: 40, notes: 'Hobby projects only' },
        { skill: 'Testing', weight: 7, score: 50, notes: 'Unit tests, building E2E' },
      ],
    },
    {
      id: '3',
      candidate_name: 'Dr. Sarah Williams',
      score: 68,
      strengths: [
        'Exceptional technical depth and breadth',
        'All required technical skills at expert level',
        'Architecture and leadership experience',
        'Research background brings unique perspective',
      ],
      gaps: [
        'Likely overqualified for IC role — expects staff/principal/VP level',
        'Google Principal Engineer may not be motivated by this scope',
        'Compensation expectations may exceed budget',
        'Risk of boredom and quick departure',
      ],
      reasoning:
        "Dr. Williams is technically overqualified — her skills far exceed what's needed. The risk is misalignment of expectations: she's accustomed to defining architecture for 2,000+ engineers. This role's scope may not be engaging enough, creating retention risk.",
      match_breakdown: [
        { skill: 'React', weight: 30, score: 98, notes: 'Expert level, defined standards for 2000+ engineers' },
        { skill: 'TypeScript', weight: 20, score: 99, notes: 'Core TypeScript contributor' },
        { skill: 'Next.js', weight: 15, score: 90, notes: 'Implied in stack' },
        { skill: 'GraphQL', weight: 10, score: 88, notes: 'Platform rewrites include GraphQL' },
        { skill: 'CSS-in-JS', weight: 10, score: 85, notes: 'Component library work' },
        { skill: 'Node.js', weight: 8, score: 90, notes: 'Extensive backend' },
        { skill: 'Testing', weight: 7, score: 92, notes: 'Quality engineering leadership' },
      ],
    },
    {
      id: '4',
      candidate_name: 'Marcus Thompson',
      score: 34,
      strengths: [
        'Enthusiastic and eager to learn',
        'Basic REST API experience',
        'Familiarity with component-based architecture via Vue',
      ],
      gaps: [
        'No professional React or TypeScript experience',
        'Primary framework is Vue, not React',
        'Only 2 years total experience (need 5+)',
        'No Next.js, GraphQL, or CSS-in-JS experience',
        'No mentorship or senior responsibilities',
      ],
      reasoning:
        "Marcus is not a match for this senior role at this time. The 5-year experience gap and lack of React/TypeScript professional experience are disqualifying. This would be a better fit for a junior React role with structured mentorship.",
      match_breakdown: [
        { skill: 'React', weight: 30, score: 15, notes: 'Tutorial only, no professional React' },
        { skill: 'TypeScript', weight: 20, score: 20, notes: 'Basic/learning TypeScript' },
        { skill: 'Next.js', weight: 15, score: 5, notes: 'Not mentioned' },
        { skill: 'GraphQL', weight: 10, score: 0, notes: 'Not mentioned' },
        { skill: 'CSS-in-JS', weight: 10, score: 10, notes: 'Basic CSS experience only' },
        { skill: 'Node.js', weight: 8, score: 0, notes: 'Not mentioned' },
        { skill: 'Testing', weight: 7, score: 0, notes: 'Not mentioned' },
      ],
    },
    {
      id: '5',
      candidate_name: 'Priya Sharma',
      score: 46,
      strengths: [
        'Strong D3.js and data visualization expertise',
        'Production-scale systems experience (100M+ users)',
        'Python/FastAPI backend experience adds unique value',
        'Self-driven learner — 8 months React self-study',
        'ML/AI background could be valuable for AI-adjacent features',
      ],
      gaps: [
        'React experience is self-taught, not professional (8 months)',
        'TypeScript still learning',
        'No professional frontend role history',
        'CSS-in-JS experience unclear',
        'No Next.js or GraphQL professional experience',
      ],
      reasoning:
        "Priya is an interesting candidate with exceptional backend and scale experience, but insufficient professional frontend experience for a senior role. The self-taught React skills show initiative but aren't equivalent to 5 years of professional React development. Worth considering for a special hybrid role if one exists.",
      match_breakdown: [
        { skill: 'React', weight: 30, score: 35, notes: '8 months self-study + personal projects' },
        { skill: 'TypeScript', weight: 20, score: 30, notes: 'Currently learning' },
        { skill: 'Next.js', weight: 15, score: 10, notes: 'Not mentioned' },
        { skill: 'GraphQL', weight: 10, score: 0, notes: 'Not mentioned' },
        { skill: 'CSS-in-JS', weight: 10, score: 20, notes: 'Basic styling in projects' },
        { skill: 'Node.js', weight: 8, score: 75, notes: 'FastAPI equivalent experience' },
        { skill: 'Testing', weight: 7, score: 40, notes: 'Testing in data science context' },
      ],
    },
  ],
  outreach: [
    {
      candidate_name: 'Alex Chen',
      subject_line: 'Your Stripe dashboard work caught our eye — chat?',
      body:
        "Hi Alex,\n\nYour work migrating Stripe's dashboard to React 18 — specifically the 40% TTI reduction — is exactly the kind of performance-first thinking we're building toward at TechCo.\n\nWe're looking for a Senior Frontend Engineer to architect our redesigned customer dashboard. The role involves React 18, TypeScript, and Next.js SSR at scale. Given your Airbnb SSR experience serving 50M+ users, I think the technical challenges would feel both familiar and meaningfully new.\n\nThe stack is React, TypeScript, GraphQL, Next.js — and we'd love to tap into your Three.js experience for some upcoming data visualization work.\n\nWould a 20-minute call this week make sense? Happy to share more about the technical roadmap.",
      tone: 'Professional and specific, peer-to-peer',
      personalization_notes: [
        'Referenced specific Stripe TTI metric',
        'Connected Airbnb scale experience to role scope',
        'Mentioned Three.js as a specific bonus match',
      ],
    },
    {
      candidate_name: 'Jordan Park',
      subject_line: 'HubSpot dashboard engineer → excited about this role',
      body:
        "Hi Jordan,\n\nThe Lighthouse optimization work you did at HubSpot — taking core pages from 42 to 84 — signals exactly the performance mindset we need on our frontend team.\n\nWe're hiring a Senior Frontend Engineer to build our analytics dashboard. You'd be working with React, TypeScript, and GraphQL daily — a direct match to your HubSpot stack. The role also involves design systems collaboration, something you've already been doing across 3 teams.\n\nThe main growth area would be deeper Next.js and Node.js work, which we'd support with mentorship and hands-on architecture work.\n\nInterested in hearing more? A quick 20-minute call could tell us both if there's a fit.",
      tone: 'Warm and encouraging, growth-focused',
      personalization_notes: [
        'Referenced specific Lighthouse improvement numbers',
        'Called out design systems collaboration explicitly',
        'Acknowledged growth areas honestly',
      ],
    },
    {
      candidate_name: 'Dr. Sarah Williams',
      subject_line: 'Defining our frontend standards — right level for you?',
      body:
        "Hi Sarah,\n\nYour work defining frontend architecture standards adopted by 2,000+ Google engineers is remarkable. We're thinking about this role differently than most companies would.\n\nWe're at an inflection point — we need someone to define, not just execute, our frontend architecture as we scale from 10 to 100 engineers. The TypeScript work you did at Microsoft Research (core compiler contributions) and the Workspace UI framework at Google are exactly the kind of foundational thinking we need.\n\nI want to be direct: if you're looking for an IC execution role, this may not be the right fit. But if you want to define how a fast-growing company builds software — stack choices, patterns, quality standards — this could be interesting.\n\nWorth 30 minutes to explore?",
      tone: 'Direct and candid, respectful of seniority',
      personalization_notes: [
        'Acknowledged exceptional seniority explicitly',
        'Reframed role to match her actual level',
        'Mentioned TypeScript compiler work specifically',
        'Was transparent about role fit uncertainty',
      ],
    },
  ],
  biasReport: {
    issues: [
      {
        text: 'young and energetic startup',
        bias_type: 'age bias',
        severity: 'high',
        suggestion: 'Replace with "fast-paced, collaborative startup"',
      },
      {
        text: 'rockstar frontend engineer',
        bias_type: 'gender bias',
        severity: 'medium',
        suggestion: 'Replace with "skilled frontend engineer" or "experienced frontend engineer"',
      },
      {
        text: 'digital native',
        bias_type: 'age bias',
        severity: 'high',
        suggestion: 'Remove entirely — technological proficiency can be assessed through skills and experience',
      },
      {
        text: 'bleeds code',
        bias_type: 'cultural bias',
        severity: 'medium',
        suggestion: 'Replace with "is passionate about engineering quality"',
      },
      {
        text: 'bro-friendly environment',
        bias_type: 'gender bias',
        severity: 'high',
        suggestion: 'Remove entirely — replace with description of actual collaborative culture values',
      },
      {
        text: 'ninjas who ship fast',
        bias_type: 'gender bias',
        severity: 'medium',
        suggestion: 'Replace with "engineers who move quickly with quality"',
      },
      {
        text: 'aggressive can-do attitude',
        bias_type: 'gender bias',
        severity: 'medium',
        suggestion: 'Replace with "proactive, results-oriented approach"',
      },
      {
        text: 'Young, energetic personality that fits our startup culture',
        bias_type: 'age bias',
        severity: 'high',
        suggestion: 'Remove entirely — this is potential age discrimination. Describe actual culture values instead.',
      },
      {
        text: 'hit the ground running on day one',
        bias_type: 'ability bias',
        severity: 'low',
        suggestion: 'Replace with "ramp up quickly with team support" to be more welcoming',
      },
      {
        text: 'not corporate experience',
        bias_type: 'socioeconomic bias',
        severity: 'medium',
        suggestion: 'Remove this qualifier — valuable experience exists in all contexts. Focus on specific skills demonstrated.',
      },
      {
        text: 'culture fit above all else',
        bias_type: 'cultural bias',
        severity: 'high',
        suggestion: 'Replace with "culture add — candidates who bring diverse perspectives and shared values"',
      },
    ],
    overall_score: 28,
    summary:
      "This job description has significant bias issues that could expose the company to legal risk and will actively deter qualified diverse candidates. The age-coded language ('young', 'energetic', 'digital native') is potentially discriminatory under the ADEA. Gender-coded terms ('rockstar', 'ninja', 'bro-friendly') have been shown to reduce applications from women by up to 40%. Immediate revision is strongly recommended before posting.",
    rewritten_jd:
      "Senior Frontend Engineer at TechCo\n\nWe're a collaborative, fast-moving startup looking for an experienced frontend engineer to make a meaningful impact on our product.\n\nAbout the Role:\nYou'll join an engineering team that values craftsmanship, collaboration, and continuous improvement. We care deeply about code quality, user experience, and supporting each other's growth.\n\nRequirements:\n- 5+ years of React experience in production environments\n- TypeScript, Next.js, CSS-in-JS (styled-components or Emotion)\n- Experience with GraphQL and REST APIs\n- Node.js backend experience preferred\n- Strong software engineering fundamentals\n- Collaborative approach to problem-solving\n\nNice to Have:\n- Experience with Three.js or WebGL\n- Knowledge of performance optimization techniques\n- AWS or Cloudflare experience\n- Experience scaling frontend systems\n\nResponsibilities:\n- Build and maintain complex React applications\n- Collaborate with design team to implement high-quality UIs\n- Write clean, testable, maintainable code\n- Participate in code reviews and architectural decisions\n- Support the growth of junior team members\n\nSalary: $140,000 - $180,000 (depending on experience)\n\nTechCo is an equal opportunity employer committed to building a diverse and inclusive team.",
  },
};
