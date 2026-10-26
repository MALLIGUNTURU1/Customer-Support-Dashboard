# Customer Support Dashboard

A full-stack web application to manage customer support tickets using React and Node.js.

## Project Overview

The Customer Support Dashboard helps users create support tickets, view customer issues, and update ticket status when an issue is resolved.

## Technologies Used

- **Frontend:** React, Vite, JavaScript, CSS
- **Backend:** Node.js, Express.js
- **API Testing:** Postman
- **Version Control:** Git and GitHub

## Features

- View customer support tickets
- Create new tickets with customer names and issue descriptions
- Resolve tickets and update their status
- Connect the React frontend with the backend REST API

## Project Structure

```text
CustomerSupportDashboard/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── package-lock.json
├── .gitignore
└── package-lock.json
```

## How to Run the Project

### 1. Start the Backend

Open a terminal and run:

```bash
cd backend
npm install
node server.js
```

The backend runs at `http://localhost:5000`.

### 2. Start the Frontend

Open a second terminal and run:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/tickets` | Retrieve tickets |
| POST | `/api/tickets` | Create a ticket |
| PATCH | `/api/tickets/:id` | Update a ticket's status |

## Future Enhancements

- Database integration
- User authentication
- Ticket search and filtering
- Dashboard analytics

## Author

**MALLIGUNTURU1**

GitHub: https://github.com/MALLIGUNTURU1
