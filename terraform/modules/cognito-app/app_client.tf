resource aws_cognito_user_pool_client app_client {
  provider                             = aws.management
  name                                 = var.name
  user_pool_id                         = var.user_pool_id
  generate_secret                      = false
  allowed_oauth_flows_user_pool_client = true
  callback_urls                        = var.callback_urls
  supported_identity_providers         = ["COGNITO"]
  allowed_oauth_flows = [
    "code",
    "implicit"
  ]
  allowed_oauth_scopes = [
    "email",
    "openid",
    "aws.cognito.signin.user.admin",
    "profile",
  ]
  explicit_auth_flows = [
    "ALLOW_CUSTOM_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH",
  ]
}
