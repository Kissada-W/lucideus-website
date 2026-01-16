# Nonanyt - Personal Website

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com)

![Home Preview](/assets/home-page-preview.png)

<div align="center">

🌐 <a href="https://nonanyt.com/" target="_blank">**Visit Website**</a> | ♨️ <a href="https://darksite.nonanyt.com/" target="_blank">**Visit Darksite**</a>

</div>

---

## 🚀 Key Features

### 📊 **Dashboard Features**

- **2 Dashboard Variants** - Overview & Analytics dashboards
- **Apps** - Mail, Tasks, Chat, Calendar, Users applications
- **Pages 30+** - Authentication, Settings, Errors, FAQ, Pricing
- **Data Tables** - Advanced tables with sorting, filtering, and pagination
- **Charts & Analytics** - Recharts integration with beautiful visualizations

### 🎨 **Design & Theming**

- **Live Theme Customizer** - Real-time color and layout switching
- **tweakcn Integration** - Professional theme management
- **Multiple Layouts** - Sidebar variants, collapsible navigation
- **Responsive Design** - Mobile-first approach with container queries
- **Dark/Light Mode** - Seamless theme switching

### ⚡ **Developer Experience**

- **Modern Tech Stack** - React 19, TypeScript, Tailwind CSS v4
- **Cross-Platform** - Works with both Vite and Next.js
- **Type Safety** - Full TypeScript support throughout
- **Component Library** - Latest shadcn/ui v3 with Radix UI
- **Easy Customization** - Well-structured, modular codebase

---

## 🏗️ Project Structure

```text
📁 personal-webs
│   ├── 📁 src/
│   │   ├── 📁 app/               # App Router with route groups
│   │   │   ├── 📁 (auth)/        # Authentication route group
│   │   │   │   ├── 📁 login/     # Login pages
│   │   │   │   ├── 📁 signup/    # Registration pages
│   │   │   │   ├── 📁 forgot-password/ # Password recovery
│   │   │   │   └── 📁 errors/    # Error pages (404, 500, etc.)
│   │   │   ├── 📁 (dashboard)/   # Dashboard route group
│   │   │   │   ├── 📁 dashboard/ # Main dashboard
│   │   │   │   ├── 📁 dashboard-2/ # Alternative dashboard
│   │   │   │   ├── 📁 mail/      # Email application
│   │   │   │   ├── 📁 tasks/     # Task management
│   │   │   │   ├── 📁 chat/      # Chat application
│   │   │   │   ├── 📁 calendar/  # Calendar demo
│   │   │   │   ├── 📁 settings/  # User settings
│   │   │   │   ├── 📁 users/     # User management
│   │   │   │   ├── 📁 faqs/      # FAQ pages
│   │   │   │   ├── 📁 pricing/   # Pricing pages
│   │   │   │   └── 📄 layout.tsx # Dashboard layout
│   │   │   ├── 📁 landing/       # Landing page template
│   │   │   ├── 📄 layout.tsx     # Root layout
│   │   │   ├── 📄 loading.tsx    # Global loading component
│   │   │   ├── 📄 not-found.tsx  # 404 page
│   │   │   └── 📄 page.tsx       # Homepage
│   │   ├── 📁 components/        # Same component structure as Vite
│   │   ├── 📁 hooks/             # Custom React hooks
│   │   ├── 📁 lib/               # Utilities & configurations
│   │   └── 📁 types/             # TypeScript type definitions
│   └── 📄 package.json           # Next.js dependencies
│
├── 📄 README.md                  # This file
└── 📄 LICENSE                    # MIT License
```

---

## Quick Start

### Prerequisites

