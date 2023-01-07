import { Request, Response, NextFunction } from "express";
import { IField } from "../entities";
import { teamManager } from "../manager/team.manager";

const takeTask = async (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization as string).slice(7);
    const taskName = req.body.taskName as string;
    const collaborators = req.body.collaborators as string[];
    try {
        await teamManager.takeTask(token, taskName, collaborators);
        return res.status(200).json(`Task ${taskName} has been taken`);
    } catch (error) {
        return res.status(500).send((error as Error).message);
    }
};

const submitTask = async (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization as string).slice(7);
    const taskName = req.body.taskName as string;
    const solution = req.body.solution as string;
    try {
        await teamManager.submitTask(token, taskName, solution);
        return res.status(200).json(`Task ${taskName} has been submitted`);
    } catch (error) {
        return res.status(500).send((error as Error).message);
    }
};

const gradeTask = async (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization as string).slice(7);
    const taskName = req.body.taskName as string;
    const gradePercent = req.body.gradePercent as number;
    try {
        await teamManager.gradeTask(token, taskName, gradePercent);
        return res
            .status(200)
            .json(`Task ${taskName} has been graded at ${gradePercent}`);
    } catch (error) {
        return res.status(500).send((error as Error).message);
    }
};

const resetTasks = async (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization as string).slice(7);
    try {
        await teamManager.resetTasks(token);
        return res.status(200).json(`Tasks has been reseted`);
    } catch (error) {
        return res.status(500).send((error as Error).message);
    }
};

export default {
    takeTask,
    submitTask,
    gradeTask,
    resetTasks,
};