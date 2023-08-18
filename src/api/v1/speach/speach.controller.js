const appRoot = require("app-root-path");
const appConstants = require(appRoot + "/src/constants/app-constants");
const commonUtil = require(appRoot + "/src/utils/common-util");
const config = require("config");
const awsEnv = config.get("aws");
const s3UploadUtil = commonUtil.s3UploadUtil().s3Upload;
const transcribingUtil = commonUtil.transcribingUtil().transcribe;
const { status, messages } = appConstants;
const summarizeUtil = commonUtil.summarizingUtil().getSummarizeText;
const topicUtil = commonUtil.summarizingUtil().getTopic;

exports.uploadFile = async (req, res) => {
  try {
    const date = Date.now();
    const fileName = req.file.originalname + date + ".mp3";
    const params = {
      fileName,
      fileBuffer: req.file.buffer,
    };
    const result = await s3UploadUtil(params);
    if (result.status == status.success) {
      return res.status(status.success).json({
        message: "File Uploaded Successfully",
        data: result,
      });
    } else {
      return res.status(status.serverError).json({
        message: "Error in File Uploading",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(status.serverError).json({
      message: messages.serverErrorMessage,
    });
  }
};
exports.speachToText = async (req, res) => {
  try {
    const { fileName } = req.body;
    const fileUrl = `https://${awsEnv.awsBucket}.s3.us-west-1.amazonaws.com/${fileName}`;
    const params = {
      fileName,
      fileUrl,
    };
    const result = await transcribingUtil(params);
    if (result.status == status.success) {
      return res.status(status.success).json({
        message: "Speach To Text Successfully",
        data: result,
      });
    } else {
      return res.status(status.serverError).json({
        message: "Error in Speach To Text",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(status.serverError).json({
      message: messages.serverErrorMessage,
    });
  }
};

exports.SummarizeText = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await summarizeUtil({
      text,
    });
    if (!response) {
      return res.status(status.serverError).json({
        message: "Error in Summarizing Text",
      });
    }
    const topic = await topicUtil({
      text: response?.data?.openai?.result,
    });
    if (!topic) {
      return res.status(status.serverError).json({
        message: "Error in getting Topic",
      });
    }
    return res.status(status.success).json({
      message: "Summarized Text Successfully",
      data: {
        text: response?.data?.openai,
        topic: topic?.data?.openai,
      },
    });
  } catch (err) {
    console.log("err", err);
    return res.status(status.serverError).json({
      message: messages.serverErrorMessage,
    });
  }
};
