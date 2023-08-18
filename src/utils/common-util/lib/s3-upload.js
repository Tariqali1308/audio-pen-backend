const appRoot = require("app-root-path");
const config = require("config");
const AWS = require("aws-sdk");
const appConstants = require(appRoot + "/src/constants/app-constants");
const { status, messages } = appConstants;
const awsEnv = config.get("aws");

AWS.config.update({
  region: awsEnv.awsRegion, // Set your preferred AWS region
  accessKeyId: awsEnv.awsAccessKey,
  secretAccessKey: awsEnv.awsSecretKey,
});
const s3 = new AWS.S3();
module.exports = {
  s3Upload: async (params) => {
    const { fileName, fileBuffer } = params;
    // const fileUrl = `https://audio-pen.s3.us-west-1.amazonaws.com/${fileName}`;
    const s3params = {
      Bucket: awsEnv.awsBucket,
      Key: fileName,
      Body: fileBuffer,
    };
    return new Promise((resolve, reject) => {
      s3.upload(s3params, function (err, data) {
        if (err) {
          console.log("Error uploading data: ", err);
          reject({
            status: status.serverError,
            message: "Error in Uploading File",
          });
        } else {
          console.log(
            "Successfully uploaded data to " + config.awsBucket + " /myKey"
          );
          resolve({
            status: status.success,
            message: "File Uploaded Successfully",
            data: fileName,
          });
        }
      });
    });
  },
};
