output "app_client" {
  value = {
    user_pool_id = module.cognito-app.outputs.app_client.user_pool_id
    id           = module.cognito-app.outputs.app_client.id
  }
}
