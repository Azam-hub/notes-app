# Notes App

A simple MERN (MongoDB, Express, React, Node.js) application for creating, editing, and managing personal notes. This app allows users to add, update, and delete notes with a clean and intuitive interface.

## Features

- Create, edit, search, and delete notes
- RESTful API with Node.js and Express
- MongoDB for persistent storage

## Getting Started

1. Clone the repository
2. Install dependencies for both client and server
3. Start the development servers

### 1. Clone the repository

```bash
git clone https://github.com/Azam-hub/notes-app.git notes-app
cd notes-app
```

### 2. Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3. Configure environment variables for the backend

1. Copy the example environment file:
    ```bash
    cd backend
    cp .env.example .env
    ```
2. Open the newly created `.env` file and update the values as needed:
    - `MONGODB_URI`: Your MongoDB connection string
    - `SECRET`: A secure secret key for JWT
    - `NODE_MAILER_EMAIL` and `NODE_MAILER_EMAIL_PASSWORD`: Credentials for sending emails (if used)
    - Adjust other variables as necessary for your environment

**Do not commit your `.env` file to version control.**

### 4. Run the application

#### Start the Mongo DB Server

#### Start the backend server

```bash
cd backend
npm start
```

#### Start the frontend development server

```bash
cd ../frontend
npm run dev
```

The frontend will be available at [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

## Project Structure

```
notes-app/
  backend/    # Express API
  frontend/   # React app (Vite)
```

## Usage

- Register or login to your account.
- Add, edit, pin, or delete notes.
- Search notes using the search bar.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

##
