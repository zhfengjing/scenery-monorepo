/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  typescript: {
    check: false,
    reactDocgen: false,
  },
  webpackFinal: async (config) => {
    // Remove any existing TypeScript rules
    config.module.rules = config.module.rules.filter((rule) => {
      if (!rule.test) return true;
      const testString = rule.test.toString();
      return !testString.includes('tsx') && !testString.includes('.ts');
    });

    // Add babel-loader for TypeScript
    config.module.rules.unshift({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              require.resolve('@babel/preset-env'),
              [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
              require.resolve('@babel/preset-typescript'),
            ],
          },
        },
      ],
    });

    return config;
  },
};

module.exports = config;
