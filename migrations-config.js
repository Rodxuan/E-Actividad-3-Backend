const mongodb = require('mongodb');

const config = {
  mongodb: {
    url: process.env.DB_CNN,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   host: 'localhost'
    }
  },
  migrationsDir: 'migrations'
};

module.exports = config;
