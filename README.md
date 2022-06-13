## Plebshop ⚡️

Simple point of sale solution powered by your [Strike](https://strike.me) account. Build your own in-person checkout to accept Lightning payments in a couple minutes and get paid directly to your Strike balance. Try it out on https://plebshop.me.

1. Enter your Strike username
2. Pick a name for your store
3. Add some products to your inventory
4. Check out your customers via Lightning 
5. Profit!

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Getting Started

Installation:

```bash
yarn
```

Running development server:

```bash
yarn dev
```

Open [http://localhost:3002](http://localhost:3002) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3002/api/hello](http://localhost:3002/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


## Environment Variables

For local development, create a file called .env.local and add your Strike API key there. Take a look at the env.local.example to see required as well as optional env vars.

- `STRIKE_API_KEY` - Strike commerce API key
- `STRIKE_API_URL` - Strike API URL. Currently `https://api.strike.me/v1/`
- `BUGSNAG_BROWSER_API_KEY` - [Bugsnag](https://www.bugsnag.com/) optional bugsnag key for logging browser exceptions
- `BUGSNAG_SERVER_API_KEY` - [Bugsnag](https://www.bugsnag.com/) optional key for logging server exceptions
- `GA_MEASUREMENT_ID` - Optional Google analytics ID


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Duplicate on Figma

The mockups for this project are also open source! Feel free to duplicate them on Figma to give them a spin, or add comments for any suggestions that you might have.

- [Plebshop Designs](https://www.figma.com/file/05SDCQPoM7liZatRQYx7VE/Plebshop-Designs)
- [Plebshop Flowcharts](https://www.figma.com/file/uCTCdXxt8Z1LnJNBkLfrf9/Plebshop-Flows)
