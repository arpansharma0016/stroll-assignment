module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '98.83.1.193',
      username: 'ubuntu',
      pem: '/home/arpan/arpan/stroll-assignment/stroll.pem',
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
    },
  },

  app: {
    // TODO: change app name and path
    name: 'stroll',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'http://98.83.1.193',
      MONGO_URL: 'mongodb://MONGO_URL',
      PORT: 80,
    },

    docker: {
      image: 'zodern/meteor:root',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true,
  },

  mongo: {
    version: '4.4.12',
    servers: {
      one: {},
    },
  },

  // (Optional)
  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

  // proxy: {
  //   domains: 'mywebsite.com,www.mywebsite.com',

  //   ssl: {
  //     // Enable Let's Encrypt
  //     letsEncryptEmail: 'email@domain.com'
  //   }
  // }
};
