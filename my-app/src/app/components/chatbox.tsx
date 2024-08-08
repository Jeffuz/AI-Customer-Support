"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { FaMountain, FaPaperPlane } from "react-icons/fa";

// Define message object
interface Message {
  text: string;
  sender: "user" | "other";
}

const Chatbox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  // Sending message
  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    // check for no white space
    if (input.trim()) {
      const userMessage = { text: input, sender: "user" };
      setMessages([...messages, userMessage]);
      setInput("");

      try {
        const response = await fetch("src/app/api/genMsg/route.ts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        });

        const data = await response.json();
        const aiMessage = { text: data.body.message.content, sender: "other" };

        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error("Error fetching the API:", error);
        // handle error later
      }
    }
  };

  return (
    <div className="flex flex-col h-screen rounded-lg bg-gray-50 w-full">
      {/* Header */}
      <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-3">
        <div className="flex items-center gap-2">
          <FaMountain size={24} />
          <h2 className="text-lg font-medium">AI Customer Support</h2>
        </div>
      </div>

      {/* Message box */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex w-max max-w-[75%] rounded-lg px-3 py-2 text-sm ${
              msg.sender === "user"
                ? "ml-auto bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Submission */}
      <div className="border-t px-4 py-3">
        <form onSubmit={handleSend} className="flex items-center w-full gap-2">
          <input
            placeholder="Type your message..."
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            className="flex px-4 py-2 border rounded w-full focus:outline-none"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
          >
            <FaPaperPlane size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;