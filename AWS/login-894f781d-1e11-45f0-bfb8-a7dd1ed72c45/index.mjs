import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

const cognito = new CognitoIdentityProviderClient({ region: "***REGION***" });

function generateSecretHash(username, clientId, clientSecret) {
  return crypto
    .createHmac("sha256", clientSecret)
    .update(username + clientId)
    .digest("base64");
}

async function validateUsername(username) {
  try {
    const dynamoDbClient = new DynamoDBClient({ region: "***REGION***" });
    const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);

    const params = {
      TableName: "Users",
      Key: {
        userID: username,
      },
    };

    const result = await dynamoDb.send(new GetCommand(params));

    if (!result.Item || !result.Item.userID) {
      console.log("Username is incorrect");
      return { success: false, error: "Username not found. Please try again." };
    }

    return { success: true };
  } catch (error) {
    console.error("Error validating username:", error.message);

    if (error.message.includes("Cannot read properties of undefined")) {
      return { success: false, error: "Username not found. Please try again." };
    }

    return { success: false, error: "An internal error occurred" };
  }
}

export const handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  };

  console.log("Received event:", JSON.stringify(event, null, 2));

  let body;

  if (event.username && event.password) {
    body = event;
  } else if (event.body) {
    try {
      body = JSON.parse(event.body);
      console.log("Parsed body:", body);
    } catch (error) {
      console.error("Error parsing request body:", event.body);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid request body" }),
      };
    }
  } else {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "No valid body found in request" }),
    };
  }

  const { username, password } = body;

  if (!username || !password) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Username and password are required" }),
    };
  }

  // Validate username
  const validationResponse = await validateUsername(username);
  if (!validationResponse.success) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: validationResponse.error }),
    };
  }

  
  const clientId = "***********CLIENT-ID*************";
  const clientSecret = "*************CLIENT-SECRET*****************";
  const secretHash = generateSecretHash(username, clientId, clientSecret);

  const authParams = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
      SECRET_HASH: secretHash,
    },
  };

  try {
    const authResponse = await cognito.send(
      new InitiateAuthCommand(authParams)
    );

    const idTokenParts = authResponse.AuthenticationResult.IdToken.split(".");
    const idTokenPayload = JSON.parse(
      Buffer.from(idTokenParts[1], "base64").toString()
    );
    const idTokenExpiration = new Date(idTokenPayload.exp * 1000);
    const idTokenExpiresIn = Math.round(
      (idTokenExpiration.getTime() - Date.now()) / 1000
    );

    const accessTokenParts =
      authResponse.AuthenticationResult.AccessToken.split(".");
    const accessTokenPayload = JSON.parse(
      Buffer.from(accessTokenParts[1], "base64").toString()
    );
    const accessTokenExpiration = new Date(accessTokenPayload.exp * 1000);
    const accessTokenExpiresIn = Math.round(
      (accessTokenExpiration.getTime() - Date.now()) / 1000
    );

    return {
      statusCode: 200,
      headers,
      body: {
        message: "Login successful",
        username,
        IdToken: authResponse.AuthenticationResult.IdToken,
        idTokenExpiresIn,
        AccessToken: authResponse.AuthenticationResult.AccessToken,
        accessTokenExpiresIn,
      },
    };
  } catch (error) {
    console.error("Error during login:", error);

    if (error.name === "NotAuthorizedException") {
      if (error.message.includes("password")) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: "Incorrect password. Please try again." }),
        };
      }
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: "Username not found. Please try again." }),
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "An internal error occurred" }),
    };
  }
};
