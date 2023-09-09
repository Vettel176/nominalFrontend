import React from 'react';
import ReactDOM from 'react-dom/client';
import {GifExpertApp} from './GifExpertApp.jsx';
import { StyledEngineProvider } from '@mui/material/styles';
import  './styles.css';

import { BrowserRouter } from 'react-router-dom';

//Se declara el componente que contrendra TODA nuestra aPP
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <GifExpertApp/>
    </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>
)
