# Verida Vue Component Library (Monorepo)

- This project leverages the following frameworks and libraries

- Storybook : This helps to test and visualize component in isolation

- Lerna : Manages different component and publish them independently

- Vue-SFC-Rollup: This creates a Vue project setup that help develop each components and also creates amm optimized build for npm publish.

## Development mode

View and interact with components using storybook

run the following commands

```
  yarn
```

- Cd into each components and run `yarn` to install all dependencies used

```
  yarn storybook
```

## Create a new component folder

Using the `vue-sfc-rollup` run these command

```
 yarn create-sfc
```

> NB: enter npm package name using this prefix e.g `@verida/vue-my-component`

in the cmd options select the project directory ti be `./component/name-of-the-component`
