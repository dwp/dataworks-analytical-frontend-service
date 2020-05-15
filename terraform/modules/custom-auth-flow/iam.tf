resource aws_iam_role role_for_lambda_create_auth_challenge {
  name               = "Role-Lambda-Create-Auth_Challenge"
  assume_role_policy = data.aws_iam_policy_document.assume_role_lambda_custom_auth_flow_document.json
}
resource aws_iam_role role_for_lambda_define_auth_challenge {
  name               = "Role-Lambda-Define-Auth_Challenge"
  assume_role_policy = data.aws_iam_policy_document.assume_role_lambda_custom_auth_flow_document.json
}
resource aws_iam_role role_for_lambda_verify_auth_challenge {
  name               = "Role-Lambda-Verify-Auth_Challenge"
  assume_role_policy = data.aws_iam_policy_document.assume_role_lambda_custom_auth_flow_document.json
}

data aws_iam_policy_document assume_role_lambda_custom_auth_flow_document {
  statement {
    actions = [
      "sts:AssumeRole",
    ]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "create_challenge_sns_role_policy_attach" {
  role       = aws_iam_role.role_for_lambda_create_auth_challenge.name
  policy_arn = aws_iam_policy.cognito_auth_sns_policy.arn
}

resource aws_iam_policy cognito_auth_sns_policy {
  policy = data.aws_iam_policy_document.cognito_auth_sns_policy_document.json
}

data aws_iam_policy_document cognito_auth_sns_policy_document {
  statement {
    actions = [
      "SNS:Publish"
    ]
    resources = ["arn:aws:sns:${var.region}:${var.account}:****TOPICNAME****"]
  }
}

resource "aws_iam_role_policy_attachment" "cognito_create_challenge_trigger_policy_attach" {
  role       = aws_iam_role.role_for_lambda_create_auth_challenge.name
  policy_arn = aws_iam_policy.cognito_create_challenge_trigger_policy.arn
}

resource aws_iam_policy cognito_create_challenge_trigger_policy {
  policy = data.aws_iam_policy_document.cognito_create_challenge_trigger_document.json
}

data aws_iam_policy_document cognito_create_challenge_trigger_document {
  statement {
    Sid = "lambda-something"
    Effect = "Allow"
    Principal = {
      Service = "cognito-sync.amazonaws.com"
    }
    Action = "lambda:InvokeFunction"
    Resource = aws_lambda_function.lambda_create_challenge.arn
    Condition = {
      test = "ArnLike"
      values = [
        var.cognito_user_pool_arn
      ]
    }
  }
}

resource "aws_iam_role_policy_attachment" "cognito_verify_challenge_trigger_policy_attach" {
  role       = aws_iam_role.role_for_lambda_verify_auth_challenge.name
  policy_arn = aws_iam_policy.cognito_verify_challenge_trigger_policy.arn
}

resource aws_iam_policy cognito_verify_challenge_trigger_policy {
  policy = data.aws_iam_policy_document.cognito_verify_challenge_trigger_document.json
}

data aws_iam_policy_document cognito_verify_challenge_trigger_document {
  statement {
    Sid = "lambda-something"
    Effect = "Allow"
    Principal = {
      Service = "cognito-sync.amazonaws.com"
    }
    Action = "lambda:InvokeFunction"
    Resource = aws_lambda_function.lambda_verify_challenge.arn
    Condition = {
      test = "ArnLike"
      values = [
        var.cognito_user_pool_arn
      ]
    }
  }
}

resource "aws_iam_role_policy_attachment" "cognito_define_challenge_trigger_policy_attach" {
  role       = aws_iam_role.role_for_lambda_define_auth_challenge.name
  policy_arn = aws_iam_policy.cognito_define_challenge_trigger_policy.arn
}

resource aws_iam_policy cognito_define_challenge_trigger_policy {
  policy = data.aws_iam_policy_document.cognito_define_challenge_trigger_document.json
}

data aws_iam_policy_document cognito_define_challenge_trigger_document {
  statement {
    Sid = "lambda-something"
    Effect = "Allow"
    Principal = {
      Service = "cognito-sync.amazonaws.com"
    }
    Action = "lambda:InvokeFunction"
    Resource = aws_lambda_function.lambda_define_challenge.arn
    Condition = {
      test = "ArnLike"
      values = [
        var.cognito_user_pool_arn
      ]
    }
  }
}
