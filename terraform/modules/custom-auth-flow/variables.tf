variable "name_prefix" {
  type        = string
  description = "(Required) Name prefix for resources created"
}

variable "common_tags" {
  type        = map(string)
  description = "(Required) common tags to apply to aws resources"
}

variable "region" {
  type        = string
  description = "(Required) AWS region in which the code is hosted"
}

variable "account" {
<<<<<<< HEAD
  type        = string
=======
  type        = map(string)
>>>>>>> 1d9b461db3e0e68141b9031d6bf586667990bfba
  description = "(Required) AWS account number"
}

variable "cognito_user_pool_arn" {
  type        = string
  description = "(Required) AWS account number"
}
