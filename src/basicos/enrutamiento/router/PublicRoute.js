import {Navigate, Outlet} from 'react-router-dom';
import {useAuthContext} from '../../login/context/authContext';

export default function PublicRoute(){
    const {isAuthenticated} = useAuthContext();

    if (isAuthenticated){
        return <Navigate to="/Inicio" />;
    }

    return(
        <div>
            <Outlet/>
        </div>
    );

}