import NotesProvider from "./context/NoteContext";
import NotesPage from "./pages/NotesPage";

function App() {
  return (
    <>
      <div className="App" id="app">
        <NotesProvider>
          <NotesPage />
        </NotesProvider>
      </div>
    </>
  );
}

export default App;
