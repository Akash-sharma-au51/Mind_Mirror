import express from "express"
import { body, validationResult } from "express-validator"
import { registerUser, loginUser, logoutUser } from "../controllers/userController.ts"

const router = express.Router()

// Validation middleware
const handleValidationErrors = (req: any, res: any, next: any) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation failed",
            success: false,
            errors: errors.array()
        })
    }
    next()
}

// Register validation rules
const registerValidation = [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3, max: 20 })
        .withMessage('Username must be between 3 and 20 characters'),
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 12, max: 24 })
        .withMessage('Password must be between 12 and 24 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
]

// Login validation rules
const loginValidation = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
]

router.post('/register', registerValidation, handleValidationErrors, registerUser)
router.post('/login', loginValidation, handleValidationErrors, loginUser)
router.post('/logout', logoutUser)

export default router