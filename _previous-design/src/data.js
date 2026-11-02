// Biographical details are sourced from the supplied Anish Goyal resume.
export const visibleSections = { community: false, experience: false };

export const profile = {
  name: 'Anish Goyal', firstName: 'Anish', initials: 'AG',
  title: 'Software Engineer | Agentic AI & Python',
  email: 'goyalanish886@gmail.com', phone: '+49 176 727 28812', phoneHref: 'tel:+4917672728812',
  location: 'Troisdorf, Germany',
  github: 'https://github.com/Anishyou', linkedin: 'https://bit.ly/4nRsf3h',
  resume: '/documents/Anish_Goyal_Resume.pdf',
  summary: 'I’m an Information Systems graduate from the Technical University of Munich, currently working in AI and automation at auxmoney. My focus is agentic AI and Python, supported by experience in backend development, API integration, and service testing. I’ve also worked with Java and Spring Boot in university projects and my bachelor’s thesis.',
  focus: 'I bring fintech experience and a structured approach to building useful AI workflows with Python, API integrations, and dependable backend logic.',
  strengths: ['Eager to learn', 'Reliable', 'Collaborative', 'Adaptable'],
};

export const experience = [
  {
    id: 'auxmoney', company: 'auxmoney', role: 'Working Student — AI & Automation', dates: 'Oct 2025 – Present', current: true,
    description: 'Applying AI to business and development workflows, with a focus on dependable backend logic and service quality.',
    bullets: [
      'Develop and integrate internal AI services using OpenAI APIs and Langdock to automate business and development workflows.',
      'Implement backend logic for AI workflows, including prompt processing, API communication, response validation, and error handling.',
      'Create synthetic PDF test data to test and evaluate services and document-processing workflows.',
      'Design test scenarios, validate outputs, and perform functional and integration tests to assess service quality and reliability.',
      'Gain initial hands-on exposure to AWS / Amazon Bedrock, Kafka, Terraform, Kubernetes, and Docker; use Cursor in software development.',
    ], tags: ['OpenAI APIs', 'Langdock', 'Backend logic', 'Service testing'],
  },
  {
    id: 'ippen', company: 'Ippen Digital', role: 'Working Student — Product Management', dates: 'Dec 2023 – Apr 2024',
    description: 'Connecting product workflows with hands-on Java backend contributions.',
    bullets: ['Contributed to Java backend development to improve product functionality and system reliability.', 'Managed configurations for approximately 80 websites and supported product and team workflows.'],
    tags: ['Java', 'Product workflows', '~80 websites'],
  },
  {
    id: 'tum-practical', company: 'Technical University of Munich', role: 'Software Development Practical Course', dates: 'Oct 2023 – Feb 2024',
    description: 'Building a lecture-streaming application in an agile university team.',
    bullets: ['Developed a lecture-streaming application with Flutter and Go, including live and on-demand playback, chat, quizzes, and downloads.', 'Contributed to CI/CD, UI design, and GitHub issue tracking; collaborated in an agile team and coordinated feature development.'],
    tags: ['Flutter', 'Go', 'CI/CD', 'Agile teamwork'],
  },
];

