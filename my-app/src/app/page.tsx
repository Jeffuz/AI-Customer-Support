"use client";

import Chatbox from "./components/chatbox";
import Ragsubmit from "./components/ragsubmit";

export default function Home() {
  return (
    <div className="flex">
      <div className="w-[50%]"><Chatbox/></div>
      <Ragsubmit/>
    </div>
  );
}
