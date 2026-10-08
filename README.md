# Dhananjaya Barik — Full Stack Java Developer Portfolio

A premium, modern, recruiter-focused personal portfolio website built with **React**, **TypeScript**, and **Tailwind CSS**.

---

## 🌟 Highlights & Architecture

- **Aesthetic**: Modern, minimal, cinematic dark theme inspired by high-end engineering interfaces (Vercel/Linear), featuring restrained cyan/emerald accents and glassmorphic panels.
- **Hero Section**: Strong visual hierarchy communicating Full Stack Java specialization with quick technology badges (Java, Spring Boot, React, SQL, Docker) and open-to-work recruiter status.
- **Recruiter AI Assistant ("Ask Dhananjaya AI")**:
  - Floating action button in the bottom right corner with real-time prompt suggestions.
  - Powered by a candidate intelligence service (`src/services/aiAssistantService.ts`) tailored to Dhananjaya's verified profile facts.
  - Extensible service architecture with built-in hook to connect **Google Gemini API** (`VITE_GEMINI_API_KEY`).
- **Authentic Engineering Positioning**:
  - Honest fresher positioning emphasizing solid OOP foundations, Spring Boot backend systems, and end-to-end full stack understanding.
  - **"Projects in Progress"**: 3 architectural cards representing active projects with no fabricated URLs or claims. Reusable data structures ready for real repositories.
- **Academic & Specialized Credentials**:
  - B.Tech in CSE (Bhadrak Institute of Engineering & Technology, BPUT Odisha, 2022–2026, CGPA: 7.76/10)
  - Full Stack Java Development (Naresh i Technologies, Hyderabad, 2026)
- **Direct Communication & Contact**:
  - "Send Me a Message" form with full client validation.
  - Direct 1-click email copy & launch to `dhananjayabrk@gmail.com`.
  - Links to LinkedIn, GitHub, and LeetCode profiles.
- **Resume Hub**:
  - Modal viewer displaying verified credentials and technical matrix.
  - Configurable download path linking directly to `public/resume.pdf`.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The site runs locally at `http://127.0.0.1:5173/`.

### 3. Production Build
```bash
npm run build
```
Creates an optimized, production bundle in the `dist/` directory.

---

## 🛠️ Configuration & Customization

### Adding Your Resume PDF
1. Place your compiled PDF in the `public/` folder with the name `resume.pdf`:
   ```text
   public/
   └── resume.pdf
   ```
2. The `View Resume` buttons across the Navbar, Hero, and Resume Modal will automatically serve this file for one-click downloading.

### Connecting Google Gemini to the AI Assistant
1. Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
2. `src/services/aiAssistantService.ts` will automatically detect this key and route inquiries through Gemini 1.5 Flash with candidate system instructions!

### Updating Projects
When your in-progress projects are ready for showcase, edit `src/data/portfolioData.ts`:
- Update `PROJECTS_IN_PROGRESS` with your GitHub repo URLs, live demo URLs, and updated status flags.

---

## 📁 Project Structure

```text
d:/Dhananjaya-Portfolio/
├── public/
│   ├── favicon.svg             # Custom dark geometric DB icon
│   └── resume.pdf              # (Drop your resume PDF here)
├── src/
│   ├── components/
│   │   ├── icons/
│   │   │   └── BrandIcons.tsx  # GitHub, LinkedIn, and LeetCode SVG icons
│   │   ├── AIChatModal.tsx     # Floating "Ask Dhananjaya AI" chat panel
│   │   ├── About.tsx           # Narrative positioning & recruiter snapshot
│   │   ├── Contact.tsx         # Direct communication & validated message form
│   │   ├── Education.tsx       # Timeline layout with credentials
│   │   ├── Footer.tsx          # Clean footer with copyright and back-to-top
│   │   ├── Hero.tsx            # Cinematic hero with title, badges, actions
│   │   ├── Navbar.tsx          # Sticky glassmorphic navbar with mobile drawer
│   │   ├── Projects.tsx        # Projects in progress placeholder architecture
│   │   ├── ResumeModal.tsx     # Resume preview dialog & download controller
│   │   └── Skills.tsx          # Categorized skill grid with search & filter
│   ├── data/
│   │   └── portfolioData.ts    # Centralized portfolio data & constants
│   ├── services/
│   │   └── aiAssistantService.ts # Recruiter AI intelligence & Gemini hook
│   ├── types/
│   │   └── portfolio.ts        # TypeScript data definitions
│   ├── App.tsx
│   ├── index.css               # Tailwind CSS directives & custom styling
│   └── main.tsx
├── tailwind.config.js
└── vite.config.ts
```

---

## 📄 License
© Dhananjaya Barik. All rights reserved.
