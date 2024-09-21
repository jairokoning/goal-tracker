type PendingGoalsResponse = {
  id: string
  title: string
  disiredWeeklyFrequency: number
  completionCount: number
}[]

export async function getPendingGoals(): Promise<PendingGoalsResponse> {
  const response = await fetch('http://localhost:3333/goals/pending')
  const data = await response.json()
  return data.pendingGoals
}
