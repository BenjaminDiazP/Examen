import { useReducer, useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { authManager } from './config/context/auth-manager'
import AuthContext from './config/context/auth-context'
import AppRouter from './router/AppRouter'
import './output.css';

const init = () => {
  return JSON.parse(localStorage.getItem('user')) || {signed: false} // JSON.paese convierte un string en un objeto
};

function App() {

  const [user, dispatch] = useReducer(authManager, {}, init);

  useEffect(() => {
    if(!user) return;
    localStorage.setItem('user', JSON.stringify(user)); // JSON.stringify convierte un objeto en un string, para guardarlo en el localStorage
    // localStorage -> es un objeto que permite almacenar datos en el navegador
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <AppRouter />
    </AuthContext.Provider>
  )
}

export default App
