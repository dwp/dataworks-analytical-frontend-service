module "container_definition" {
  source  = "cloudposse/ecs-container-definition/aws"
  version = "0.21.0"

  container_name               = var.container_name
  container_image              = var.container_image
  container_memory             = var.container_memory
  container_memory_reservation = var.container_memory_reservation
  port_mappings                = local.port_mappings
  healthcheck                  = var.healthcheck
  container_cpu                = var.container_cpu
  essential                    = var.essential
  entrypoint                   = var.entrypoint
  command                      = var.command
  working_directory            = var.working_directory
  environment                  = var.environment
  secrets                      = var.secrets
  readonly_root_filesystem     = var.readonly_root_filesystem
  mount_points                 = var.mount_points
  dns_servers                  = var.dns_servers
  ulimits                      = var.ulimits
  docker_labels                = var.docker_labels
  repository_credentials       = var.repository_credentials
  volumes_from                 = var.volumes_from
  links                        = var.links
  user                         = var.user
  container_depends_on         = var.container_depends_on
  start_timeout                = var.start_timeout
  stop_timeout                 = var.stop_timeout
  system_controls              = var.system_controls
  firelens_configuration       = var.firelens_configuration
  log_configuration            = var.log_configuration
}

resource "aws_ecs_task_definition" "td" {
  family                = "${var.name_prefix}-td"
  container_definitions = module.container_definition.json
  execution_role_arn    = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn         = aws_iam_role.ecs_task_role.arn
  network_mode          = "awsvpc"
  dynamic "placement_constraints" {
    for_each = var.placement_constraints
    content {
      expression = lookup(placement_constraints.value, "expression", null)
      type       = placement_constraints.value.type
    }
  }
  cpu                      = var.container_cpu
  memory                   = var.container_memory
  requires_compatibilities = ["FARGATE"]
  dynamic "proxy_configuration" {
    for_each = var.proxy_configuration
    content {
      container_name = proxy_configuration.value.container_name
      properties     = lookup(proxy_configuration.value, "properties", null)
      type           = lookup(proxy_configuration.value, "type", null)
    }
  }
  tags = merge(var.common_tags, { Name = "${var.name_prefix}-td" })
}

resource "aws_cloudwatch_log_group" "lamda_logs" {
  name              = var.log_configuration.options["awslogs-group"]
  retention_in_days = 14
}
