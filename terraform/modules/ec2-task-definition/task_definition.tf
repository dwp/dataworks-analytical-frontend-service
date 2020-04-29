resource "aws_ecs_task_definition" "service" {
  family             = "${var.name_prefix}-ui-service"
  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn      = aws_iam_role.ecs_task_role.arn
  network_mode       = "bridge"

  container_definitions = <<TASK_DEFINITION
      [
      {

          "name": "jupyterHub",
          "image": "${var.jupyterhub_image}",
          "cpu": 512,
          "memory": 512,
          "essential": true,
          "portMappings": [
            {
              "containerPort": 8000,
              "hostPort": 8443
            }
          ]
       },
      {
          "name": "headless_chrome",
          "image" : "${var.chrome_image}",
          "cpu": 256,
          "memory": 256,
          "essential": true,
          "links":["jupyterHub"],
          "portMappings": [
            {
              "containerPort": 5900,
              "hostPort": 5900
            }
          ],
          "environment": [
            {
              "name": "VNC_OPTS",
              "value": "-rfbport 5900 -xkb -noxrecord -noxfixes -noxdamage -display :1 -nopw -wait 5 -shared -permitfiletransfer -tightfilexfer -noclipboard -nosetclipboard"
            }
          ]
      },
      {
          "name": "guacd",
          "image": "${var.guacd_image}",
          "cpu": 128,
          "memory": 128,
          "essential": true,
          "links":["headless_chrome"],
          "portMappings": [
            {
              "containerPort": 4822,
              "hostPort": 4822
            }
          ]
      },
      {
          "name": "guacamole",
          "image": "${var.guacamole_client_image}",
          "cpu": 256,
          "memory": 256,
          "essential": true,
          "links":["guacd", "headless_chrome"],
          "portMappings": [
            {
              "containerPort": ${local.guacamole_port},
              "hostPort": ${local.guacamole_port}
            }
          ],
          "environment": [
            {
              "name": "GUACD_HOSTNAME",
              "value": "guacd"
            },
            {
              "name": "GUACD_PORT",
              "value": "4822"
            },
            {
              "name": "KEYSTORE_DATA",
              "value": "${base64encode(data.http.well_known_jwks.body)}"
            },
            {
              "name": "VALIDATE_ISSUER",
              "value": "true"
            },
            {
              "name": "ISSUER",
              "value": "${local.cognito_endpoint}"
            },
            {
              "name": "CLIENT_PARAMS",
              "value": "hostname=headless_chrome,port=5900,disable-copy=true"
            }
          ]
      }
]
TASK_DEFINITION
}
