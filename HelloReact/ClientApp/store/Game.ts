import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
interface ISquares {
    squares: string[];
}

export interface IGameStates {
    history: ISquares[],
    xIsNext: boolean,
    stepNumber: number,
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.
const CLICK_SQUARE = 'CLICK_SQUARE';
interface ClickSquareAction { type: 'CLICK_SQUARE', location: number }
const JUMP_TO = 'JUMP_TO';
interface JumpToAction { type: 'JUMP_TO', step: number }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = ClickSquareAction | JumpToAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    clickSquare: (location: number) => <ClickSquareAction>{ type: CLICK_SQUARE, location },
    jumpTo: (step: number) => <JumpToAction>{ type: JUMP_TO, step }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const calculateWinner = function (squares: string[]): string {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return '';
}

export const getCurrent = function (state: IGameStates): ISquares {
    const history = state.history;
    const current = history[state.stepNumber];
    return current;
}

const unloadedState: IGameStates = {
    history: [{
        squares: Array(9).fill(null),
    }],
    xIsNext: true,
    stepNumber: 0,
};

export const reducer: Reducer<IGameStates> = (state: IGameStates = unloadedState, inComingAction: Action) => {
    const action = inComingAction as KnownAction;
    switch (action.type) {
        case CLICK_SQUARE: {
            const history = state.history.slice(0, state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            let location = action.location;

            if (calculateWinner(squares) || squares[location]) {
                return state;
            }
            squares[location] = state.xIsNext ? 'X' : 'O';
            return ({
                history: history.concat([{
                    squares: squares,
                }]),
                stepNumber: history.length,
                xIsNext: !state.xIsNext,
            });
        }
        case JUMP_TO:
            return Object.assign({}, state, {
                stepNumber: action.step,
                xIsNext: (action.step % 2) === 0,
            });
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state;
};
