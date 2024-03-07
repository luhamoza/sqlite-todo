import { body, query, param } from "express-validator";

class TodoValidator {
  checkCreateTodo() {
    return [
      body("id").optional().isUUID().withMessage("Invalid UUID"),
      body("title").notEmpty().withMessage("Title is required"),
      body("completed")
        .optional()
        .isBoolean()
        .withMessage("Invalid boolean value")
        .isIn([0, false])
        .withMessage("Invalid boolean value"),
    ];
  }
  checkReadTodo() {
    return [
      query("limit")
        .notEmpty()
        .withMessage("Limit query is required")
        .isNumeric()
        .withMessage("Must be a number")
        .isInt({ min: 1, max: 10 })
        .withMessage("Limit should be between 1 and 10"),
    ];
  }
  checkIdParam() {
    return [
      param("id")
        .notEmpty()
        .withMessage("Id is required")
        .isUUID()
        .withMessage("Invalid UUID"),
    ];
  }
}

export default new TodoValidator();
