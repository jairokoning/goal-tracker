import type { CreateGoalRequest } from "../dtos/create-goal-request";
import type GoalRepository from "../repositories/goal-repository";

export default class CompleteGoal {
	constructor(private goalRepository: GoalRepository) {}
	async execute(goalId: string) {
		const { completionCount, desiredWeeklyFrequency } =
			await this.goalRepository.getGoalCompletionCount(goalId);
		if (completionCount >= desiredWeeklyFrequency) {
			throw new Error("Goal already completed this week.");
		}
		await this.goalRepository.completeGoal(goalId);
	}
}
