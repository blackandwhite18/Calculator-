import { ACTIONS } from "./App"

export const DigitButton = ({dispatch, digit}) => {
    const addDigitHandler = () => {
        dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit}})
    }
    return <button onClick={addDigitHandler} className="col-span-1 bg-stone-300 hover:bg-white">{digit}</button>
}