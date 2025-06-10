---
title: Advanced Tailwind CSS Tips
description: Go beyond the basics with these advanced techniques for using Tailwind CSS effectively.
technologies: [Tailwind CSS, CSS]
date: 2024-01-10
---

Tailwind CSS is powerful. Here are some tips to get the most out of it.

## Customizing Your Theme

Extend Tailwind's default theme in `tailwind.config.ts`.

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        'custom-blue': '#243c5a',
        'my-red': '#E02424',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
      }
    },
  },
}
```

## Using `@apply`

While generally avoided for new components, `@apply` can be useful for extracting common component classes or for legacy migrations.

```css
/* In your global.css or a component-specific CSS file */
.btn-primary {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
}
```

Apply it in your JSX:

```html
<button className="btn-primary">Click me</button>
