import { Link, useNavigate } from 'react-router-dom';
import AuthStore from '../../stores/AuthStore';
export default function MenuAdministrator() {

    const navigate = useNavigate();

    function doAdminLogout() {
        AuthStore.dispatch({ type: "reset" });
        navigate("/auth/administrator/login")
    }

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="navbar-brand">Good day, {AuthStore.getState().identity}</div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">

                    <Link className="nav-item nav-link" to="/admin/dashboard">Dashboard</Link>
                    <button className="btn btn-outline-primary my-2 my-sm-0 pl-5 float-end" style={{ cursor: "pointer" }} onClick={() => doAdminLogout()}>Logout</button>


                </div>
            </div>
        </nav>

    )
}