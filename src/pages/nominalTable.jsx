import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";

import getTable from '../componets/helpers/getTable';
import getSections from '../componets/helpers/getSections';
import getAfiliacion from '../componets/helpers/getAfiliacion';
import editNominal from '../componets/helpers/editNominal';
import { Edit } from './icons';
import { ModalEdition } from './modals/ModalEdition';
import { ModalDetail } from './modals/ModalDetail';




export const NominalTable = () => {
  const back = "<";
  const front = "  >  ";
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [modalA, setModalA] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const [filas, setFilas] = useState([{}]);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrenPage] = useState(0);
  const [search, setSearch] = useState('');
  const [dataExist, setDataExist] = useState(0);
  const [selected, setSelected] = useState({});
  const [sections, setSections] = useState([]);

  useEffect(() => {
    setUser(window.localStorage.getItem('nameUser'));
    setDataExist(0);
  },[])
  
  const toggle = () => setModal(!modal);
  const toggleA = () => setModalA(!modalA);
  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDetail = () => setModalDetail(!modalDetail);

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
            setDataExist(1);
            console.log("Imprimiendo los datos de la consulta::");
            console.log(serviceConsulta);
            setFilas(serviceConsulta);
            
        }else{
            setDataExist(2);
            console.log("Sin resultados en la consulta");
            if(serviceConsulta.message == undefined){
                console.log(serviceConsulta);
                setFilas(serviceConsulta);
            }else{
                console.log("Error en espectral:"+serviceConsulta.message)
            }

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

  const onClickEdit = async ({target}) =>{
    console.log("Service get Seccions")
    const select = filas.filter((filas) => filas.id == target.value);
    setSelected(select[0]);
    console.log("El id a enviar es:"+target.name)
    console.log("El seleccionado es:"+JSON.stringify(select));
    try{
      const serviceSection = await getSections(target.name);
          if(serviceSection.length > 0){
              setSections(serviceSection)
              console.log("Imprimiendo los datos de la consulta:getSection:");
              console.log(serviceSection);
          }else{
              console.log("Sin resultados en la consulta de Secciones");
              console.log(serviceSection);
          }
      }catch(e){
          console.log("Error espectral en el servicio de getSections: "+ e);
      }

    toggleEdit();
  }

  
  const onClickDetalle = ({target}) =>{
    const select = filas.filter((filas) => filas.id == target.value);
    setSelected(select[0]);
    toggleDetail();
  }

  const onClickAfiliar = ({target}) =>{
    setIdAfiliado(target.value);
    setNameAfiliado(target.name);
    toggleA();
  }

  const [idAfiliado, setIdAfiliado] = useState('');
  const [nameAfiliado, setNameAfiliado] = useState('');

  const onClickSiAfiliar = async () => {
    let nuevasFilas = {};
    try{
    const afil  = await getAfiliacion(idAfiliado);
    const {actualizados, idAfiliacion} = afil;

    console.log("Respuesta Afiliacion Afectadas: "+ actualizados +"El ID es: " +idAfiliacion);
    if(actualizados == 1){
      console.log("Se encontro alguien para actualizar")
      nuevasFilas = filas.map(function(regis){
        if(regis.id == idAfiliacion){
           regis.afiliado = 1;
        }
        return regis;
      })
      //console.log("Filas Actualizadas:"+nuevasFilas)
    }
    
    }catch(e){
      console.log("Ocurrio un erro espectral al afiliar:"+e)
    }
    toggleA();
  }

  const tableView = (
    <>
    <button className='btn btn-primary' onClick={backPage}>{back}</button>
    &nbsp;
    <button className='btn btn-primary' onClick={nextPage}>{front}</button>
    &nbsp;
    <div className='col-md12'>&nbsp;</div>
    {/* <input type="text" className='mb-5 form-control' placeholder='Buscar por nombre'
    value={search} onChange={ onSearchChange }/> */}

                <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead >
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Clave de Elector</th>
                      <th>Dirección</th>
                      <th>Telefono</th>
                      <th>Editar</th>
                      <th>status</th>
                      <th>detalle</th>
                      <th> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filerData().map(({id,nombres,ape_pat,ape_mal, ClaveElector,direccion,telefono,vota_pt,afiliado,id_seccion}) =>(

                      <tr key= {id}>
                      {/* <th scope="row">1</th> */}
                      <td>{id}</td>
                      <td>{vota_pt  == 1 ? <p style={{color:"red"}}>{nombres+" "+ape_pat+" "+ape_mal}</p> : nombres+" "+ape_pat+" "+ape_mal }</td>
                      <td>{ClaveElector}</td>
                      <td>{direccion}</td>
                      <td>{telefono}</td>
                      <td><button className="btn btn-success" value={id} name= {id_seccion} onClick={onClickEdit}>Editar</button></td>
                      <td>{afiliado  == 1 ? "Afiliado" : "No afiliado" }</td>
                      <td>{afiliado  == 0 ? <button className='btn btn-success' value={id} name={nombres}
                          onClick={onClickAfiliar}>Afiliar</button> : <p> </p> }</td>
                      <td><button className="btn btn-success" value={id} onClick={onClickDetalle}>Detalle</button></td>

                      </tr>
                      
                        ))}
                  </tbody>
                </table>
                </div>
                </>
        )

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
            <div className='col-md-2 d-flex justify-content-start'>
                  Bienvenid@ {user}
            </div>
            <div className='col-md-2 d-flex justify-content-end'>
              <button  className="btn btn-primary" onClick={toggle}> Cerrar Sesion </button>
            </div>
        </div>
        </form>
    <hr />
    <div>
      <div>
                {dataExist == 0 ? <div>Realice una Consulta</div> : null }
      </div>
      <div>
                {dataExist == 1 ? tableView : null}
      </div>
      <div>
                {dataExist == 2 ? <div>No  existen datos con los parametros de busqueda</div> : null}
      </div>      
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
            <ModalEdition modalEdit= {modalEdit} toggleEdit = {toggleEdit} 
                          seleccionado = {selected}  sections={ sections } filas = {filas}/>

            <ModalDetail modalDetail= {modalDetail} toggleDetail = {toggleDetail} 
                          seleccionado = {selected} />


    </>
  );
}

