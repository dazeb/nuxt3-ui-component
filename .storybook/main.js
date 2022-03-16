module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../packages/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/vue3",
  "core": {
    "builder": "storybook-builder-vite"
  },
  async viteFinal(config, {configType}) {
    config.resolve.dedupe = ["@storybook/client-api"]
    // config.optimizeDeps.include = [...config.optimizeDeps.include, 'hoist-non-react-statics', 'fast-deep-equal', 'lodash']
    return config
},
}