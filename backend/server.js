
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Temporary ticket data
let tickets = [
  {
    id: 1,
    customer: 'Balu',
    issue: 'Login issue',
    status: 'Open'
  }
];

// Home route
app.get('/', (req, res) => {
  res.send('Customer Support Dashboard Backend is Running!');
});

// GET API: Get all tickets
app.get('/api/tickets', (req, res) => {
  res.json(tickets);
});

// POST API: Add a ticket
app.post('/api/tickets', (req, res) => {
  const { customer, issue } = req.body || {};

  if (
    typeof customer !== 'string' ||
    typeof issue !== 'string' ||
    !customer.trim() ||
    !issue.trim()
  ) {
    return res.status(400).json({
      message: 'Customer name and issue are required'
    });
  }

  const newTicket = {
    id: Date.now(),
    customer: customer.trim(),
    issue: issue.trim(),
    status: 'Open'
  };

  tickets.push(newTicket);

  return res.status(201).json(newTicket);
});

// PATCH API: Resolve a ticket
app.patch('/api/tickets/:id', (req, res) => {
  const ticket = tickets.find(
    item => item.id === Number(req.params.id)
  );

  if (!ticket) {
    return res.status(404).json({
      message: 'Ticket not found'
    });
  }

  ticket.status = 'Resolved';

  return res.json(ticket);
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.path
  });
});

// Start the backend server
const server = app.listen(PORT, '127.0.0.1', () => {
  console.log('----------------------------------');
  console.log('Customer Support Dashboard Backend');
  console.log(`Server URL: http://localhost:${PORT}`);
  console.log(`Tickets API: http://localhost:${PORT}/api/tickets`);
  console.log('Server is running. Keep this terminal open.');
  console.log('----------------------------------');
});

server.on('error', (error) => {
  console.error('Backend startup error:', error.message);

  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.`);
  }
});