export const projects = [
  {
    id: 'transcription', role: 'BACHELOR’S THESIS / TUM', title: 'Video Transcription & Playback', fullTitle: 'Video Transcription & Interactive Playback', organization: 'Technical University of Munich',
    tags: ['Java', 'Spring Boot', 'Python', 'Angular'], visual: 'transcription',
    description: 'Video and audio transcription with synchronised transcripts and an interactive Angular video player.',
    detail: 'For my bachelor’s thesis at the Technical University of Munich, I developed backend functionality using Java / Spring Boot and Python. I also built an Angular video player with transcript display and interactive frontend features.',
    features: ['Backend functionality for video and audio transcription', 'Synchronised transcripts', 'Angular video player with transcript display and interactive features'],
  },
  {
    id: 'logpt', role: 'LOCAL AI / DOCUMENTS', title: 'LoGPT — Local PDF Answers', fullTitle: 'LoGPT — Local PDF Question Answering',
    tags: ['Local GPT', 'PDFs', 'Question answering'], visual: 'documents',
    description: 'A local GPT application for answering questions about PDF content and finding relevant document information.',
    detail: 'I developed LoGPT to provide targeted access to information in PDFs through question answering. The project focuses on working with document content in a local GPT application.',
    features: ['Local GPT application', 'Questions and answers about PDF content', 'Targeted access to document information'],
  },
  {
    id: 'chatbot', role: 'CHATBOT DEVELOPMENT / FAST TRADE', title: 'FAST TRADE Chatbot', organization: 'FAST TRADE',
    tags: ['Chatbot development', 'FAST TRADE'], visual: 'chatbot',
    liveUrl: 'https://efasttrade.com/ftt-chatbot',
    description: 'A live website AI assistant that answers visitor questions using website content and uploaded documents.',
    detail: 'I developed a chatbot for FAST TRADE. This project is part of my practical experience building conversational applications.',
    features: ['Chatbot development for FAST TRADE'],
  },
  {
    id: 'road-vision', role: 'COMPUTER VISION / FAST TRADE', title: 'Road Defect Detection', fullTitle: 'Computer Vision — Road & Infrastructure Defect Detection', organization: 'FAST TRADE, Jaipur',
    tags: ['Computer vision', 'Data preparation', 'Model testing'], visual: 'vision',
    description: 'Contributing to road and infrastructure defect detection through data preparation, annotation review, and model evaluation.',
    detail: 'At FAST TRADE in Jaipur, I contributed to a computer vision project for detecting road and infrastructure defects. My work covered preparing data, reviewing annotations, testing models, and evaluating their outputs.',
    features: ['Data preparation', 'Annotation review', 'Model testing and evaluation'],
  },
  {
    id: 'lecture-streaming', role: 'PRACTICAL COURSE / TUM', title: 'Lecture Streaming App', organization: 'Technical University of Munich · Oct 2023 – Feb 2024',
    tags: ['Flutter', 'Go', 'CI/CD', 'GitHub'], visual: 'streaming',
    description: 'A lecture-streaming application with live and on-demand playback, chat, quizzes, and downloads.',
    detail: 'Developed during the Software Development Practical Course at TUM, this application brought lecture content and interactive features together. I contributed to development, UI design, CI/CD, and GitHub issue tracking while coordinating features with an agile team.',
    features: ['Live and on-demand playback', 'Chat, quizzes, and downloads', 'CI/CD and UI design contributions', 'Agile collaboration and feature coordination'],
  },
];

export const highlights = [
  { title: 'JAVA', subtitle: 'behind the scenes.', visual: 'backend', label: 'BACKEND DEVELOPMENT', copy: 'Java backend contributions at Ippen Digital. Java / Spring Boot and Python in university projects and my bachelor’s thesis.', source: 'Ippen Digital · Technical University of Munich' },
  { title: 'AI', subtitle: 'put to work.', visual: 'automation', label: 'APPLIED AI', copy: 'Internal AI services with OpenAI APIs and Langdock, supported by prompt processing, API communication, response validation, and error handling.', source: 'auxmoney · AI & Automation' },
  { title: 'TESTING', subtitle: 'for reliability.', visual: 'testing', label: 'SERVICE QUALITY', copy: 'Synthetic PDF test data, carefully designed test scenarios, output validation, and functional and integration testing.', source: 'auxmoney · Service & document-processing workflows' },
  { title: 'PRODUCT', subtitle: 'in perspective.', visual: 'product', label: 'PRODUCT EXPERIENCE', copy: 'Managed configurations for approximately 80 websites while supporting product and team workflows.', source: 'Ippen Digital · Product Management' },
];

