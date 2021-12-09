data "aws_secretsmanager_secret_version" "terraform_secrets" {
  provider  = aws.management_dns
  secret_id = "/concourse/dataworks/terraform"
}

resource "aws_service_discovery_private_dns_namespace" "analytical_frontend_service" {
  name = "${local.environment}.azkaban.services.${jsondecode(data.aws_secretsmanager_secret_version.terraform_secrets.secret_binary)["dataworks_domain_name"]}"
  vpc  = data.terraform_remote_state.aws_analytical_env_infra.outputs.vpc.aws_vpc.id
  tags = merge(local.common_tags, { Name = "analytical_frontend_service" })
}

resource "aws_service_discovery_service" "analytical_frontend_service" {
  name = "analytical_frontend_service"

  dns_config {
    namespace_id = aws_service_discovery_private_dns_namespace.analytical_frontend_service.id

    dns_records {
      ttl  = 10
      type = "SRV"
    }
  }

  tags = merge(local.common_tags, { Name = "analytical_frontend_service" })
}
