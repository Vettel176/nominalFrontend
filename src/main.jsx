import React from 'react';
import ReactDOM from 'react-dom/client';
import {GifExpertApp} from './GifExpertApp.jsx';
import  './styles.css';

//Se declara el componente que contrendra TODA nuestra aPP
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GifExpertApp />
  </React.StrictMode>
)
