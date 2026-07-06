export const PERSONAL = {
  name: 'Nakshatra Kaushik',
  firstName: 'Nakshatra',
  lastName: 'Kaushik',
  title: 'Edge AI Engineer',
  titleFull: 'Edge AI Engineer | AIoT Engineer | AI Automation | Generative AI | Prompt Engineering',
  tagline: 'ECE → AI Engineer',
  bio: 'Building at the frontier of Edge AI and Generative AI — from training LLMs on cloud platforms to deploying intelligent systems on constrained hardware.',
  phone: '+91 81309 53769',
  email: 'nkshtrkaushik@gmail.com',
  emailAlt: 'nkshtrkaushik@outlook.in',
  linkedin: 'https://www.linkedin.com/in/nakshatrakaushik1903',
  github: 'https://github.com/NakshatraK19',
  subtitles: [
    'Edge AI Engineer',
    'AIoT Engineer',
    'Generative AI Builder',
    'Multi-Agent Architect',
    'Prompt Engineer',
    'ECE → AI Engineer',
  ],
  stats: [
    { value: '8+', label: 'AI Projects' },
    { value: '15+', label: 'Certifications' },
    { value: '5+', label: 'Cloud Platforms' },
  ],
}

export const SKILL_GROUPS = [
  {
    id: 'genai',
    category: 'Generative AI & LLMs',
    icon: '⬡',
    accentColor: '#7b2fff',
    glowColor: 'rgba(123,47,255,0.25)',
    borderColor: 'rgba(123,47,255,0.35)',
    skills: [
      'Claude (Anthropic)', 'Ollama', 'Hugging Face Transformers',
      'OpenAI Ecosystem', 'Amazon Nova', 'Prompt Engineering',
      'Fine-tuning', 'RAG Pipelines', 'Agentic AI',
    ],
  },
  {
    id: 'cloud',
    category: 'Cloud AI Platforms',
    icon: '◈',
    accentColor: '#00d4ff',
    glowColor: 'rgba(0,212,255,0.2)',
    borderColor: 'rgba(0,212,255,0.3)',
    skills: [
      'AWS SageMaker', 'AWS Generative AI Services',
      'Microsoft Azure AI', 'Azure AI Agents',
      'Cloud-Based AI Solutions',
    ],
  },
  {
    id: 'edge',
    category: 'Edge AI & Embedded Intelligence',
    icon: '◎',
    accentColor: '#39ff14',
    glowColor: 'rgba(57,255,20,0.15)',
    borderColor: 'rgba(57,255,20,0.25)',
    skills: [
      'Edge Impulse', 'Qualcomm AI Hub', 'TinyML',
      'NVIDIA NeMo', 'CUDA Fundamentals', 'AI on Mobile Devices',
      'Edge AI Deployment', 'IoT AI Systems',
    ],
  },
  {
    id: 'programming',
    category: 'Programming & Development',
    icon: '⬢',
    accentColor: '#ff2d78',
    glowColor: 'rgba(255,45,120,0.15)',
    borderColor: 'rgba(255,45,120,0.25)',
    skills: [
      'Python', 'C / C++', 'MySQL', 'Selenium',
      'REST APIs', 'API Integration',
    ],
  },
  {
    id: 'electronics',
    category: 'Embedded Systems & Electronics',
    icon: '⬡',
    accentColor: '#ffaa00',
    glowColor: 'rgba(255,170,0,0.15)',
    borderColor: 'rgba(255,170,0,0.25)',
    skills: [
      'Embedded Systems', 'Microcontrollers', 'Microprocessors',
      'Sensor & Instrumentation', 'Arduino', 'IoT Development',
      'Digital Signal Processing', 'Analog Circuits', 'LTSpice',
    ],
  },
]

