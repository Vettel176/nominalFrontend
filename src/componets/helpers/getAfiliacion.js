export const getAfiliacion = async (id) =>{
    console.log("Method AfiliacION eL id QUE SE ENVIA:"+id);
         const url = `https://letmepass.up.railway.app/nominal/afiliar`; 
         //const url = `http://localhost:3000/nominal/afiliar`; 
        
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