export const categories = ['All', 'Backend', 'Apps', 'AI', 'Testing', 'Cloud'];
export const categoryNotes = {
  All: 'A toolkit built through work, university projects, and independent development. Experience levels are noted where relevant.',
  Backend: 'Java, Python, SQL, and REST APIs. Spring Boot experience comes from university projects and my bachelor’s thesis; Go from the TUM practical course.',
  Apps: 'Frontend and app development with Angular, TypeScript, Flutter, and Swift.',
  AI: 'Agentic AI is my main focus, alongside applied AI and document workflows including OpenAI APIs, Langdock, open-source LLMs, PDF question answering, and basic PyTorch.',
  Testing: 'Functional, API, and integration testing, supported by development, collaboration, and automation tools.',
  Cloud: 'Initial hands-on exposure through my work at auxmoney. These are technologies I’m gaining experience with.',
};
export const technologies = [
  { name: 'Java', icon: 'java', category: 'Backend', color: '#f09859' },
  { name: 'Python', icon: 'python', category: 'Backend', color: '#f5ce55' },
  { name: 'SQL', icon: 'database', category: 'Backend', color: '#77acd3' },
  { name: 'REST APIs', icon: 'api', category: 'Backend', color: '#69cfb8' },
  { name: 'Spring Boot', icon: 'spring', category: 'Backend', color: '#83ba58', level: 'University & thesis' },
  { name: 'Go', icon: 'go', category: 'Backend', color: '#65d2e5', level: 'University practical' },
  { name: 'Angular', icon: 'angular', category: 'Apps', color: '#f16585' },
  { name: 'TypeScript', icon: 'typescript', category: 'Apps', color: '#3178c6' },
  { name: 'Flutter', icon: 'flutter', category: 'Apps', color: '#55c5f8' },
  { name: 'Swift', icon: 'swift', category: 'Apps', color: '#ef9a65' },
  { name: 'Agentic AI', icon: 'ai', category: 'AI', color: '#6989df' },
  { name: 'OpenAI APIs', icon: 'ai', category: 'AI', color: '#6dccac' },
  { name: 'Langdock', icon: 'langdock', category: 'AI', color: '#bfa3ff' },
  { name: 'Open-source LLMs', icon: 'llm', category: 'AI', color: '#b1a6f8' },
  { name: 'PDF question answering', icon: 'pdf', category: 'AI', color: '#f29292' },
  { name: 'PyTorch', icon: 'pytorch', category: 'AI', color: '#ee8e76', level: 'Basic' },
  { name: 'Functional testing', icon: 'check', category: 'Testing', color: '#68c8a3' },
  { name: 'API testing', icon: 'api', category: 'Testing', color: '#68c8a3' },
  { name: 'Integration testing', icon: 'integration', category: 'Testing', color: '#68c8a3' },
  { name: 'Postman', icon: 'postman', category: 'Testing', color: '#ff9c7a' },
  { name: 'CI/CD', icon: 'cicd', category: 'Testing', color: '#8dadf5' },
  { name: 'Git', icon: 'git', category: 'Testing', color: '#f19880' },
  { name: 'GitHub', icon: 'github', category: 'Testing', color: '#fff' },
  { name: 'GitLab', icon: 'gitlab', category: 'Testing', color: '#f6bd80' },
  { name: 'Atlassian', icon: 'atlassian', category: 'Testing', color: '#72a4ec' },
  { name: 'Claude Code', icon: 'claude', category: 'Testing', color: '#dba987' },
  { name: 'Cursor', icon: 'cursor', category: 'Testing', color: '#fff' },
  ...[
    ['AWS', 'aws', '#ffb45b'], ['Amazon Bedrock', 'bedrock', '#c495ed'],
    ['Kafka', 'kafka', '#ddd'], ['Terraform', 'terraform', '#b7a1ee'],
    ['Kubernetes', 'kubernetes', '#77a3eb'], ['Docker', 'docker', '#6cb6ec'],
  ].map(([name, icon, color]) => ({ name, icon, color, category: 'Cloud', level: 'Initial exposure' })),
];

export const timeline = [
  { title: 'A Foundation in Germany', year: '2019 – 2020', chapter: 'Studienkolleg', text: 'University preparatory programme at Unipark Dresden and ESKW Magdeburg, from March 2019 to January 2020.' },
  { title: 'Building Community', year: '2021 – 2023', chapter: 'DEGIS Munich', text: 'Vice President in Marketing, then Event Management. Social media campaigns, event planning, and coordination.' },
  { title: 'Information Systems at TUM', year: '2022 – 2026', chapter: 'B.Sc.', text: 'Studied Wirtschaftsinformatik at the Technical University of Munich, combining information systems with practical software development.' },
  { title: 'Software, as a Team', year: '2023 – 2024', chapter: 'TUM practical course', text: 'Built a lecture-streaming app with Flutter and Go, contributing to CI/CD, UI design, and agile feature development.' },
  { title: 'Engineering Meets Product', year: '2023 – 2024', chapter: 'Ippen Digital', text: 'Contributed to Java backend development and managed configurations for approximately 80 websites.' },
  { title: 'AI in Financial Services', year: '2025 – PRESENT', chapter: 'auxmoney', text: 'Developing internal AI services and backend workflows, creating synthetic PDF test data, and testing service reliability.' },
];
export const education = [
  { school: 'Technical University of Munich', degree: 'B.Sc. Information Systems', original: 'Wirtschaftsinformatik', dates: 'Oct 2022 – Oct 2026', detail: 'Bachelor’s thesis in video transcription and interactive playback, using Java / Spring Boot, Python, and Angular.' },
  { school: 'Unipark Dresden & ESKW Magdeburg', degree: 'Studienkolleg', original: 'University Preparatory Programme', dates: 'Mar 2019 – Jan 2020', detail: 'University preparatory studies in Germany.' },
];
export const volunteering = [
  { title: 'Vice President, Event Management', dates: 'Sep 2022 – Mar 2023' },
  { title: 'Vice President, Marketing Team', dates: 'Sep 2021 – Sep 2022' },
];
export const languages = [{ name: 'German' }, { name: 'English' }, { name: 'Hindi', level: 'Native' }, { name: 'Turkish', level: 'Beginner' }];
export const interests = [
  ['Backend', 'Developing reliable services with Java and Python'],
  ['Financial products', 'Bringing fintech experience to useful, dependable software'],
  ['Applied AI', 'Connecting AI services with practical business workflows'],
  ['Quality', 'Validating behaviour through functional, API, and integration testing'],
  ['Growth', 'Learning further, including financial product development with Java and Kotlin'],
];
