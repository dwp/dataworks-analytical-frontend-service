resource "aws_iam_role" "user_host" {
  name               = "${var.name_prefix}Role"
  assume_role_policy = data.aws_iam_policy_document.assume_role_ec2.json
  tags               = var.common_tags
}

data "aws_iam_policy_document" "assume_role_ec2" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      identifiers = ["ec2.amazonaws.com"]
      type        = "Service"
    }
  }
}

resource "aws_iam_instance_profile" "user_host" {
  name = aws_iam_role.user_host.name
  role = aws_iam_role.user_host.id
}

resource "aws_iam_role_policy_attachment" "ecs" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
  role       = aws_iam_role.user_host.id
}

// TODO: replace with custom policy due to too open AWS policy
resource "aws_iam_role_policy_attachment" "ssm" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2RoleforSSM"
  role       = aws_iam_role.user_host.id
}

resource "aws_iam_role_policy_attachment" "cloudwatch_loggin" {
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"
  role       = aws_iam_role.user_host.id
}

data "aws_iam_policy_document" "ecr" {
  statement {
    effect  = "Allow"
    actions = ["ecr:GetAuthorizationToken"]

    resources = ["*"]
  }

  statement {
    effect = "Allow"
    actions = [
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
      "ecr:BatchCheckLayerAvailability"
    ]

    resources = ["arn:aws:ecr:*:*:repository/frontend-service/*"]
  }

}

resource "aws_iam_role_policy" "ecr" {
  policy = data.aws_iam_policy_document.ecr.json
  role   = aws_iam_role.user_host.id
}
