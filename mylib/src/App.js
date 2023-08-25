import "./App.css";
import { Navbar } from "./Components/Navbar";
import { Search } from "./Components/Search";
import Home from "./Components/Home";
import DataState from "./Contexts/datafetched/DataState";
import SpinState from "./Contexts/spin/SpinState";
import { Route , Routes } from "react-router-dom";
import { Browse } from "./Components/Browse";
import { Pagination } from "./Components/Pagination";
function App() {
  return (
    <>

    <SpinState>
      <DataState>
      <Navbar />
        <Routes>
          <Route exact path = "/search" element={<Search/>}/>
          <Route exact path = "/" element={<Home/>}/>
          <Route exact path = "/browse" element={<Browse/>}/>
        </Routes>
      <Pagination/>
      </DataState>
    </SpinState>
    </>
  );
}

export default App;