- **Node.js** 24+
- **bun** (recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/Kissada-W/personal-webs
cd personal-webs
```

### 2. Install Dependencies

```bash
bun install
bun run dev
```

**Access at:** `http://localhost:3000`

---

## 🛠️ Development Commands

### Next.js Commands

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run Next.js linter
```

---

## 📦 Tech Stack

### **Core Framework**

- **Next.js 15** - Production-ready with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Full type safety

### **UI & Styling**

- **shadcn/ui v3** - Latest component library
- **Radix UI** - Accessible primitives
- **Tailwind CSS v4** - Utility-first styling
- **tweakcn** - Advanced theme management
- **Lucide React** - Beautiful icons

### **State & Data**

- **Zustand** - Lightweight state management
- **React Hook Form** - Forms with validation
- **Zod** - Schema validation
- **TanStack Table** - Advanced data tables

### **Development**

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

---

## 📋 What's Included

### **🖥️ Dashboard Pages**

- **Dashboard** - Overview with analytics cards and charts
- **Dashboard v2** - Alternative dashboard with different metrics

### **📱 Application Demos**

- **📧 Mail** - Complete email interface (Inbox, Read, Compose)
- **✅ Tasks** - Task management with drag & drop
- **💬 Chat** - Real-time chat interface
- **📅 Calendar** - Event scheduling and management
- **👥 Users** - User management and profiles with advanced tables

### 🔐 Authentication

- **Login** - 3 login page variants with different layouts
- **Sign Up** - 3 registration page variants with different designs
- **Forgot Password** - 3 password recovery page variants

### ⚙️ Settings & Profile

- **User Settings** - Manage your personal information and preferences
- **Account Settings** - Profile management
- **Plans & Billing** - Subscription and payment pages
- **Appearance** - Theme and display preferences
- **Notifications** - Notification preferences
- **Connections** - Social media integrations

### ❌ Error Pages

- **404** - Page not found
- **401** - Unauthorized access
- **403** - Forbidden
- **500** - Internal server error
- **Under Maintenance** - Maintenance mode page

### 🌐 Landing Page

- **Hero Section** - Compelling headlines and CTAs
- **About Section** - Company/product introduction with interactive elements
- **Features Section** - Product/service highlights with icons
- **Stats Section** - Key metrics and achievements display
- **Logo Carousel** - Partner/client logos showcase
- **Team Section** - Team member profiles and information
- **Testimonials Section** - Customer reviews and social proof
- **Blog Section** - Latest blog posts and articles
- **Pricing Section** - Pricing tables and plans
- **FAQ Section** - Frequently asked questions with expandable answers
- **Contact Section** - Contact forms and information
- **CTA Section** - Call-to-action components
- **Navigation & Footer** - Complete navigation and footer components

### **📄 Additional Pages**

- **FAQ** - Frequently asked questions
- **Pricing** - Detailed pricing pages

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Nonanyt"

# Supabase (optional - for backend features)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

> **Note:** Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Keep sensitive keys server-side only.

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy this Next.js app:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Kissada-W/personal-webs)

1. Click the button above or visit [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure environment variables in the Vercel dashboard
4. Deploy!

### Deploy to Other Platforms

#### Docker

```bash
# Build the image
docker build -t personal-webs .

# Run the container
docker run -p 3000:3000 personal-webs
```

#### Self-Hosted

```bash
# Build for production
bun run build

# Start production server
bun run start
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/personal-webs.git
   ```
3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Make your changes**
5. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Code Guidelines

- Use TypeScript with strict mode
- Follow existing code style and patterns
- Write meaningful commit messages
- Update documentation when needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**You are free to:**

- ✅ Use commercially
- ✅ Modify and distribute
- ✅ Include in private projects
- ✅ Sell products built with this template

---

## 📚 Documentation & Acknowledgments

This template is built on the shoulders of amazing open-source projects:

- **[shadcn/ui](https://ui.shadcn.com)** - Beautiful and accessible components
- **[Radix UI](https://www.radix-ui.com)** - Low-level accessible primitives
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Lucide Icons](https://lucide.dev)** - Beautiful & consistent icons
- **[tweakcn](https://tweakcn.com)** - Advanced theme customization
- **[Recharts](https://recharts.org)** - Composable charting library
- **[TanStack Table](https://tanstack.com/table)** - Powerful data tables

---

## 📞 Support & Community

### **Get Help**

- 📖 **Documentation** - [Read the docs](https://github.com/Kissada-W/personal-webs)
- 🐛 **Issues** - [Report bugs](https://github.com/Kissada-W/personal-webs/issues)
- 💬 **Discussions** - [Join conversations](https://github.com/Kissada-W/personal-webs/discussions)

### **Stay Connected**

- 🌐 **Website** - [nonanyt.com](https://nonanyt.com)
- 🐦 **Twitter** - [@Kissada_W](https://twitter.com/Kissada_W)
- 💬 **Discord** - [Join our server](https://discord.gg/)
- 📧 **Email** - [hello@nonanyt.com](mailto:hello@nonanyt.com)
