import { env, municipio } from "../../settings/environment";
export const getSections = async (id) =>{
    console.log("Method getSecciones el id que se envia: "+id);
         const serviceName = municipio+"/getSecciones";
         const url = env+serviceName; 
        
        const data = {
            seccion : id
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
export default getSections;