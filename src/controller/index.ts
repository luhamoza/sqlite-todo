import { Request, Response } from "express";
import todoInstance from "../model";

class TodoController {
  async readByPagination(req: Request, res: Response) {
    try {
      const limit = req.query.limit as number | undefined;
      const records = await todoInstance.findAll({ where: {}, limit });
      return res.json({ records, msg: "Records fetched successfully" });
    } catch (error) {
      return res.json({
        msg: "Record fetch failed",
        status: 500,
        route: "/read",
      });
    }
  }
  async readById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await todoInstance.findOne({ where: { id } });
      if (!record) {
        return res.json({ record, msg: `Record id: ${id} is not found` });
      }
      return res.json({ record, msg: "Record fetched successfully" });
    } catch (error) {
      return res.json({
        msg: "Record fetch failed",
        status: 500,
        route: "/read/:id",
      });
    }
  }
  async createTodo(req: Request, res: Response) {
    const id = crypto.randomUUID();
    try {
      const record = await todoInstance.create({ ...req.body, id });
      return res.json({ record, msg: "Record created successfully" });
    } catch (error) {
      return res.json({
        msg: "Record creation failed",
        status: 500,
        route: "/create",
      });
    }
  }
  async updateById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await todoInstance.findOne({ where: { id } });
      if (!record) {
        return res.json({ record, msg: `Record id: ${id} is not found` });
      }
      const updatedRecord = await record.update({
        completed: !record.getDataValue("completed"),
        title: req.body.title,
      });
      return res.json({
        record: updatedRecord,
        msg: "Record updated successfully",
      });
    } catch (error) {
      return res.json({
        msg: "Record update failed",
        status: 500,
        route: "/update/:id",
      });
    }
  }
  async deleteById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await todoInstance.findOne({ where: { id } });
      if (!record) {
        return res.json({ record, msg: `Record id: ${id} is not found` });
      }
      await record.destroy();
      return res.json({ record, msg: "Record deleted successfully" });
    } catch (error) {
      return res.json({
        msg: "Record delete failed",
        status: 500,
        route: "/delete/:id",
      });
    }
  }
}

export default new TodoController();
