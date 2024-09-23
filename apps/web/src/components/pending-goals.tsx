import { Check } from 'lucide-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPendingGoals } from '../http/get-pending-goals'
import { OutlineButton } from './ui/outline-button'
import { createGoalCompletion } from '../http/create-goal-completion'

export function PendingGoals() {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['goals/pending'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60, // 60 seconds
  })

  if (!data) return null

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId)
    queryClient.invalidateQueries({
      queryKey: ['goals/summary'],
    })
    queryClient.invalidateQueries({
      queryKey: ['goals/pending'],
    })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map(goal => {
        return (
          <OutlineButton
            key={goal.id}
            disabled={goal.completionCount >= goal.disiredWeeklyFrequency}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Check className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
