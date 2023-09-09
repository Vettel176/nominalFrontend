import { Outlet , Link } from "react-router-dom"

const Layout = () => {
    return (
      <div>
            <ul className="nav justify-content-center ">
                <li className="nav-item">
                        <Link to="/" >Home</Link>
                </li>
                <></>
                <li className="nav-item">
                        <Link to="/loginLista">Lista Nominal</Link>
                </li>
            </ul>
            <Outlet/>
    </div>
    );
} 

export default Layout;