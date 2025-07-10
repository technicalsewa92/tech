import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Technical Sewa - Expert Appliance Repair Services',
    short_name: 'TechnicalSewa',
    description: 'Nepal\'s leading appliance repair service with expert technicians, genuine spare parts, and comprehensive warranty coverage.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e40af',
    icons: [
      {
        src: '/assets/favlogo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/assets/favlogo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    categories: ['business', 'utilities', 'productivity'],
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en',
    dir: 'ltr'
  }
}
