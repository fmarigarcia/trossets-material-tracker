# Internationalization (i18n) Implementation

This project implements internationalization using Next.js App Router's built-in i18n capabilities. The implementation supports English (en) and Spanish (es) languages.

## Architecture Overview

### Middleware-based Locale Detection

- `src/middleware.ts` handles locale detection and routing
- Automatically redirects users to locale-specific URLs (e.g., `/` → `/en/`)
- Uses `Accept-Language` header for automatic locale detection
- Supports manual locale switching

### Locale-based Routing Structure

```
src/app/
├── [locale]/           # Dynamic locale segment
│   ├── layout.tsx      # Locale-aware root layout
│   ├── page.tsx        # Home page with translations
│   ├── dashboard/      # Dashboard pages
│   ├── materials/      # Materials pages
│   ├── auth/          # Authentication pages
│   └── ...            # Other locale-aware pages
├── layout.tsx         # Root layout (redirects to locale)
└── page.tsx          # Root page (redirects to /en)
```

### Translation System

- **Dictionary files**: `src/dictionaries/en.json` and `src/dictionaries/es.json`
- **Dictionary loader**: `src/dictionaries/index.ts` with server-side loading
- **Translation context**: `src/contexts/TranslationContext.tsx` for client components
- **Utility hooks**: `src/hooks/useLocale.ts` for getting current locale

## Supported Languages

- **English (en)**: Default language
- **Spanish (es)**: Secondary language

## Key Features

### 1. Automatic Locale Detection

The middleware automatically detects the user's preferred language using:

1. URL locale segment (highest priority)
2. `Accept-Language` header from browser
3. Default to English if detection fails

### 2. Language Switcher Component

- `src/components/ui/LanguageSwitcher/` provides UI for language switching
- Maintains current route while changing locale
- Shows current language with flag indicators

### 3. SEO-Optimized

- Generates static params for both locales
- Locale-specific metadata (title, description, keywords)
- Proper `lang` attribute on HTML element

### 4. TypeScript Support

- Fully typed translation keys
- Locale type safety
- IntelliSense support for translation strings

## Usage Examples

### Server Components (Recommended)

```tsx
import { getDictionary } from '@/dictionaries';
import type { Locale } from '@/middleware';

export default async function MyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <h1>{dict.common.title}</h1>;
}
```

### Client Components

```tsx
'use client';
import { useTranslations } from '@/contexts/TranslationContext';

export default function MyComponent() {
  const dict = useTranslations();

  return <button>{dict.common.save}</button>;
}
```

### Navigation Links

```tsx
import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';

export default function Navigation() {
  const locale = useLocale();

  return <Link href={`/${locale}/dashboard`}>Dashboard</Link>;
}
```

## File Structure

### Translation Files

- `src/dictionaries/en.json` - English translations
- `src/dictionaries/es.json` - Spanish translations
- `src/dictionaries/index.ts` - Dictionary loader and types

### Components

- `src/components/ui/LanguageSwitcher/` - Language switching component
- `src/contexts/TranslationContext.tsx` - Client-side translation context

### Utilities

- `src/middleware.ts` - Locale detection and routing
- `src/hooks/useLocale.ts` - Hook for getting current locale
- `src/utils/i18n.ts` - i18n utility functions

## Adding New Languages

1. **Create translation file**: Add `src/dictionaries/[locale].json`
2. **Update middleware**: Add locale to `locales` array in `src/middleware.ts`
3. **Update dictionaries**: Add import in `src/dictionaries/index.ts`
4. **Update language switcher**: Add language info in `LanguageSwitcher.tsx`
5. **Update TypeScript**: Add locale to `Locale` type

## Adding New Translation Keys

1. **Add to English**: Update `src/dictionaries/en.json` with new keys
2. **Add to Spanish**: Update `src/dictionaries/es.json` with translations
3. **TypeScript will automatically**: Pick up new keys for type safety

## Best Practices

### For Developers

1. **Always use translations**: Never hardcode user-facing strings
2. **Server components first**: Use server components for translations when possible
3. **Consistent key structure**: Follow the existing nested key structure
4. **Locale in URLs**: Always include locale in navigation links

### Translation Guidelines

1. **Keep keys descriptive**: Use clear, hierarchical key names
2. **Context matters**: Group related translations together
3. **Consistency**: Use consistent terminology across languages
4. **Cultural adaptation**: Consider cultural differences, not just language

## Testing

Test both languages by visiting:

- English: `http://localhost:3000/en`
- Spanish: `http://localhost:3000/es`

The middleware should automatically redirect from `http://localhost:3000/` to the appropriate locale.

## Performance Considerations

- **Server-side translations**: No client-side JavaScript needed for translations
- **Static generation**: Both locales are statically generated at build time
- **Tree shaking**: Only the current locale's translations are loaded
- **Minimal runtime**: Locale detection happens at the edge (middleware)

## Future Considerations

When adding new features, remember to:

1. **Update translation files** with new strings
2. **Use locale-aware routing** for all new pages
3. **Test in both languages** before deployment
4. **Consider cultural differences** beyond just language
5. **Update this documentation** when adding new patterns or components
