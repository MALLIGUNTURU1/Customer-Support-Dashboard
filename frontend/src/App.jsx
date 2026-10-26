
import { useEffect, useState } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/api/tickets';

function App() {
  const [tickets, setTickets] = useState([]);
  const [customer, setCustomer] = useState('');
  const [issue, setIssue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function loadTickets() {
    try {
      setError('');
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Unable to load tickets');
      }

      const data = await response.json();
      setTickets(data);
    } catch {
      setError(
        'Backend connect avvaledu. Backend server run avutundo check cheyyandi.'
      );
    }
  }

  useEffect(() => {
    loadTickets();
  }, []);

  async function addTicket(event) {
    event.preventDefault();

    if (!customer.trim() || !issue.trim()) {
      setError('Customer name and issue enter cheyyandi.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer: customer.trim(),
          issue: issue.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ticket creation failed');
      }

      setCustomer('');
      setIssue('');
      await loadTickets();
    } catch (err) {
      setError(err.message || 'Ticket add cheyyalekapoyamu.');
    } finally {
      setLoading(false);
    }
  }

  async function resolveTicket(id) {
    try {
      setError('');

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to resolve ticket');
      }

      await loadTickets();
    } catch (err) {
      setError(err.message || 'Ticket update failed.');
    }
  }

  const openCount = tickets.filter(
    ticket => ticket.status === 'Open'
  ).length;

  const resolvedCount = tickets.filter(
    ticket => ticket.status === 'Resolved'
  ).length;

  return (
    <div className="app">
      <header className="header">
        <p className="eyebrow">CUSTOMER SERVICE</p>
        <h1>Customer Support Dashboard</h1>
        <p>Manage customer enquiries in one place.</p>
      </header>

      <main className="dashboard">
        <section className="stats">
          <div className="stat-card">
            <span>Total Tickets</span>
            <strong>{tickets.length}</strong>
          </div>

          <div className="stat-card">
            <span>Open Tickets</span>
            <strong>{openCount}</strong>
          </div>

          <div className="stat-card">
            <span>Resolved Tickets</span>
            <strong>{resolvedCount}</strong>
          </div>
        </section>

        <section className="panel">
          <h2>Create Support Ticket</h2>

          <form className="ticket-form" onSubmit={addTicket}>
            <input
              type="text"
              placeholder="Customer name"
              value={customer}
              onChange={event => setCustomer(event.target.value)}
            />

            <input
              type="text"
              placeholder="Describe the issue"
              value={issue}
              onChange={event => setIssue(event.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Ticket'}
            </button>
          </form>

          {error && <p className="error">{error}</p>}
        </section>

        <section className="panel">
          <div className="list-heading">
            <h2>Support Tickets</h2>
            <button className="secondary" onClick={loadTickets}>
              Refresh
            </button>
          </div>

          {tickets.length === 0 ? (
            <p className="empty">No tickets found. Add your first ticket.</p>
          ) : (
            <div className="ticket-list">
              {tickets.map(ticket => (
                <article className="ticket" key={ticket.id}>
                  <div>
                    <h3>{ticket.customer}</h3>
                    <p>{ticket.issue}</p>
                    <span
                      className={
                        ticket.status === 'Open'
                          ? 'status open'
                          : 'status resolved'
                      }
                    >
                      {ticket.status}
                    </span>
                  </div>

                  {ticket.status === 'Open' && (
                    <button
                      onClick={() => resolveTicket(ticket.id)}
                    >
                      Mark as Resolved
                    </button>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
