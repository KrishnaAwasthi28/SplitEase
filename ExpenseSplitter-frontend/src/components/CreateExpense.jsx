import React, { useState, useEffect } from "react";

function CreateExpense() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [participants, setParticipants] = useState([{ name: "", phone: "" }]);
  const [message, setMessage] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [finalMessage, setFinalMessage] = useState("");
  const [savedParticipants, setSavedParticipants] = useState([]);
  const [backendShares, setBackendShares] = useState([]);

  // ✅ Load username from localStorage on mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.name) {
      setPaidBy(userData.name);
    }
  }, []);

  const handleParticipantChange = (index, field, value) => {
    const updated = [...participants];
    updated[index][field] = value;
    setParticipants(updated);
  };

  const addParticipant = () => {
    setParticipants([...participants, { name: "", phone: "" }]);
  };

  const removeParticipant = (index) => {
    const updated = participants.filter((_, i) => i !== index);
    setParticipants(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expense = {
      title,
      description,
      amount: parseFloat(amount),
      paidBy,
      date,
      participants,
    };

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://splitease-4an5.onrender.com/api/expenses/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expense),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage("✅ Expense created successfully!");

        // ✅ Combine payer + participants for display
        const allPeople = [
          ...data.participants,
          {
            name: data.paidBy,
            phone: "Paid",
            share: data.participants[0]?.share,
          },
        ];

        // 💬 Generate WhatsApp message
        const text = `💰 *Expense Alert!* 💰
*${data.title}*
📅 Date: ${data.date}
🧾 Note: ${data.description || "N/A"}
Total: ₹${data.amount}
Split among: ${allPeople.map((p) => p.name).join(", ")}
Each owes: ₹${data.participants[0]?.share?.toFixed(2)}
Paid by: ${data.paidBy}`;

        setFinalMessage(text);
        setSavedParticipants(data.participants);
        setBackendShares(data.participants);
        setShowResult(true);

        // Clear form
        setTitle("");
        setDescription("");
        setAmount("");
        setParticipants([{ name: "", phone: "" }]);
        setDate(new Date().toISOString().split("T")[0]);
      } else {
        setMessage("❌ Failed to create expense");
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Error connecting to backend");
    }
  };

  const sendOnWhatsApp = (participant) => {
    const text = encodeURIComponent(finalMessage);
    window.open(`https://wa.me/${participant.phone}?text=${text}`, "_blank");
  };

  // ✅ After creation → show result screen
  if (showResult) {
    const payerShare = backendShares[0]?.share?.toFixed(2) || 0;
    const allPeople = [
      ...savedParticipants,
      { name: paidBy, phone: "Paid", share: payerShare },
    ];

    return (
      <div className="expense-result-container">
        <h2>Expense Created Successfully 🎉</h2>
        <h3>Generated Message:</h3>
        <div className="expense-message-box">
          <pre>{finalMessage}</pre>
        </div>

        <h3>Send on WhatsApp:</h3>
        <ul className="participant-list">
          {savedParticipants.map((p, index) => (
            <li key={index}>
              {p.name} ({p.phone}){" "}
              <button
                className="whatsapp-btn"
                onClick={() => sendOnWhatsApp(p)}
              >
                Send
              </button>
            </li>
          ))}
        </ul>

        <button
          className="new-expense-btn"
          onClick={() => setShowResult(false)}
        >
          + Create Another Expense
        </button>
      </div>
    );
  }

  // 🧾 Default Form
  return (
    <div className="expense-container">
      <h2>Create New Expense</h2>
      <form className="expense-form" onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description / Notes</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Dinner at Pizza Hut or Cab to Airport"
        ></textarea>

        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Paid By</label>
        <input type="text" value={paidBy} readOnly />

        <h3>Participants</h3>
        {participants.map((p, index) => (
          <div key={index} className="participant-box">
            <input
              type="text"
              placeholder="Name"
              value={p.name}
              onChange={(e) =>
                handleParticipantChange(index, "name", e.target.value)
              }
              required
            />
            <input
              type="text"
              placeholder="WhatsApp number (with country code)"
              value={p.phone}
              onChange={(e) =>
                handleParticipantChange(index, "phone", e.target.value)
              }
              required
            />
            {participants.length > 1 && (
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeParticipant(index)}
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addParticipant} className="add-btn">
          + Add Participant
        </button>

        <button type="submit" className="submit-btn">
          Create Expense
        </button>
      </form>

      {message && <p className="status-msg">{message}</p>}
    </div>
  );
}

export default CreateExpense;
