import React, { useState } from "react";
import {useAuthContext} from '../login/context/authContext';
import {Link} from 'react-router-dom';
import './styles.css'

export default function Login(){

    const {login} = useAuthContext();

    function handleSubmit(event){
        //event.preventDefault();
        ValidarUsuario();
    }

    function handleKeyDown(e){
        
        if (e.key === 'Enter') {
            ValidarUsuario();
        }

      }

    function ValidarUsuario(){

        var data = new FormData();
        var xhr = new XMLHttpRequest();
        data.append('tipoCons', "0");
        data.append('usu45', document.getElementById("usu").value);
        data.append('pas45', document.getElementById("Password").value);
      
        //xhr.open('POST', localStorage.getItem('path') + '/consultas/consultas.php', true);
        xhr.open('POST', localStorage.getItem('path') + '/consultas/consultas_server.php', true);
        //console.log('POST')
        xhr.send(data);
        xhr.onload = function (e, n) {
            var txt=xhr.responseText;
            //console.log(txt)
            if (txt !== "0"){
                //console.log(txt)
                txt=JSON.parse(txt);
                const miArray = txt;
                miArray.splice(0, 1);
                //console.log(miArray);
                //console.log(miArray.length);
                if (miArray.length == 1){
                    localStorage.setItem('usuario',miArray[0][1]);
                    localStorage.setItem('nomUsuario',miArray[0][2]);
                    login()
                }else{
                    alert("Usuario no encontrado");
                }
  
            }else{
              console.log("Error")
            }        
          }

    }


    return (
        <div className='login template d-flex justify-content-center align-items-center vh-100 bg-primary'>
            <div className='form_container p-5 rounded bg-white'>
                {/*<form autoComplete='form'>*/}
                    <input type="hidden" value="prayer" />
                    <h3 className='text-center'>Inicio de Sesión</h3>
                    <div>
                        <label >Usuario</label>
                        <input autoComplete='User' type="text" id="usu" placeholder="Introduzca Nombre de Usuario"   className='form-control'/>

                    </div>
                    <div className='mb-2'>
                        <label >Password</label>
                        <input autoComplete="new-password" type="password" id="Password" placeholder='Introduzca Password'  
                        className='form-control' onKeyDown={handleKeyDown} />
                    </div>
                    <div className='mb-2'>
                        <input type="checkbox" className='custom-control custom-checkbox' id="check"/>
                        <label htmlFor="Check" className='custom-input-label ms-2'>
                            Recuérdame
                        </label>
                    </div>
                    <div className='d-grid'>
                        <button className='btn btn-primary' onClick={e=>handleSubmit()}>Sign in</button>
                    </div>
                    <p className='text-end mt-2'>
                         No recuerdas tu <a href="">contraseña</a>?  Nuevo<Link to='/signup' className ='ms-2'>Registro </Link>
                    </p>
                {/*</form>*/}
            </div>
        </div>
    )
}

