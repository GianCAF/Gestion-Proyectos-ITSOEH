// src/components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { Modal, Button, Form, Navbar, Nav } from 'react-bootstrap';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

function Header({ user, onLoginSuccess }) {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    // ... (handleLogin y handleLogout se mantienen sin cambios) ...

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            onLoginSuccess();
            setShowLoginModal(false);
            navigate('/crud');
        } catch (error) {
            setLoginError('Error de autenticación. Verifica tu correo y contraseña.');
            console.error("Error de login:", error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
            onLoginSuccess();
        } catch (error) {
            console.error("Error al cerrar sesión:", error.message);
        }
    };

    return (
        <Navbar expand="lg" className="mb-4 bg-vino">
            <div className="container-fluid">
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    {/* 🚨 CORRECCIÓN CLAVE 1: Ruta absoluta desde la raíz (public/) */}
                    <img
                        src="/logo_itsoeh.jpg"
                        width="90"
                        height="30"
                        className="d-inline-block align-top me-2"
                        alt="Logo ITSOEH"
                    />
                    {/* 🚨 CORRECCIÓN CLAVE 2: Ruta absoluta desde la raíz (public/) */}
                    <img
                        src="/logo_gestion.jpg"
                        width="60"
                        height="60"
                        className="d-inline-block align-top me-2"
                        alt="Logo Gestión"
                    />
                    Gestión Empresarial
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link href="https://itsoeh.edu.mx/front/" target="_blank">Página de la Escuela</Nav.Link>
                    </Nav>
                    <Nav>
                        {user ? (
                            <>
                                <Navbar.Text className="me-2">Bienvenido, {user.email}</Navbar.Text>
                                <Button variant="danger" onClick={handleLogout}>Cerrar Sesión</Button>
                                <Button variant="success" onClick={() => navigate('/crud')} className="ms-2">Ir al CRUD</Button>
                            </>
                        ) : (
                            <Button variant="outline-primary" onClick={() => setShowLoginModal(true)}>
                                Acceder al CRUD
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </div>

            {/* Modal de Login (se mantiene sin cambios) */}
            <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
                {/* ... (código del modal) ... */}
            </Modal>
        </Navbar>
    );
}

export default Header;