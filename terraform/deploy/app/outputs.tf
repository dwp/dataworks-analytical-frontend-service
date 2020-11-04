output fe_service {
  value = module.ecs-fargate-service
}

output "app_client" {
  value = module.cognito-app.outputs.app_client
}
