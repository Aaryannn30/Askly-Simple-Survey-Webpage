import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const dynamoDbClient = new DynamoDBClient({ region: "***REGION***" });
const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);

export const handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  const { adminID, title, description, questions } = event;

  if (!adminID || !title || !questions || !Array.isArray(questions)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid input data" }),
    };
  }

  const surveyID = uuidv4();
  const createdAt = new Date().toISOString();

  const params = new PutCommand({
    TableName: "Surveys",
    Item: {
      SurveyID: surveyID,
      AdminID: adminID,
      Title: title,
      Description: description || "",
      Questions: questions,
      CreatedAt: createdAt,
    },
  });

  try {
    await dynamoDb.send(params);
    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Survey created successfully", surveyID }),
    };
  } catch (error) {
    console.error("Error creating survey:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error creating survey" }),
    };
  }
};
