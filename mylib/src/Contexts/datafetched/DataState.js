import React, { useContext, useState } from "react";
import DataContext from "./dataContext";
import spinContext from "../spin/spinContext";
const DataState = (props)=>{
  const {setSpinone , resetSpin} = useContext(spinContext)
  const [books, setBooks] = useState([]);
  const handleClick = async () => {
    let sb = document.getElementById("search-navbar");
    if (sb) {
      console.log(sb.value);
      let s = sb.value;
      s = s.replace(/ /g, "-");
      console.log(
        `https://www.googleapis.com/books/v1/volumes?key=AIzaSyCSIjcGWF2bu9EZgr2IWTaAhRJyl8-q9Yg&startIndex=0&maxResults=40&q=${s}`
      );
      try {
        setSpinone(true)
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?key=AIzaSyCSIjcGWF2bu9EZgr2IWTaAhRJyl8-q9Yg&startIndex=0&maxResults=40&q=${s}`
        );
        resetSpin(false)
        const data = await response.json();
        setBooks(data.items || []);
      } catch (err) {
        console.error("this is the error ", err);
        setBooks([]);
      }
    }
  };

  return(
  <DataContext.Provider value={{books,handleClick}}>
    {props.children}
  </DataContext.Provider>
  )
}

export default DataState