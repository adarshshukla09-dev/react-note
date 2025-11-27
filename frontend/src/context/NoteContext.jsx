import { createContext, useContext, useState } from "react";

const NoteContext = createContext();
export const useNoteContext = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => { // FIX 1: Corrected typo 'childern' to 'children'
  const [selectedNote, setSelectedNote] = useState(null);
  
  return (
    <NoteContext.Provider value={{ selectedNote, setSelectedNote }}>
      {children}
</NoteContext.Provider>
  );
};