# ---------------------------------------------------------------------------------------------------------------------
# AWS ECS Task Execution Role
# ---------------------------------------------------------------------------------------------------------------------
output "aws_iam_role_ecs_task_execution_role" {
  description = "The Task Execution Role."
  value       = aws_iam_role.ecs_task_execution_role
}

# ---------------------------------------------------------------------------------------------------------------------
# ECS Task Definition
# ---------------------------------------------------------------------------------------------------------------------
output "aws_ecs_task_definition_td" {
  description = "Full ARN of the Task Definition (including both family and revision)."
  value       = aws_ecs_task_definition.td
}
