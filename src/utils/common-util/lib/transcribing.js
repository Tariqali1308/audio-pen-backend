const appRoot = require("app-root-path");
const config = require("config");
const AWS = require("aws-sdk");
const fetch = require("node-fetch");
const awsEnv = config.get("aws");
const appConstants = require(appRoot + "/src/constants/app-constants");
const { status, messages } = appConstants;

AWS.config.update({
  region: awsEnv.awsRegion, // Set your preferred AWS region
  accessKeyId: awsEnv.awsAccessKey,
  secretAccessKey: awsEnv.awsSecretKey,
});

const transcribe = new AWS.TranscribeService();

module.exports = {
  transcribe: async (params) => {
    const { fileUrl, fileName } = params;
    return new Promise(async (resolve, reject) => {
      const jobName = await transcribeAudio(fileUrl, fileName);
      while (true) {
        const jobStatus = await getTranscriptionStatus(jobName);
        console.log("jobStatus", jobStatus);
        if (jobStatus === "COMPLETED") {
          // Download and process the transcription result
          const transcriptUri = await getTranscriptionResult(jobName);
          const transcriptData = await fetch(transcriptUri);
          const transcriptJson = await transcriptData.json();
          const transcriptionText =
            transcriptJson.results.transcripts[0].transcript;
          resolve({
            status: status.success,
            message: "Transcribed Successfully.",
            data: transcriptionText,
          });
          break;
        } else if (jobStatus === "FAILED") {
          reject({
            status: status.serverError,
            message: "Transcription Failed",
          });
          break;
        } else {
          console.log("Transcription job is still in progress...");
          await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        }
      }
    });
  },
};

async function transcribeAudio(audioFilePath, jobName) {
  try {
    const params = {
      LanguageCode: "en-US", // Set the language code
      Media: {
        MediaFileUri: audioFilePath,
      },
      TranscriptionJobName: jobName, // Provide a unique job name
    };
    const data = await transcribe.startTranscriptionJob(params).promise();
    return data.TranscriptionJob.TranscriptionJobName;
  } catch (error) {
    console.error("Error transcribing audio:", error);
    throw error;
  }
}
async function getTranscriptionResult(jobName) {
  try {
    const params = {
      TranscriptionJobName: jobName,
    };
    const data = await transcribe.getTranscriptionJob(params).promise();
    return data.TranscriptionJob.Transcript.TranscriptFileUri;
  } catch (error) {
    console.error("Error getting transcription result:", error);
    throw error;
  }
}
async function getTranscriptionStatus(jobName) {
  try {
    const params = {
      TranscriptionJobName: jobName,
    };
    const data = await transcribe.getTranscriptionJob(params).promise();
    return data.TranscriptionJob.TranscriptionJobStatus;
  } catch (error) {
    console.error("Error getting transcription result:", error);
    throw error;
  }
}
