export const getTable = async (token, n, ap, am) =>{
    console.log("Method Table");
        const url = `https://letmepass.up.railway.app/nominal/lista`; 
        //const url = `http://localhost:3000/nominal/lista`; 
        const data = {
            name : n,
            apepat : ap,
            apemat : am
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