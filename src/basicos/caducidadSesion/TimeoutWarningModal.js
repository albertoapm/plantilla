import React from 'react';
import Modal from 'react-modal';
import {useAuthContext} from '../login/context/authContext';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth:"500px",
    width: "100%",
    padding: "50px",
    fontSize: "20px"
  },  
};

Modal.setAppElement('#root');
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

export const TimeoutWarningModal = ({isOpen, onRequestClose}) => {  
  const {logout} = useAuthContext();
  const onLogOffCall = () => {
    // Implement your logout functionality here, e.g. clear the users login cache or hit your signout server
    logout();
    onRequestClose();
  }

  return (
    <div> 
      <Modal
        isOpen={isOpen}
        style={customStyles}
        contentLabel="Example Modal"
        /*{</div>ariaHideApp={true}}*/
      >
        <h2>Sesión apunto de expirar</h2>
        <div>Su sesión va a caducar por razones de seguridad. Por favor, escoga mantenerse conectado. Si no, se cerrará sesión automáticamente</div>
        <br/>
        <button style={{float:'left', margin: '5px', padding: "10px"}} onClick={onLogOffCall}>Cerrar Sesión</button>
        <button style={{float:'right', margin: '5px', padding: "10px"}} onClick={onRequestClose}>Permanecer Conectado</button>
      </Modal>
    </div>  
  );
}

