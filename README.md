<div align="center">

# ⚡ Studio Aether

**Crafting digital artifacts at the intersection of algorithmic precision and organic chaos.**

*A multidisciplinary Design Engineer portfolio built with React, TypeScript, and generative art.*

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat&logo=vite)](https://vitejs.dev/)

</div>

---

## 🎯 About

**Studio Aether** is a portfolio website for a multidisciplinary Design Engineer based in San Francisco. This site represents a unique fusion of technical architecture and avant-garde art direction, showcasing digital products that feel significant.

### Design Philosophy

- **The Anti-Smooth**: We reject the polished lie of modern interface design. We believe in the raw honesty of the pixel, the glitch, and the dither. Technology should feel like technology—sharp, precise, and occasionally chaotic.

- **Systemic Beauty**: Our process is a dialogue between human intent and algorithmic serendipity. We don't just build products; we cultivate digital ecosystems that breathe, react, and evolve.

- **Code is the Medium**: Every pixel serves a purpose. No rounded corners, no soft shadows. Only clarity, chaos, and function.

---

## ✨ Features

### 🎨 **Interactive Dither Canvas**
- Real-time generative dither patterns using Canvas API
- Reactive visual effects that respond to user interaction
- Custom WebGL shaders for texture and depth

### 🤖 **AI-Powered Chat**
- Integrated Gemini AI chat interface
- Contextual conversations about projects and work
- Seamless user experience with floating chat widget

### 📦 **Project Showcase**
- Beautiful bento-grid layout for selected works
- Detailed project overlays with rich media
- Smooth transitions and micro-interactions

### 🛠️ **Development Toolkit Section**
- Comprehensive tech stack showcase
- Categorized by Engineering Core, Creative Engineering, and Design & Prototyping
- Interactive hover states and animations

### 📋 **Process Documentation**
- Four-step workflow visualization
- Discover & Define → Architect & Wire → Prototype & Code → Refine & Deploy
- Visual representation of systematic creativity

### 📖 **Manifest & About**
- Design philosophy manifesto overlay
- Detailed about section with capabilities breakdown
- Contact and collaboration information

---

## 🛠️ Tech Stack

### Core Technologies
- **React 19.2.0** - UI library
- **TypeScript 5.8.2** - Type safety
- **Vite 6.2.0** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling

### Key Libraries
- **@google/genai** - Gemini AI integration
- **lucide-react** - Icon system
- **Canvas API** - Dither pattern generation

### Design System
- Custom color palette (sand, ink, stone)
- Monospace typography (Space Grotesk)
- Sans-serif (Inter)
- Custom scrollbar styling
- Grain and dither texture overlays

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **Gemini API Key** (for AI chat functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd studio-aether
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 📁 Project Structure

```
studio-aether/
├── components/
│   ├── AboutOverlay.tsx          # About section modal
│   ├── AIChat.tsx                 # AI chat widget
│   ├── BentoGrid.tsx              # Project showcase grid
│   ├── ContactOverlay.tsx         # Contact modal
│   ├── CraftsmanOverlay.tsx      # Bio/craftsman section
│   ├── DitherCanvas.tsx          # Interactive dither canvas
│   ├── ManifestOverlay.tsx       # Design philosophy manifest
│   ├── ProcessSection.tsx        # Workflow visualization
│   ├── ProjectDetailOverlay.tsx  # Project detail modal
│   └── ToolkitSection.tsx        # Tech stack showcase
├── services/
│   └── geminiService.ts          # Gemini AI service
├── App.tsx                        # Main application component
├── index.tsx                      # Entry point
├── index.html                     # HTML template
├── types.ts                       # TypeScript type definitions
└── vite.config.ts                # Vite configuration
```

---

## 🎨 Key Components

### DitherCanvas
Generates real-time dither patterns using Canvas API. Creates the signature visual texture that defines the site's aesthetic.

### BentoGrid
Displays projects in a responsive grid layout with hover effects and smooth transitions. Supports project selection and detail views.

### AIChat
Floating chat interface powered by Google's Gemini AI. Provides contextual information about the portfolio and projects.

### ProcessSection
Visualizes the four-step design and development workflow with interactive cards and hover states.

---

## 🌐 View Online

**AI Studio**: [View in AI Studio](https://ai.studio/apps/drive/1jmCnFbiuDtXsG3fReUGnbv-HX8FZ3zYr)

---

## 📧 Contact

**Email**: hello@studioaether.dev

**Location**: San Francisco, CA

**Status**: Available for hire

Open for collaborations on experimental web, AI interfaces, and product design systems.

---

## 📄 License

© 2025 Studio Aether. All rights reserved.

---

<div align="center">

**Built with precision, chaos, and function.**

*Code is the medium.*

</div>
