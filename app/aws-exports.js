/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_arploUSO9",
    "aws_user_pools_web_client_id": "6878lk42lk73vv8a7jr4uspknk",
    "oauth": {
        "domain": "authtestapp.auth.us-east-1.amazoncognito.com",
        "scope": ["openid", "email", "profile"], // Add necessary OAuth scopes
        "redirectSignIn": "myapp://auth/", // Update with your deep link scheme
        "redirectSignOut": "myapp://auth/", // Update with your deep link scheme
        "responseType": "code" // Authorization code grant flow
      },
    "aws_cognito_username_attributes": [
        "EMAIL"
    ],
    "aws_cognito_social_providers": [
        "GOOGLE"
    ],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 6,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ]
};


export default awsmobile;