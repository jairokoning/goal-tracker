import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import GoalDrizzleRepository from "../../repositories/goal-drizzle-repository";
import CreateGoal from "../../usecases/create-goal";

export const createGoalRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/goals",
		{
			schema: {
				body: z.object({
					title: z.string(),
					desiredWeeklyFrequency: z.number().int().min(1).max(7),
				}),
			},
		},
		async (request) => {
			const { title, desiredWeeklyFrequency } = request.body;
			const repository = new GoalDrizzleRepository();
			const usecase = new CreateGoal(repository);
			await usecase.execute({ title, desiredWeeklyFrequency });
		},
	);
};
