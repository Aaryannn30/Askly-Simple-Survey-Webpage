export const endpoint = "https://bcukdw29le.execute-api.ap-south-1.amazonaws.com/dev";

export const auth = {
  signUp: `/auth/signUp`, // Sign up user
  confirmSignUp: `/auth/confirmSignUp`, // Confirm sign up with code
  login: `/auth/login`, // Login user
};

export const admin = {
  createSurvey: `/admin/createSurvey`,
  getAllSurveyResponses: `/admin/getAllSurveyResponses`
};

export const user = {
  getAllSurvey: `/user/getAllSurveys`,
  submitResponse: `/user/submitSurveyResponse`, 
  logout : `/user/logout`
}
