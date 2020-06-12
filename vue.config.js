module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ['sequelize'],
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        files: [
          "**/*"
        ],
        extraFiles: [
          {
            "from": "models",
            "to": "models",
            "filter": ["**/*"]
          },
          {
              "from": "src/db",
              "to": "src/db",
              "filter": ["**/*"]
          }
        ]
      }
    
    }
  }
  }