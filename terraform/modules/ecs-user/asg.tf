resource "aws_autoscaling_group" "user_host" {
  name                  = "${var.name_prefix}-asg"
  max_size              = var.auto_scaling.max_size
  min_size              = var.auto_scaling.min_size
  max_instance_lifetime = var.auto_scaling.max_instance_lifetime
  protect_from_scale_in = true

  vpc_zone_identifier = var.vpc.aws_subnets_private[*].id

  launch_template {
    id      = aws_launch_template.user_host.id
    version = "$Latest"
  }

  dynamic "tag" {
    for_each = var.common_tags
    content {
      key                 = tag.key
      value               = tag.value
      propagate_at_launch = true
    }
  }

  lifecycle {
    create_before_destroy = true
  }
}

data "template_cloudinit_config" "ecs_config" {
  gzip          = true
  base64_encode = true

  part {
    content_type = "text/x-shellscript"
    content      = <<EOF
    #!/bin/bash
    yum install -y amazon-ssm-agent && initctl start amazon-ssm-agent
EOF
  }

  part {
    content_type = "text/x-shellscript"
    content      = <<EOF
    #!/bin/bash
    echo ECS_CLUSTER=${var.name_prefix} >> /etc/ecs/ecs.config
EOF
  }

}

resource "aws_launch_template" "user_host" {
  name_prefix                          = "${var.name_prefix}-"
  image_id                             = var.ami_id
  instance_type                        = var.instance_type
  instance_initiated_shutdown_behavior = "terminate"
  tags                                 = merge(var.common_tags, { Name = "${var.name_prefix}-lt" })

  user_data = data.template_cloudinit_config.ecs_config.rendered

  block_device_mappings {
    device_name = "/dev/xvda"

    ebs {
      delete_on_termination = true
      encrypted             = true
      volume_size           = 32
    }
  }

  block_device_mappings {
    device_name = "/dev/sda1"
    no_device   = true
  }

  iam_instance_profile {
    arn = aws_iam_instance_profile.user_host.arn
  }

  tag_specifications {
    resource_type = "instance"
    tags          = merge(var.common_tags, { Name = var.name_prefix, "SSMEnabled" = "True" })
  }

  tag_specifications {
    resource_type = "volume"
    tags          = merge(var.common_tags, { Name = var.name_prefix })
  }

  network_interfaces {
    associate_public_ip_address = false
    delete_on_termination       = true

    security_groups = [
      aws_security_group.user_host.id
    ]
  }

  lifecycle {
    create_before_destroy = true
  }
}

