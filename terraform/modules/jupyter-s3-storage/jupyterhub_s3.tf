resource "random_id" "jupyter_bucket" {
  byte_length = 16
}

resource "aws_s3_bucket" "jupyter_storage" {
  bucket = random_id.jupyter_bucket.hex
  acl    = "private"

  tags = var.common_tags

  versioning {
    enabled = true
  }

  logging {
    target_bucket = var.logging_bucket
    target_prefix = "S3Logs/${random_id.jupyter_bucket.hex}-ci/ServerLogs"
  }

  lifecycle_rule {
    id      = "${var.name_prefix}-lifecycle"
    enabled = true
    noncurrent_version_expiration {
      days = 30
    }
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        kms_master_key_id = aws_kms_key.jupyter_bucket_master_key.arn
        sse_algorithm     = "aws:kms"
      }
    }
  }
}

resource "aws_s3_bucket_public_access_block" "jupyter_bucket" {
  bucket = aws_s3_bucket.jupyter_storage.id

  block_public_acls       = true
  block_public_policy     = true
  restrict_public_buckets = true
  ignore_public_acls      = true
}
