import type { CreateGoalRequest } from "../dtos/create-goal-request";

export default interface GoalRepository {
	createGoal(goal: CreateGoalRequest): Promise<{ id: string }>;
}
