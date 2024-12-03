import axios from 'axios';

const apiBaseUrl = 'http://localhost'; // Reemplaza con la URL base de tu API
const competenciasServices = 'http://localhost:8001/competenciasrap/competencias';
const docentesServices = 'http://localhost:8002/docentes';
const asignaturasServices = 'http://localhost:8002/asignaturas';
const rapServices = 'http://localhost:8001/competenciasrap/rap';
const usuarioSerivec = 'http://localhost:8005/api/auth/signin';

/* #TODO: Implementar los endpoints para las diferentes funcionalidades y adaptar los faltantes*/
const dataService = {

        login: async (credentials) => {
        try {
            const response = await axios.post(`${usuarioSerivec}/api/auth/signin`, credentials);
            return response.data;
        } catch (error) {
            console.error('Error during login', error);
            throw error;
        }
    },


    /*Manejo de Competencias*/
    consultaCompetencias: async () => {
        try {
            const response = await axios.get(`${competenciasServices}`);
            return response.data.map(competencia => ({
                ID: competencia.id,
                Descripcion: competencia.descripcion,
                Nivel: competencia.nivel.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, char => char.toUpperCase()),
            }));
        } catch (error) {
            console.error('Error fetching asignaturas', error);
            throw error;
        }
    },

    editarCompetencias: async (id, asignaturaData) => {
        try {
            const response = await axios.put(`${competenciasServices}:/${id}`, asignaturaData);
            return response.data;
        } catch (error) {
            console.error('Error editing asignatura', error);
            throw error;
        }
    },

    registroCompetencias: async (asignaturaData) => {
        try {
            const response = await axios.post(`${competenciasServices}`, asignaturaData);
            return response.data;
        } catch (error) {
            console.error('Error registering asignatura', error);
            throw error;
        }
    },

    eliminarCompetencias: async (id) => {
        try {
            const response = await axios.delete(`${competenciasServices}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting asignatura', error);
            throw error;
        }
    },
    /*Manejo de RAP*/
    consultaRAP: async () => {
        try {
            const response = await axios.get(`${rapServices}`);
            return response.data.map(RAP => ({
                ID: RAP.id,
                Descripcion: RAP.descripcion,
                Competencia: RAP.competencia.descripcion.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, char => char.toUpperCase()),
            }));
        } catch (error) {
            console.error('Error fetching asignaturas', error);
            throw error;
        }
    },

    editarRAP: async (id, asignaturaData) => {
        try {
            const response = await axios.put(`${competenciasServices}:/${id}`, asignaturaData);
            return response.data;
        } catch (error) {
            console.error('Error editing asignatura', error);
            throw error;
        }
    },

    registroRAP: async (asignaturaData) => {
        try {
            const response = await axios.post(`${competenciasServices}`, asignaturaData);
            return response.data;
        } catch (error) {
            console.error('Error registering asignatura', error);
            throw error;
        }
    },

    eliminarRAP: async (id) => {
        try {
            const response = await axios.delete(`${competenciasServices}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting asignatura', error);
            throw error;
        }
    },




    /*Manejo docentes*/
    consultaDocentes: async () => {
        try {
            const response = await axios.get(`${docentesServices}`);
            return response.data.map(docente => ({
                Nombre: docente.nombres,
                Apellidos: docente.apellidos,
                "Tipo identificacion": docente.tipoIdentificacion.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, char => char.toUpperCase()),
                Identificacion: docente.identificacion,
                "Tipo docente": docente.tipoDocente.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, char => char.toUpperCase()),
                "Correo electronico": docente.email,
                Asignaturas: docente.asignaturas.join(', ') // Assuming asignaturas is an array
            }));
        } catch (error) {
            console.error('Error fetching docentes', error);
            throw error;
        }
    },

    editarDocentes: async (id, asignaturaData) => {
        try {
            const response = await axios.put(`${asignaturasServices}/${id}`, asignaturaData);
            return response.data;
        } catch (error) {
            console.error('Error editing asignatura', error);
            throw error;
        }
    },

    registroDocentes: async (asignaturaData) => {
        try {
            const response = await axios.post(`${asignaturasServices}`, asignaturaData);
            return response.data;
        } catch (error) {
            console.error('Error registering asignatura', error);
            throw error;
        }
    },

    eliminarDocentes: async (id) => {
        try {
            const response = await axios.delete(`${asignaturasServices}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting asignatura', error);
            throw error;
        }
    },
    /*Manejo asignaturas*/
    consultaAsignaturas: async () => {
        try {
            const response = await axios.get(`${asignaturasServices}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching asignaturas', error);
            throw error;
        }
    },

   editarAsignaturas: async (id, asignaturaData) => {
    try {
        const response = await axios.put(`${asignaturasServices}/${id}`, asignaturaData);
        return response.data;
    } catch (error) {
        console.error('Error editing asignatura', error);
        throw error;
    }
},

    registroAsignaturas: async (asignaturaData) => {
        try {
            const response = await axios.post(`${asignaturasServices}`, asignaturaData);
            return response.data;
        } catch (error) {
            console.error('Error registering asignatura', error);
            throw error;
        }
    },

    eliminarAsignaturas: async (id) => {
        try {
            const response = await axios.delete(`${asignaturasServices}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting asignatura', error);
            throw error;
        }
    },

};


export default dataService;
