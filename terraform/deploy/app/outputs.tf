output fe_service {
  value = module.ecs-fargate-service
}

output pre_auth_lambda {
  value = module.pre-auth-lambda.pre_auth_lambda
}
