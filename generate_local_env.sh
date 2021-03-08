#!/bin/bash

# This script queries the running development environment to generate the 
# environment needed to run the app locally.

set -euo pipefail

cd "$(dirname "$0")"

echo "Using AWS profile $AWS_PROFILE..."

LATEST_AFE_QUERY='.taskDefinitionArns | sort | map(select(contains("analytical-frontend-svc")))[-1]'
LATEST_TASK=$(aws ecs list-task-definitions | \
               jq -r "$LATEST_AFE_QUERY")

ENV_JSON=$(aws ecs describe-task-definition --task-definition "$LATEST_TASK" | \
           jq .taskDefinition.containerDefinitions[0].environment)

echo "Cut and paste the variables generated below into your shell..."
echo

jq -r '.[] | "export \(.name)=\"\(if .name=="ALLOW_HTTP" then "true" elif '\
'.name=="REACT_APP_OS_URL" then "http://localhost:3006/" else .value end)\""' \
<<<"$ENV_JSON"

echo
exit 0

