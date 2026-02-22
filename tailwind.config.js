/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-600': '#2563eb',
        'blue-700': '#1d4ed8',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-left': 'fadeInLeft 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },

      // ✅ SOLO AÑADIMOS ESTO (no afecta lo demás)
      typography: (theme) => ({
        clean: {
          css: {
            '--tw-prose-body': theme('colors.zinc.700'),
            '--tw-prose-headings': theme('colors.zinc.900'),
            '--tw-prose-links': '#3AAA35',
            '--tw-prose-bold': theme('colors.zinc.900'),
            '--tw-prose-quotes': theme('colors.zinc.900'),
            '--tw-prose-quote-borders': '#3AAA35',
            '--tw-prose-bullets': theme('colors.zinc.400'),
            '--tw-prose-hr': theme('colors.zinc.200'),

            a: { textDecoration: 'none', fontWeight: '600' },
            'a:hover': { textDecoration: 'underline', textUnderlineOffset: '3px' },

            blockquote: {
              fontStyle: 'normal',
              borderLeftWidth: '4px',
              borderLeftColor: '#3AAA35',
              backgroundColor: theme('colors.zinc.50'),
              padding: '0.9rem 1rem',
              borderRadius: '0.75rem',
            },

            code: {
              backgroundColor: theme('colors.zinc.100'),
              padding: '0.15rem 0.35rem',
              borderRadius: '0.4rem',
              fontWeight: '600',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },

            pre: {
              backgroundColor: theme('colors.zinc.900'),
              borderRadius: '1rem',
              padding: '1.1rem 1.2rem',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}