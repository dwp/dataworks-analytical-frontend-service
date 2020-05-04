resource "aws_kms_key" "encryption_key" {
  description         = "${var.name_prefix} ECS Encryption Key"
  is_enabled          = true
  enable_key_rotation = true
  tags                = merge(var.common_tags, { Name = "${var.name_prefix}-kms-key" })
}
