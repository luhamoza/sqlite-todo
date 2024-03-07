import express from "express";
import middleware from "../middleware";
import todoValidator from "../validator";
import todoController from "../controller";

const router = express.Router();
router.post(
  "/create",
  todoValidator.checkCreateTodo(),
  middleware.handleValidationError,
  todoController.createTodo
);

router.get(
  "/read",
  todoValidator.checkReadTodo(),
  middleware.handleValidationError,
  todoController.readByPagination
);

router.get(
  "/read/:id",
  todoValidator.checkIdParam(),
  middleware.handleValidationError,
  todoController.readById
);

router.put(
  "/update/:id",
  todoValidator.checkIdParam(),
  middleware.handleValidationError,
  todoController.updateById
);

router.delete(
  "/delete/:id",
  todoValidator.checkIdParam(),
  middleware.handleValidationError,
  todoController.deleteById
);

export default router;
