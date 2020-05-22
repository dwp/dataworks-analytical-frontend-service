# ---------------------------------------------------------------------------------------------------------------------
# AWS ECS SERVICE
# ---------------------------------------------------------------------------------------------------------------------
output "aws_ecs_service_service" {
  description = "The ECS Service"
  value       = aws_ecs_service.service
}

output "ecs_tasks" {
  description = "$${var.name_prefix} ECS Tasks Security Group - The ID of the security group"
  value       = aws_security_group.ecs_tasks_sg
}

