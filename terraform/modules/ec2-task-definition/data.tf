data "aws_region" "current" {}
data "aws_availability_zones" "current" {}
data "http" "well_known_jwks" {
  url = "${local.cognito_endpoint}/.well-known/jwks.json"

  request_headers = {
    Accept = "application/json"
  }
}

