module.exports = {
  apps: [
    {
      name: "jenkins-demo-app",
      script: "index.js",
      env: {
        PORT: 3000,
        VERSION: process.env.DEPLOY_VERSION || "v1"
      }
    }
  ]
};