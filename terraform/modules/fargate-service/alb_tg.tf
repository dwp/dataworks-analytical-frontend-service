resource "aws_lb_listener_rule" "analytical_alb_listener" {
  listener_arn = var.analytical_alb_listener
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.lb_tg.arn
  }

  condition {
    path_pattern {
      values = ["/*"]
    }
  }
}

resource "aws_lb_target_group" "lb_tg" {
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
  tags = { Name = "${var.name_prefix}-tg" }
}
