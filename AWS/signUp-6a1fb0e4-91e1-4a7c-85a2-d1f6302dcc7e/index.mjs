import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ListUsersCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import emailValidator from "email-validator";
import crypto from "crypto";

const cognito = new CognitoIdentityProviderClient({
  region: "***REGION***",
});
const dynamoDbClient = new DynamoDBClient({
  region: "***REGION***",
});
const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);


export const handler = async (event) => {
  console.log("🔹 Received event:", JSON.stringify(event, null, 2));

  const {
    username,
    email,
    password,
  } = event;

  if (!username || !email || !password) {
    return {
      statusCode: 400,
      body: { error: "All fields are required" },
    };
  }

  if (!emailValidator.validate(email)) {
    return {
      statusCode: 400,
      body: { error: "Invalid email format" },
    };
  }

  if (
    password.length < 8 ||
    !/\d/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[!@#$%^&*(),.?":{}|<>]/.test(password)
  ) {
    return {
      statusCode: 400,
      body: {
        error:
          "Password does not meet complexity requirements. Passwords should have a minimum length of 8 characters and include uppercase, lowercase, numbers and special characters.",
      },
    };
  }

  const command = new ListUsersCommand({
    UserPoolId: "***POOL-ID***",
    Filter: `email = "${email}"`,
    Limit: 1,
  });

  try {
    const listUsersResponse = await cognito.send(command);
    if (listUsersResponse.Users && listUsersResponse.Users.length > 0) {
      return {
        statusCode: 409,
        body: { error: "Email already in use" },
      };
    }
  } catch (error) {
    console.error("❌ Error searching for users: ", error);
    return {
      statusCode: 500,
      body: { error: "Error searching for users" },
    };
  }


  function generateSecretHash(username, clientId, clientSecret) {
    return crypto
      .createHmac("sha256", clientSecret)
      .update(username + clientId)
      .digest("base64");
  }

  const secretHash = generateSecretHash(username, CLIENT_ID, CLIENT_SECRET);

  const signUpParams = {
    ClientId: CLIENT_ID,
    SecretHash: secretHash,
    Username: username,
    Password: password,
    UserAttributes: [
      { Name: "email", Value: email },
      { Name: "name", Value: username },
    ],
  };

  try {
    await cognito.send(new SignUpCommand(signUpParams));

    const putCommand = new PutCommand({
      TableName: "Users",
      Item: {
        userID: username,
        email,
        username,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        searchTerm: username.toLowerCase(),
      },
    });

    await dynamoDb.send(putCommand);
    console.log("✅ User registered successfully in DynamoDB.");

    return {
      statusCode: 201,
      body: { message: "User registered successfully" },
    };
  } catch (error) {
    console.error("❌ Error signing up user: ", error);
    return {
      statusCode: error.statusCode || 500,
      body: { error: error.message },
    };
  }
};
