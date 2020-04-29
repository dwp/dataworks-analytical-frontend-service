output "jupyterhub_bucket" {
  description = "The name of the JupyterHub storage bucket"
  value       = aws_s3_bucket.jupyter_storage
}