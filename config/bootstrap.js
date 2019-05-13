/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function (cb) {
  var allClient = [{
      name: "trustedTestClient",
      redirectURI: "http://192.168.1.93:1338/auth/allow"
    },
    {
      name: "Fundserv",
      redirectURI: "http://192.168.1.93:1339/auth/allow"
    },
    {
      name: "FundServDemo",
      redirectURI: "http://vsd.fss.com.vn:1339/auth/allow"
    },
    {
      name: "FundservDev",
      redirectURI: "http://localhost:1339/auth/allow"
    },
    {
      name: "FundservDev1",
      redirectURI: "http://192.168.40.22:1335/auth/allow"
    },
    {
      name: "FundservDev2",
      redirectURI: "http://192.168.40.22:1335/auth/allow"
    }
  ];
  // User.create({
  //   username: 'test',
  //   password: '123'
  // }, (err, user) => {
  //   if (err) {
  //     console.log(err)
  //   }

  // })
  allClient.forEach(element => {
    // Create a trusted application
    Client.findOne({
      name: element.name
    }, function (err, client) {
      if (err) {
        sails.log.info(err.message);
      } else {
        if (!client) {
          Client.create({
            name: element.name,
            redirectURI: element.redirectURI,
            trusted: false
          }).exec(function (err, client) {
            if (err) {
              sails.log.info(err.message);
            } else {
              sails.log.info(element.name + " created");
              sails.log.info("- client_id: " + client.clientId);
              sails.log.info("- client_secret: " + client.clientSecret);
              sails.log.info("- redirectURI: " + client.redirectURI);
            }
          });
        } else {
          sails.log.info(element.name + " already exists");
          sails.log.info("- client_id: " + client.clientId);
          sails.log.info("- client_secret: " + client.clientSecret);
          sails.log.info("- redirectURI: " + client.redirectURI);
        }
      }
    });
  });
  cb();
};

process.on("uncaughtException", function (err) {
  sails.log.error("Uncaught exception ", err);
});

process.on("SIGTERM", function () {
  sails.log.error("Received SIGTERM");
});

process.on("SIGINT", function () {
  sails.log.error("Received SIGINT");
});