import { Plus } from 'lucide-react'
import logo from '../assets/logo-goal-tracker.svg'
import letsStart from '../assets/lets-start-illustration.svg'
import { DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'

export function EmptyGoals() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <div className="flex gap-2 items-center">
        <img src={logo} alt="Goal Tracker" />
        <span>Goal Tracker</span>
      </div>
      <img src={letsStart} alt="Goal Tracker" />
      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar uma agora
        mesmo?
      </p>

      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Cadastrar meta
        </Button>
      </DialogTrigger>
    </div>
  )
}
