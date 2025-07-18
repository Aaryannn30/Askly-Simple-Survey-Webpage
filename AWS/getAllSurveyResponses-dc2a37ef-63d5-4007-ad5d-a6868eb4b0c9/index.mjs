import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDbClient = new DynamoDBClient({ region: "***REGION***" });
const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);

export const handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  const { adminID } = event; // Admin requesting the data

  if (!adminID) {
    return { statusCode: 400, body: JSON.stringify({ error: "AdminID is required" }) };
  }

  try {
    // 1️⃣ Fetch All Surveys Created by the Admin
    const surveyParams = new QueryCommand({
      TableName: "Surveys",
      IndexName: "adminID-index", // Ensure GSI for fast lookup
      KeyConditionExpression: "adminID = :adminID",
      ExpressionAttributeValues: { ":adminID": adminID },
    });

    const surveyResults = await dynamoDb.send(surveyParams);
    if (!surveyResults.Items || surveyResults.Items.length === 0) {
      return { statusCode: 404, body: JSON.stringify({ error: "No surveys found for this admin." }) };
    }

    let surveyData = [];

    // 2️⃣ Iterate Through Each Survey & Fetch Responses
    for (const survey of surveyResults.Items) {
      const { surveyID, title, description, questions, createdAt } = survey;

      // Fetch all responses for the survey
      const responseParams = new QueryCommand({
        TableName: "Responses",
        KeyConditionExpression: "surveyID = :surveyID",
        ExpressionAttributeValues: { ":surveyID": surveyID },
      });

      const responseResults = await dynamoDb.send(responseParams);

      // Format responses
      let formattedResponses = responseResults.Items?.map((response) => ({
        userID: response.userID,
        submittedAt: response.submittedAt,
        answers: response.answers, // { questionID, answer }
      })) || [];

      // Push structured survey data
      surveyData.push({
        surveyID: surveyID,
        title: title,
        description: description,
        questions: questions,
        createdAt: createdAt,
        responses: formattedResponses,
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ surveys: surveyData }),
    };
  } catch (error) {
    console.error("❌ Error fetching survey responses:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Error fetching survey responses" }) };
  }
};
