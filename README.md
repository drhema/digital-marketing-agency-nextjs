Here's a comprehensive overview of the project for a full-stack developer:

# Digital Marketing Agency Website

## Project Overview
Modern, bilingual (Arabic/English) digital marketing agency website built with Next.js 15.1.6, featuring:
- Fully responsive design
- RTL/LTR language support
- Dark/Light mode
- Type-safe translations
- Modern UI with animations

## Technical Stack

### Frontend
- **Framework**: Next.js 15.1.6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Themes**: next-themes for dark/light mode
- **Language Support**: Built-in Next.js i18n

### Project Structure
```
src/
├── app/
│   └── [locale]/              # Dynamic language routing
│       ├── layout.tsx         # Base layout with RTL/LTR support
│       └── page.tsx           # Homepage
├── components/
│   ├── ModernAgencyUI.tsx     # Main UI component
│   ├── Hero.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── sections/
│   │   ├── ServicesSection.tsx
│   │   └── CTASection.tsx
│   └── ui/                    # Reusable UI components
├── translations/
│   ├── types/                 # TypeScript interfaces for translations
│   ├── locales/
│   │   ├── en/               # English translations
│   │   │   ├── common.json
│   │   │   └── home.json
│   │   └── ar/               # Arabic translations
│   │       ├── common.json
│   │       └── home.json
│   └── utils/
│       └── translate.ts       # Translation helper functions
└── types/
    └── index.ts              # Shared TypeScript types
```

## Key Features

### 1. Language Support
- Dynamic language routing using `[locale]` parameter
- RTL/LTR layout switching
- Type-safe translations
- Translation fallbacks
- Dynamic content loading

### 2. Core Components

**ModernAgencyUI.tsx**
- Main container component
- Handles layout direction (RTL/LTR)
- Manages services data
- Implements background animations

**Hero.tsx**
- Dynamic translations
- Gradient text effects
- Responsive design
- Animated CTA button

**ServicesSection.tsx**
- Grid layout for services
- Dynamic service cards
- Translation integration
- Hover effects

### 3. Translation System
- Separate files for each language
- Structured JSON format
- Type-safe implementations
- Default fallbacks
- Async loading

## Implementation Details

### Language Switching
```typescript
// src/app/[locale]/layout.tsx
export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const isRTL = locale === 'ar'
  
  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body>
        {children}
      </body>
    </html>
  )
}
```

### Translation Loading
```typescript
// src/translations/utils/translate.ts
export const loadTranslations = async (locale: LocaleType) => {
  const common = await import(`../locales/${locale}/common.json`)
  const home = await import(`../locales/${locale}/home.json`)
  
  return {
    common,
    home,
  } as Translations
}
```

### Component Translation Integration
```typescript
const [translations, setTranslations] = useState(defaultTranslations)

useEffect(() => {
  const loadTranslations = async () => {
    try {
      const locale = params.locale as string
      const translationModule = await import(`@/translations/locales/${locale}/home.json`)
      if (translationModule.default) {
        setTranslations(translationModule.default)
      }
    } catch (error) {
      console.error('Error loading translations:', error)
      setTranslations(defaultTranslations)
    }
  }

  loadTranslations()
}, [params.locale])
```

## Deployment

### Development
```bash
npm install
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Environment Variables
- `NEXT_PUBLIC_API_URL`: API endpoint URL
- `NEXT_PUBLIC_SITE_URL`: Site URL

## Future Improvements

1. Translation Enhancements
- Add more languages
- Implement translation caching
- Add translation loading states

2. Performance Optimizations
- Implement translation preloading
- Add service worker for offline support
- Optimize image loading

3. Features
- Add blog section
- Implement contact form
- Add case studies section
- Integrate analytics

4. Development Infrastructure
- Add unit tests
- Implement E2E testing
- Add CI/CD pipeline
- Improve documentation

Would you like me to:
1. Provide more detailed implementation examples?
2. Explain specific component logic?
3. Show how to add new features?
4. Provide testing strategies?

```bash
# 
rm -rf node_modules package-lock.json .next
npm cache clean --force
npm install
npm run build
npm run dev


rm -rf .next
rm -rf .contentlayer
npm run build
npm run start
```
rm -rf .next
npm run dev
