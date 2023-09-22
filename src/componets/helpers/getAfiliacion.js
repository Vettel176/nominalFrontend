import { env } from "../../settings/environment";
export const getAfiliacion = async (id) =>{
    console.log("Method Afiliacion el id que se envia: "+id);
         const serviceName = "nominal/afiliar";
         const url = env+serviceName; 
        
        const data = {
            idAfiliacion : id
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
export default getAfiliacion;