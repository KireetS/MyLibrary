import React, { useContext, useState } from "react";
import DataContext from "./dataContext";
import spinContext from "../spin/spinContext";
const DataState = (props)=>{
  const {setSpinone , resetSpin} = useContext(spinContext)
  const [books, setBooks] = useState([]);
  
  
  const urlMaker = (searchterm , startIndex)=>{
    return `https://www.googleapis.com/books/v1/volumes?key=AIzaSyDU1oTCYnVEMMPo_9jfsAohXjwl24Wym5c&startIndex=${Number.parseInt(startIndex)}&maxResults=40&q=${searchterm}`
  }
  const [titems,setTitems]  = useState(0)
  const handleClick = async (start) => {
    let sb = document.getElementById("search-navbar");
    if (sb) {
      console.log(sb.value);
      let s = sb.value;
      s = s.replace(/ /g, "-");
      console.log(urlMaker(s,start));
      try {
        setSpinone(true)
        const response = await fetch(urlMaker(s , start));
        resetSpin(false)
        const data = await response.json();
         
        setTitems(data.totalItems || 0)
        setBooks(data.items || []);
      } catch (err) {
        console.error("this is the error ", err);
        setBooks([]);
      }
    }
  };






  return(
  <DataContext.Provider value={{books,handleClick , titems}}>
    {props.children}
  </DataContext.Provider>
  )
}

export default DataState