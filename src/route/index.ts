import express from "express";
import middleware from "../middleware";
import todoValidator from "../validator";
import todoController from "../controller";
import { faker } from "@faker-js/faker";
import todoInstance from "../model";

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
router.get("/populate", async (req, res) => {
  const id = crypto.randomUUID();
  try {
    let records = [];
    for (let i = 0; i < 1000; i++) {
      records.push({
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        completed: faker.datatype.boolean(),
      });
    }
    await todoInstance.bulkCreate(records);
    return res.json({ msg: "Records populated successfully" });
  } catch (error) {
    return res.json({
      msg: "Record population failed",
      status: 500,
      route: "/populate",
    });
  }
});
router.get("/read-all", async (req, res) => {
  try {
    const records = await todoInstance.findAll();
    return res.json({ records, msg: "All records fetched successfully" });
  } catch (error) {
    console.error(error);
    return res.json({
      msg: "Failed to fetch records",
      status: 500,
      route: "/read-all",
    });
  }
});

export default router;
