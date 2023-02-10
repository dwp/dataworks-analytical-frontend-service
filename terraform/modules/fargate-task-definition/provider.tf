provider "aws" {
  alias  = "management"
  region = "eu-west-2"

  default_tags {
    tags = {
      Application      = "DataWorks"                              # As per our definition on ServiceNow
      Function         = "Data and Analytics"                     # As per our definition on ServiceNow
      Environment      = local.hcs_environment[local.environment] # Set up locals as per Tagging doc requirements https://engineering.dwp.gov.uk/policies/hcs-cloud-hosting-policies/resource-identification-tagging/
      Business-Project = "PRJ0022507"                             # This seems to replace costcode as per the doc https://engineering.dwp.gov.uk/policies/hcs-cloud-hosting-policies/resource-identification-tagging/
      AutoShutdown     = "False"
      Persistence      = "True"
      Costcode         = "PRJ0022507"
    }
  assume_role {
    role_arn = var.management_role_arn
  }
}
