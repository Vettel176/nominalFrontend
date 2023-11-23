import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
import { ArrowRight, ArrowLeft, Pencil} from 'react-bootstrap-icons';
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
import { EditButton } from './Icons/EditButton';
import { AfiliarButton } from './Icons/AfiliarButton';
import { DetailButton } from './Icons/DetailButton';




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
    navigate("/close");
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

  const onClickEdit = async (idPersona,idSecc) =>{
    console.log("Service get Seccions")
    const select = filas.filter((filas) => filas.id == idPersona);
    setSelected(select[0]);
    console.log("El id a enviar es:"+idSecc)
    console.log("El seleccionado es:"+JSON.stringify(select));
    try{
      const serviceSection = await getSections(idSecc);
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

  
  const onClickDetalle = (idPersona) =>{
    const select = filas.filter((filas) => filas.id == idPersona);
    setSelected(select[0]);
    toggleDetail();
  }

  const onClickAfiliar = (idPersona, nombres) =>{
    setIdAfiliado(idPersona);
    setNameAfiliado(nombres);
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

    <div className='d-flex justify-content-between'>
      <ArrowLeft   color="royalblue" onClick={backPage} size={50} />
      <ArrowRight  color="royalblue" onClick={nextPage} size={50} />
      
    </div>
    <div className='col-10'>&nbsp;</div>
    {/* <input type="text" className='mb-5 form-control' placeholder='Buscar por nombre'
    value={search} onChange={ onSearchChange }/> */}

              <div className="table-responsive" data-aos="fade-up">
                <table className="table table-bordered table-striped"  style={{fontSize: '14px'}}>
                  <thead>
                    <tr >
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Clave de Elector</th>
                      <th>Dirección</th>
                      <th>Telefono</th>
                      <th>Editar</th>
                      <th>Estatus</th>
                      <th>Afiliar</th>
                      <th>Detalle</th>
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
                      <td>
                          <EditButton idPersona = {id} idSecc={id_seccion} editar = {onClickEdit}/>
                      </td>
                      <td>{afiliado  == 1 ? "Afiliado" : "No afiliado" }</td>
                      <td>{afiliado  == 0 ? <AfiliarButton idPersona={id} nombres={nombres}  afiliar = {onClickAfiliar}/> : <p> </p> }</td>
                      <td>
                        {/* <button className="btn btn-success" value={id} onClick={onClickDetalle}>Detalle</button> */}
                          <DetailButton idPersona = {id} detalle = {onClickDetalle}/>
                      </td>

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
        <div className='row d-flex justify-content-between'>
            <div className='col-4 p-2' data-aos="flip-up">
                <input type="text"  {...register("nombre", { required: true })} className='form-control' placeholder='Nombre'/>
                  {errors.nombre && <span className='text-danger'>*</span>}
            </div>
            <div className='col-4 p-2' data-aos="flip-down">
                <input type="text"  {...register("appat", { required: true })} className='form-control' placeholder='Apellido Pat'/>
                  {errors.appat && <span className='text-danger'>*</span>}
            </div>
            <div className='col-4 p-2' data-aos="flip-up">
                <input type="text"  {...register("apmat", { required: true })} className='form-control' placeholder='Apellido Mat'/>
                {errors.apmat && <span className='text-danger'>*</span>}
            </div>
        </div>
        <br />
        <div>
            <div className='col-12 d-flex justify-content-center' data-aos="fade-up">
              <button   className="button-43"> Consultar </button>
            </div>
        </div>
        </form>
    <hr />
    <div>
      <div>
                {dataExist == 0 ? <div className='d-flex justify-content-center subHeader2'>Realice una Consulta</div> : null }
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
                    size="md" >
                    <ModalHeader color="secondary"
                        toggle={toggle}>Mensaje
                    </ModalHeader>
                    <ModalBody color="primary" >
                      ¿Desea Cerrar Sesion?
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
                    size="md">
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

