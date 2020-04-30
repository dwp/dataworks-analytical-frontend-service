locals {
  log_driver = "awslogs"
  log_options = {
    "awslogs-region"        = var.region
    "awslogs-group"         = "/ecs/service/${var.name_prefix}"
    "awslogs-stream-prefix" = "ecs"
  }
  port_mappings = [
    {
      "containerPort" = var.container_port
      "hostPort"      = var.container_port
      "protocol"      = "HTTPS"
    },
  ]
  ecr_endpoint = "${local.account[local.management_account[local.environment]]}.dkr.ecr.${var.region}.amazonaws.com"
}
