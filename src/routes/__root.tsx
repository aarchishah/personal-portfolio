import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Pujan Shah | Marketing & Advertising Portfolio' },
      { name: 'description', content: 'Creative marketer with 1 year of experience in social media, content strategy, brand management, and campaign execution. BAMMC graduate, Mumbai University.' },
      { name: 'theme-color', content: '#0a0a0a' },
      { name: 'robots', content: 'index, follow' },
      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Pujan Shah | Marketing & Advertising Portfolio' },
      { property: 'og:description', content: 'Creative marketer with 1 year of experience in social media, content strategy, brand management, and campaign execution.' },
      { property: 'og:image', content: '/pujan-profile.webp' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Pujan Shah | Marketing & Advertising Portfolio' },
      { name: 'twitter:description', content: 'Creative marketer with experience in social media, brand management, and campaign execution.' },
    ],
    links: [
      // DNS prefetch
      { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      // Preconnect
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      // Preload font stylesheet
      {
        rel: 'preload',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Playfair+Display:wght@700&display=swap',
        as: 'style',
      },
      // Load font stylesheet — only 3 Inter weights + 1 Playfair weight
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Playfair+Display:wght@700&display=swap',
      },
      // Favicon
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
