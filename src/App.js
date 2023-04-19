import {HashRouter as Router2, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicRoute from './basicos/enrutamiento/router/PublicRoute';
import PrivateRoute from './basicos/enrutamiento/router/PrivateRoute';
import {TimeoutLogic} from './basicos/caducidadSesion/TimeoutLogic';
import { AuthContextProvider } from './basicos/login/context/authContext';
import Login from './basicos/login/Login';
import Logout from './basicos/login/Logout';
import 'bootstrap/dist/css/bootstrap.min.css'
import Inicio from './views/Inicio';
import PG1 from './views/PaginaPrueba1';
import PG2 from './views/PaginaPrueba2';
import PG3 from './views/PaginaPrueba3';
import PG4 from './views/PaginaPrueba4';
import PG5 from './views/PaginaPrueba5';
import PG6 from './views/PaginaPrueba6';
import PG7 from './views/PaginaPrueba7';

let BASENAME = '/'
var ip = window.location.hostname;


if (ip==="192.168.10.69"){
  localStorage.setItem('path',"http://192.168.10.69/eco2"); 
  localStorage.setItem('server',"192.168.10.69");
  BASENAME = '/'
  //BASENAME = '/Eco2'
}

if (ip==="localhost"){
  localStorage.setItem('path',"http://localhost:4000/plantilla/public"); 
  localStorage.setItem('server',"127.0.0.1");
}


export default function App() {
  
  return (
    
    <AuthContextProvider>
      {/*<Router basename={BASENAME}>*/}
      <Router2 basename={BASENAME}>
        <Routes>
          <Route path="/" element={<PrivateRoute/>}>
            <Route index element={<Inicio/>}/>
            <Route path="Inicio" element={<Inicio/>}/>
            <Route path="Logout" element={<Logout/>}/>
            <Route path="ControlHoras" element={<PG1/>}/>
            <Route path="Fichaje" element={<PG2/>}/>
            <Route path="pg3" element={<PG3/>}/>
            <Route path="pg4" element={<PG4/>}/>
            <Route path="pg5" element={<PG5/>}/>
            <Route path="pg6" element={<PG6/>}/>
            <Route path="pg7" element={<PG7/>}/>
          </Route>
          <Route path="/Login" element={<PublicRoute/>}>
              <Route index element={<Login/>}/>
              <Route  path="Form" element={<Login/>}/>       
          </Route>
          <Route path="/Public/pg3" element={<PG3/>}/> 
        </Routes>
      </Router2> 
      <TimeoutLogic/> 
    </AuthContextProvider>
   


  );
}
