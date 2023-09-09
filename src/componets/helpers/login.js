
export const getToken = async (u, p) =>{
    console.log("Valores que llegan para el Login: "+u+" y: "+p);
        const url = `http://localhost:3000/login`;
        const data = {
            name : u,
            pass : p
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