// // src/Backend/FuncionesApi.tsx
// import axios from 'axios';
// import { ArticuloManufacturado } from '../Elements/Elements';

// // Obtener todos los artículos manufacturados
// export const fetchArticulosManufacturados = async (): Promise<ArticuloManufacturado[]> => {
//     try {
//         const response = await axios.get('http://localhost:8080/api/articulomanufacturados');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return [];
//     }
// };

// // Guardar factura, pedido y detalles del pedido
// export const saveFactura = async (factura: any): Promise<any | null> => {
//     try {
//         const response = await axios.post('http://localhost:8080/api/factura', factura);
//         return response.data;
//     } catch (error) {
//         console.error('Error saving factura:', error);
//         return null;
//     }
// };
