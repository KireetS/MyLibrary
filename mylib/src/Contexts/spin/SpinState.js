import { useState } from "react"
import SpinContext from "./spinContext"


const SpinState = (props)=>{

  const [spin , setSpin] = useState(true)
  const resetSpin = ()=>{
    setSpin(false)
  }
  const setSpinone = ()=>{
    setSpin(true)
  }
  return(
    <SpinContext.Provider value={{spin , setSpinone , resetSpin}}>
      {props.children}
    </SpinContext.Provider>
  )
}

export default SpinState