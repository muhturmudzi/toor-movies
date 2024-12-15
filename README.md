# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Prerequisites

- **Node.js version**: Make sure you have Node.js **20.x.x** installed. You can download it from the [official Node.js website](https://nodejs.org/).
- **Environment file**: Ensure you have a `.env` file in the root of your project directory. The `.env` file must contain the following attributes:
  - `NUXT_API_BASE`: The base URL for your API.
  - `NUXT_ACCESS_TOKEN`: Your API key for authentication.
  - `NUXT_IMG_URL`: The base URL for nuxt-img.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

