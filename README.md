## ✨ Special Features

- **Dynamic Routing** - Individual pages for each project (`/projects/[slug]`)
- **MDX Content** - Rich content with embedded components
- **Custom Animations** - Hand-crafted micro-interactions
- **Image Optimization** - Next.js Image component with WebP support
- **API Integration** - Contact form with backend processing
- **Responsive Design** - Mobile-first approach
- **SEO Optimized** - Meta tags, sitemap, and robots.txt# My Portfolio Website

Personal portfolio website showcasing my design projects, creative shots, and experience as a graphic designer.

## 🌟 Features

- **Modern Design** - Clean and professional UI/UX
- **Responsive Layout** - Optimized for all devices (mobile, tablet, desktop)
- **Interactive Components** - Smooth animations and transitions
- **Project Showcase** - Detailed presentation of design work
- **Creative Shots** - Gallery of creative design pieces
- **Contact Form** - Functional contact form for client inquiries
- **Fast Performance** - Optimized for speed and SEO

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/UI
- **Content:** MDX for project descriptions
- **Icons:** Custom SVG icons + Lucide React
- **Deployment:** Vercel

## 📱 Sections

- **Hero/Landing** - Introduction and portfolio overview
- **About** - Background, design philosophy, and experience
- **Projects** - Portfolio of design projects and client work
- **Shots** - Creative design pieces and experimental work
- **Contact** - Contact form and social links

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Ikrar06/my-portfolio.git
cd my-portfolio
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

### Build for Production
```bash
npm run build
npm start
```

## 📂 Project Structure

```
my-portfolio/
├── .env.example                    # Environment variables template
├── app/                           # Next.js app directory
│   ├── (marketing)/               # Marketing pages group
│   │   ├── about/                 # About page
│   │   ├── contact/               # Contact page
│   │   └── page.tsx              # Home page
│   ├── api/                      # API routes
│   │   └── contact/              # Contact form API
│   ├── projects/                 # Projects pages
│   │   └── [slug]/              # Dynamic project pages
│   ├── shots/                   # Creative shots gallery
│   └── layout.tsx               # Root layout
├── components/                   # Reusable components
│   ├── animated/                # Animation components
│   │   └── reactbits/          # Custom animated components
│   ├── cards/                  # Card components
│   ├── filters/                # Filter components
│   ├── galleries/              # Gallery components
│   ├── motion/                 # Motion/transition components
│   ├── skills/                 # Skills-related components
│   └── ui/                     # Shadcn UI components
├── content/                     # MDX content files
│   ├── projects/               # Project descriptions
│   └── shots/                  # Creative shots descriptions
├── data/                       # Static data files
│   └── skills.json            # Skills data
├── lib/                        # Utility functions
│   ├── mdx.ts                 # MDX processing
│   ├── projects.ts            # Project data handling
│   └── shots.ts               # Shots data handling
├── public/                     # Static assets
│   ├── cv/                    # CV/Resume files
│   ├── icons/                 # SVG icons
│   └── images/                # Project and shot images
│       ├── coder-institute/   # Project images
│       ├── gdgoc/            # Project images
│       └── shots/            # Creative shots images
└── styles/                    # Global styles
    └── globals.css           # Main stylesheet
```

## 🎨 Key Components

- **Hero Section** - Animated introduction with custom text animations
- **Project Cards** - Interactive design project showcases with filtering
- **Shot Gallery** - Masonry layout for creative design pieces
- **Contact Form** - Functional contact form with API integration
- **Animated Components** - Custom animations (ShinyText, SplitText, LightRays)
- **Project Filters** - Category-based project filtering system
- **CV Download** - Direct resume download functionality

## 📧 Contact

Feel free to reach out for design collaborations or project inquiries!

- **Email:** your.email@example.com
- **LinkedIn:** [Your LinkedIn](https://linkedin.com/in/yourprofile)
- **GitHub:** [Your GitHub](https://github.com/Ikrar06)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ **Star this repository** if you found it helpful!