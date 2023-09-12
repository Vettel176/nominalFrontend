
export const getValidateToken = async (token) =>{
    console.log("Valores que llegan para el Login: "+token);
        const url = `https://letmepass.up.railway.app/validateToken`;
        //const url = `http://localhost:3000/validateToken`;
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