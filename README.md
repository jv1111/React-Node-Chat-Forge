# ChatForge API

ChatForge API is a developer platform and messaging API for building real-time chat and communication applications.

## Overview

Developers can manage projects, explore the platform, and integrate messaging capabilities into their own applications. The project includes a web-based developer interface and a backend API for managing chat-related resources.

## Features

- Project management
- Authentication and protected API routes
- Client and conversation management
- Real-time messaging with Socket.IO
- MongoDB persistence
- Developer platform interface

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Real-time communication:** Socket.IO
- **Authentication:** JSON Web Tokens (JWT)

## Prerequisites

- Node.js and npm
- MongoDB running locally or an accessible MongoDB instance

## Setup

### 1. Clone the repository

    git clone https://github.com/jv1111/React-Node-Chat-Forge.git
    cd React-Node-Chat-Forge

### 2. Configure environment variables

Create local environment files from the examples:

    cp server/.env.example server/.env
    cp client/.env.example client/.env

Edit `server/.env` and replace the placeholder `JWT_SECRET` with a strong, randomly generated secret. Ensure `MONGODB_URI` points to your MongoDB instance.

The default development configuration uses:

- Backend API: `http://localhost:5000`
- Frontend: `http://localhost:5173`
- MongoDB database: `chatforge`

### 3. Install dependencies

Backend:

    cd server
    npm ci

Frontend, in a separate terminal:

    cd client
    npm ci

### 4. Run the application

Ensure MongoDB is running, then start the backend:

    cd server
    npm run dev

In a separate terminal, start the frontend:

    cd client
    npm run dev

Open `http://localhost:5173` in your browser.

## Tests

Run the backend test suite:

    cd server
    npm test

## Production Build

Build the frontend:

    cd client
    npm run build

## Project Structure

- `client/` — React developer platform interface
- `server/` — Express API, authentication, database integration, and real-time communication
- `server/test/` — Backend tests

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
