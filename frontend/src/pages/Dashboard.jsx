import React from "react";
import LeftSide from "../component/LeftSide";
import AllCard from "../component/AllCard";
import RightSide from "../component/RightSide";
import { NoteProvider } from "../context/NoteContext";

function Dashboard() {
  return (
    <div className="flex h-screen bg-[#F8F9FB] overflow-hidden">
      
      {/* LEFT SIDE (Sticky + Scrollable) */}
      <div className="w-[250px] bg-white shadow-md sticky top-0 h-screen overflow-y-auto">
        <LeftSide />
      </div>

      <NoteProvider>
        {/* CENTER SCROLLABLE CARDS */}
        <div className="flex-grow max-w-[900px] h-screen overflow-y-auto p-4">
          <AllCard />
        </div>

        {/* RIGHT SIDE (Sticky + Scrollable) */}
        <div className="w-[400px] bg-white shadow-lg p-6 sticky top-0 h-screen overflow-y-auto">
          <RightSide />
        </div>
      </NoteProvider>
    </div>
  );
}

export default Dashboard;
