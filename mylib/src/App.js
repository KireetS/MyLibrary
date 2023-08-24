import "./App.css";
import { Navbar } from "./Components/Navbar";
import { Search } from "./Components/Search";
import DataState from "./Contexts/datafetched/DataState";
import SpinState from "./Contexts/spin/SpinState";
// import { Route , Routes } from "react-router-dom";
function App() {
  return (
    <>
    <SpinState>
      <DataState>
          <Navbar />
          <Search />
      </DataState>
    </SpinState>
    </>
  );
}

export default App;
