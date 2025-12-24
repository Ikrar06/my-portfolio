# My Portfolio Website

Personal portfolio website showcasing design projects, creative shots, and experience as a graphic designer.

## Features

- Modern design with clean UI/UX
- Responsive layout for all devices
- Interactive components with smooth animations
- Project showcase and creative shots gallery
- Functional contact form
- Dynamic routing for individual project pages
- MDX content with embedded components
- Image optimization with WebP support
- SEO optimized

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/UI
- **Content:** MDX
- **Icons:** Lucide React + Custom SVG
- **Deployment:** Vercel

## Getting Started

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

## Project Structure

```
my-portfolio/
├── app/                           # Next.js app directory
│   ├── (marketing)/               # Marketing pages group
│   │   ├── about/                 # About page
│   │   ├── contact/               # Contact page
│   │   └── page.tsx              # Home page
│   ├── api/                      # API routes
│   │   └── contact/              # Contact form API
│   ├── design/                   # Design projects pages
│   │   └── [slug]/              # Dynamic design project pages
│   ├── project/                  # Coding projects pages
│   │   └── [slug]/              # Dynamic coding project pages
│   ├── shots/                   # Creative shots gallery
│   ├── maintenance/             # Maintenance page
│   ├── layout.tsx              # Root layout
│   ├── robots.ts               # Robots.txt configuration
│   └── sitemap.ts              # Sitemap configuration
├── components/                  # Reusable components
│   ├── animated/               # Animation components
│   │   └── reactbits/         # Custom animated components
│   ├── cards/                 # Card components
│   ├── design/                # Design-related components
│   ├── filters/               # Filter components
│   ├── galleries/             # Gallery components
│   ├── layout/                # Layout components
│   ├── motion/                # Motion/transition components
│   ├── project/               # Project-related components
│   ├── skills/                # Skills-related components
│   └── ui/                    # Shadcn UI components
├── content/                    # MDX content files
│   ├── design-projects/       # Design project descriptions
│   ├── coding-projects/       # Coding project descriptions
│   └── shots/                 # Creative shots descriptions
├── data/                      # Static data files
│   └── skills.json           # Skills data
├── lib/                       # Utility functions
│   ├── mdx.ts                # MDX processing
│   ├── projects.ts           # Project data handling
│   ├── projects-helpers.ts   # Project helper functions
│   ├── shots.ts              # Shots data handling
│   └── utils.ts              # General utilities
├── public/                    # Static assets
│   ├── cv/                   # CV/Resume files
│   ├── icons/                # SVG icons
│   └── images/               # Project and shot images
├── styles/                    # Global styles
│   └── globals.css           # Main stylesheet
├── middleware.ts             # Next.js middleware
└── tailwind.config.ts        # Tailwind CSS configuration
```

## Key Components

- **Hero Section** - Animated introduction with custom text animations
- **Project Cards** - Interactive design project showcases with filtering
- **Shot Gallery** - Masonry layout for creative design pieces
- **Contact Form** - Functional contact form with API integration
- **Animated Components** - Custom animations (ShinyText, SplitText, LightRays)
- **Project Filters** - Category-based project filtering system
- **CV Download** - Direct resume download functionality

## Contact

- **Email:** ikrargempurtrn@gmail.com
- **LinkedIn:** [linkedin.com/in/ikrar-gempur-tirani-867537283](https://www.linkedin.com/in/ikrar-gempur-tirani-867537283/)
- **GitHub:** [github.com/Ikrar06](https://github.com/Ikrar06)

## License

Copyright © 2025 Ikrar Gempur Tirani. All Rights Reserved.