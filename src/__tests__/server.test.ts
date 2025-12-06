import request from 'supertest'
import server, { connectDB} from '../server'
import db from '../config/db'

describe('GET /api', () =>{
    it('should send back a json response', async () =>{
        const res = await request(server).get('/api')

        expect(res.status).toBe(200)  
        expect(res.headers['content-type']).toMatch(/json/)
        console.log(res.body.msg)

        expect(res.status).not.toBe(404)  
        console.log(res.body.msg)

    })
})

//creacion del mock
jest.mock('../config/db')

describe('connectDB function', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db,'authenticate')
            .mockRejectedValue(new Error('Hubo un errorcillo al conectar la BD'))
        const consoleSpy = jest.spyOn(console, 'log')
        await connectDB()
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un errorcillo al conectar la BD')
        )
    })
})


/*describe('Nuestro primer test', ()=>{
    it('Debe revisar que 1 + 1 es 2', () => {
        expect(1 + 1).toBe(2)
    })
})*/