<div align="center">

# Auto-Prioritized Todo Application

[![Test](https://img.shields.io/github/actions/workflow/status/tpatalas/tp-next-todos/run-tests.yml?label=test&logo=Github)](https://github.com/tpatalas/tp-next-todos/actions/workflows/run-tests.yml)
[![Build-push-docker-image](https://img.shields.io/github/actions/workflow/status/tpatalas/tp-next-todos/docker-image-build-push.yml?label=build&logo=Docker)](https://github.com/tpatalas/tp-next-todos/actions/workflows/docker-image-build-push.yml)
[![Deploy-docker-image](https://img.shields.io/github/actions/workflow/status/tpatalas/tp-next-todos/docker-image-deploy.yml?label=deploy&logo=Google%20Cloud)](https://github.com/tpatalas/tp-next-todos/actions/workflows/docker-image-deploy.yml)
[![Resource Purge](https://img.shields.io/github/actions/workflow/status/tpatalas/tp-next-todos/gcr-resources-optimization.yml?label=resource%20optimization&logo=Google%20Cloud)](https://github.com/tpatalas/tp-next-todos/actions/workflows/gcr-resources-optimization.yml)

[![License](https://img.shields.io/github/license/tpatalas/tp-next-todos?color=blue)](https://github.com/tpatalas/tp-next-todos/blob/master/LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/tpatalas/tp-next-todos?color=blue)](https://github.com/tpatalas/tp-next-todos/commits/master)
[![Project Status](https://img.shields.io/badge/project%20status-active-blue)](https://github.com/tpatalas/tp-next-todos)

##### [DEMO LIVE SITE](https://todo.atalas.dev)

</div>

This auto-prioritized todo application is built using Next.js and Docker. It includes an
algorithm that automatically prioritizes tasks, filling the `Today's Focus` section
based on this prioritization. The application adjusts to each user's task handling
capacity, defaulting to a minimum of seven tasks.

> Note: `Demo-session` mode is currently active, allowing unauthenticated users to
> explore CRUD operations without network requests to a remote database. Please note
> that changes made during this session will not persist unless the user signs in.

## Table of Contents

<!-- vim-markdown-toc GFM -->

- [Tech Stack (core)](#tech-stack-core)
- [Infrastructure](#infrastructure)
- [Features](#features)
  - [1. Automatic todo prioritization](#1-automatic-todo-prioritization)
  - [2. Unified State Management](#2-unified-state-management)
  - [3. Email and OAuth authentication with Auth.js (aka Next-Auth)](#3-email-and-oauth-authentication-with-authjs-aka-next-auth)
  - [4. CRUD Operations](#4-crud-operations)
  - [5. Interactive Demo-Session](#5-interactive-demo-session)
  - [6. CI/CD Pipeline](#6-cicd-pipeline)
  - [7. Unit/Integration testing](#7-unitintegration-testing)
- [Project Status](#project-status)
- [Installation](#installation)
  - [Clone the repository to your favorite directory](#clone-the-repository-to-your-favorite-directory)
- [Deployment](#deployment)
- [Resources](#resources)
- [License](#license)

<!-- vim-markdown-toc -->

## Tech Stack (core)

<div align="center">

[![React](https://img.shields.io/github/package-json/dependency-version/tpatalas/tp-next-todos/react?label=react&logo=react&style=for-the-badge&color=black)](https://react.dev/)
[![Next.js](https://img.shields.io/github/package-json/dependency-version/tpatalas/tp-next-todos/next?label=next.js&logo=next.js&style=for-the-badge&color=black)](https://nextjs.org/)
[![Typescript](https://img.shields.io/github/package-json/dependency-version/tpatalas/tp-next-todos/dev/typescript?logo=typescript&color=black&style=for-the-badge)](https://www.typescriptlang.org/)

[![Recoil](https://img.shields.io/github/package-json/dependency-version/tpatalas/tp-next-todos/recoil?color=black&label=recoil&logo=recoil&style=for-the-badge)](https://recoiljs.org/)
[![TailwindCSS](https://img.shields.io/github/package-json/dependency-version/tpatalas/tp-next-todos/dev/tailwindcss?logo=tailwindcss&style=for-the-badge&color=black&label=tailwind%20css)](https://tailwindui.com/)
[![HeadlessUI](https://img.shields.io/github/package-json/dependency-version/tpatalas/tp-next-todos/@headlessui/react?color=black&label=headless%20ui&logo=headlessui&style=for-the-badge)](https://headlessui.com/)
[![Next-Auth](https://img.shields.io/github/package-json/dependency-version/tpatalas/tp-next-todos/next-auth?color=black&logo=auth&style=for-the-badge)](https://next-auth.js.org/)

[![Jest](https://img.shields.io/github/package-json/dependency-version/tpatalas/tp-next-todos/dev/jest?color=black&label=jest&logo=jest&style=for-the-badge)](https://jestjs.io/)
[![React-testing-library](https://img.shields.io/github/package-json/dependency-version/tpatalas/tp-next-todos/dev/@testing-library/react?label=react-testing-library&logo=testing-library&style=for-the-badge&color=black)](https://testing-library.com/docs/react-testing-library/intro/)

[![Mongoose](https://img.shields.io/github/package-json/dependency-version/tpatalas/tp-next-todos/mongoose?color=black&logo=mongoose&style=for-the-badge)](https://mongoosejs.com/)
[![Eslint](https://img.shields.io/github/package-json/dependency-version/tpatalas/tp-next-todos/dev/eslint?color=black&logo=eslint&style=for-the-badge)](https://eslint.org/)
[![Prettier](https://img.shields.io/github/package-json/dependency-version/tpatalas/tp-next-todos/dev/prettier?logo=prettier&style=for-the-badge&color=black)](https://prettier.io/)

</div>

## Infrastructure

<div align="center">

[![Google Cloud
Run](https://img.shields.io/badge/google%20cloud%20run-deployment-9cf?style=for-the-badge&logo=google-cloud)](https://cloud.google.com)
[![Google Secrets Manager](https://img.shields.io/badge/Google%20Secret%20Manager-Secrets%20Management-9cf?style=for-the-badge&logo=google-cloud)](https://cloud.google.com/secret-manager)
[![Google Artifact Registry](https://img.shields.io/badge/Google%20Artifact%20Registry-Artifact%20Registry-9cf?style=for-the-badge&logo=google-cloud)](https://cloud.google.com/artifact-registry)
[![Google VPC
Network](https://img.shields.io/badge/Google%20VPC%20Network-VPC%20Network-9cf?style=for-the-badge&logo=google-cloud)]()

[![Github Secrets](https://img.shields.io/badge/Github%20Secrets-Secrets%20Management-9cf?logo=github&style=for-the-badge)](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
[![Github Actions](https://img.shields.io/badge/Github%20Actions-CI%2FCD-9cf?logo=github&style=for-the-badge)](https://github.com/features/actions)

[![Cloudflare](https://img.shields.io/badge/cloudflare-CDN-9cf?logo=cloudflare&style=for-the-badge)](https://www.cloudflare.com/)
[![Cloudflare](<https://img.shields.io/badge/cloudflare-image%20Optimization%20(Resizing)-9cf?logo=cloudflare&style=for-the-badge>)](https://developers.cloudflare.com/images/image-resizing/)

[![Cloudflare
R2](https://img.shields.io/badge/Cloudflare%20R2-Object%20Storage-9cf?style=for-the-badge&logo=cloudflare)](https://developers.cloudflare.com/r2/)
[![MongoDB](https://img.shields.io/badge/mongodb-database-9cf?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas/database)

</div>

> Important: As of `May 15, 2023`, Google has deprecated the `Container Registry`.
> Consequently, containers have been transitioned to the `Artifact Registry`.
> Correspondingly, GitHub Actions workflows have been updated to reflect this change.

## Features

### 1. Automatic todo prioritization

Utilizes a Priority Rank Score algorithm to intelligently prioritize todo items.

> Note: Priority Rank Score (PRS) computes and rank the most prioritized item.

### 2. Unified State Management

Seamlessly integrates server and client-side states using a single state hook.

### 3. Email and OAuth authentication with Auth.js (aka Next-Auth)

Provides email authentication via magic links and supports OAuth with Google and Github. (Note: Credential authentication is currently disabled.)

### 4. CRUD Operations

Facilitates CRUD operations for labels, todo items, and notes, with support for due dates, various priority levels, and task completion.

### 5. Interactive Demo-Session

Enables users to explore CRUD operations in a default demo session, no authentication required.

### 6. CI/CD Pipeline

Leverages GitHub Actions for effective Continuous Integration and Continuous Deployment.

### 7. Unit/Integration testing

Maintains high software standards via comprehensive unit and integration tests, embedded within the Continuous Integration process. (Note: Additional tests are currently being implemented as part of project restructuring.)

## Project Status

This project is currently under active development. New features and improvements are being introduced regularly.

## Installation

### Clone the repository to your favorite directory

1. Clone the repository by running the following command:

```sh
git clone https://github.com/tpatalas/tp-next-todos.git
```

## Deployment

Deployment is automated via pre-configured workflows in GitHub Actions.

However, you'll need to complete preliminary configurations in the following areas:

1. Google Cloud Run
2. Google Cloud Platform IAM (Service Account with proper roles)
3. Google Cloud Secret Manager
4. GitHub's Environment and Secret Variables

Please be aware that this README does not provide detailed instructions for these setup
procedures.

## Resources

1. [Deploy Next.js App into Google Cloud Run(GCR) with Docker](<https://github.com/tpAtalas/tp-next-todos/wiki/Deploy-Next.js-App-into-Google-Cloud-Run(GCR)-with-Docker>)
2. [Manage sensitive information to Google Cloud Secret Manager](https://github.com/tpAtalas/tp-next-todos/wiki/Manage-sensitive-information-to-Google-Cloud-Secret-Manager)
3. [Troubleshooting Google Cloud Run](https://github.com/tpAtalas/tp-next-todos/wiki/Troubleshooting-Google-Cloud-Run)

## License

This project is licensed under the terms of the MIT License. See the [LICENSE](https://github.com/tpAtalas/tp-next-todos/blob/master/LICENSE) file for details.
