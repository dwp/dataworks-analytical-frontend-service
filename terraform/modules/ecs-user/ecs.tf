resource "random_id" "capacity_provider_suffix" {
  byte_length = 2
}

resource "aws_ecs_cluster" "user_host" {
  name               = var.name_prefix
  capacity_providers = [aws_ecs_capacity_provider.user_host.name]

  default_capacity_provider_strategy {
    capacity_provider = aws_ecs_capacity_provider.user_host.name
    weight            = 100
  }
}

resource "aws_ecs_capacity_provider" "user_host" {
  name = "${var.name_prefix}-${random_id.capacity_provider_suffix.hex}"
  auto_scaling_group_provider {
    auto_scaling_group_arn         = aws_autoscaling_group.user_host.arn
    managed_termination_protection = "ENABLED"

    managed_scaling {
      status                    = "ENABLED"
      maximum_scaling_step_size = 10
      minimum_scaling_step_size = 1
      target_capacity           = 100
    }

  }
}
