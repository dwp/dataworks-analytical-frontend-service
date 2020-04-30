# ---------------------------------------------------------------------------------------------------------------------
# ECS Task Definition
# ---------------------------------------------------------------------------------------------------------------------
module "ecs-fargate-task-definition" {
  source                       = "../../modules/fargate-task-definition"
  name_prefix                  = var.name_prefix
  container_name               = var.name_prefix
  container_image              = local.container_image
  container_port               = var.container_port
  container_cpu                = var.container_cpu
  container_memory             = var.container_memory
  container_memory_reservation = var.container_memory_reservation
  common_tags                  = local.common_tags
  role_arn                     = "arn:aws:iam::${local.account[local.environment]}:role/${var.assume_role}"
  account                      = lookup(local.account, local.environment)
  log_configuration = {
    secretOptions = []
    logDriver     = "awslogs"
    options = {
      "awslogs-group"         = "/aws/ecs/${data.aws_ecs_cluster.ecs_main_cluster.cluster_name}/${var.name_prefix}"
      "awslogs-region"        = var.region
      "awslogs-stream-prefix" = "ecs"
    }
  }
  environment = [
    {
      name  = "frontendService.user_container_task_definition"
      value = "${var.name_prefix}-analytical-workspace"
    },
    {
      name  = "frontendService.load_balancer_name"
      value = "aws-analytical-env-lb"
    },
    {
      name  = "frontendService.aws_region"
      value = var.region
    },
    {
      name  = "frontendService.user_container_url"
      value = "aws-analytical-env.${local.root_dns_prefix[local.environment]}.${local.parent_domain_name[local.environment]}"
    },
    {
      name  = "frontendService.user_container_port"
      value = 8443
    }
  ]
}
#
## ---------------------------------------------------------------------------------------------------------------------
## ECS Service
## ---------------------------------------------------------------------------------------------------------------------
module "ecs-fargate-service" {
  source          = "../../modules/fargate-service"
  name_prefix     = var.name_prefix
  region          = var.region
  vpc_id          = data.terraform_remote_state.aws_analytical_env_infra.outputs.vpc.aws_vpc
  private_subnets = data.terraform_remote_state.aws_analytical_env_infra.outputs.vpc.aws_subnets_private.*.id

  ecs_cluster_name        = data.aws_ecs_cluster.ecs_main_cluster.cluster_name
  ecs_cluster_arn         = data.aws_ecs_cluster.ecs_main_cluster.arn
  task_definition_arn     = module.ecs-fargate-task-definition.aws_ecs_task_definition_td.arn
  container_name          = module.ecs-fargate-task-definition.container_name
  container_port          = module.ecs-fargate-task-definition.container_port
  desired_count           = var.desired_count
  platform_version        = var.platform_version
  security_groups         = var.security_groups
  enable_ecs_managed_tags = var.enable_ecs_managed_tags
  role_arn = {
    management-dns = "arn:aws:iam::${local.account[local.management_account[local.environment]]}:role/${var.assume_role}"
  }
  interface_vpce_sg_id      = data.terraform_remote_state.aws_analytical_env_infra.outputs.interface_vpce_sg_id
  s3_prefixlist_id          = data.terraform_remote_state.aws_analytical_env_infra.outputs.s3_prefix_list_id
  common_tags               = local.common_tags
  parent_domain_name        = local.parent_domain_name[local.environment]
  root_dns_prefix           = local.root_dns_prefix[local.environment]
  cert_authority_arn        = data.terraform_remote_state.aws_certificate_authority.outputs.root_ca.arn
}