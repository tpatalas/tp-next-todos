# Auto-Prioritized Todo Application

##### [DEMO LIVE SITE](https://todo.atalas.dev)

This advanced Todo application is built with Next.js and deployed on Google Cloud Run
with Docker. It automatically selects the most prioritized todo items and adds them to
`Today's Focus` to reduce manual management of tasks. The total number of items
displayed on `Today's Focus` varies based on users' capacities, with the default
minimum value set to 7.

Deploying the application to Google Cloud Run is easy; simply running `deploy.sh`
will automatically deploy to Google Cloud Run based on the values defined
within `local.env`.

> Currently, the `demo-session` is enabled, allowing visitors to perform CRUD
> operations without signing in to the application or involving network requests
> to a remote database. However, during the `demo-session`, any values set by
> visitors will not persist unless they sign in.

## Table of Contents

<!-- vim-markdown-toc GFM -->

- [Features](#features)
- [Installation](#installation)
  - [Clone the repository to your favorite directory](#clone-the-repository-to-your-favorite-directory)
- [Deployment](#deployment)
  - [Create Google Cloud Console Account and project. Install the Google Cloud SDK](#create-google-cloud-console-account-and-project-install-the-google-cloud-sdk)
  - [Prepare secrets for Google Cloud Secrets Managers](#prepare-secrets-for-google-cloud-secrets-managers)
  - [Prepare the environment variables (non-secrets variables)](#prepare-the-environment-variables-non-secrets-variables)
  - [Create secrets to Google Secret Manager](#create-secrets-to-google-secret-manager)
  - [[Optional] Setup VPC Access Connector](#optional-setup-vpc-access-connector)
  - [Setup `.env.local`](#setup-envlocal)
  - [[Optional] Remove Image Domain enviornment variable substation if Image Domain is not provided](#optional-remove-image-domain-enviornment-variable-substation-if-image-domain-is-not-provided)
  - [Deploy](#deploy)
- [Resources](#resources)
- [License](#license)

<!-- vim-markdown-toc -->

## Features

- **Automatic todo prioritization:**<br>
  Equip with derived states of state management library called Recoil to compute the
  top priorities of todo items. Computed based on multiple factors. For example,
  todo item without any due date and priority will also be shown on the `Today's Focus`
  based on computed priority scores.

- **Managing state of client and server side at once:**<br>
  Utilizes the `atomEffect` of Recoil to seamlessly combine the client and server-side
  state management. For example, the `atomQueryTodoIds` can perform updates to
  the client state and the server state in the background, without interrupting the client
  experience. Additionally, the state is automatically persisted in client storage,
  indexedDB.

- **Selective Fetches:**<br>
  Utilizing the `atomEffect` described above, the application fetches only the required
  data by comparing the data stored in the indexedDB with the updated time.
  This feature helps to reduce unnecessary network requests and improve the
  application's performance. (emptying client stores will perform full fetches, but
  preventing partial deletion is not yet supported)

- **Email and OAuth authentication with Auth.js (aka Next-Auth):**<br>
  Email authentication with magic links, along with Google and Github OAuth, are enabled.
  Currently, credential authentication method is disabled.

- **CRUD Operations:**<br>
  Supports CRUD operations for labels, todo items, and notes, including due dates,
  priorities (urgent, important, and normal), completion, and more.

- **Demo-Session:**<br>
  Enables users to use the application in demo mode with default values without
  involving the database. During the demo-session, users can perform client-side
  in-memory CRUD operations. As soon as the user signs in, the demo-session is
  disabled.

- **MongoDB Integration:**<br>
  Employs MongoDB and Mongoose for data modeling and database operations, utilizing
  Mongoose transactions and aggregation pipelines to perform multiple queries
  on documents in different collections.

- **Google Cloud Run Deployment with Docker:**<br>
  Deployed on Google Cloud Run using Docker, this feature includes an automatic
  deployment script `deploy.sh` that streamlines the tedious configuration process
  by allowing users to define values within the local.env file. This feature
  simplifies the deployment process and allows for easy updates to the application
  in the future.

## Installation

#### Clone the repository to your favorite directory

1. Clone the repository by running the following command:

```sh
git clone https://github.com/tpAtalas/tp-next-todos.git
```

2. If you do not plan to implement all of the services, such as the email provider,
   OAuth, MongoDB Atlas, Google Cloud Run, and more, you may stop here.

## Deployment

#### Create Google Cloud Console Account and project. Install the Google Cloud SDK

1. Create Account and project from [Google Cloud Platform](https://cloud.google.com/)

2. Install Google Cloud SDK

> Google Cloud SDK is the command-line tools that allows developers to manage and
> interact with Google Cloud Platform resources.
>
> Other installation methods of [Google Cloud SDK](https://cloud.google.com/sdk/docs/install-sdk)

```sh
# for linux and macOS
brew install --cask google-cloud-sdk
```

#### Prepare secrets for Google Cloud Secrets Managers

> Secrets are sensitive pieces of information, such as API keys, that should be kept
> confidential and not made public.
>
> More Info from Wiki: [Manage sensitive information to Google Cloud Secret Manager](https://github.com/tpAtalas/tp-next-todos/wiki/Manage-sensitive-information-to-Google-Cloud-Secret-Manager)
>
> **Please note that the steps for obtaining these secrets are not included
> here**

1. [Database] Obtain MongoDB URI after creating database from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/).
2. [OAuth Providers] Obtain Client ID and Client Secret from Google and Github.
3. [Email Provider] Obtain Email server user and Email server password from
   transactional email service. (Please store the other information for next
   steps)

   > For references:  
   > 5 list of well known transactional email services:
   >
   > - [Postmark](https://postmarkapp.com/)
   > - [Amazon SES](https://aws.amazon.com/ses/)
   > - [Mailgun](https://www.mailgun.com/)
   > - [Elastic Email](https://elasticemail.com/)
   > - [SendGrid](https://sendgrid.com/)

4. Generate Next Auth secret and JWT secret by running following command into the
   terminal:

   ```sh
    # get NextAuth's secret
    openssl rand -base64 32
    # Run one more time to get JWT secret
    openssl rand -base64 32
   ```

#### Prepare the environment variables (non-secrets variables)

> Unlike the secrets from previous steps, these variables are either accessible
> by clients or servers.

1. Prepare the environment variables for the email server using the information
   provided when the transactional email service was created in the previous steps:

   - Server Host
   - Server Port
   - From Email

2. Prepare the hostname and image domain (Optional).

> If you do not provide image domain, `deploy.sh` will skip setting it as environment variables.

#### Create secrets to Google Secret Manager

> More info from Wiki:
>
> [Manage sensitive information to Google Cloud Secret Manager](https://github.com/tpAtalas/tp-next-todos/wiki/Manage-sensitive-information-to-Google-Cloud-Secret-Manager)

1. Go to your terminal and log in to Google Cloud by running the following command:

```sh
# log in if necessary
gcloud auth login
```

2. Create the secrets in Secret Manager by running the following command.

> You must run each command to create the secrets.
> You can also create the secrets through the Google Cloud Platform UI:
>
> [Go to Google Cloud Secret Manager](https://console.cloud.google.com/security/secret-manager)

```sh
# gcloud secrets create [secret_name] --replication-policy="automatic"
gcloud secrets create MONGODB_URI --replication-policy="automatic"
gcloud secrets create NEXTAUTH_SECRET --replication-policy="automatic"
gcloud secrets create NEXTAUTH_JWT_SECRET --replication-policy="automatic"
gcloud secrets create EMAIL_SERVER_USER --replication-policy="automatic"
gcloud secrets create EMAIL_SERVER_PASSWORD --replication-policy="automatic"
gcloud secrets create GOOGLE_CLIENT_ID --replication-policy="automatic"
gcloud secrets create GOOGLE_CLIENT_SECRET --replication-policy="automatic"
gcloud secrets create GITHUB_CLIENT_ID --replication-policy="automatic"
gcloud secrets create GITHUB_CLIENT_SECRET --replication-policy="automatic"

# confirm your secrets
gcloud secrets list

```

3. To add the secret values, it is recommended to go to the Google Cloud Platform
   and insert them manually for security reasons. Alternatively, you can add the
   secret values by running the following command (optional):

> [Go to Google Cloud Secret Manager](https://console.cloud.google.com/security/secret-manager)

```sh
# you must create each file that contains the value of secret.

# gcloud secrets versions add [secret_name] --data-file=[file_name]
gcloud secrets versions add GITHUB_CLIENT_SECRET --data-file=secret-github

```

#### [Optional] Setup VPC Access Connector

> To securely connect your MongoDB Atlas database to your application, you need to
> whitelist the static IP address of your application. However, serverless
> platforms like Vercel only provide dynamic IP addresses, making it impossible to
> use a static IP for this purpose. In this case, you may need to resort to using
> catch-all CIDR notation (0.0.0.0/0).
>
> If using a catch-all CIDR is not an option due to increase of security risk, you
> can instead use a VPC Access Connector to assign a static IP address to your
> serverless platform, such as Google Cloud Run.
>
> More info about VPC Access Connector from Wiki:
>
> [Connection issue with MongoDB Atlas (Serverless Tier and Free/Shared Tier) and Google Cloud Run](https://github.com/tpAtalas/tp-next-todos/wiki/Troubleshooting-Google-Cloud-Run#connection-issue-with-mongodb-atlas-serverless-tier-and-freeshared-tier-and-google-cloud-run)

#### Setup `.env.local`

1. Go to your cloned project root directory and create a file named `.env.local`.

> The filename must be `.env.local` or else `deploy.sh` will fail to deploy to Google Cloud Run.

2. Add the following contents to `.env.local`:

> Do not remove the prefix `GCR_` as it will be used by `deploy.sh` for environment variable substitutions.
>
> For more information about environment variable substitution, you can refer to the Wiki page:
>
> [Environment Variables defined within Google Cloud Run are not available](https://github.com/tpAtalas/tp-next-todos/wiki/Troubleshooting-Google-Cloud-Run#environment-variables-defined-within-google-cloud-run-are-not-available)

```
##############
# Next Auth #
#############
## Email Provider
# example below
# GCR_EMAIL_SERVER_HOST=smtp.gmail.com
# GCR_EMAIL_SERVER_PORT=587
# GCR_EMAIL_FROM=noreply@myEmail.dev
#
GCR_EMAIL_SERVER_HOST=[your email service name]
GCR_EMAIL_SERVER_PORT=[your email service port]
GCR_EMAIL_FROM=[your email service from address]
##########################################
# Google Cloud Run Environment Variables #
##########################################
# HOSTNAME
# GCR_HOSTNAME=myHostName.com
GCR_HOSTNAME=[your host name]
#
# IMAGE_DOMAIN (optional)
# GCR_IMAGE_DOMAIN=myImageDomain.media
GCR_IMAGE_DOMAIN=[your image domain]
#####################
# Deployment Values #
#####################
# Cloud Run Deploy
# SERVICE_NAME=my-todo-app01
# IMAGE_NAME=my-todo
# IMAGE_TAG=v0.0
# GCP_PROJECT_ID=myProjectID
# DEPLOY_REGION=us-central1
# VPC_CONNECTOR=my-vpc-connector
# VPC_REGION=us-central1
#
SERVICE_NAME=[GoogleCloudRun's service name]
IMAGE_NAME=[docker image name]
IMAGE_TAG=[docker image tag]
GCP_PROJECT_ID=[your Google Cloud Platform project ID]
DEPLOY_REGION=[Google Service Region]
VPC_CONNECTOR=[your VPC Connector name you have created]
VPC_REGION=[VPC Connector region]
###########
# Secrets #
###########
# Leave as below. These names will swap the values from Secret Manager during deployment.
# mongoDB
SECRET_ENVIRONMENT_VARIABLE_MONGODB=MONGODB_URI
SECRET_NAME_MONGODB=MONGODB_URI
# next-auth
SECRET_ENVIRONMENT_VARIABLE_NEXTAUTH=NEXTAUTH_SECRET
SECRET_NAME_NEXTAUTH=NEXTAUTH_SECRET
# next-auth jwt
SECRET_ENVIRONMENT_VARIABLE_NEXTAUTH_JWT=NEXTAUTH_JWT_SECRET
SECRET_NAME_NEXTAUTH_JWT=NEXTAUTH_JWT_SECRET
# next-auth Email provider
SECRET_ENVIRONMENT_VARIABLE_EMAIL_SERVER_USER=EMAIL_SERVER_USER
SECRET_NAME_EMAIL_SERVER_USER=EMAIL_SERVER_USER
SECRET_ENVIRONMENT_VARIABLE_EMAIL_SERVER_PASSWORD=EMAIL_SERVER_PASSWORD
SECRET_NAME_EMAIL_SERVER_PASSWORD=EMAIL_SERVER_PASSWORD
# next-auth OAuth Google
SECRET_ENVIRONMENT_VARIABLE_GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID
SECRET_NAME_GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID
SECRET_ENVIRONMENT_VARIABLE_GOOGLE_CLIENT_SECRET=GOOGLE_CLIENT_SECRET
SECRET_NAME_GOOGLE_CLIENT_SECRET=GOOGLE_CLIENT_SECRET
# next-auth OAuth Github
SECRET_ENVIRONMENT_VARIABLE_GITHUB_CLIENT_ID=GITHUB_CLIENT_ID
SECRET_NAME_GITHUB_CLIENT_ID=GITHUB_CLIENT_ID
SECRET_ENVIRONMENT_VARIABLE_GITHUB_CLIENT_SECRET=GITHUB_CLIENT_SECRET
SECRET_NAME_GITHUB_CLIENT_SECRET=GITHUB_CLIENT_SECRET

```

#### [Optional] Remove Image Domain enviornment variable substation if Image Domain is not provided

1. Go to `Dockerfile` from root directory of your cloned project.
2. Remove or comment following lines:

```
ARG BUILD_IMAGE_DOMAIN
ENV GCR_IMAGE_DOMAIN $BUILD_IMAGE_DOMAIN
```

#### Deploy

1. Run the following command to deploy to Google Cloud Run:

```sh
sh deploy.sh
```

## Resources

1. [Deploy Next.js App into Google Cloud Run(GCR) with Docker](<https://github.com/tpAtalas/tp-next-todos/wiki/Deploy-Next.js-App-into-Google-Cloud-Run(GCR)-with-Docker>)
2. [Manage sensitive information to Google Cloud Secret Manager](https://github.com/tpAtalas/tp-next-todos/wiki/Manage-sensitive-information-to-Google-Cloud-Secret-Manager)
3. [Troubleshooting Google Cloud Run](https://github.com/tpAtalas/tp-next-todos/wiki/Troubleshooting-Google-Cloud-Run)

## License

This project is licensed under the terms of the MIT License. See the [LICENSE](https://github.com/tpAtalas/tp-next-todos/blob/master/LICENSE) file for details.
