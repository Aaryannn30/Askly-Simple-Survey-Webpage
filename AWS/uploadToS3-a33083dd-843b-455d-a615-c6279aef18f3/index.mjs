import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Busboy from "busboy";

const s3Client = new S3Client({ region: "***REGION***" });

async function uploadFileToS3(bucketName, fileName, fileContent, username) {
  try {
    const fullFileName = `${username}-${fileName}`;

    const params = {
      Bucket: bucketName,
      Key: fullFileName,
      Body: fileContent,  // File Buffer
      ContentType: "image/jpeg", // Adjust based on your file type
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    // Construct the file URL
    const fileUrl = `https://${bucketName}.s3.ap-south-1.amazonaws.com/${fullFileName}`;

    return fileUrl;
  } catch (error) {
    console.error("Error uploading file to S3: ", error);
    throw error;
  }
}

export const handler = async (event) => {
  const bucketName = "your-s3-bucket-name";
  const username = "surveyWebpage"; // Set a default username

  if (!event.headers || !event.headers["content-type"]) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing Content-Type header" }),
    };
  }

  const contentType = event.headers["content-type"];
  const busboy = new Busboy({ headers: { "content-type": contentType } });

  return new Promise((resolve, reject) => {
    let fileName = "";
    let fileBuffer = [];

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      fileName = filename;

      file.on("data", (data) => {
        fileBuffer.push(data);
      });

      file.on("end", () => {
        fileBuffer = Buffer.concat(fileBuffer);
      });
    });

    busboy.on("finish", async () => {
      try {
        if (!fileName || !fileBuffer.length) {
          return resolve({
            statusCode: 400,
            body: JSON.stringify({ error: "No file uploaded" }),
          });
        }

        const fileUrl = await uploadFileToS3(bucketName, fileName, fileBuffer, username);

        resolve({
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify({ message: "File uploaded successfully.", fileUrl }),
        });
      } catch (error) {
        reject({
          statusCode: 500,
          body: JSON.stringify({ error: error.message }),
        });
      }
    });

    busboy.end(Buffer.from(event.body, "base64"));
  });
};
