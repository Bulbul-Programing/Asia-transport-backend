
import { Router } from "express";
import { DailyExpenseController } from "./DailyExpense.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { createDailyExpenseSchema, createPartyLesSchema, updateDailyExpenseSchema, updatePartyLesSchema } from "./DailyExpense.validation.js";


const router = Router();

// ─── Daily Expense ───────────────────────────────────────────────────────────
router.post(
    "/",
    validateRequest(createDailyExpenseSchema),
    DailyExpenseController.createDailyExpense
);

router.get("/", DailyExpenseController.getAllDailyExpenses);

router.get("/:id", DailyExpenseController.getDailyExpenseById);

router.patch(
    "/:id",
    validateRequest(updateDailyExpenseSchema),
    DailyExpenseController.updateDailyExpense
);

router.delete("/:id", DailyExpenseController.deleteDailyExpense);

// ─── PartyLes (nested under a daily expense) ─────────────────────────────────
router.post(
    "/party-les",
    validateRequest(createPartyLesSchema),
    DailyExpenseController.createPartyLes
);

router.get(
    "/:dailyExpenseId/party-les",
    DailyExpenseController.getAllPartyLesByExpense
);

router.get(
    "/party-les/:id",
    DailyExpenseController.getPartyLesById
);

router.patch(
    "/party-les/:id",
    validateRequest(updatePartyLesSchema),
    DailyExpenseController.updatePartyLes
);

router.delete(
    "/party-les/:id",
    DailyExpenseController.deletePartyLes
);

export const DailyExpenseRoutes = router;