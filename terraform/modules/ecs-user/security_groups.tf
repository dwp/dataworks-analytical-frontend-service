resource "aws_security_group" "user_host" {
  name   = var.name_prefix
  vpc_id = var.vpc.id
}

resource "aws_security_group_rule" "to_vpce" {
  description              = "Allow instances to connect to VPCE"
  protocol                 = "tcp"
  from_port                = 443
  to_port                  = 443
  security_group_id        = aws_security_group.user_host.id
  source_security_group_id = var.vpc.interface_vpce_sg_id
  type                     = "egress"
}

resource "aws_security_group_rule" "vpce_from_host" {
  description              = "Accept VPCE traffic"
  protocol                 = "tcp"
  from_port                = 443
  to_port                  = 443
  security_group_id        = var.vpc.interface_vpce_sg_id
  source_security_group_id = aws_security_group.user_host.id
  type                     = "ingress"
}

resource "aws_security_group_rule" "https_to_s3" {
  description       = "Allow HTTPS to S3 endpoint"
  protocol          = "tcp"
  from_port         = 443
  to_port           = 443
  security_group_id = aws_security_group.user_host.id
  prefix_list_ids   = [var.vpc.s3_prefix_list_id]
  type              = "egress"
}

resource "aws_security_group_rule" "http_to_s3" {
  description       = "Allow HTTP to S3 endpoint"
  protocol          = "tcp"
  from_port         = 80
  to_port           = 80
  security_group_id = aws_security_group.user_host.id
  prefix_list_ids   = [var.vpc.s3_prefix_list_id]
  type              = "egress"
}
