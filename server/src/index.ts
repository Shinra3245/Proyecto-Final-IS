import colors from 'colors'
import server from './server'

// 1. Convertimos el puerto a número (base 10) para evitar errores de TypeScript
const port = parseInt(process.env.PORT || '4000', 10)

// 2. Usamos '0.0.0.0' para escuchar en TODAS las redes (IPv4, IPv6, Localhost)
// ESTO ES LO QUE ARREGLARÁ TU ERROR DE "NETWORK ERROR"
server.listen(port, '0.0.0.0', () => {
    console.log(colors.cyan(`REST API funcionando en el puerto ${port}`))
})