export type ProjectStatus = 'active' | 'completed'

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  github: string
  live: string | null
  status: ProjectStatus
  category: string
  color: string
  award?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'browser-agent',
    title: 'AI Browser Automation Agent',
    description: 'Intelligent browser agent using Claude Sonnet 4.6 to autonomously navigate, extract data, and interact with web content through natural language instructions. Deployed on Railway.',
    tech: ['Claude Sonnet 4.6', 'Browser Agent API', 'Selenium', 'Python', 'Railway'],
    github: 'https://github.com/NakshatraK19',
    live: 'https://browser-agentv2-production.up.railway.app',
    status: 'active',
    category: 'Automation',
    color: '#7b2fff',
  },
  {
    id: 'db-agent',
    title: 'NL Database Query Agent',
    description: 'AI-powered interface converting natural language to optimized MongoDB operations using Hugging Face Transformers with Microsoft Database Agent and custom query optimization.',
    tech: ['MongoDB', 'Hugging Face', 'Microsoft DB Agent', 'Python', 'Streamlit'],
    github: 'https://github.com/NakshatraK19',
    live: 'https://nl-db-agent-nk19.streamlit.app/',
    status: 'active',
    category: 'AI Infra',
    color: '#00d4ff',
  },
  {
    id: 'multi-agent',
    title: 'Multi-Agent Research Assistant',
    description: 'Autonomous research system with multiple specialized agents coordinating to research topics, synthesize information, and generate comprehensive reports through RAG pipelines.',
    tech: ['CrewAI', 'Claude Sonnet 4.6', 'MongoDB', 'Python', 'RAG'],
    github: 'https://github.com/NakshatraK19',
    live: null,
    status: 'active',
    category: 'Agentic AI',
    color: '#ff2d78',
  },
  {
    id: 'edge-ai',
    title: 'Edge AI Object Detection',
    description: 'Real-time object detection on constrained edge devices using TinyML and Qualcomm AI Hub optimization — deployed on IoT hardware with minimal latency and power draw.',
    tech: ['Llama 4', 'Edge Impulse', 'Qualcomm AI Hub', 'TinyML', 'IoT'],
    github: 'https://github.com/NakshatraK19',
    live: null,
    status: 'active',
    category: 'Edge AI',
    color: '#39ff14',
  },
  {
    id: 'ml-pipeline',
    title: 'Production ML Pipeline',
    description: 'End-to-end automated ML pipeline with Apache Airflow orchestration, JAX-based model training on AWS SageMaker, and Docker containerization for reproducible deployments.',
    tech: ['Apache Airflow', 'AWS SageMaker', 'JAX', 'Python', 'Docker'],
    github: 'https://github.com/NakshatraK19',
    live: null,
    status: 'active',
    category: 'MLOps',
    color: '#ffaa00',
  },
  {
    id: 'disk-cleaner',
    title: 'Secure Disk Cleaning Software',
    description: 'Advanced disk cleaning software with multi-pass secure data erasure, intelligent file categorization, and forensic-grade recovery prevention. SIH 2026 College Finalist.',
    tech: ['Python', 'System APIs', 'Cryptography', 'File Systems'],
    github: 'https://github.com/NakshatraK19',
    live: null,
    status: 'completed',
    category: 'Systems',
    color: '#7b2fff',
    award: 'SIH 2026 Finalist',
  },
  {
    id: 'rain-wiper',
    title: 'Rain-Sensing Auto Wiper',
    description: 'Arduino UNO based automated wiper system with rain sensor feedback and servo motor control — real-time embedded systems and IoT integration on constrained hardware.',
    tech: ['Arduino UNO', 'C++', 'Servo Motor', 'IoT Sensors'],
    github: 'https://github.com/NakshatraK19',
    live: null,
    status: 'completed',
    category: 'Embedded',
    color: '#00d4ff',
  },
]

export const TICKER_SKILLS = [
  'Claude (Anthropic)', 'Edge Impulse', 'AWS SageMaker', 'NVIDIA NeMo',
  'Qualcomm AI Hub', 'Azure AI', 'TinyML', 'Python', 'LLMs', 'Agentic AI',
  'RAG Pipelines', 'CUDA', 'Hugging Face', 'IoT Systems', 'Prompt Engineering',
]
