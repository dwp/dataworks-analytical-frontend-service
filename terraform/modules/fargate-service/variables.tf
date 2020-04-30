# ---------------------------------------------------------------------------------------------------------------------
# Misc
# ---------------------------------------------------------------------------------------------------------------------
variable "name_prefix" {
  type        = string
  description = "(Required) Name prefix for resources we create, defaults to repository name"
}

# ---------------------------------------------------------------------------------------------------------------------
# AWS CREDENTIALS AND REGION
# ---------------------------------------------------------------------------------------------------------------------

variable "region" {
  type        = string
  description = "(Required) The region to deploy into"
}

# ---------------------------------------------------------------------------------------------------------------------
# AWS Networking
# ---------------------------------------------------------------------------------------------------------------------
variable "vpc_id" {
  type        = string
  description = "(Required) ID of the VPC"
}

# ---------------------------------------------------------------------------------------------------------------------
# AWS ECS SERVICE
# ---------------------------------------------------------------------------------------------------------------------
variable "task_definition_arn" {
  type        = string
  description = "(Required) The full ARN of the task definition that you want to run in your service."
}

variable "ecs_cluster_name" {
  type        = string
  description = "(Required) Name of the ECS cluster"
}

variable "ecs_cluster_arn" {
  type        = string
  description = "(Required) ARN of an ECS cluster"
}

variable "private_subnets" {
  type        = list
  description = "(Required) The private subnets associated with the task or service."
}

variable "container_name" {
  type        = string
  description = "(Required) Name of the running container"
}

variable "container_port" {
  type        = string
  description = "(Optional) Port on which the container is listening"
  default     = "8443"
}

variable "desired_count" {
  type        = number
  description = "(Optional) The number of instances of the task definition to place and keep running. Defaults to 1."
  default     = 1
}

variable "platform_version" {
  type        = string
  description = "(Optional) The platform version on which to run your service. Defaults to LATEST. More information about Fargate platform versions can be found in the AWS ECS User Guide."
  default     = "LATEST"
}

variable "deployment_maximum_percent" {
  type        = number
  description = "(Optional) The upper limit (as a percentage of the service's desiredCount) of the number of running tasks that can be running in a service during a deployment."
  default     = 200
}

variable "deployment_minimum_healthy_percent" {
  type        = number
  description = "(Optional) The lower limit (as a percentage of the service's desiredCount) of the number of running tasks that must remain running and healthy in a service during a deployment."
  default     = 100
}

variable "enable_ecs_managed_tags" {
  type        = bool
  description = "(Optional) Specifies whether to enable Amazon ECS managed tags for the tasks within the service.Valid values are true or false. Default true."
  default     = false
}

variable "ordered_placement_strategy" {
  type        = list
  description = "(Optional) Service level strategy rules that are taken into consideration during task placement. List from top to bottom in order of precedence. The maximum number of ordered_placement_strategy blocks is 5. This is a list of maps where each map should contain \"id\" and \"field\""
  default     = []
}

variable "health_check_grace_period_seconds" {
  type        = number
  description = "(Optional) Seconds to ignore failing load balancer health checks on newly instantiated tasks to prevent premature shutdown, up to 2147483647. Only valid for services configured to use load balancers."
  default     = 0
}

variable "placement_constraints" {
  type        = list
  description = "(Optional) rules that are taken into consideration during task placement. Maximum number of placement_constraints is 10. This is a list of maps, where each map should contain \"type\" and \"expression\""
  default     = []
}

variable "service_registries" {
  type        = map
  description = "(Optional) The service discovery registries for the service. The maximum number of service_registries blocks is 1. This is a map that should contain the following fields \"registry_arn\", \"port\", \"container_port\" and \"container_name\""
  default     = {}
}

variable "security_groups" {
  type        = list
  description = "(Optional) The security groups associated with the task or service. If you do not specify a security group, the default security group for the VPC is used."
  default     = []
}

variable "assign_public_ip" {
  type        = bool
  description = "(Optional) Assign a public IP address to the ENI (Fargate launch type only). Valid values are true or false. Default false."
  default     = false
}

variable "lb_health_check_path" {
  type        = string
  description = "(Optional) Health check path for the Load Balancer"
  default     = "/"
}

variable "role_arn" {
  type        = map(string)
  description = "(Required) The role to assume when doing an apply, defaults to ci"
}

variable "interface_vpce_sg_id" {
  type        = string
  description = "(Required) The VPCe Security group ID"
}

variable "s3_prefixlist_id" {
  type        = string
  description = "(Required) The PrefixList ID for s3, required for docker pull"
}

variable "instance_max_count" {
  type        = number
  description = "(Optional) The maximum number of instances you would like running"
  default     = 4
}

variable "root_dns_prefix" {
  type        = string
  description = "(Required) Zone to create DNS record in"
}

variable "cert_authority_arn" {
  type        = string
  description = "(Required) The ARN of the ACM CA creating our certificate"
}

variable "common_tags" {
  type        = map(string)
  description = "(Required) common tags to apply to aws resources"
}

variable "parent_domain_name" {
  type        = string
  description = "(Required) The parent domain name"
}
