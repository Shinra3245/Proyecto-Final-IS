import { Request, Response } from "express"
import { check, validationResult } from 'express-validator'
import Product from "../models/Product.model"
//funcion acincrona para que no tarde y podamos obtener resultados
export const createProduct =  async (req : Request, res : Response)=>{
    
    const product = await Product.create(req.body)//crea el objeto

    //para almacenar en la base de datos
    //const savedProduct = await product.save() 

    //console.log(req.body)//esta linea extrae el contenido del POST que envia la información
    //con POST podemos enviar datos de los productos
    res.json({data: product})// retornamos un objeto, el enviado a la BD
}