import dayjs from "dayjs";
import { client, db } from ".";
import { goalCompletions, goals } from "./schema";

async function seed() {
	await db.delete(goalCompletions);
	await db.delete(goals);
	const goalsOutput = await db
		.insert(goals)
		.values([
			{ title: "Acordar as 5h", desiredWeeklyFrequency: 7 },
			{ title: "Me exercitar", desiredWeeklyFrequency: 3 },
			{ title: "Ler um livro", desiredWeeklyFrequency: 5 },
		])
		.returning();
	const startOfWeek = dayjs().startOf("week");
	await db.insert(goalCompletions).values([
		{ goalId: goalsOutput[0].id, createdAt: startOfWeek.toDate() },
		{
			goalId: goalsOutput[1].id,
			createdAt: startOfWeek.add(1, "day").toDate(),
		},
	]);
}

seed().finally(() => client.end());
