import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from 'react'

function EmailHistory() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://bulkemail-backend.vercel.app/email-history")
      .then(res => setHistory(res.data));
  }, []);

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/home")}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-4">Email History</h1>

      {history.map((item, index) => (
        <div key={index} className="bg-white p-4 rounded mb-3 shadow" onClick={()=>navigate("/preview", { state: item })}> 
          <p><b>Subject:</b> {item.subject}</p>
          <p><b>Total Emails:</b> {item.totalCount}</p>
          <p><b>Status:</b> {item.status}</p>
          <p><b>Date:</b> {new Date(item.sentAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default EmailHistory;
