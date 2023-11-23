import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Close = (user) => {

    const navigate = useNavigate();

    useEffect(() => {
            console.log("Ejecutando 1 vez");
            setTimeout(() => {
                navigate("/");
            }, 2500);
      }, [])

    return  ( 
                <div className="center" data-aos="zoom-out-down">
                    <br />
                    <br />
                    <h1>Se ha cerrado su sesión exitosamente</h1>
                    <br />
                    <br />
                </div>
                
            )
}

export default Close;