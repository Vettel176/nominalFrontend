
import { env } from "../../settings/environment";
export const getValidateToken = async (token) =>{
    console.log("Valores que llegan para el Login: "+token);
        const nameService = "validateTokenNominal";
        const url = env+nameService;
        const data = {
            token: token
        }
        const response = await fetch(url, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        console.log("RESPONSEEEEE status ws VALID TOKEN"+response.status);
        return response.json(); 
}
export default getValidateToken;