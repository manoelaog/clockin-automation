import { defineConfig } from 'cypress';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';

export default defineConfig({
  env: {
    email: 'manoela.gonzaga@totvs.com.br',
    emailFake: 'login.teste@totvs.com.br',
    password: '@19July#Totvs',
  },
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/report/xml/results_[hash].xml',
    attachments: true,
    testsuitesTitle: 'Cypress report',
    rootSuiteTitle: 'Clock-In Backoffice',
  },
  e2e: {
    baseUrl: 'https://totvsclockin.carol.ai/totvsrm/apps/dev/totvsrmbocdsdm/0.0.1/index.html',
    specPattern: './cypress/e2e/**.feature',
    chromeWebSecurity: false,
    video: false,
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 40000,
    screenshotOnRunFailure: true,
    experimentalInteractiveRunEvents: true,
    viewportWidth: 1366,
    viewportHeight: 768,
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions,
    ): Promise<Cypress.PluginConfigOptions> {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      );

      return config;
    },
  },
});
