import { Link } from 'react-router-dom';
import AuthStore from '../../stores/AuthStore';
import { useState } from 'react';
import MenuVisitor from './MenuVisitor';
import MenuUser from './MenuUser';
export default function Menu() {
    const [role, setRole] = useState<"visitor" | "user" | "administrator">(AuthStore.getState().role);

    AuthStore.subscribe(() => {
        setRole(AuthStore.getState().role);
    })

    return (
        <>
            {role === "visitor" && <MenuVisitor />}
            {role === "user" && <MenuUser />}
            {role === "administrator" && <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                <Link className="navbar-brand" to="/">Hi, {role}</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link" to="/categories">Categories</Link>

                        <Link className="nav-item nav-link" to="/auth/user/login">User login</Link>

                        <Link className="nav-item nav-link" to="/admin/dashboard">Admin dashboard</Link>
                    </div>
                </div>
            </nav>}

        </>
    );
}