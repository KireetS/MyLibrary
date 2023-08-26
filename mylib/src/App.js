import "./App.css";
import { Navbar } from "./Components/Navbar";
import { Search } from "./Components/Search";
import Home from "./Components/Home";
import DataState from "./Contexts/datafetched/DataState";
import SpinState from "./Contexts/spin/SpinState";
import { Route , Routes } from "react-router-dom";
import { Browse } from "./Components/Browse";
import { BestSellers } from "./Components/BestSellers";
import { NewSellers } from "./Components/NewSellers";
import { HighestRated } from "./Components/HighestRated";
// import { Pagination } from "./Components/Pagination";
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
          <Route exact path = "/browse/1" element={<BestSellers/>}/>
          <Route exact path = "/browse/2" element={<NewSellers/>}/>
          <Route exact path = "/browse/3" element={<HighestRated/>}/>
        </Routes>
      {/* <Pagination/> */}
      </DataState>
    </SpinState>
    </>
  );
}

export default App;
