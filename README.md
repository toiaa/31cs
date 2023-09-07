# TOKENPROJECT

An incentive coordination system.

## Requirements

To run this project, you'll need:

- Node.js version 18 or higher installed on your computer.
- Yarn package manager installed on your computer.
- Metamask wallet extension installed on your browser. You can download and install it from [metamask.io](https://metamask.io/).
- Create a .env.local with [Alchemy key](https://dashboard.alchemy.com/).

## Tools Used

List of tools, frameworks, libraries, or APIs used in the project. You can also include any development environment or text editor used.

- [ESLint](https://eslint.org/) - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript code.
- [Prettier](https://prettier.io/) - An opinionated code formatter that enforces consistent code styles across your entire codebase.
- [TypeScript](https://www.typescriptlang.org/) - A superset of JavaScript that provides static typing and other language features.
- [Husky](https://typicode.github.io/husky/) - A tool that provides Git hooks for running scripts before committing or pushing code changes.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for quickly building custom designs without writing CSS from scratch.
- [Ethers](https://docs.ethers.io/v5/) - A library for interacting with the Ethereum blockchain and its ecosystem.
- [React-Icons](https://react-icons.github.io/react-icons/) - A library that provides popular icons for React projects, including Font Awesome, Material Design, and others.
- [React-Toastify](https://fkhadra.github.io/react-toastify/introduction/) - A library to use custom notifications on the App
- [Zustand](https://github.com/pmndrs/zustand) - A small, fast and scalable bearbones state-management solution using simplified flux principles.
- [Dynamic](https://www.dynamic.xyz/) - A Login and Analytics Wallet connection flow for auth users.
- [chart.js](https://www.chartjs.org) - JavaScript library for creating interactive charts.
- [lodash](https://lodash.com/) - Utility library for simplifying JavaScript tasks.

## Getting Started

To get started with this project, follow these steps:

1. Install Node.js 16 or higher on your computer. You can download it from [nodejs.org](https://nodejs.org/).
2. Install the project dependencies using either Yarn or npm. To install with Yarn, run `yarn install`. To install with npm, run `npm install`.
3. Start the development server by running `yarn dev` or `npm run dev` in the terminal.
4. Open your browser and navigate to `http://localhost:3000` to view the application.
5. Navigate to the deployed site at [vercel](https://survey-indol.vercel.app/) to view the live application.

## Styles

The project uses the Tailwind inline format, but if you have a repeated style code, you can add it to the `global.css` file.

```css
@layer components {
  /*.... */
  .custom-class {
    @apply flex flex-col text-bold text-[14px];
  }
}
```

## Steps to do a Commit on GitHub with Husky

To commit new changes to the repository, follow the steps below

1. Stage your changes:

```bash
git add .
```

2. Commit your changes with a meaningful commit message:

```bash
git commit -m "message"
```

4. Before the commit is created, the pre-commit Husky hooks will be executed. This will check your TypeScript code with ESLint and Prettier.

5. Push your changes to the remote branch:

```bash
git push origin <your-branch>"
```

6. Before the push, a build will be attempted to make sure that the changes are building successfully.

## Typescript

If you're looking to understand the types used in this project, you'll find them organized into two files located in the ts folder: types and interfaces.

- The Types are definitions used throughout the codebase. These are used to ensure consistency and correctness of data within the application.

- The interfaces file, contains definitions for interfaces used in the react compnents. So they follow a specific structure. Types are used inside the interfaces.

### example

```typescript
export type Token = {
  address: string
  symbol: string
  decimals: number
  name: string
  img: StaticImageData
}

export interface TokenItemInterface {
  token: Token
}

const TokenItem = ({ token }: TokenItemInterface) => {
  //....
}
```

## Dynamic

To utilize Dynamic on the Mumbai network, follow these steps:

1. Create a Dynamic Account and obtain an API KEY from the [Dynamic website](https://app.dynamic.xyz/dashboard/overview).
2. Create a `.env` file in your project and add the acquired API_KEY. Note that Dynamic provides separate development and production API keys. Use the production key when deploying the project.
3. Within the Dynamic dashboard settings, enable the Mumbai network or the specific network you intend to update.

For Dynamic Wallet configuration:

1. Access the [Dynamic dashboard](https://app.dynamic.xyz/dashboard/overview).
2. Customize the wallet settings based on your preferences.
3. Consult the documentation to gain a better understanding of how Dynamic operates.

Access the dashboard [here](https://app.dynamic.xyz/dashboard/overview).
