import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const dynamoDbClient = new DynamoDBClient({ region: "***REGION***" });
const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);

export const handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  const { surveyID, userID, answers } = event; // answers: [{ questionID, answer }]
  
  if (!surveyID || !userID || !answers || answers.length === 0) {
    return { statusCode: 400, body: JSON.stringify({ error: "SurveyID, UserID, and answers are required" }) };
  }

  // Create a unique response ID
  const responseID = uuidv4();

  const params = new PutCommand({
    TableName: "Responses",
    Item: {
      responseID: responseID,
      surveyID: surveyID,
      userID: userID,
      answers: answers, 
      submittedAt: new Date().toISOString(),
    },
  });

  try {
    await dynamoDb.send(params);
    console.log("✅ Response stored successfully.");

    return { statusCode: 201, body: JSON.stringify({ message: "Response submitted successfully", responseID }) };
  } catch (error) {
    console.error("❌ Error submitting response:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Error submitting response" }) };
  }
};
