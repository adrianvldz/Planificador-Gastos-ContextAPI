import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react";
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer";

type BudgetContextProps = {
    state: BudgetState,
    dispatch: Dispatch<BudgetActions>,
    totalExpense: number,
    remainBudget: number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children} : BudgetProviderProps) =>{

    const[state, dispatch] = useReducer(budgetReducer, initialState)



    const totalExpense = useMemo(()=> state.expenses.reduce((total, expense) => expense.amount + total, 0 ), [state.expenses])
  
    const remainBudget = state.budget - totalExpense

    return(
        <BudgetContext.Provider
        value={{
            state,
            dispatch,
            totalExpense,
            remainBudget
        }}
        >

            {children}
        </BudgetContext.Provider>


    )
}