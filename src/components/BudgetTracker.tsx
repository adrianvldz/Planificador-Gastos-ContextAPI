import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";

export default function BudgetTracker() {

  const {state, totalExpense, remainBudget, dispatch} = useBudget()

  const percentage = +((totalExpense / state.budget) *100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center ">
            <CircularProgressbar
            value={percentage}
            styles={buildStyles({
              pathColor: percentage === 100 ? '#DC2626':'#3b82f6',
              trailColor: '#F5F5F5',
              textSize: 8,
              textColor: percentage === 100 ? '#DC2626': '#3b82f6',
              
            })}

            text={`${percentage}% Gastado`}
            />
        </div>

        <div className="flex flex-col justify-center items-center gap-8">

            <button
            type="button"
            className="bg-pink-600 w-full p-2 text-white uppercase rounded-lg font-bold"
            onClick={() => dispatch({type: 'restart-app'})}
            >
            Resetear App
            </button>

            
        <AmountDisplay
        label="Presupuesto"
        amount={state.budget}
        />

        <AmountDisplay
        label="Disponible"
        amount={remainBudget}
        />
        <AmountDisplay
        label="Gastado"
        amount={totalExpense}
        />
        </div>

    </div>
  )
}