import { Plus, Check } from 'lucide-react'
import { OutlineButton } from './outline-button'
import { useQuery } from '@tanstack/react-query'
import { getPendingGoals } from '../../http/get-pending-goals'

export function PendingGoals() {
  const { data } = useQuery({
    queryKey: ['goals/pending'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60, // 60 seconds
  })

  if (!data) return null

  return (
    <div className="flex flex-wrap gap-3">
      {data.map(goal => {
        return (
          <OutlineButton
            key={goal.id}
            disabled={goal.completionCount >= goal.disiredWeeklyFrequency}
          >
            <Check className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
