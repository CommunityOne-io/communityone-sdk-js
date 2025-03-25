# Testing the CommunityOne SDK

This document provides instructions on how to run tests for the CommunityOne SDK.

## Prerequisites

- Node.js 14 or higher
- npm or yarn

## Running Tests

The project includes unit tests and integration tests. Unit tests use Jest to mock API responses, while integration tests can be run against the actual API (disabled by default).

### Install Dependencies

First, install all necessary dependencies:

```bash
npm install
```

or with yarn:

```bash
yarn install
```

### Running Unit Tests

To run all unit tests:

```bash
npm test
```

or with yarn:

```bash
yarn test
```

To run tests in watch mode (tests will re-run when files change):

```bash
npm run test:watch
```

To generate test coverage reports:

```bash
npm run test:coverage
```

This will create a coverage report in the `coverage` directory.

## Integration Tests

Integration tests are skipped by default as they require real API credentials and make actual API calls. The tests use environment variables for configuration.

### Setting Up Environment Variables

To run integration tests:

1. Install dotenv if not already installed:
   ```bash
   npm install dotenv
   ```

2. Create a `.env` file in the project root with your test credentials:
   ```
   SERVER_ID=your_server_id
   API_KEY=your_api_key
   DISCORD_USER_ID=your_discord_user_id
   CUSTOM_QUEST_ID=your_quest_id
   ```

3. Create a `.env.example` file to document required variables:
   ```
   SERVER_ID=
   API_KEY=
   DISCORD_USER_ID=
   CUSTOM_QUEST_ID=
   ```

5. Run the tests:
   ```bash
   npm test
   ```

## Test Structure

- `tests/sdk.test.ts`: Contains unit tests for all SDK methods, with mocked API responses
- `tests/integration.test.ts`: Contains integration tests that can be run against the actual API
