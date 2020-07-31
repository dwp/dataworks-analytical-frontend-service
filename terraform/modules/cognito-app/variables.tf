variable name {
  type        = string
  description = "(Required) Name of app_client"
}

variable user_pool_id {
  type        = string
  description = "(Required) User pool ID in which to create app client"
}

variable adfs_identity_provider_name {
  type        = string
  description = "(Required) Name of ADFS Identity Provider"
}

variable callback_urls {
  type        = list(string)
  description = "(Required) Call back URLs to be accepted by client"
}

variable "role_arn" {
  type        = map(string)
  description = "(Required) The role to assume when doing an apply, defaults to ci"
}
