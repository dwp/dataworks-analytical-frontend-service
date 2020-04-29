data "aws_availability_zones" "available" {}

data "aws_ecs_cluster" "ecs_main_cluster" {
  cluster_name = "main"
}
