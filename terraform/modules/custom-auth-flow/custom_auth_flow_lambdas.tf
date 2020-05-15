
resource "aws_lambda_function" "lambda_create_challenge" {
  filename         = "${path.module}/${var.name_prefix}-create-challenge.zip"
  function_name    = "${var.name_prefix}-create-challenge"
  role             = aws_iam_role.role_for_lambda_create_auth_challenge.arn
  handler          = "lambda_function.lambda_handler"
  runtime          = "nodejs12.x"
  source_code_hash = data.archive_file.lambda_create_challenge_zip.output_base64sha256
  tags             = merge(var.common_tags, { Name = "${var.name_prefix}-create-challenge" })
}

resource "aws_lambda_function" "lambda_define_challenge" {
  filename         = "${path.module}/${var.name_prefix}-define-challenge.zip"
  function_name    = "${var.name_prefix}-define-challenge"
  role             = aws_iam_role.role_for_lambda_define_auth_challenge.arn
  handler          = "lambda_function.lambda_handler"
  runtime          = "nodejs12.x"
  source_code_hash = data.archive_file.lambda_define_challenge_zip.output_base64sha256
  tags             = merge(var.common_tags, { Name = "${var.name_prefix}-define-challenge" })
}

resource "aws_lambda_function" "lambda_verify_challenge" {
  filename         = "${path.module}/${var.name_prefix}-verify-challenge.zip"
  function_name    = "${var.name_prefix}-verify-challenge"
  role             = aws_iam_role.role_for_lambda_verify_auth_challenge.arn
  handler          = "lambda_function.lambda_handler"
  runtime          = "nodejs12.x"
  source_code_hash = data.archive_file.lambda_verify_challenge_zip.output_base64sha256
  tags             = merge(var.common_tags, { Name = "${var.name_prefix}-verify-challenge" })
}
