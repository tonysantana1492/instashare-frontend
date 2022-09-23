const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "f7ihpv",

  e2e: {
    baseUrl: 'http://localhost:3000'
  }

});
