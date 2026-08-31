# Contributing to CareScope Analytics

Thank you for your interest in contributing to CareScope Analytics SaaS!

## Development Guidelines

1. **Code Standards**:
   - Ensure all code is modular and placed in the appropriate directory (`components/`, `hooks/`, `services/`, `constants/`).
   - All JSX files must adhere strictly to ESLint rules (`npm run lint` must exit with 0 errors/warnings).
   - Component files should strictly export components to maintain Vite Fast Refresh support. Move Context instances and hooks to dedicated files.

2. **Styling & Design System**:
   - Utilize Tailwind CSS utility classes and the predefined clinical palette (`#0F7C6C`, `#0B2545`, `#B8752F`, `#B33A3A`).
   - Use the `PulseRule` component for section dividers.
   - Maintain dark mode compatibility using `dark:` variants.

3. **Accessibility**:
   - Always provide accessible labels (`aria-label`, `<label htmlFor="...">`).
   - Ensure interactive elements support keyboard navigation (`focus-visible`).

4. **Pull Request Checklist**:
   - [ ] `npm run lint` passes with 0 errors and 0 warnings.
   - [ ] `npm run build` succeeds without bundle size warnings.
   - [ ] All features are tested across desktop and mobile breakpoints.
