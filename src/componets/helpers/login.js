
import { env } from "../../settings/environment";

export const getToken = async (u, p) =>{
    console.log("Valores que llegan para el Login: "+u+" y: "+p);
        const nameService = "loginNominal";
        const url = env+nameService;
        const data = {
            name : u,
            pass : p,
            id_place: 3
        }
        const response = await fetch(url, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        return response.json(); 
}
export default getToken;