import { Link, useNavigate } from 'react-router-dom';
import AuthStore from '../../stores/AuthStore';
export default function MenuUser() {

    const navigate = useNavigate();

    function doUserLogout() {
        AuthStore.dispatch({ type: "reset" });
        navigate("/auth/user/login")
    }

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="navbar-brand">Hi, {AuthStore.getState().identity}</div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">

                    <Link className="nav-item nav-link" to="/">All products</Link>
                    <Link className="nav-item nav-link" to="/categories">Categories</Link>
                    <button className="btn btn-outline-primary my-2 my-sm-0 pl-5" style={{ cursor: "pointer" }} onClick={() => doUserLogout()}>Logout</button>

                </div>
            </div>
        </nav>

    )
}