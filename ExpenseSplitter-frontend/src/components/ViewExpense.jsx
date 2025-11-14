import React, { useEffect, useState } from "react";

function ViewExpense() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.email) {
        console.error("No user email found!");
        setLoading(false);
        return;
      }

      const email = encodeURIComponent(user.email);
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(
          `https://splitease-4an5.onrender.com/api/expenses/user/${email}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch expenses");
        }

        let data = await res.json();
        data.sort((a, b) => new Date(b.date) - new Date(a.date));

        setExpenses(data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) return <p>Loading...</p>;
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://splitease-4an5.onrender.com/api/expenses/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        alert("Failed to delete!");
        return;
      }
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));

      alert("Expense deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error deleting expense");
    }
  };
  return (
    <div className="view-expense-container">
      <h2>Your Expenses</h2>

      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <div className="expense-list">
          {expenses.map((exp) => (
            <div key={exp.id} className="expense-card">
              <h3>{exp.title}</h3>
              <p>
                <strong>Date:</strong> {exp.date}
              </p>
              <p>
                <strong>Amount:</strong> ₹{exp.amount}
              </p>
              <p>
                <strong>Paid By:</strong> {exp.paidBy}
              </p>
              <p>
                <strong>Description:</strong> {exp.description || "No notes"}
              </p>

              <div>
                <strong>Participants:</strong>
                <ul>
                  {exp.participants.map((p) => (
                    <li key={p.id}>
                      {p.name} → ₹{p.share}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(exp.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewExpense;
