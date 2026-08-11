# 🧘 YogaHub - Modern Yoga & Mindfulness Studio

**YogaHub** is a modern, responsive web application designed for a contemporary yoga studio. Built with Next.js 16, React 19, TypeScript, and Framer Motion, it features an interactive **Astra AI Wellness Mentor** powered by Google Gemini, seamless Firebase Authentication, class scheduling, interactive UI elements, and full dark/light theme customization.

---

## ✨ Features

- 🤖 **Astra AI Mentor**: Intelligent AI wellness assistant providing custom pose suggestions, mindfulness tips, and yoga guidance.
- 🧘 **Class & Schedule Management**: Browse class offerings, view weekly schedules, filter by experience level, and book sessions.
- 👥 **Instructor Profiles & Gallery**: Detailed instructor bios, experience highlights, and dynamic visual gallery.
- 🔐 **Authentication & User Profiles**: Firebase-backed authentication supporting Google Sign-In and email login with personalized user dashboards.
- 🎨 **Immersive UI & Animations**: Smooth page transitions and interactive elements powered by Framer Motion, dynamic cursor glow, and floating leaf ambient effects.
- 🌓 **Dark & Light Mode**: Seamless theme toggling integrated via `next-themes`.
- 🐳 **Docker & Nginx Ready**: Pre-configured Dockerfile, Docker Compose, and Nginx reverse proxy configuration for seamless containerized production deployments.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://framer.com/motion)
- **AI Integration**: [@google/genai](https://www.npmjs.com/package/@google/genai) (Google Gemini API)
- **Auth & Database**: [Firebase Authentication](https://firebase.google.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Containerization**: Docker, Docker Compose, Nginx

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.x` or later
- **npm** (or `yarn` / `pnpm` / `bun`)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Yoga_studio.git
cd Yoga_studio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory and configure your Firebase and Gemini API keys:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google Gemini AI Key
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🐳 Running with Docker

You can run the application in production mode using Docker & Nginx:

```bash
# Build and start containers with Docker Compose
docker-compose up -d --build
```

Access the app on [http://localhost:80](http://localhost:80).

---

## 📁 Project Structure

```text
Yoga_studio/
├── app/                  # Next.js App Router pages and API routes
│   ├── about/            # About page
│   ├── classes/          # Class listing and details
│   ├── gallery/          # Studio gallery page
│   ├── instructors/      # Instructor bios
│   ├── profile/          # User profile management
│   ├── schedule/         # Class schedule & filter
│   └── page.tsx          # Homepage
├── components/           # Reusable React components
│   ├── ui/               # Core UI components (AstraMentor, ChatBot, ThemeToggle, etc.)
│   ├── sections/         # Homepage sections (Hero, FeaturedClasses, Testimonials)
│   └── AuthModal.tsx     # Authentication modal component
├── context/              # React context providers (AuthContext)
├── lib/                  # Utility functions & Firebase configuration
├── public/               # Static assets & icons
├── Dockerfile            # Container configuration
└── docker-compose.yml    # Docker services orchestrator
```

---

## 📜 Available Scripts

- `npm run dev` - Runs the application in development mode.
- `npm run build` - Builds the application for production.
- `npm run start` - Starts the production server.
- `npm run lint` - Runs ESLint to check for code quality issues.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

