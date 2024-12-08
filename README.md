# calorie_counter

It is possible to use external APIs to obtain data on the calorie content of products. but now I want to make the application independent of external resources


install tests:
npm install -D vitest @vue/test-utils
npm init playwright@latest

Unit tests (*.spec.ts) are placed next to the components, i think
making it easy to find related code.
E2E tests are stored separately in the tests/e2e folder, which logically separates the testing levels.
Its posible to run all tests or just a specific set:
    npm run test
    npx vitest src/components/CalorieInput/CalorieInput.spec.ts
    npm run test:e2e
    npx playwright test tests/e2e/calorieCounter.spec.ts

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
