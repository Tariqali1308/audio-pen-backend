/* default.js, node-config default configuration.

   All application configuration variables should be represented herein, even
   if only to have default or empty value.

   If you would like to change any of these values for your dev environment, create
   a local.js file in this directory (which will be gitignored), in which individual
   properties can be specified which overwrite any of the values below.

*/
module.exports = {
  dataSource: {
    databaseUrl: fromEnv(
      "MONGODB_URL",
      "mongodb+srv://assignment:assignment123@cluster0.y5rozam.mongodb.net/?retryWrites=true&w=majority"
    ),
  },
  serve: {
    port: process.env.PORT || 3500,
  },
  aws: {
    awsAccessKey: fromEnv("CUSTOM_AWS_ACCESS_KEY", "AKIASZSYEMTGJZFTXONR"),
    awsSecretKey: fromEnv(
      "CUSTOM_AWS_SECRET_KEY",
      "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"
    ),
    awsBucket: fromEnv("CUSTOM_AWS_BUCKET", "audio-pen"),
    awsRegion: fromEnv("CUSTOM_AWS_REGION", "us-west-1"),
  },
  edenAi: {
    aiToken: fromEnv(
      "AI_TOKEN",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTk5NDYyYWItYjg4Mi00OWY0LTllOTktYjhhNGUyYjRjNDRmIiwidHlwZSI6ImFwaV90b2tlbiJ9.6kEBAsQ2xH5eRHisk2VrdLZkq1d-4qfb2ibvX2iHYMo"
    ),
  },
  expressSessionSecret: fromEnv(
    "EXPRESS_SESSION_SECRET",
    "AJSDFAS09DFUAS09DF8A0S9DF"
  ),
};

// In production environments, read from the environment. Otherwise, use a
// default for development, allowing the value to be overridden.
function identity(x) {
  return x;
}

// Read from the environment, or use a default.
function fromEnv(varName, defValue, transform) {
  transform = transform || identity;
  const envValue = process.env[varName];
  if (envValue !== undefined) {
    return transform(envValue);
  }
  return defValue;
}
