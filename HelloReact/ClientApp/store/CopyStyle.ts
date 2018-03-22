import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export interface CopyStyleState {
    isLoading: boolean;
    styleFilters: {
        seasonId: number;
    }
    styles: Style[];
}

export interface Style {
    style: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
const REQUEST_STYLES = 'REQUEST_STYLES';

interface RequestStylesAction {
    type: 'REQUEST_STYLES';
    seasonId: number;
}

const RECEIVE_STYLES = 'RECEIVE_STYLES'
interface ReceiveStylesAction {
    type: 'RECEIVE_STYLES';
    styles: string[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestStylesAction | ReceiveStylesAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestStyles: (seasonId: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (seasonId !== getState().copyStyle.styleFilters.seasonId) {
            let fetchTask = fetch(`api/Style/Styles?seasonId=${seasonId}`)
                .then(response => response.json() as Promise<string[]>)
                .then(data => {
                    dispatch({ type: RECEIVE_STYLES, styles: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: REQUEST_STYLES, seasonId: seasonId });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: CopyStyleState = {
    isLoading: false,
    styleFilters: {
        seasonId: 0,
    },
    styles: [],
};

export const reducer: Reducer<CopyStyleState> = (state: CopyStyleState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case REQUEST_STYLES:
            return {
                ...state,
                isLoading: true,
                styleFilters: {
                    seasonId : action.seasonId,
                }
            };
        case RECEIVE_STYLES:
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            //if (action.startDateIndex === state.startDateIndex) {
            return {
                    ...state,
                    isLoading: false,
                    styles: action.styles.map((value, index) => {
                        return {
                            style: value
                        };
                    }),
                };
            //}
            //break;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
