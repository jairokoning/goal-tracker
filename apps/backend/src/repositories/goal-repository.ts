import type { CreateGoalRequest } from "../dtos/create-goal-request";
import type { GetGoalCompletionCountRequest } from "../dtos/get-goal-completion-count-request";

export default interface GoalRepository {
	createGoal(goal: CreateGoalRequest): Promise<{ id: string }>;
	getGoalCompletionCount(
		goalId: string,
	): Promise<GetGoalCompletionCountRequest>;
	completeGoal(goalId: string): Promise<void>;
}
