import { Router } from "express";
import Professor from "../models/professor_model.js";
import { reviewProfessor,showRatings } from "../Controllers/reviewController.js";


const router=Router();

router.post('/review',reviewProfessor);

router.post('/show',showRatings);

export default router;