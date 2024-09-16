import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import GetWeekPendingGoals from "../../queries/get-week-pending-goals";

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async (app) => {
	app.get("/pending-goals", async () => {
		const getWeekPendingGoals = new GetWeekPendingGoals();
		const pendingGoals = await getWeekPendingGoals.execute();
		return pendingGoals;
	});
};
