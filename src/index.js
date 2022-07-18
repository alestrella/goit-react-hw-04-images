import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import GlobalStyles from 'components/GlobalStyles';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
