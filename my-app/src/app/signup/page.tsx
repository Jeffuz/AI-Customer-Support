"use client";

// Client side Component

import { FaMountain } from "react-icons/fa"
import { useRouter } from 'next/navigation';

// portion to create user data and send over to firebase. This data will then be obtained from sign in

const Signup = () => {

  const router = useRouter(); // Initialize the useRouter hoo
  const handleClick = () => {
    router.push('/signin')
  }

  return (
    <div className="flex flex-col h-screen rounded-lg bg-gray-50 w-full">
    {/* Header */}
    <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-3">
      <div className="flex items-center gap-2">
        <FaMountain size={24} />
        <h2 className="text-lg font-medium">AI Customer Support</h2>
      </div>
    </div>
      {/* Sign Up Card */}
    <div className="flex justify-center items-center flex-grow">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Sign Up
            </button>
            <div>
              <button
              type = "button"
              onClick = {handleClick}
              className = "block text-blue-700 text-sm">or Sign In </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}

export default Signup