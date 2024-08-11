"use client";

// src/pages/index.tsx

import { useState } from 'react';
import SignUp from './signup/page';
import Chatbox from './components/chatbox';
import Ragsubmit from './components/ragsubmit';

export default function Home() {
  const [isSignedUp, setIsSignedUp] = useState(false);

  // Function to handle sign up success
  const handleSignUpSuccess = () => {
    setIsSignedUp(true);
  };

  return (
    <div>
      {isSignedUp ? (
        <div className="flex">
          <div className="w-[50%]"><Chatbox/></div>
          <Ragsubmit/>
        </div>
      ) : (
        <SignUp onSuccess={handleSignUpSuccess} />
      )}
    </div>
  );
}
