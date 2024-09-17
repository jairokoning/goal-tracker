import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import GetWeekSummary from "../../queries/get-week-summary";

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async (app) => {
	app.get("/goals/summary", async () => {
		const getWeekSummary = new GetWeekSummary();
		const ouput = await getWeekSummary.execute();
		return ouput;
	});
};
