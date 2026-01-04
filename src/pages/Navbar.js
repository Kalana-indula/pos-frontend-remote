import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const Navbar = () => {

    const navigate = useNavigate();

    //Detecting login/logout status
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //Checking login status
    const checkLoginStatus=()=>{
        const token = localStorage.getItem("token");
        //If token exists , set state variable to true , otherwise false
        setIsLoggedIn(!!token);
    }

    useEffect(() => {
        //Checking logging status initially
        checkLoginStatus();

        //Detect storage changes to update logging status dynamically
        window.addEventListener("storage",checkLoginStatus);

        //Cleanup listener as component unmounted
        return()=>{
            window.removeEventListener("storage",checkLoginStatus);
        };

    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
    }

    return (
        <>

            <div className="navigation">
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/"><i className="bi bi-house-door-fill"></i></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                <Link className="nav-link" to={`/allitems`}>All Items</Link>
                                <Link className="nav-link" to={`/actions`}>Actions</Link>

                                <li className="nav-item dropdown">
                                    <button className="nav-link dropdown-toggle btn btn-link"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                        <i className="bi bi-person-circle"></i> User
                                    </button>
                                    <ul className="dropdown-menu">
                                        {isLoggedIn ? (
                                            <li>
                                                <button className="dropdown-item" type="button" onClick={handleLogout}>
                                                    <i className="bi bi-box-arrow-left"></i> Logout
                                                </button>
                                            </li>
                                        ) : (
                                            <li>
                                                <Link className="dropdown-item" to="/login/user">
                                                    <i className="bi bi-box-arrow-in-right"></i> Login
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

        </>
    );
}

export default Navbar;