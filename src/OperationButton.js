import { ACTIONS } from "./App"

export const OperationButton = ({dispatch, operation}) => {
    const operationHandler = () => {
        dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})
    }
    return <button onClick={operationHandler} className="col-span-1 bg-stone-300 hover:bg-white">{operation}</button>
}