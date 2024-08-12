"use client";

import { useState, useRef, useEffect, FormEvent, ChangeEvent } from "react";
import { FaMountain, FaPaperPlane } from "react-icons/fa";
import Modal from "./modal";
import Ragsubmit from "./ragsubmit";
import { IoSettingsSharp } from "react-icons/io5";
import { TaskContext } from "../context/taskContext";
import { useContext } from "react";
import LanguageSelector from './languageSelector';

// Define message object
interface Message {
  text: string;
  sender: "user" | "other";
}

// Fetching response from gen ai endpoint
const GetResponse = async (
  messageToSend: string,
  taskType: string,
  language: string
): Promise<{ success: boolean; body?: { message: string } }> => {
  const data = { message: messageToSend, taskType: taskType, language: language };
  const headers = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return await fetch("/api/genMsg", headers)
    .then((response) => response.json())
    .catch((e) => {
      console.log(e);
      return { success: false };
    });
};

const Chatbox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  // states for tasks selection
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("TaskContext not within provider");
  }

  const { taskType } = context;


  // Auto scroll if message overflow
  const scrollRef = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    if (scrollRef.current !== null) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Sending message
  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    // Check for no white space
    if (input.trim()) {
      const userMessage: Message = { text: input, sender: "user" };
      setMessages([...messages, userMessage]);
      setInput("");

      // Take response.content
      const response = await GetResponse(input, taskType, selectedLanguage);

      if (response.success && response.body) {
        const aiResponse: Message = {
          text: response.body.message,
          sender: "other",
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "There was an error with generating our statement",
            sender: "other",
          },
        ]);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen rounded-lg bg-gray-50 w-full">
      {/* Header */}
      <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <FaMountain size={30} />
          <h2 className="text-xl font-medium">AI Customer Support</h2>
        </div>
        <div className="inline-flex">
          <LanguageSelector 
            selectedLanguage={selectedLanguage} 
            setSelectedLanguage={setSelectedLanguage}
          />
          {/* Open Modal for RAG */}
          <div className="flex items-center p-2">
              <button onClick={() => setOpenModal(true)}>
                <IoSettingsSharp size={30} />
              </button>
              <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <div className="px-2 py-6">
                  <Ragsubmit />
                </div>
              </Modal>
            </div>
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

        <span ref={scrollRef} />
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
