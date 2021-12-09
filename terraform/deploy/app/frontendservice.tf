# ---------------------------------------------------------------------------------------------------------------------
# ECS Task Definition
# ---------------------------------------------------------------------------------------------------------------------
module "ecs-fargate-task-definition" {
  source                       = "../../modules/fargate-task-definition"
  name_prefix                  = var.name_prefix
  container_name               = var.container_name
  container_image              = local.container_image
  container_image_tag          = var.container_image_tag[local.environment]
  container_port               = var.container_port
  container_cpu                = var.container_cpu
  container_memory             = var.container_memory
  container_memory_reservation = var.container_memory_reservation
  common_tags                  = local.common_tags
  role_arn                     = "arn:aws:iam::${local.account[local.environment]}:role/${var.assume_role}"
  management_role_arn          = "arn:aws:iam::${local.account[local.management_account[local.environment]]}:role/${var.assume_role}"
  repository_name              = var.ecr_repository_name
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
      name  = "REACT_APP_OS_URL"
      value = "https://${data.terraform_remote_state.orchestration-service.outputs.orchestration_service_fqdn}"
    },
    {
      name  = "REACT_APP_REGION"
      value = data.aws_region.current.name
    },
    {
      name  = "REACT_APP_USERPOOL_WEBCLIENTID"
      value = module.cognito-app.outputs.app_client.id
    },
    {
      name  = "REACT_APP_USERPOOLID"
      value = data.terraform_remote_state.aws_analytical_env_cognito.outputs.cognito.user_pool_id
    },
    {
      name  = "REACT_APP_COGNITO_DOMAIN"
      value = "${data.terraform_remote_state.aws_analytical_env_cognito.outputs.cognito.user_pool_domain}.auth.${data.aws_region.current.name}.amazoncognito.com"
    },
    {
      name  = "REACT_APP_FEDERATED_PROVIDER"
      value = data.terraform_remote_state.aws_analytical_env_cognito.outputs.cognito.adfs_identity_provider_name
    },
    {
      name  = "REACT_APP_ENV"
      value = local.environment
    },
    {
      name  = "ALLOW_HTTP"
      value = "false"
    },
    {
      name  = "NODE_TLS_REJECT_UNAUTHORIZED"
      value = "0"
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
  vpc_id          = data.terraform_remote_state.aws_analytical_env_infra.outputs.vpc.aws_vpc.id
  service_subnets = data.terraform_remote_state.aws_analytical_env_infra.outputs.vpc.aws_subnets_private.*.id

  ecs_cluster_name        = data.aws_ecs_cluster.ecs_main_cluster.cluster_name
  ecs_cluster_arn         = data.aws_ecs_cluster.ecs_main_cluster.arn
  task_definition_arn     = module.ecs-fargate-task-definition.aws_ecs_task_definition_td.arn
  container_name          = var.container_name
  desired_count           = var.desired_count
  platform_version        = var.platform_version
  security_groups         = var.security_groups
  enable_ecs_managed_tags = var.enable_ecs_managed_tags
  service_registries      = {
    value = {
      registry_arn = aws_service_discovery_service.analytical_frontend_service.arn
      container_name = var.container_name
      container_port = var.container_port
    }
  }

  interface_vpce_sg_id = data.terraform_remote_state.aws_analytical_env_infra.outputs.interface_vpce_sg_id
  s3_prefixlist_id     = data.terraform_remote_state.aws_analytical_env_infra.outputs.s3_prefix_list_id
  common_tags          = local.common_tags

  analytical_alb_sg       = data.terraform_remote_state.aws_analytical_env_infra.outputs.alb_sg.id
  os_alb_sg               = data.terraform_remote_state.orchestration-service.outputs.alb_sg.id
  analytical_alb_listener = data.terraform_remote_state.aws_analytical_env_infra.outputs.alb_listner.arn

}

module cognito-app {
  source                      = "../../modules/cognito-app/"
  name                        = var.name_prefix
  user_pool_id                = data.terraform_remote_state.aws_analytical_env_cognito.outputs.cognito.user_pool_id
  adfs_identity_provider_name = data.terraform_remote_state.aws_analytical_env_cognito.outputs.cognito.adfs_identity_provider_name
  callback_urls               = ["https://${data.terraform_remote_state.aws_analytical_env_infra.outputs.alb_fqdn}"]
  role_arn = {
    management = "arn:aws:iam::${local.account[local.management_account[local.environment]]}:role/${var.assume_role}"
  }
}

