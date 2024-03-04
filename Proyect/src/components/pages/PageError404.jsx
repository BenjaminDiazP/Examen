import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

const PageError404 = () => {
    const style = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        color: '#333',
        background: '#f2f2f2',
        fontFamily: 'Arial, sans-serif',
    };

    const h1Style = {
        fontSize: '3em',
        marginBottom: '0.5em',
    };

    const pStyle = {
        fontSize: '1.5em',
    };

    return (
        <div style={style}>
            <h1 style={h1Style}>Error 404</h1>
            <p style={pStyle}>La página que estás buscando no existe.</p>
            <Link to="/">
                Ir al home de la aplicación
            </Link>
        </div>
    );
};

export default PageError404;