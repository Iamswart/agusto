# Task Management Backend API

## Overview

Task Management Backend API is a web application for managing user tasks, including creating, updating, deleting, and retrieving tasks.

## Table of Contents

- [Setup](#setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Scripts](#scripts)

## Setup

### Prerequisites

- Node.js and npm installed
- MongoDB database (local or cloud-based)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>

   ```

2. Install the dependencies:

   ```bash
   npm install


   ```

3. Set up environment variables. Create a .env file in the root directory and add the following variables:

   ```bash
   # Server configuration
   PORT=3000
   NODE_ENV=local

   # Database configuration
   DATABASE_URL=<Your ElephantSQL URL>

   # JWT configuration
   JWT_SECRET=<Your JWT Secret>
   JWT_EXPIRATION=<Your JWT Expiration Time>
   REFRESH_TOKEN_SECRET=<Your Refresh Token Secret>
   REFRESH_TOKEN_EXPIRATION=<Your Refresh Token Expiration Time>


   # API Key
   API_KEY=<Your API Key>

   # AWS configuration
   AWS_ACCESS_KEY=<Your AWS Access Key>
   AWS_SECRET_KEY=<Your AWS Secret Key>
   AWS_REGION=<Your AWS Region>
   SQS_QUEUE_URL=<Your SQS Queue URL>
   SES_REPLY_TO_EMAIL=<Your SES Reply-To Email>
   SES_SENDER_NAME=<Your SES Sender Name>
   SES_SOURCE_EMAIL=<Your SES Source Email>

   # Server URLs
   LOCAL_SERVER_URL=http://localhost:3000/api/v1
   PRODUCTION_SERVER_URL=https://api.divestbookstore.com/api/v1


   ```

4. Start the Server

   ```bash
    npm run local

   ```

5. API Documentation

   You can view the API documentation by navigating to http://localhost:3000/api-docs.

## Usage

### Authentication

- POST /auth/login - Login a user
- POST /auth/register - Register a new user
- POST /auth/change-password - Change a user's password
- POST /auth/forgot-password - Request a password reset link
- POST /auth/reset-password - Reset password using a token

### Tasks

- GET /tasks - Get all tasks for a user
- POST /tasks - Create a new task
- GET /tasks/ - View task details
- PUT /tasks/ - Update a task
- DELETE /tasks/ - Delete a task


## API Documentation

### Swagger Doc

- You can view the API documentation by navigating to http://localhost:3000/api-docs after starting the server.

## Scripts

### Install Dependencies

    ```bash
    npm install

    ```

### Start

    ```bash
    npm run local

    ```
