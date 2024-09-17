import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createGoalRoute } from "./routes/create-goal";
import { getPendingGoalsRoute } from "./routes/get-pending-goals";
import { completeGoalRoute } from "./routes/complete-goal";
import { getWeekSummaryRoute } from "./routes/get-week-sumary";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute);
app.register(getPendingGoalsRoute);
app.register(completeGoalRoute);
app.register(getWeekSummaryRoute);

app.listen({ port: 3333 }).then(() => {
	console.log("🚀🚀🚀 HTTP Server running on http://localhost:3333");
});
