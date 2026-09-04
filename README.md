# 🎓 AI-Powered Student Academic & Career Advisor

[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Fastify](https://img.shields.io/badge/Backend-Fastify%20v4-000000?style=for-the-badge&logo=fastify)](https://www.fastify.io/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

An intelligent, full-stack, AI-driven academic and career advisory platform designed to help students optimize study schedules, boost placement readiness, analyze resumes, practice mock interviews, and systematically eliminate academic weak spots.

---

## ✨ Features

- 🎯 **Personalized Onboarding**: Tailored setup capturing degree, branch, current semester, target GPA, dream career roles, and specific subject weaknesses.
- 🤖 **AI Academic & Career Advisor**: Interactive AI companion offering custom strategic roadmaps, study strategies, and exam preparation guidance.
- 📅 **Adaptive Daily Planner & Schedule Engine**: Smart timeline matrix balancing upcoming exam dates, course revisions, project goals, and daily energy levels.
- 📄 **AI Resume Analyzer & ATS Optimizer**: Evaluates resume-to-role match score, detects missing technical keywords, and suggests quantified bullet point improvements.
- 🎙️ **AI Mock Interviewer**: Interactive technical and behavioral interview practice with real-time scoring, STAR framework feedback, and follow-up probing questions.
- 📊 **Career & Placement Readiness Matrix**: Real-time scoring of industry readiness, skill gap identification, and recommended capstone projects.
- 📚 **Academics & Subject Weakness Tracker**: Granular breakdown of difficult course topics, study priorities, and targeted revision goals.
- 💡 **Skill Matrix & Gap Visualizer**: Interactive chart comparing current student competencies against target job profile requirements.
- 👥 **Peer Crowd Insights**: Community benchmarks, popular learning resources, and trending career tracks.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 14 (App Router)
- **UI & Styling**: Tailwind CSS, Lucide Icons, GSAP Animation Library
- **State & Data Fetching**: TanStack Query (React Query v5), React Hook Form, Zod
- **Data Visualization**: Recharts

### **Backend**
- **Framework**: Fastify (Node.js & TypeScript)
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Zod schema validation
- **AI Integrations**: Multi-provider AI service architecture supporting Google Gemini API, OpenAI API, Open Code Gen, and a zero-cost intelligent deterministic fallback engine.

---

## 📁 Repository Architecture

```
AI-powered-student-academic-advisor/
├── frontend/                 # Next.js 14 App Router Frontend
│   ├── src/
│   │   ├── app/              # Application Pages & Routes
│   │   │   ├── academics/    # Subject & Weakness Management
│   │   │   ├── advisor/      # AI Chatbot Advisor Interface
│   │   │   ├── career/       # Placement Readiness Dashboard
│   │   │   ├── crowd/        # Peer Benchmarking & Community Insights
│   │   │   ├── dashboard/    # Main Overview Dashboard & Daily Advice
│   │   │   ├── goals/        # SMART Goal Tracking & Milestones
│   │   │   ├── interview/    # AI Mock Interview Interface
│   │   │   ├── onboarding/   # Multi-step Student Profile Setup
│   │   │   ├── planner/      # Adaptive Study Schedule Engine
│   │   │   ├── resume/       # AI Resume ATS Analyzer
│   │   │   └── skills/       # Skill Matrix & Gap Analysis
│   │   └── components/       # Reusable UI Components & Widgets
│   ├── package.json
│   └── tailwind.config.ts
│
├── backend/                  # Fastify TypeScript REST API
│   ├── src/
│   │   ├── index.ts          # Server Entry Point & Plugin Registrations
│   │   ├── lib/
│   │   │   ├── db/           # MongoDB Connection Setup
│   │   │   └── services/     # AI Provider, Adaptive Planner & Priority Engines
│   │   └── routes/           # Fastify API Route Handlers
│   │       ├── ai/           # AI Advisor, Resume & Mock Interview Routes
│   │       ├── onboarding/   # Onboarding Profile API
│   │       └── profile/      # Student Profile & Progress API
│   ├── .env.example          # Environment Variables Template
│   └── package.json
│
├── package.json              # Monorepo Workspace Configuration
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **MongoDB** *(Optional)*: Local instance or MongoDB Atlas URI (if omitted, backend operates with database fallback mode).

---

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/AI-powered-student-academic-advisor.git
   cd AI-powered-student-academic-advisor
   ```

2. **Install Workspace Dependencies**
   ```bash
   npm run install:all
   ```

---

### Environment Setup

1. **Configure Backend Environment**
   Create a `.env` file inside the `backend` directory:
   ```bash
   cp backend/.env.example backend/.env
   ```
   Edit `backend/.env` with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ai_student_advisor
   
   # Optional AI Provider Keys (If omitted, system uses zero-cost AI fallback engine)
   GEMINI_API_KEY=your_google_gemini_api_key
   OPENAI_API_KEY=your_openai_api_key
   ```

2. **Configure Frontend Environment** *(Optional)*
   Create a `.env.local` file inside the `frontend` directory if custom backend URLs are needed:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
   ```

---

### Running the Application

Start both the **Frontend** and **Backend** concurrently from the root directory:

```bash
npm run dev
```

- 🌐 **Frontend Application**: [http://localhost:3000](http://localhost:3000)
- ⚙️ **Backend API**: [http://localhost:5000](http://localhost:5000)
- ❤️ **API Health Check**: [http://localhost:5000/health](http://localhost:5000/health)

#### Run Services Individually

- **Frontend Only**:
  ```bash
  npm run dev:frontend
  ```
- **Backend Only**:
  ```bash
  npm run dev:backend
  ```

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | API Health Status Check |
| `POST` | `/api/onboarding` | Submit student onboarding profile data |
| `GET` | `/api/profile` | Retrieve student profile and academic metrics |
| `POST` | `/api/ai/advisor/chat` | Send prompt to AI Academic Advisor |
| `POST` | `/api/ai/advisor/goal-analysis` | Generate AI strategic plan for academic goals |
| `POST` | `/api/ai/resume/analyze` | Analyze resume text against target role |
| `POST` | `/api/ai/mock-interview/evaluate` | Evaluate student interview response |

---

## 📜 Monorepo Scripts

| Script | Purpose |
| :--- | :--- |
| `npm run dev` | Runs both frontend and backend dev servers concurrently |
| `npm run dev:frontend` | Starts only the Next.js frontend dev server |
| `npm run dev:backend` | Starts only the Fastify backend dev server with `ts-node-dev` |
| `npm run build` | Builds both frontend and backend projects for production |
| `npm run install:all` | Installs all root and workspace dependencies |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
