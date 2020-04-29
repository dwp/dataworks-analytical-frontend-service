data "aws_iam_policy_document" "jupyter_bucket_restrict_to_vpc" {
  statement {
    sid    = "${var.name_prefix}-RestrictToVPC"
    effect = "Deny"
    actions = [
      "s3:*",
    ]

    principals {
      identifiers = ["*"]
      type        = "*"
    }

    resources = [
      "${aws_s3_bucket.jupyter_storage.arn}/*"
    ]

    condition {
      test = "StringNotEquals"
      values = [
        var.vpc_id
      ]
      variable = "aws:sourceVpc"
    }
  }
}

resource "aws_s3_bucket_policy" "jupyter_bucket" {
  bucket = aws_s3_bucket.jupyter_storage.id
  policy = data.aws_iam_policy_document.jupyter_bucket_restrict_to_vpc.json
}
