import React, { useState } from "react";
import LeftSide from "../component/LeftSide";
import AllCard from "../component/AllCard";
import RightSide from "../component/RightSide";
import { NoteProvider } from "../context/NoteContext";

function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("All");
  return (
    <div className="flex h-screen bg-[#F8F9FB] overflow-hidden">
       <NoteProvider>
      {/* LEFT SIDE (Sticky + Scrollable) */}
      <div className="w-[250px] bg-white shadow-md sticky top-0 h-screen overflow-y-auto">
        <LeftSide 
          activeMenu={activeMenu}
    setActiveMenu={setActiveMenu}
    onOpenCategory={() => setShowCategory(true)}
        />
      </div>

     
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
 