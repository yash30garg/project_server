var config = {
  databaseConfig: {
    // MS SQL database config
    user: "lims",
    password: "Welcome123$",
    server: "mongodb://mongosql.westus2.cloudapp.azure.com",
    database: "lims",
    options: {
      encrypt: true // Use this if you're on Windows Azure
    },
    requestTimeout: 60000
  },
  databaseTable: "users", // Database table name to register users e.g. [dbo].[users]
  azureApp: {
    // Azure Application details
    base: "https://login.microsoftonline.com/",
    clientID: "42571f9f-768f-4d5f-8a20-b79658800949",
    clientSecret: "42571f9f-768f-4d5f-8a20-b79658800949",
    callbackUri: hostUrl + "/auth/cbAdfs",
    resource: "https://graph.microsoft.com/",
    tenant: ""
  },
  facebookApp: {
    // Facebook Application details
    clientID: "",
    clientSecret: "",
    callbackUrl: hostUrl + "/auth/cbFacebook"
  },
  googleApp: {
    // Google Application details
    clientID: "",
    clientSecret: "",
    callbackUrl: hostUrl + "/auth/cbGoogle"
  },
  jwtSecret: "big Secret",
  serverPort: 8080
}