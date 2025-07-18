import {
  CognitoIdentityProviderClient,
  GlobalSignOutCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const cognito = new CognitoIdentityProviderClient({ region: "***REGION***" });

async function globalSignOut(accessToken) {
  const params = {
    AccessToken: accessToken,
  };

  try {
    await cognito.send(new GlobalSignOutCommand(params));
    return { message: "Successfully signed out from all devices." };
  } catch (error) {
    console.error("Error during global sign out: ", error);
    throw error;
  }
}

export const handler = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: { error: "Request body is missing" },
    };
  }

  const { accessToken } = event.body;

  if (!accessToken) {
    return {
      statusCode: 400,
      body: { error: "Access token is required for logout" },
    };
  }

  try {
    const response = await globalSignOut(accessToken);
    return {
      statusCode: 200,
      body: response,
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: { error: error.message },
    };
  }
};
