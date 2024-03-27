import { TextInput, Label, Button, Card } from 'flowbite-react'
import React, { useMemo, useState, useEffect } from 'react'
import CustomDataTable from '../../../components/CustomDataTable'
import AxiosClient from '../../../config/http-client/axios-client';
import RegisterUserForm from './components/RegisterUserForm';
import UpdateUserForm from './components/UpdateUserForm';
import { MdCheckCircle, MdCancel } from 'react-icons/md';
import Swal from 'sweetalert2'

const UserPage = () => {

    const [loading, setLoading] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [users, setUsers] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false); // Nuevo estado para controlar si el formulario de actualización está abierto


    const columns = useMemo(() => [
        {
            name: '#',
            cell: (row, i) => <>{i + 1}</>,
            selector: (row, i) => i,
            sortable: true,
        },
        {
            name: 'Usuario',
            cell: (row) => <>{row.username}</>,
            selector: (row) => row.username,
            sortable: true,
        },
        {
            name: 'Nombre completo',
            cell: (row) => <>{`${row.person.name} ${row.person.surname} ${row.person.lastname ?? ''} `}</>,
            selector: (row) => `${row.person.name} ${row.person.surname} ${row.person.lastname ?? ''} `,
            //Selector es la guia del sortable, sortable se usa para ordenar
            sortable: true,
        },
        {
            name: 'Estado',
            cell: (row) => {
                return row.person.status
                    ? <MdCheckCircle color="green" />
                    : <MdCancel color="red" />;
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Acciones',
            cell: (row) => (
                <>
                    <Button onClick={() => handleEditClick(row.id)}>Editar</Button>
                    <UpdateUserForm
                        isUpdating={isUpdating} // Pasar el estado isOpen para controlar la apertura del formulario de actualización
                        setIsUpdating={setIsUpdating} // Pasar la función setIsOpen para cerrar el formulario de actualización
                        userId={selectedUserId} // Pasar el ID del usuario seleccionado al formulario de actualización
                        getAllUsers={getUsers}
                    />
                    <Button onClick={() => {
                        Swal.fire({
                            title: '¿Estás seguro?',
                            text: "¡No podrás revertir esto!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: '¡Sí, Cambiar estado!',
                            cancelButtonText: 'No, cancelar!'
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                try {
                                    const response = await AxiosClient({
                                        method: "PATCH",
                                        url: `/person/deactivate/${row.id}`,
                                    });
                                    const response2 = await AxiosClient({ url: "/user/", method: 'GET' });
                                    setUsers(response2.data);
                                    console.log(response.data);

                                    Swal.fire({
                                        title: '¡Cambiado!',
                                        text: 'El estado del usuario a sido cambiado.',
                                        icon: 'success'
                                    });
                                } catch (error) {
                                    console.error('Error:', error);
                                    Swal.fire({
                                        title: 'Error!',
                                        text: 'Hubo un error al desactivar el usuario.',
                                        icon: 'error'
                                    });
                                }
                            }
                        })
                    }}>Desactivar</Button>
                </>
            ),
        },
    ])
    //useMemo guarda como un cache para no renderizar varias veces

    const getUsers = async () => {
        try {
            const response = await AxiosClient({ url: "/user/", method: 'GET' });
            setUsers(response.data);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    //useEffect se puede usar para que se ejecute una vez que toda nuestra pantalla se haya renderizado
    //Si no le mandamos nada al arreglo, solo se ejecutara una vez que todo se haya renderizado
    useEffect(() => {
        setLoading(true);
        getUsers();
    }, []); //Solo se ejecuta una vez al terminar de renderizar

    const handleEditClick = (userId) => {
        setSelectedUserId(userId); // Establecer el ID del usuario seleccionado
        console.log(userId);
        setIsUpdating(true); // Abrir el formulario de edición
    };


    return (
        <section className='w-full px-4 pt-4 flex flex-col gap-4'>
            <h1 className='text-2xl'>Usuarios</h1>
            <div className='flex justify-between'>
                <div className='max-w-64'>
                    <Label htmlFor='' />
                    <TextInput type='text' id='filter' placeholder='Buscar...' />
                </div>
                <Button
                    outline
                    color='success'
                    pill
                    onClick={() => setIsCreating(true)}>AGREGAR</Button>
                <RegisterUserForm
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    getAllUsers={getUsers}
                />

            </div>
            <Card>
                <CustomDataTable
                    columns={columns}
                    data={users}
                    isLoading={loading}
                />
            </Card>
        </section>
    )
}

export default UserPage