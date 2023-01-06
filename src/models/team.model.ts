import { ITaskDynamic } from "./taskDynamic.model";
import * as mongoose from "mongoose";
import { Category } from "../emums";

export interface ITeam {
    name: string;
    icon: string;
    listOfParticipants: [string];
    finishedTasksNumber: number;
    openedTasksNumber: number;
    openedTasksNames: [string];
    earnedPoints: number;
    potentionalPoints: number;
}

const teamSchema = new mongoose.Schema<ITeam>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    icon: { type: String, required: true },
    listOfParticipants: { type: [String], required: true },
    openedTasksNames: { type: [String], required: true },
    finishedTasksNumber: { type: Number, required: true },
    openedTasksNumber: { type: Number, required: true },
    earnedPoints: { type: Number, required: true },
    potentionalPoints: { type: Number, required: true },
});

export const teamModel = mongoose.model<ITeam>("team", teamSchema, "team");