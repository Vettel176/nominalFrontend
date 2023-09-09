import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import getTable from '../componets/helpers/getTable';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";



const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'nombres', headerName: 'Nombre', width: 120 },
  { field: 'ClaveElector', headerName: 'Clave de Elector', width: 300 },
  { field: 'direccion',headerName: 'Direccion',type: 'number',width: 400},
  { field: 'telefono',headerName: 'Telefono',type: 'number',width: 150},
  { field: 'vota_pt',headerName: 'Afiliado',type: 'number',width: 150},
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];


export const NominalTable = () => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const [filas, setFilas] = React.useState([{id:1}])
  const [columnas, setColumnas] = React.useState([{ field: 'id'}])
  const [user, setUser] = React.useState(null);


  useEffect(() => {
    setUser(window.localStorage.getItem('nameUser'));
  },[])
  
  const onClickConsult = async () => {
    const table  = await getTable();
    console.log(table[0].id);
    setFilas(table);
    setColumnas(columns);
  }

  const toggle = () => setModal(!modal);

  const onClickCloseSession = () =>{
    const user = window.localStorage.getItem('nameUser');
    console.log("Usuario es:"+user);
    toggle();
    window.localStorage.removeItem('tokenLogin')
    navigate("/");
  }

  return (
    <>
        <div className='row'>
            <div className='col-md-5 d-flex justify-content-center'><button   className="btn btn-success" onClick={onClickConsult} > Consultar </button></div>
            <div className='col-md-2 p-1'></div>
            <div className='col-md-5 d-flex justify-content-center'><button  className="btn btn-primary" onClick={toggle}> Cerrar Sesion </button></div>
        </div>
    <hr/>
        <div className='row'>
          <div className='col-md-12 d-flex justify-content-start'>
            Bienvenid@ {user}
          </div>
        </div>
    <hr />
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={filas}
        columns={columnas}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10,15]}
        checkboxSelection
        />
    </div>
            <div style={{display: 'block', width: 700, padding: 30}}>
                <Modal isOpen={modal}
                    toggle={toggle}
                    modalTransition={{ timeout: 200 }}>
                    <ModalHeader
                        toggle={toggle}>Mensaje
                    </ModalHeader>
                    <ModalBody>
                        {user+ " "}¿Desea Cerrar Sesion?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={onClickCloseSession}>Aceptar</Button>
                    </ModalFooter>
                </Modal>
            </div >
    </>
  );
}

