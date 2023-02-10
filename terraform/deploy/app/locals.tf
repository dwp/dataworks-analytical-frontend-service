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

  # Configured as per Tagging doc requirements https://engineering.dwp.gov.uk/policies/hcs-cloud-hosting-policies/resource-identification-tagging/
  # Also required as per Tenable documentation https://engineering.dwp.gov.uk/products/gold-images/agents/tenable/
  hcs_environment = {
    development    = "Dev"
    qa             = "Test"
    integration    = "Stage"
    preprod        = "Stage"
    production     = "Production"
    management     = "SP_Tooling"
    management-dev = "DT_Tooling"
  }
}
