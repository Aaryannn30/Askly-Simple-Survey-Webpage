import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDbClient = new DynamoDBClient({ region: "***REGION***" });
const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);

export const handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  const { userID } = event; // Get the requesting user's ID from the event

  if (!userID) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "UserID is required" }),
    };
  }

  // Query all surveys created by other users
  const params = new QueryCommand({
    TableName: "Surveys",
    IndexName: "AdminIDIndex", // Make sure you have a GSI on AdminID for fast retrieval
    KeyConditionExpression: "adminID <> :userID", // Fetch all surveys except by current user
    ExpressionAttributeValues: {
      ":userID": userID,
    },
  });

  try {
    const response = await dynamoDb.send(params);

    if (!response.Items || response.Items.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "No surveys found from other users" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(
        response.Items.map((survey) => ({
          surveyID: survey.SurveyID,
          title: survey.Title,
          description: survey.Description,
          questionsCount: survey.Questions.length, // To avoid loading large question lists
        }))
      ),
    };
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching surveys" }),
    };
  }
};
