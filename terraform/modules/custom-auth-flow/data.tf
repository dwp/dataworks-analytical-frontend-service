data "archive_file" "lambda_create_challenge_zip" {
  type        = "zip"
  source_dir  = "${path.module}/lambda/createAuthChallenge"
  output_path = "${path.module}/${var.name_prefix}-create-challenge.zip"
}

data "archive_file" "lambda_define_challenge_zip" {
  type        = "zip"
  source_dir  = "${path.module}/lambda/defineAuthChallenge"
  output_path = "${path.module}/${var.name_prefix}-define-challenge.zip"
}

data "archive_file" "lambda_verify_challenge_zip" {
  type        = "zip"
  source_dir  = "${path.module}/lambda/verifyAuthChallenge"
  output_path = "${path.module}/${var.name_prefix}-verify-challenge.zip"
}
