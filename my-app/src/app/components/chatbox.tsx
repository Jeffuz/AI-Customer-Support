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
  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    // check for no white space
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");

      // todo GRAB RESPONSE FROM API
      // set response after delay
      setTimeout(() => {
        // temp hard coded message
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Testing", sender: "other" },
        ]);
      }, 500);
      // todo
      
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
          // Messages
          <div
            key={index}
            // w-max: set max width based on child
            // max-w-75%: max possible width of message
            className={`flex w-max max-w-[75%] rounded-lg px-3 py-2 text-sm ${
              // user messages are blue, other is gray
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
          {/* Input for textfield */}
          <input
            placeholder="Type your message..."
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setInput(e.target.value);
            }}
            className="flex px-4 py-2 border rounded w-full focus:outline-none"
          />
          {/* Submit button */}
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
