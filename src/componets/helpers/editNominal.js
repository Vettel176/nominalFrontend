import { env } from "../../settings/environment";
export const editNominal = async (newData) =>{
    //id,names,appat,apmat,clave,dir,tel,secc
    //nombres, ape_pat,ape_mal,ClaveElector,direccion,telefono, id_seccion
            console.log("Id: "+newData.id);
            console.log("Nombre: "+newData.nombres);
            console.log("ApPat: "+newData.appat);
            console.log("ApMat: "+newData.apmat);
            console.log("Clave: "+newData.clave);
            console.log("Direccion: "+newData.dir);
            console.log("Telefono: "+newData.tel);
            console.log("Seccion: "+newData.secc);
         const serviceName = "nominal/editar";
         const url = env+serviceName; 
        
        const data = {
            id : newData.id,
            names : newData.nombres,
            appat : newData.appat,
            apmat : newData.apmat,
            clave : newData.clave,
            dir : newData.dir,
            tel : newData.tel,
            secc : newData.secc
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
export default editNominal;