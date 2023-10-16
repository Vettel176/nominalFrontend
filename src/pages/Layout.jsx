import { Outlet , Link } from "react-router-dom"

const Layout = () => {
    const labelHome ="Charo";
    const labelNominalList = "Lista Nominal"
    return (
      <div className="d-flex justify-content-around p-5 text-center">
        <a href="/" className="button-71">{labelHome}</a>
        <a href="/loginLista" className="button-71">{labelNominalList}</a>

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