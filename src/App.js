import React, { useReducer } from "react";

import { DigitButton } from "./DigitButton";
import { OperationButton } from "./OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

const initialState = {
  currentOperand: "",
  previousOperand: "",
  operation: "",
  overwrite: false,
};

const reducer = (state = { initialState }, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...initialState,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.overwrite) {
        return {
          ...initialState
        }
      }
      if (state.currentOperand === "" && state.previousOperand === "") {
        return state;
      }
      if (state.currentOperand === "") {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand === "") {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: "",
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: "",
      };

    case ACTIONS.EVALUATE:
      if (
        state.currentOperand === "" ||
        state.previousOperand === "" ||
        state.operation === ""
      ) {
        return state;
      }
      return {
        ...state,
        currentOperand: evaluate(state),
        overwrite: true,
        previousOperand: "",
        operation: "",
      };

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...initialState,
        };
      }

      if (state.currentOperand === "") {
        return state;
      }

      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: "",
        };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case ACTIONS.CLEAR:
      return {
        ...initialState,
      };
  }
};

const evaluate = (state) => {
  const { currentOperand, previousOperand, operation } = state;
  const prev = parseFloat(previousOperand);
  const current = parseInt(currentOperand);

  if (isNaN(prev) || isNaN(current)) return initialState;

  let computation;
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }

  return computation.toString();
};

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

const formatOperand = (operand) => {
  if (operand === "") return

  const [integer, decimal] = operand.split(".")
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{ currentOperand, previousOperand, operation, overwrite }, dispatch] = useReducer(
    reducer,
    initialState
  );

  console.log(currentOperand, previousOperand, operation, overwrite);

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center">
      <div className="w-3/4 h-3/4 sm:h-3/4 sm:w-1/2 lg:h-3/4 lg:w-1/3 mx-auto">
        <div className="w-full h-full grid grid-cols-4  bg-white gap-1 overflow-auto rounded-sm shadow-lg">
          <div className="col-span-4 bg-neutral-800 text-white text-4xl p-4 flex flex-col justify-end items-end">
            <div className="opacity-50 text-2xl">
              {formatOperand(previousOperand)}
              {operation}
            </div>
            <div className="flex">{formatOperand(currentOperand)}</div>
          </div>
          <button
            className="col-span-2 bg-stone-300 hover:bg-white"
            onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          >
            AC
          </button>
          <button
            className="col-span-1 bg-stone-300 hover:bg-white"
            onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
          >
            DEL
          </button>
          <OperationButton operation="÷" dispatch={dispatch} />
          <DigitButton digit="1" dispatch={dispatch} />
          <DigitButton digit="2" dispatch={dispatch} />
          <DigitButton digit="3" dispatch={dispatch} />
          <OperationButton operation="*" dispatch={dispatch} />
          <DigitButton digit="4" dispatch={dispatch} />
          <DigitButton digit="5" dispatch={dispatch} />
          <DigitButton digit="6" dispatch={dispatch} />
          <OperationButton operation="+" dispatch={dispatch} />
          <DigitButton digit="7" dispatch={dispatch} />
          <DigitButton digit="8" dispatch={dispatch} />
          <DigitButton digit="9" dispatch={dispatch} />
          <OperationButton operation="-" dispatch={dispatch} />
          <DigitButton digit="0" dispatch={dispatch} />
          <DigitButton digit="." dispatch={dispatch} />
          <button
            className="col-span-2 bg-stone-300 hover:bg-white"
            onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

// function App() {
//   const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});
//   console.log(currentOperand)

//   return (
//     <div className="h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center">
//       <div className="w-3/4 h-3/4 sm:h-3/4 sm:w-1/2 lg:h-3/4 lg:w-1/3 mx-auto bg-white">
//         <div className="w-full h-full grid grid-cols-4  bg-white gap-1">
//           <div className="col-span-4 bg-neutral-800 text-white text-4xl p-4 flex flex-col justify-end items-end">
//             <div>{previousOperand} {operation}</div>
//             <div>{currentOperand}</div>
//           </div>
//           <button className="col-span-2 bg-stone-300 hover:bg-white">AC</button>
//           <button className="col-span-1 bg-stone-300 hover:bg-white">
//             DEL
//           </button>
//           <button className="col-span-1 bg-stone-300 hover:bg-white">÷</button>
//           <button className="col-span-1 bg-stone-300 hover:bg-white">1</button>
//           <button className="col-span-1 bg-stone-300 hover:bg-white">2</button>
//           <button className="col-span-1 bg-stone-300 hover:bg-white">3</button>
//           <button className="col-span-1 bg-stone-300 hover:bg-white">*</button>
//           <button className="col-span-1 bg-stone-300 hover:bg-white">4</button>
//           <button className="col-span-1 bg-stone-300 hover:bg-white">5</button>
//           <button className="col-span-1 bg-stone-300 hover:bg-white">6</button>
//           <button className="col-span-1 bg-stone-300 hover:bg-white">+</button>
//           <button className="col-span-1 bg-stone-300 hover:bg-white">7</button>
//           <button className="col-span-1 bg-stone-300 hover:bg-white">8</button>
//           <button className="col-span-1 bg-stone-300 hover:bg-white">9</button>
//           <button className="col-span-1 bg-stone-300 hover:bg-white">-</button>
//           <button className="col-span-1 bg-stone-300 hover:bg-white">.</button>
//           <button className="col-span-1 bg-stone-300 hover:bg-white">0</button>
//           <button className="col-span-2 bg-stone-300 hover:bg-white">=</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
