import { object, string, number } from  'valibot';


export const DraftProductoSchema = object({
    name: string(),
    price: number()
})