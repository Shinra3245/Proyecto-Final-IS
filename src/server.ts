import express from 'express'
import router from './router'
import db from './config/db'

// Conexión a la BD
async function connectDB(){
    try{
        await db.authenticate()//autentifica la conexión 
        db.sync()//sincroniza los modelos, crea tablas si no existen 
        console.log('Conexión exitosa a la BD ')
    }catch(error){
        console.log(error)
        console.log('Hubo un errorcillo al conectar la BD')
    }
}
connectDB()// Manda llamar la función para conectarnos a la BD
const server = express()

//filtra la accion http mediante esta linea, tambien se puede camiar la ruta
server.use('/api/productos', router)

export default server
