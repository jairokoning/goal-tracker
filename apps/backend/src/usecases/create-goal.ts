import type { CreateGoalRequest } from "../dtos/create-goal-request";
import type GoalRepository from "../repositories/goal-repository";

export default class CreateGoal {
	constructor(private goalRepository: GoalRepository) {}
	async execute(goal: CreateGoalRequest) {
		console.log(goal);
		const ouptup = await this.goalRepository.createGoal(goal);
		return ouptup;
	}
}
