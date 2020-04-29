data "aws_route53_zone" "main" {
  provider = aws.management-dns

  name = var.parent_domain_name
}

data "aws_vpc" "vpc" {
  id = "${var.vpc_id}"
}
