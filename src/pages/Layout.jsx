import { Outlet , Link } from "react-router-dom"

const Layout = () => {
    return (
      <div className="d-flex justify-content-center p-5 text-center">
        <a href="/" className="button-71">HOME</a>
        <a href="/loginLista" className="button-71">Lista Nominal</a>

            {/* <ul className="nav justify-content-center ">
                <li >
                        <Link to="/" >Home</Link>
                </li>
                <></>
                <li >
                        <Link to="/loginLista">Lista Nominalss</Link>
                </li>
            </ul> */}
            <Outlet/>
    </div>
    );
} 

export default Layout;