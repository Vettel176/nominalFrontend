
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { NominalTable } from './nominalTable';
import  getToken  from '../componets/helpers/login';
import  getValidateToken from '../componets/helpers/loginValidate'
import { Loader } from '../componets/loader';
import Header from './header';


let token = null;

const setToken = newToken =>{
    token = `Bearer ${newToken}`
    console.log("El token es:"+ token);
}


const Login = () => {
    console.log("Cargando el Componente LOGIN")
    const [modal, setModal] = useState(false);
    const [user, setUser] = useState("NA");
    const [modalS, setModalS] = useState(false);
    const [msjToken, setMsjToken] = useState(false);
    const [tokenStorage, setTokenStorage] = useState(0);
    const navigate = useNavigate();

    useEffect( ()  => {
        console.log("Use Effect del  Componente LOGIN")
        console.log("Variable token en Storage: " +window.localStorage.getItem('tokenLogin')+ "<--")
        if(window.localStorage.getItem('tokenLogin') == null){
            console.log("Token Null -> Login")
            setTokenStorage(1); 
        }else{
            console.log("Token en LS")
            console.log("Validar Sesion")
            const funcValidaToken = async () => {
                const validaToken = await  getValidateToken(window.localStorage.getItem('tokenLogin'),3000);
                const {msj, status} = validaToken
                console.log("Mensaje: "+msj+ " status:  "+status)
                if(validaToken.status == 900){
                    console.log("Token Valido")
                    setTokenStorage(2);
                }else{
                        console.log("Token Invalido"+validaToken.status)
                        window.localStorage.removeItem('tokenLogin');
                        setTokenStorage(1);
                        toggleS();
                        //setMsjToken(validaToken.msj)
                        //navigate("/");
                }
            }
              funcValidaToken()
                // make sure to catch any error
                .catch(console.error);
            }
           
    },[])

    const validarToken = async () =>{
        console.log("validarToken...")
        try{
        const validaToken = await getValidateToken(tokenStorage);
            if(validaToken.status == 900){
                console.log("Token Valido")
            }else{
                window.localStorage.removeItem('tokenLogin');
                toggleS();
                setMsjToken(validaToken.msj)
                navigate("/");
                }
        }catch(e){
            console.log("Error espectral al validar el TOKEN:"+validarToken);
        }
    }
    

    const toggle = () => setModal(!modal);
    const toggleS = () => setModalS(!modalS);

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
        setTokenStorage(0);
        console.log("Se Envian los parametros del Login al Ws del token:");
        const{ user, pass } = dataLogin;
        setUser(user);
        try{
        const serviceLogin = await getToken(user,pass);
            if(serviceLogin.code == 200){
                console.log("Tenemos un 200 señores");
                setToken(serviceLogin.token);
                setTokenStorage(2);
                window.localStorage.setItem('tokenLogin',serviceLogin.token);
                window.localStorage.setItem('nameUser', user);
            }else{
                setTokenStorage(1);
                toggle();
                console.log("No son validas las credenciales");
            }
        }catch(e){
            console.log("Error en el servicio de Login"+ e);
        }
    }


    const loginView = (
        <div className='d-flex justify-content-center pt-5' data-aos="fade-down">

            <form onSubmit={handleSubmit(onSubmit)} className='p-2 bg-light border border-secondary rounded col-8'>
                <div className='row'>
                    
                    <div className="p-3"> 
                        <input {...register("user", { required: true })} className="form-control" placeholder="Usuario" />
                            {errors.user && <span className='text-danger'>este campo es obligatorio*</span>}
                    </div>
                       
                </div>
                <div className='row'>
                    
                    <div className="p-3">
                        <input type='password' {...register("pass", { required: true })} className="form-control" placeholder="Contraseña"/>
                            {errors.pass && <span className='text-danger'>Ingresa una contraseña</span>}
                            </div>
                    
                </div>
                <div className='row'>
                   
                    <div className="p-3 d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary" >Iniciar Sesion</button>
                    </div>
                </div>
                    
            </form>

            <div>
                <Modal isOpen={modal}
                    toggle={toggle}
                    modalTransition={{ timeout: 200 }}
                    size="lg">
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
            <div>
            <Modal isOpen={modalS}
                    toggle={toggleS}
                    modalTransition={{ timeout: 100 }}
                    size="lg">
                    <ModalHeader
                        toggle={toggleS}>Mensaje
                    </ModalHeader>
                    <ModalBody>
                       La sesion no es Valida: {msjToken}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggleS}>Aceptar</Button>
                    </ModalFooter>
                </Modal>

            </div>
        </div>
    )

    return  (<div>
                            {tokenStorage == 2 ? <div data-aos="flip-up"><Header user = {user}/></div> : null}
                    <br />
                    <div className="d-flex justify-content-center" data-aos="fade-left">
                            <p className='subHeader'> T A R I M B A R O </p>
                    </div>
                    <div className='col-12'>
                    </div>
                <div>
                  <div>
                            {tokenStorage == 0 ? <div className="d-flex justify-content-center"><Loader/></div> : null }
                  </div>
                  <div>
                            {tokenStorage == 1 ? loginView : null}
                  </div>
                  <div>
                            {tokenStorage == 2 ? <div><NominalTable/></div> : null}
                  </div>      
                </div>
            </div>
            )
}

export default {Login, setToken}