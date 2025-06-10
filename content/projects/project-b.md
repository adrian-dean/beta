---
title: Portfolio Site (This One!)
description: My personal portfolio website, built with Next.js, Tailwind CSS, and a focus on animations and modern UI/UX.
technologies: [React, Next.js, Tailwind CSS, Framer Motion, Headless UI, tsparticles, Fuse.js]
date: 2024-06-08
github: https://github.com/yourusername/my-portfolio-site
live: https://yourdomain.com
image: /project-image-2.jpg
---

This site is a showcase of my skills and passion for modern web development.

## Key Features

- **Custom Cursor:** A unique, animated cursor that enhances interaction.
- **Scroll Animations:** Elements elegantly animate into view as you scroll.
- **Dynamic Background:** Interactive particle effects in the background.
- **Site Search:** Powerful client-side search for easy content discovery.
- **Dark Mode:** Seamless light/dark theme toggle.

```typescript
// Example snippet from Portfolio Site's layout
import { motion } from 'framer-motion';
// import CustomCursor from '@/components/CustomCursor'; // In real app
// import ParticlesBackground from '@/components/ParticlesBackground'; // In real app

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* <CustomCursor /> */}
        {/* <ParticlesBackground /> */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
```

## Build Process

This site was built with a strong emphasis on performance and developer experience.

## Learnings

Integrating multiple animation libraries and ensuring smooth performance across devices was a key learning.
