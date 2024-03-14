import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import Store from './app/Store.jsx';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
    <Provider store={Store}>
      <Router> {/* Wrap your App component with Router */}
        <App />
      </Router>
    </Provider>
 </React.StrictMode>,
);
