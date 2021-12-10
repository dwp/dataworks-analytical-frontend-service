output "app_client" {
  value = {
    user_pool_id = module.cognito-app.outputs.app_client.user_pool_id
    id           = module.cognito-app.outputs.app_client.id
  }
}

output "frontend_service" {
  value = {
    service_port = var.container_port
    sg_id = module.ecs-fargate-service.ecs_tasks.id
    frontend_service_discovery_dns = aws_service_discovery_private_dns_namespace.analytical_frontend_service
    frontend_service_discovery     = aws_service_discovery_service.analytical_frontend_service
  }
}
