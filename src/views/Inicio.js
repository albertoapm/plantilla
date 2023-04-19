import React, { useState, useEffect } from "react";
import MenuV from '../basicos/sideBar/menuVOK';
//import Cuerpo from '../components/table-demo/tablaFiltro';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from 'react-router-dom'
import './style.css';

export default function Inicio() {
  const navigate = useNavigate();
   const [paddingLeftSideBar, setPaddingLeftSideBar] = useState(0);
  

  useEffect(() => {
    //console.log("View: Inicio")
  }, []);

  function CambiarPadding(){
    if (paddingLeftSideBar==0){
      setPaddingLeftSideBar(250) 
    }else{
      setPaddingLeftSideBar(0) 
    }
  } 

  function CerrarSesion(){
    console.log("/LogOut")
    navigate('/Logout') 
  }
  //console.log (localStorage.getItem('usuario'))
  //console.log("hola Incio");
  return (
    <div>
      
      <div className="header">
        <span style={{float:'right', margin: '10px', cursor: 'pointer'}} onClick={()=>CerrarSesion()}>
          <LogoutIcon fontSize="large" sx={{ color: "white" , fontSize: 40}} />
        </span>
      </div>
      
        <input type="checkbox" className="toggle-Sidebar" id="toggle-Sidebar"></input>
        <label htmlFor ="toggle-Sidebar" className="toggle-icon" onClick={()=>CambiarPadding()}>
          <div className="bar-top" style={{background: "white"}}></div>
          <div className="bar-center" style={{background: "white"}}></div>
          <div className="bar-bottom" style={{background: "white"}}></div>
        </label>


        

      <div className="sidebar">
        <div>
          {/*<Atajos/>*/}
          {/*console.log("Renderizando Inicio")*/}
        </div>
        <div>
          <MenuV/>
        </div>
      </div>

      <div className="cuerpo" style = {{paddingLeft: paddingLeftSideBar, transition: "padding .3s" }}>
        {/*<Cuerpo/>*/}
      </div>

    </div>
  );
}