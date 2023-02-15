#!/bin/sh
set -e # exit script if any command exits
set -x # print each command it executes 

function gcloud_run_deploy() {
  set -x
  gcloud run deploy \
    $VPC_FLAG \
    $SECRET_FLAG \
    --image gcr.io/$GCP_PROJECT_ID/$IMAGE_NAME:$IMAGE_TAG \
    --project $GCP_PROJECT_ID \
    --region $DEPLOY_REGION \
    --platform managed \
    --allow-unauthenticated 

}

source .env.local
# NOTE: .env.local must hold the following environment variables
# .env.local SHOULD NOT be shared and only served from the local. 
#
# IMAGE_NAME
# IMAGE_TAG
# GCP_PROJECT_ID
# DEPLOY_REGION 
# VPC_CONNECTOR (optional)
# VPC_REGION (optional)
# SECRET_ENVIRONMENT_VARIABLE_* (optional: name of environment variable as secret on Google Cloud Run)
# SECRET_NAME_* (optional: name of secret from Google Cloud Secret) 

docker build -t $IMAGE_NAME:$IMAGE_TAG .
docker tag $IMAGE_NAME:$IMAGE_TAG gcr.io/$GCP_PROJECT_ID/$IMAGE_NAME:$IMAGE_TAG
docker push gcr.io/$GCP_PROJECT_ID/$IMAGE_NAME:$IMAGE_TAG

if [ -n "$VPC_REGION" ] && [ -n "$VPC_CONNECTOR" ]; then
  VPC_FLAG="--vpc-connector $VPC_CONNECTOR --region=$VPC_REGION --vpc-egress=all-traffic"
fi

secret_env_vars=(${!SECRET_ENVIRONMENT_VARIABLE_*})
for env_var_name in "${secret_env_vars[@]}"; do
  env_var_value="${!env_var_name}"
  secret_name=$(eval "echo \${SECRET_NAME_${env_var_name#SECRET_ENVIRONMENT_VARIABLE_}}")
  env_var_name=$(eval "echo \${SECRET_ENVIRONMENT_VARIABLE_${env_var_name#SECRET_ENVIRONMENT_VARIABLE_}}")
  SECRET_FLAG="$SECRET_FLAG --update-secrets $env_var_name=$secret_name:latest"
done

gcloud_run_deploy $VPC_FLAG $SECRET_FLAG
