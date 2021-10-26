import React from 'react'
import { Container, Grid} from '@material-ui/core';


const Integrantes = () => {

    return (
        <Container maxWidth="md">
            <Grid item xs={12} md={12} className="tabla">
                <h1>Los integrantes de este grupo son:</h1>
                <h2>Germán Álvarez</h2>
                <h2>Nicolás Robles</h2>
            </Grid>
        </Container>
    )
}

export default Integrantes