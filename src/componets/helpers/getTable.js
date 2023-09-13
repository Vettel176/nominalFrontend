export const getTable = async (nombre,appat,apmat) =>{
    console.log("Valores llegan al getTabla: (Nombre: "+nombre+") (Apellido Paterno: "+appat+")(Apellido Materno: "+apmat+")");
        const url = `https://letmepass.up.railway.app/nominal/lista`;  
        //const url = `http://localhost:3000/nominal/lista`; 
        const data = {
            name : nombre,
            appat : appat,
            apmat : apmat
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
export default getTable;