import { Router } from 'express'
import { body, param } from 'express-validator' 
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()

// Routing

router.get('/', getProducts)
router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById
)// routing dinamico, el id se coloca solo

router.post('/', 
    // Validación
    body('name')
        .notEmpty().withMessage('El nombme del producto no puede ir vacío'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacío')
        .custom(value => value > 0).withMessage('Precio no valido'),      
        handleInputErrors,
        createProduct)

router.put('/:id',
    param('id').isInt().withMessage('ID no valido'),
    body('name')
        .notEmpty().withMessage('El nombme del producto no puede ir vacío'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacío')
        .custom(value => value > 0).withMessage('Precio no valido'),      
        body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no valido'),
        handleInputErrors,    
    updateProduct
    )

router.patch('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability
)

router.delete('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct)


export default router