# IMDb Test task

**Candidate name**: [Yaroslav Kostenko](https://www.linkedin.com/in/yaroslav-kostenko-45562515a/)

This repository contains an end-to-end (E2E) testing framework built using Playwright. It is designed to automate testing for the [IMDb](https://imdb.com/).

## Repository Structure

```text
cPanelStore/
├── environment/        # Environment files to work locally and on CI
├── resources/          # Screenshots used in tests
├── src/                # Source files for page objects and utilities
├── tests/              # Test cases for various features
├── .prettierrc         # Prettier configuration file
├── .nvmrc              # Node version configuration file
├── eslint.config.mjs    # Config file for linter
├── package.json        # Node.js dependencies and scripts
├── README.md           # Project documentation
```

## Used Technologies

- **[Playwright](https://playwright.dev/)**
- **[Allure Reporter](https://docs.qameta.io/allure/)**
- **[Node.js v20](https://nodejs.org/en)**
- **TypeScript**
- **ESLint**
- **Prettier**

## Commands

Here are some useful commands to work with this project:

### Install Dependencies

```bash
npm run start
```

### Run Tests in debug mode

```bash
npm run pw:run:local-open-debug
```

### Allure Report

Read the [documentation](https://allurereport.org/docs/install/) to setup Allure locally.

Generate report:

```bash
npm run allure:generate
```

Open report:

```bash
npm run allure:open
```
