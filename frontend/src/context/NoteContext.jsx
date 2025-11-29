import { createContext, useContext, useState } from "react";

const NoteContext = createContext();
export const useNoteContext = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [editNote, setEditNote] = useState(null);
const[fav,isFav]=useState([])
const [searchQuery, setSearchQuery] = useState("");

  const [notes, setNote] = useState([]);
  return (
    <NoteContext.Provider
      value={{
        selectedNote,
        setSelectedNote,
        editNote,
        setEditNote,
       fav,isFav,
        notes,
        setNote, 
          searchQuery,
  setSearchQuery,

      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
