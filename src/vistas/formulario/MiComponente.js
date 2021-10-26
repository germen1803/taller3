import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import MaterialDatatable from "material-datatable";
import Swal from 'sweetalert2';
//import { useMediaQuery } from 'react-responsive';
import { Container, Grid, Button, Typography, TextField } from '@material-ui/core';

const MiComponente = () => {
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [idpersona, setID] = useState("")
    const [personas, setPersonas] = useState([])
    const [botonActivo, setBotonActivo] = useState(false)
    //const isMobile = useMediaQuery({ query: `(max-width: 760px)` })

    const handleInputChangeNombre = (event) => {
        setNombre(event.target.value)
    }

    const handleInputChangeApellido = (event) => {
        setApellido(event.target.value)
    }

    useEffect ( () => {
        getPersonas()
    },[])

    async function getPersonas() {
        try {
            const response = await axios.get('http://192.99.144.232:5000/api/personas?grupo=8');
            if(response.status == 200)
            {
                setPersonas(response.data.persona)
            }
        } catch (error) {
        console.error(error);
        }
    }

    function peticionPut() {
            axios.put(`http://192.99.144.232:5000/api/personas/${idpersona}`, {
            nombre: nombre,
            apellido: apellido
        })
        .then(function (response){
            if(response.status == 200)
            {
                Swal.fire(
                    'Modificado con éxito',
                    'Los datos de la persona se han modificado',
                    'success')
                    setID('')
                getPersonas()
                setNombre("")
                setApellido("")
            }else{
                Swal.fire(
                    'Error al modificar',
                    'error')
                setID(' ')
            }
        })
    }

    function guardarPersona()
    {
        axios.post('http://192.99.144.232:5000/api/personas', {
            nombre: nombre,
            apellido: apellido,
            grupo:8
        })
        .then(function (response) {

            if(response.status==200)
            {
                Swal.fire(
                    'Registrado con éxito',
                    'La persona ha sido ingresada al sistema',
                    'success')
                getPersonas()
            }else{
                Swal.fire(
                    'Error al guardar',
                    'error')
            }

        })
        .catch(function (error) {
            console.log(error);
        });
    }

    function deletePersona()
    {
        Swal.fire({
            title: 'Eliminar',
            text: '¿Está seguro que desea eliminar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
        }).then(response => {
            if(response.value) {
                axios.delete(`http://192.99.144.232:5000/api/personas/${idpersona}`, {
                })
                .then(function (response) {
                    if(response.status==200)
                    {
                        Swal.fire(
                            'Eliminado con éxito',
                            'La persona ha sido eliminado del sistema',
                            'success')
                            setNombre("")
                            setApellido("")
                            setID("")
                        getPersonas()
                    }else{
                        Swal.fire(
                            'Error al eliminar',
                            'error')
                        setID(' ')
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        })

    }

    const columns = [
        {
            name: "Nombre",
            field: "nombre",
            options: {
            filter: true,
            sort: true,
            }
        },
        {
            name: "Apellido",
            field: "apellido",
            options: {
            filter: true,
            sort: true,
            }
        },
        {
            name: "ID",
            field: "_id",
            options: {
                filter: true,
                sort: true
            }
        }
    ];

    const data = [
        {nombre: "Nombre", apellido: "Apellido"},
    ];

    const handleRowClick = (rowData, rowMeta) => {
        if(botonActivo == false) {
            setBotonActivo(true)
            setNombre(rowData.nombre)
            setApellido(rowData.apellido)
            setID(rowData._id)
        }else {
            setBotonActivo(false)
            setNombre("")
            setApellido("")
            setID("")
        }
        console.log(nombre)
        console.log(idpersona)
    };

    const options = {
        filterType: 'checkbox',
        onlyOneRowCanBeSelected: true,
        onRowClick: handleRowClick
    };

    return (
        <Container maxWidth="md">

            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h6">
                        Personas
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} fullWidth>
                    <TextField id="nombre" label="Nombre" name="nombre" onChange={handleInputChangeNombre} value={nombre}  variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="apellido" label="Apellido" onChange={handleInputChangeApellido} value={apellido} variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button variant="contained" color="primary" onClick={guardarPersona} fullWidth>Guardar</Button>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button variant="contained" color="default" onClick={peticionPut} fullWidth>Modificar</Button>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button variant="contained" color="secondary" onClick={deletePersona} disabled={!botonActivo} fullWidth>Eliminar</Button>
                </Grid>
            </Grid>

            <Grid item xs={12} md={12} className="tabla">
                <MaterialDatatable
                    title={"Lista de Personas"}
                    data={personas}
                    columns={columns}
                    options={options}
                />
            </Grid>
        </Container>
    )
}
export default MiComponente