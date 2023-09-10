
import  getToken  from '../componets/helpers/login';
import  getTable from '../componets/helpers/getTable'
import { NominalTable } from './nominalTable';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";

let token = null;

const setToken = newToken =>{
    token = `Bearer ${newToken}`
    console.log("El token es:"+ token);
}



const Login = () => {
    console.log("Cargando el Componente LOGIN redireccionado por la URL")
    const [modal, setModal] = useState(false);
    const [tokenStorage, setTokenStorage] = useState(false);

    useEffect(() => {
        console.log("Use Effect del  Componente LOGIN obtengo Token")
        console.log("Variable token en Storage: " +window.localStorage.getItem('tokenLogin')+ "<--")
        if(window.localStorage.getItem('tokenLogin') == null){
            console.log("Quesegun null")
            setTokenStorage(false);
        }else{
            console.log("Quesegun ya existe")
            setTokenStorage(true);
        }   
    },[])

    

    const toggle = () => setModal(!modal);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
    
    const onSubmit = (data) => {
        console.log("Se oprime El Submit")
        sendLogin(data);
    }


    const sendLogin = async (dataLogin) => {
        console.log("Se Envian los parametros del Login al Ws del token:");
        const{ user, pass } = dataLogin;
        try{
        const serviceLogin = await getToken(user,pass);
            if(serviceLogin.code == 200){
                console.log("Tenemos un 200 señores");
                setToken(serviceLogin.token);
                setTokenStorage(true);
                window.localStorage.setItem('tokenLogin',serviceLogin.token);
                window.localStorage.setItem('nameUser', user);
            }else{
                toggle();
                console.log("No son validas las credenciales");
            }
        }catch(e){
            console.log("Error en el servicio de Login"+ e);
        }
    }


    const loginView = (
        <div>

            <form onSubmit={handleSubmit(onSubmit)} className='p-3 bg-light border border-secondary rounded'>
                    <div className='row'>
                    <div className="col-md-3"></div>
                    <div className="col-md-6 p-3"> 
                        <input {...register("user", { required: true })} className="form-control" placeholder="Usuario" />
                            {errors.user && <span className='text-danger'>este campo es obligatorio*</span>}
                    </div>
                        <div className="col-md-3"></div>
                    </div>
                    <div className='row'>
                    <div className="col-md-3"></div>
                    <div className="col-md-6 p-3">
                        <input type='password' {...register("pass", { required: true })} className="form-control" placeholder="Contraseña"/>
                            {errors.pass && <span className='text-danger'>Ingresa una contraseña</span>}
                            </div>
                    <div className="col-md-3"></div>
                    </div>
                    <div className='row'>
                    <div className="col-md-3"></div>
                    <div className="col-md-6 p-3 d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary" >Iniciar Sesion</button>
                    </div>
                    </div>
                    <div className="col-md-3"></div>
            </form>

            <div className='d-block Width 30%'>
                <Modal isOpen={modal}
                    toggle={toggle}
                    modalTransition={{ timeout: 200 }}>
                    <ModalHeader
                        toggle={toggle}>Mensaje
                    </ModalHeader>
                    <ModalBody>
                        Credenciales Incorrectas
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>Aceptar</Button>
                    </ModalFooter>
                </Modal>
            </div >
        </div>
    )

    return  (<div>
        <div className=" d-flex justify-content-center">
            <h2> Modulo de consulta Lista Nominal </h2>
            <hr/>
        </div>
        {
            
            tokenStorage ? <div><NominalTable/></div> : loginView 
        }
               
            </div>
            )
}

export default {Login, setToken}