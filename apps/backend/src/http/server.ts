import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import z from "zod";
import CreateGoal from "../usecases/create-goal";
import GoalDrizzleRepository from "../repositories/goal-drizzle-repository";
import GetWeekPendingGoals from "../queries/get-week-pending-goals";
import CompleteGoal from "../usecases/complete-goal";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

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

app.get("/pending-goals", async () => {
	const getWeekPendingGoals = new GetWeekPendingGoals();
	const pendingGoals = await getWeekPendingGoals.execute();
	return pendingGoals;
});

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

app.listen({ port: 3333 }).then(() => {
	console.log("🚀🚀🚀 HTTP Server running on http://localhost:3333");
});
