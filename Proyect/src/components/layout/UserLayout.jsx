import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Button, Navbar, Sidebar } from 'flowbite-react';
import {
    HiArrowSmRight,
    HiChartPie,
    HiInbox,
    HiShoppingBag,
    HiTable,
    HiUser,
    HiViewBoards,
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../src/config/context/auth-context';

function UserLayout() {

    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();


    const signOut = () => { // esta es la funcion para poder cerrar la sesion
        dispatch({ type: 'SIGNOUT' }); // aqui se llama al dispatch para poder cerrar la sesion y se le pasa el type 'SIGNOUT'
        localStorage.removeItem('user'); // aqui se remueve el usuario del localStorage para que no se mantenga la sesion
        navigate('/'); // aqui se redirige al usuario a la pagina de inicio
    }


    return (
        <>
            <header>
                <Navbar fluid rounded>
                    <Navbar.Brand as={Link} href="https://flowbite-react.com">
                        <img
                            src="/favicon.svg"
                            className="mr-3 h-6 sm:h-9"
                            alt="Flowbite React Logo"
                        />
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                            Flowbite React
                        </span>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Navbar.Link href="#" active>
                            Home
                        </Navbar.Link>
                        <Navbar.Link as={Link} href="#">
                            About
                        </Navbar.Link>
                        <Navbar.Link href="#">Services</Navbar.Link>
                        <Navbar.Link href="#">Pricing</Navbar.Link>
                        <Navbar.Link href="#">Contact</Navbar.Link>
                    </Navbar.Collapse>
                </Navbar>
            </header>
            <main className="flex">
                <aside>
                    <Sidebar aria-label="Default sidebar example">
                        <Sidebar.Items>
                            <Sidebar.ItemGroup>
                                <li>
                                    <Link
                                        to={'dashboard'}
                                        className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        <HiChartPie className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                        <span className="px-3 flex-1 whitespace-nowrap">
                                            Dashboard
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={'users'}
                                        className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        <HiViewBoards className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                        <span className="px-3 flex-1 whitespace-nowrap">
                                            Usuarios
                                        </span>
                                    </Link>
                                </li>
                                <Sidebar.Item as={Link} href="products" icon={HiInbox}>
                                    Inbox
                                </Sidebar.Item>
                                <Sidebar.Item href="#" icon={HiUser}>
                                    Users
                                </Sidebar.Item>
                                <Sidebar.Item href="#" icon={HiShoppingBag}>
                                    Products
                                </Sidebar.Item>
                                <Sidebar.Item icon={HiArrowSmRight} onClick={signOut}>
                                    Sign In

                                </Sidebar.Item>
                            </Sidebar.ItemGroup>
                        </Sidebar.Items>
                    </Sidebar>
                </aside>
                <section className="w-full">
                    <h1>Bienvenido: {user.user.person.name} {user.user.person.surname}</h1>
                    <h1>Tu tienes el rol de: {user.user.roles[0].name}</h1>
                    <h1>Tu usuario es: {user.user.username}</h1>
                    <Outlet />
                </section>
            </main>
        </>

    )
}

export default UserLayout