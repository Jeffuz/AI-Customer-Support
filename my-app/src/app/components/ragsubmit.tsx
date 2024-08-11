"use client";

import { useState, FormEvent, useContext } from "react";
import { TaskContext } from "../context/taskContext";

const Ragsubmit = () => {
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // states for tasks selection
    // states for tasks selection
    const context = useContext(TaskContext);
    if (!context) {
      throw new Error("TaskContext not within provider");
    }
  
    const { taskType, setTaskType } = context;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Start loading
    setIsLoading(true);

    try {
      const response = await fetch("/api/rag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      await response.json();
      setUrl("");
    } catch (error) {
      console.error("Failed to submit URL:", error);
    } finally {
      // Stop loading state
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">
        Submit a Website for Processing
      </h1>

      {/* Instructions */}
      <p className="text-gray-700 mb-6 text-center">
        Submit a website URL to make it searchable. Our system will analyze and
        index the content based on your selected task, making it easier to find
        specific information when searching. Perfect for creating a searchable
        knowledge base.
      </p>

      {/* Submit URL and Task */}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {/* Label */}
        <label htmlFor="url" className="text-lg text-gray-600">
          Website URL:
        </label>
        {/* Url input */}
        <input
          id="url"
          type="url"
          placeholder="e.g., https://www.example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
          required
          disabled={isLoading}
        />

        {/* Label */}
        <label htmlFor="taskType" className="text-lg text-gray-600">
          Select Task Type:
        </label>
        {/* Drop down to select task */}
        <select
          id="taskType"
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
          disabled={isLoading}
        >
          <option value="general_knowledge">General Knowledge Questions</option>
          <option value="creative_writing">Creative Writing</option>
          <option value="technical_documentation">
            Technical Documentation
          </option>
          <option value="customer_support">Customer Support</option>
        </select>

        {/* Button */}
        <button
          type="submit"
          className={`px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200 ${
            isLoading ? "cursor-not-allowed opacity-50" : "hover:bg-blue-700"
          }`}
          disabled={isLoading}
        >
          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="ml-2">Processing...</span>
            </div>
          ) : (
            "Submit URL"
          )}
        </button>
      </form>
    </div>
  );
};

export default Ragsubmit;
