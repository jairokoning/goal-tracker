import { db } from "../db";
import { goals } from "../db/schema";
import type { CreateGoalRequest } from "../dtos/create-goal-request";
import type GoalRepository from "./goal-repository";

export default class GoalDrizzleRepository implements GoalRepository {
	async createGoal(goal: CreateGoalRequest): Promise<Output> {
		const goalData = await db.insert(goals).values(goal).returning();
		const goalId = goalData[0].id;
		return { id: goalId };
	}
}

type Output = {
	id: string;
};
