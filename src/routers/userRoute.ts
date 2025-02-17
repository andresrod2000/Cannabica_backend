import { Router } from 'express';
import { createUser } from '../controllers/userController'

const router = Router();

// Crear un nuevo usuario
router.get('/user', createUser);

export default router;