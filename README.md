# E-Learning Platform Backend

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Overview

This repository contains the backend of the E-Learning platform. The backend is built using NestJS, a progressive
Node.js framework, which provides a robust setting for building efficient, scalable web applications. It handles data
processing, business logic, and communication with frontend clients.

## Technology Stack

- **NestJS**: For building the server-side application.
- **Express.js**: As part of NestJS to handle HTTP requests and routing.
- **TypeORM and MySQL**: Used for relational database management, handling structured data like user profiles and course
  details.
- **Mongoose and MongoDB**: Used for managing unstructured data like question sets, leveraging the non-relational
  database benefit of MongoDB.
- **Passport and JWT**: For authentication and securing API endpoints.
- **AWS SDK**: For handling resources on AWS, such as S3 storage integration.

## Features

- RESTful API services for client-side operations.
- Authentication and authorization using JWT.
- Course and user management using MySQL and MongoDB.
- AI detection integration for evaluating assignments.
- Support for multi-language through internationalization.
- Email notifications via Nodemailer.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Doan-MHV/EL-BE.git
   cd EL-BE
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Variables**:
   Copy the example environment configuration file to a new `.env` file:
   ```bash
   cp env-example-relational .env
   ```
   Then, modify the `.env` file with the appropriate settings for your environment.

4. **Run Migrations** (if using TypeORM):
   ```bash
   npm run migration:run
   ```

5. **Start the server**:
    - For development:
      ```bash
      npm run start:dev
      ```
    - For production:
      ```bash
      npm run start:prod
      ```

## Testing

Run unit tests to ensure everything is working correctly:

```bash
npm test
```

## Contributing

Contributions are welcome! Please submit your changes as pull requests, following the code standards in place.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
