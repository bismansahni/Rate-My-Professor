import { Router } from "express";
import Admin from "../models/admin_model.js";
import { registeradmin,registeradminmessage,addProfessor,adminlogin} from "../Controllers/authController.js";
import isAuthenticated from "../Middleware/isAuthenticated.js";

const router=Router();

router.get('/register/admin',registeradminmessage);

router.post('/register/admin',registeradmin);

router.post('/login/admin',adminlogin);

router.post('/add/professors',isAuthenticated(Admin),addProfessor);

export default router;