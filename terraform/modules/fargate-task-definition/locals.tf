locals {
  port_mappings = [
    {
      "containerPort" = var.container_port
      "hostPort"      = var.container_port
      "protocol"      = "tcp"
    },
  ]
}
