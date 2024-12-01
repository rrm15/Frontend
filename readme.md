vv
# Wemace Frontend

Welcome to the Wemace Frontend project! This repository contains the frontend code for the Wemace application.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Wemace is a web application designed to provide users with an intuitive and seamless experience. The frontend is built using modern web technologies to ensure high performance and responsiveness.

## Features

- User-friendly interface
- Responsive design
- Fast loading times
- Easy navigation

## Installation

To get started with the Wemace Frontend, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/Wemace-Frontend.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Wemace-Frontend
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

To start the development server, run:
```bash
npm run dev
```
This will launch the application in your default web browser. You can now make changes to the code and see the updates in real-time.

## Envirment Variables

The following environment variables are required to run the application:

- `NEXT_PUBLIC_BACKEND_URL`: The URL of the backend server.
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: The client ID for Google OAuth.
- `NEXT_PUBLIC_GOOGLE_CLIENT_SECRET`: The client secret for Google OAuth.
- `NEXT_PUBLIC_GITHUB_CLIENT_ID`: The client ID for GitHub OAuth.
- `NEXT_PUBLIC_GITHUB_CLIENT_SECRET`: The client secret for GitHub OAuth.
- `NEXT_PUBLIC_RESEND_API_KEY`: The API key for Resend.

You can find these values in the `.env` file in the root directory of the project.

## Production Deployment

Change the Link in Mail.ts to the production link

## Contributing

We welcome contributions to the Wemace Frontend project! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request. Make sure to follow our [contributing guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.