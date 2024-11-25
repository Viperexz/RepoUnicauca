import axios from 'axios';

const apiBaseUrl = 'https://api.example.com'; // Reemplaza con la URL base de tu API


{/* #TODO: Implementar los endpoints para las diferentes funcionalidades y adaptar los faltantes*/}
const dataService = {
    login: async (credentials) => {
        try {
            const response = await axios.post(`${apiBaseUrl}/login`, credentials);
            return response.data;
        } catch (error) {
            console.error('Error during login', error);
            throw error;
        }
    },

    consultaDocentes: async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}/docentes`);
            return response.data;
        } catch (error) {
            console.error('Error fetching docentes', error);
            throw error;
        }
    },

    editarDocentes: async (id, docenteData) => {
        try {
            const response = await axios.put(`${apiBaseUrl}/docentes/${id}`, docenteData);
            return response.data;
        } catch (error) {
            console.error('Error editing docente', error);
            throw error;
        }
    },

    registroDocentes: async (docenteData) => {
        try {
            const response = await axios.post(`${apiBaseUrl}/docentes`, docenteData);
            return response.data;
        } catch (error) {
            console.error('Error registering docente', error);
            throw error;
        }
    },

    eliminarDocentes: async (id) => {
        try {
            const response = await axios.delete(`${apiBaseUrl}/docentes/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting docente', error);
            throw error;
        }
    },

    // Agrega más funciones según sea necesario
};

export default dataService;
