import { useState } from "react";

export default function AIChat({ theme }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/user/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const aiMessage = { role: "ai", content: data.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error talking to AI:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
        backgroundColor: theme === "dark" ? "#1e1e1e" : "#f5f5f5",
        color: theme === "dark" ? "#ffffff" : "#000000",
      }}
    >
      <h3
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: "20px",
          marginBottom: "1rem",
        }}
      >
        Ask the No Name AI Assistant
      </h3>

      <div
        style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "1rem" }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              margin: "0.5rem 0",
            }}
          >
            <strong>{msg.role === "user" ? "You" : "No Name"}:</strong>{" "}
            {msg.content}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What's up?"
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          style={{ padding: "0.5rem 1rem" }}
        >
          {loading ? "..." : "ASK"}
        </button>
      </div>
    </div>
  );
}
``;
