// src/Backend/FuncionesApi.tsx
import axios from 'axios';
import { ArticuloManufacturado } from '../types/ArticuloManufacturado';

export const fetchArticulosManufacturados = async (): Promise<ArticuloManufacturado[]> => {
    try {
        const response = await axios.get('http://localhost:8080/api/articulomanufacturados');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};
