import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import GoalDrizzleRepository from "../../repositories/goal-drizzle-repository";
import CompleteGoal from "../../usecases/complete-goal";

export const completeGoalRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/goals/complete",
		{
			schema: {
				body: z.object({
					goalId: z.string(),
				}),
			},
		},
		async (request) => {
			const { goalId } = request.body;
			const repository = new GoalDrizzleRepository();
			const usecase = new CompleteGoal(repository);
			await usecase.execute(goalId);
		},
	);
};
