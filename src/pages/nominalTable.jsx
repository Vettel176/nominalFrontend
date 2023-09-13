import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import getTable from '../componets/helpers/getTable';
import getAfiliacion from '../componets/helpers/getAfiliacion';



export const NominalTable = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [modalA, setModalA] = useState(false);
  const [filas, setFilas] = useState([{}]);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrenPage] = useState(0);
  const [search, setSearch] = useState('');
  const [dataConsult, setDaConsult] = useState({});



  useEffect(() => {
    setUser(window.localStorage.getItem('nameUser'));
  },[])
  
  const onClickConsult = async () => {
    try{
      const table  = await getTable(dataConsult);
      console.log(table[0].id);3
      setFilas(table);
    }catch(e){
      console.log("Error Espectrial al consultar la tabla:"+e)

    }
  }

  const toggle = () => setModal(!modal);
  const toggleA = () => setModalA(!modalA);

  const onClickCloseSession = () =>{
    const user = window.localStorage.getItem('nameUser');
    console.log("Usuario es:"+user);
    toggle();
    window.localStorage.removeItem('tokenLogin')
    navigate("/");
  }

  //Boton consultar Validacion Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
      console.log("Consultando...INICIO: "+ data.nombre+" "+data.appat+" "+data.apmat);
      sendConsultForm(data);
      console.log("Consultando..FIN.")
  }

  const sendConsultForm = async (dataConsulta) => {
    const  {nombre, appat,apmat} = dataConsulta;
    try{
    const serviceConsulta = await getTable(nombre, appat,apmat);
        if(serviceConsulta.length > 0){
            console.log("Imprimiendo los datos de la consulta::");
            console.log(serviceConsulta);
            setFilas(serviceConsulta);
        }else{
            console.log("Sin resultados en la consulta");
            console.log(serviceConsulta);
            setFilas(serviceConsulta);
        }
    }catch(e){
        console.log("Error espectral en el servicio de Consulta: "+ e);
    }
}


  //filtrado
  const filerData = () =>{
    if(search.length === 0 ){
      return filas.slice(currentPage,currentPage+5)
    }
    const filtered = filas.filter(registros => registros.nombres.includes(search));
    console.log({filtered});
    return filtered.slice(currentPage,currentPage+ 5);
  }

  const nextPage = () => {
    if(filas.filter(registros => registros.nombres.includes(search)).length > currentPage + 5)
    setCurrenPage(currentPage + 5);
  }

  const backPage = () => {
    if(currentPage > 0 )
    setCurrenPage(currentPage - 5);
  }

  const onSearchChange = ({target}) =>{
    setCurrenPage(0)
    setSearch (target.value)
    console.log("Valor del Input"+ target.value)
  }

  const onClickAfiliar = ({target}) =>{
    // console.log("Value::"+target.value);
    // console.log("NAME::"+target.name);
    setIdAfiliado(target.value);
    setNameAfiliado(target.name);
    toggleA();
  }

  const [idAfiliado, setIdAfiliado] = useState('');
  const [nameAfiliado, setNameAfiliado] = useState('');

  const onClickSiAfiliar = async () => {

    try{
    const afil  = await getAfiliacion(idAfiliado);
    console.log("Respuesta Afiliacion"+ afil)
    onClickConsult();
    
    }catch(e){
      console.log("Ocurrio un erro espectral al afiliar:"+e)
    }
    toggleA();
  }


  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row'>
            <div className='col-md-2 d-flex justify-content-center'>
                <input type="text"  {...register("nombre", { required: true })} className='form-control' placeholder='Nombre'/>
                  {errors.nombre && <span className='text-danger'>*</span>}
            </div>
            <div className='col-md-2 d-flex justify-content-center'>
                <input type="text"  {...register("appat", { required: true })} className='form-control' placeholder='Apellido Paterno'/>
                  {errors.appat && <span className='text-danger'>*</span>}
            </div>
            <div className='col-md-2 d-flex justify-content-center'>
                <input type="text"  {...register("apmat", { required: true })} className='form-control' placeholder='Apellido Materno'/>
                {errors.apmat && <span className='text-danger'>*</span>}
            </div>
            <div className='col-md-2 d-flex justify-content-center'>
              <button   className="btn btn-success"> Consultar </button>
            </div>
            <div className='col-md-2 p-1'></div>
            <div className='col-md-2 d-flex justify-content-end'>
              <button  className="btn btn-primary" onClick={toggle}> Cerrar Sesion </button>
            </div>
        </div>
        </form>
    <hr/>
        <div className='row'>
          <div className='col-md-12 d-flex justify-content-start'>
            Bienvenid@ {user}
          </div>
        </div>
    <hr />
    <div>
      <button className='btn btn-primary' onClick={backPage}></button>
      &nbsp;
      <button className='btn btn-primary' onClick={nextPage}>Siguientes</button>
      &nbsp;
      <input type="text" className='mb-5 form-control' placeholder='Buscar por nombre'
      value={search} onChange={ onSearchChange }/>

                  <table className="table">
                    <thead >
                      <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Clave de Elector</th>
                        <th>Dirección</th>
                        <th>Telefono</th>
                        <th>Afiliado</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {filerData().map(({id,nombres,ClaveElector,direccion,telefono,vota_pt}) =>(
  
                        <tr key= {id}>
                        {/* <th scope="row">1</th> */}
                        <td>{id}</td>
                        <td>{nombres}</td>
                        <td>{ClaveElector}</td>
                        <td>{direccion}</td>
                        <td>{telefono}</td>
                        <td>{vota_pt  == 1 ? "Afiliado" : "No afiliado" }</td>
                        <td>{vota_pt  == 0 ? <button className='btn btn-success'  value={id} name={nombres}
                            onClick={onClickAfiliar}>Afiliar</button> : <p> </p> }</td>
                        {/* <td><button className='btn btn-success' value={id} name={nombres} onClick={(e) => (async () => {
                               try {
                                 const invoices = await getAfiliacion(id);
                               } catch (e) {
                                console.log("Ocurrio un erro espectral al afiliar:"+e)
                               }
                             })()} 
                            >Afiliar</button></td> */}
                        </tr>
                                ))}
                    </tbody>
                  </table>
    </div>
            <div>
                <Modal isOpen={modal}
                    toggle={toggle} 
                    modalTransition={{ timeout: 200 }} 
                    size="lg" style={{maxWidth: '500px', width: '50%'}}>
                    <ModalHeader color="secondary"
                        toggle={toggle}>Mensaje
                    </ModalHeader>
                    <ModalBody color="primary" >
                        {user+ " "}¿Desea Cerrar Sesion?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={onClickCloseSession}>Aceptar</Button>
                    </ModalFooter>
                </Modal>
            </div >
            <div>
                <Modal isOpen={modalA}
                    toggle={toggleA} 
                    modalTransition={{ timeout: 200 }} 
                    size="lg" style={{maxWidth: '500px', width: '50%'}}>
                    <ModalHeader color="secondary"
                        toggle={toggleA}>Mensaje
                    </ModalHeader>
                    <ModalBody color="primary" >
                        ¿Desea Afiliar a {' '+ nameAfiliado}?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={onClickSiAfiliar}>Sí</Button>
                    </ModalFooter>
                </Modal>
            </div >
    </>
  );
}

