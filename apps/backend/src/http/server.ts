import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import z from "zod";
import CreateGoal from "../usecases/create-goal";
import GoalDrizzleRepository from "../repositories/goal-drizzle-repository";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get("/goals", async (request) => {
	console.log("BLZ");
});

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

app.listen({ port: 3333 }).then(() => {
	console.log("🚀🚀🚀 HTTP Server running on http://localhost:3333");
});
