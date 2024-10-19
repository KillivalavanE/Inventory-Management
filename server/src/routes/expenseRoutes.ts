import { Router } from "express";
import { getDashboardMetrics } from "../controllers/dashboardController";
import { getExpensesByCategory } from "../controllers/expenseController";

const router = Router()

router.get("/",getExpensesByCategory);

export default router