import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyles from './components/GlobalStyles';
import { AuthProvider } from './context/AuthProvider';

ReactDOM.render(
    // <React.StrictMode>
    <GlobalStyles>
        <AuthProvider>
            <App />
        </AuthProvider>
    </GlobalStyles>,
    //  </React.StrictMode>,
    document.getElementById('root'),
);
