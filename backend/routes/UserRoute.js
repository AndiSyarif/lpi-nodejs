import express from "express";
import {
    getUsers, 
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/UserController.js"

const router = express.Router();

router.get('/users', getUsers);
router.get('/user/:id_user', getUserById);
router.post('/users', createUser);
router.patch('/user/:id_user', updateUser);
router.delete('/user/:id_user', deleteUser);

export default router;