import { safeParse, pipe, string, transform, number, parse, boolean } from 'valibot';
import axios from 'axios';
import { DraftProductoSchema, ProductsSchema, type Product, ProductoSchema } from '../types';
import { toBoolean } from '../utils';

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data: ProductData) {
    try {
        const result = safeParse(DraftProductoSchema, {
            name: data.name,
            price: +data.price
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/productos`;
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Datos no validos');
        }
    } catch (error) {
        console.log(error)
    }


}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/productos`;
        const { data } = await axios(url);
        const result = safeParse(ProductsSchema, data.data);
        if (result.success) {
            return result.output;
        } else {
            throw new Error('Datos no validos');
        }
    } catch (error) {
        console.log(error)
    }
}


export async function getProductById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`;
        const { data } = await axios(url);
        const result = safeParse(ProductoSchema, data.data);
        if (result.success) {
            return result.output;
        } else {
            throw new Error('Datos no validos');
        }
    } catch (error) {
        console.log(error)
    }
}



export async function updateProduct(data: ProductData, id: Product['id']) {
    try {
        const NumberSchema = pipe(string(), transform(Number), number());

        
        const result = safeParse(ProductoSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString() )
        })
        
        if( result.success ) {
            const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`;
            await axios.put(url, result.output)
        }
    } catch (error) {
        console.log(error)
    }
}


