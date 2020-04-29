resource "aws_ecs_service" "service" {
  depends_on                         = [aws_lb_listener.listener]
  name                               = "${var.name_prefix}-service"
  cluster                            = var.ecs_cluster_arn
  task_definition                    = var.task_definition_arn
  launch_type                        = "FARGATE"
  desired_count                      = var.desired_count
  platform_version                   = var.platform_version
  deployment_maximum_percent         = var.deployment_maximum_percent
  deployment_minimum_healthy_percent = var.deployment_minimum_healthy_percent
  enable_ecs_managed_tags            = var.enable_ecs_managed_tags
  dynamic "ordered_placement_strategy" {
    for_each = var.ordered_placement_strategy
    content {
      type  = ordered_placement_strategy.value.type
      field = lookup(ordered_placement_strategy.value, "field", null)
    }
  }
  health_check_grace_period_seconds = var.health_check_grace_period_seconds
  dynamic "placement_constraints" {
    for_each = var.placement_constraints
    content {
      expression = lookup(placement_constraints.value, "expression", null)
      type       = placement_constraints.value.type
    }
  }
  dynamic "service_registries" {
    for_each = var.service_registries
    content {
      registry_arn   = service_registries.value.registry_arn
      port           = lookup(service_registries.value, "port", null)
      container_name = lookup(service_registries.value, "container_name", null)
      container_port = lookup(service_registries.value, "container_port", null)
    }
  }
  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks_sg.id]
    subnets          = var.private_subnets
    assign_public_ip = var.assign_public_ip
  }
  load_balancer {
    target_group_arn = aws_lb_target_group.lb_tg.arn
    container_name   = var.container_name
    container_port   = var.container_port
  }
}
