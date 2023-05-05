#!/bin/sh
set -e # exit script if any command exits
set -x # print each command it executes 

function gcloud_run_deploy() {
  set -x
  gcloud run deploy \
    $VPC_FLAG \
    $SECRET_FLAG \
    $SERVICE_NAME \
    $ENV_VARS \
    --image gcr.io/$GCP_PROJECT_ID/$IMAGE_NAME:$IMAGE_TAG \
    --project $GCP_PROJECT_ID \
    --region $DEPLOY_REGION \
    --platform managed \
    --allow-unauthenticated \
    --cpu-boost
}

source .env.local
# NOTE: .env.local must hold the following environment variables
# .env.local SHOULD NOT be shared and only served from the local. 
# Therefore .env.local must be listed in `dockerignore` and `gitignore`.
#
# SERVICE_NAME
# IMAGE_NAME
# IMAGE_TAG
# GCP_PROJECT_ID
# DEPLOY_REGION 
# HOSTNAME 
# VPC_CONNECTOR (optional)
# VPC_REGION (optional)
# GCR_* (optional: name of environment variable that is not secret but storing into Google Cloud Run) 
# SECRET_ENVIRONMENT_VARIABLE_* (optional: name of environment variable as secret on Google Cloud Run)
# SECRET_NAME_* (optional: name of secret from Google Cloud Secret) 

gcr_env_var=(${!GCR_*})
for env_var_name in "${gcr_env_var[@]}"; do
  env_val=$(eval "echo \${GCR_${env_var_name#GCR_}}")
  env_var_name=${env_var_name#GCR_}
  if [ -z "$BUILD_ARGS" ]; then
    BUILD_ARGS="--build-arg BUILD_$env_var_name=$env_val"
  else
    BUILD_ARGS="$BUILD_ARGS --build-arg BUILD_$env_var_name=$env_val"
  fi
  ENV_VARS="$ENV_VARS,GCR_$env_var_name=$env_val"
done

BUILD_ARGS=$(echo $BUILD_ARGS | sed 's/ --build-arg/ --build-arg/g')
ENV_VARS="--set-env-vars ${ENV_VARS#,}"


docker build $BUILD_ARGS -t $IMAGE_NAME:$IMAGE_TAG .
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

gcloud_run_deploy 


