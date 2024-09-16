import { count, eq, gte, lte, and, sql } from "drizzle-orm";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import type { CreateGoalRequest } from "../dtos/create-goal-request";
import type GoalRepository from "./goal-repository";
import dayjs from "dayjs";
import type { GetGoalCompletionCountRequest } from "../dtos/get-goal-completion-count-request";

export default class GoalDrizzleRepository implements GoalRepository {
	async createGoal(goal: CreateGoalRequest): Promise<Output> {
		const goalData = await db.insert(goals).values(goal).returning();
		const goalId = goalData[0].id;
		return { id: goalId };
	}

	async getGoalCompletionCount(
		goalId: string,
	): Promise<GetGoalCompletionCountRequest> {
		const firstDayOfWeek = dayjs().startOf("week").toDate();
		const lastDayOfWeek = dayjs().endOf("week").toDate();

		const goalCompletionsCount = db.$with("goal_completions_count").as(
			db
				.select({
					goalId: goalCompletions.goalId,
					completionCount: count(goalCompletions.id).as("completionCount"),
				})
				.from(goalCompletions)
				.where(
					and(
						gte(goalCompletions.createdAt, firstDayOfWeek),
						lte(goalCompletions.createdAt, lastDayOfWeek),
						eq(goalCompletions.goalId, goalId),
					),
				)
				.groupBy(goalCompletions.goalId),
		);

		const dataOuput = await db
			.with(goalCompletionsCount)
			.select({
				desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
				completionCount:
					sql`COALESCE(${goalCompletionsCount.completionCount}, 0)`.mapWith(
						Number,
					),
			})
			.from(goals)
			.leftJoin(goalCompletionsCount, eq(goalCompletionsCount.goalId, goals.id))
			.where(eq(goals.id, goalId))
			.limit(1);

		return dataOuput[0];
	}

	async completeGoal(goalId: string): Promise<void> {
		await db.insert(goalCompletions).values({ goalId });
	}
}

type Output = {
	id: string;
};
