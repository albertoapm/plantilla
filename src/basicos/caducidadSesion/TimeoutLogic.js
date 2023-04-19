import React, {useEffect, useState} from "react";
import {TimeoutWarningModal} from "./TimeoutWarningModal"
import { addEventListeners,  removeEventListeners } from './util/eventListenerUtil'
import {useAuthContext} from '../login/context/authContext';

export const TimeoutLogic = () => { 
  const [isWarningModalOpen, setWarningModalOpen] = useState(false);
  const {isAuthenticated, logout} = useAuthContext();

  useEffect(() => {
    const createTimeout1 = () => setTimeout(()=>{ 
      setWarningModalOpen(true);
    },30000)

    const createTimeout2 = () => setTimeout(() => {
      // Implement a sign out function here
      setWarningModalOpen(false)
      logout()
    },10000)

    const listener = () => {
      if(!isWarningModalOpen){
        clearTimeout(timeout)
        timeout = createTimeout1();
      }
      if(!isAuthenticated){
        clearTimeout(timeout)
      }

    } 



    // Initialization
    let timeout = isWarningModalOpen  ? createTimeout2() : createTimeout1()

    if (!isAuthenticated){
      //console.log("Clear Timeout")
      clearTimeout(timeout)
    }
    addEventListeners(listener);

    // Cleanup
    return () => {
      removeEventListeners(listener);
      clearTimeout(timeout);
    }
  },[isWarningModalOpen,isAuthenticated])
  return (
    <div>
      {isWarningModalOpen && (
        <TimeoutWarningModal 
          isOpen={isWarningModalOpen}
          onRequestClose={() => setWarningModalOpen(false)}
          ariaHideApp={false}
        />
        )
      }
    </div>
  ) 
}