import { ConfirmSignUpCommand , CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import crypto from "crypto";


function generateSecretHash(username, clientId, clientSecret) {
  return crypto
    .createHmac("sha256", clientSecret)
    .update(username + clientId)
    .digest("base64");
}

export const handler = async (event) => {
  const { username, confirmationCode } = event;

  if (!username || !confirmationCode) {
    return {
      statusCode: 400,
      body: { error: "Username and confirmation code are required" },
    };
  }
  
  const clientId = "***********CLIENT-ID*************";
  const clientSecret = "*************CLIENT-SECRET*****************";
  const cognito = new CognitoIdentityProviderClient({
    region: "***REGION***",
  });
  
  const confirmParams = {
    ClientId: clientId,
    SecretHash: generateSecretHash(username, clientId, clientSecret),
    Username: username,
    ConfirmationCode: confirmationCode,
  };

  try {
    await cognito.send(new ConfirmSignUpCommand(confirmParams));
    return {
      statusCode: 200,
      body: { message: "User confirmed successfully. You can now log in." },
    };
  } catch (error) {
    console.error("❌ Error confirming user:", error);
    return {
      statusCode: error.statusCode || 500,
      body: { error: error.message },
    };
  }
};
