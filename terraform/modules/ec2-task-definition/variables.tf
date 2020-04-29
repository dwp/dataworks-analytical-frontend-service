variable "name_prefix" {
  type        = string
  description = "(Required) Name prefix for resources we create, defaults to repository name"
}
variable "chrome_image" {
  type        = string
  description = "(Required) The custom Chrome image"
}
variable "guacd_image" {
  type        = string
  description = "(Required) The custom Guacd image"
}
variable "jupyterhub_image" {
  type        = string
  description = "(Required) The custom JupyterHub image"
}
variable "guacamole_client_image" {
  type        = string
  description = "(Required) The custom Guacamole client image"
}
variable "cognito_user_pool_id" {
  type        = string
  description = "(Required) ID of the Cognito User pool"
}
