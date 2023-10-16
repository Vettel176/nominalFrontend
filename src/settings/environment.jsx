
let ambiente = "";

const environtment = () => {

    let prod = true;

    if(prod){
        ambiente = "https://letmepass.up.railway.app/";
    }else{
        ambiente = "http://localhost:3000/";
    }

}

environtment();


export let env = ambiente;

export let municipio = "charo";
