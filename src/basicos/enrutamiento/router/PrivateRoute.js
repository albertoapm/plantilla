import {Navigate, Outlet} from 'react-router-dom';
import {useAuthContext} from '../../login/context/authContext';


export default function PrivateRoute(){
    const {isAuthenticated} = useAuthContext();

    if (!isAuthenticated){

        return <Navigate to="/Login" />;
        
    }

    return(
        <div>
            <Outlet/>
        </div>
    );

}