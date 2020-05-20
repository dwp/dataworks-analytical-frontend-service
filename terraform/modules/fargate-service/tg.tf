resource "aws_lb_target_group" "lb_tg" {
  depends_on  = [aws_lb.lb]
  name        = "${var.name_prefix}-lb-tg"
  target_type = "ip"
  protocol    = "HTTPS"
  port        = var.container_port
  vpc_id      = var.vpc_id
  health_check {
    path     = var.lb_health_check_path
    port     = var.container_port
    protocol = "HTTPS"
  }
  tags = merge(var.common_tags, { Name = "${var.name_prefix}-tg" })
}