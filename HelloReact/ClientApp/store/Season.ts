import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

export interface SeasonState {
    isLoading: boolean;
    seasons: Season[];
}

export interface Season {
    value: number;
    label: string;
}

const REQUEST_SEASONS = 'REQUEST_SEASONS';

interface RequestSeasonsAction {
    type: 'REQUEST_SEASONS';
}

const RECEIVE_SEASONS = 'RECEIVE_SEASONS'
interface ReceiveSeasonsAction {
    type: 'RECEIVE_SEASONS';
    seasons: Season[];
}

type KnownAction = RequestSeasonsAction | ReceiveSeasonsAction;

export const actionCreators = {
    requestSeasons: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let seasonState = getState().season;
        if (!seasonState.isLoading) {
            let fetchTask = fetch(`api/Season/GetSeasons`)
                .then(response => response.json() as Promise<Season[]>)
                .then(data => {
                    dispatch({ type: RECEIVE_SEASONS, seasons: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: REQUEST_SEASONS});
        }
    },
    init: (seasons: Season[]) => {
        return { type: RECEIVE_SEASONS, seasons: seasons };
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: SeasonState = {
    isLoading: false,
    seasons: [
        { value: 1, label: "s1" },
        { value: 2, label: "s2" },
    ]
};

export const reducer: Reducer<SeasonState> = (state: SeasonState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case REQUEST_SEASONS:
            return {
                ...state,
                isLoading: true,
            };
        case RECEIVE_SEASONS:
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            //if (action.startDateIndex === state.startDateIndex) {
            return {
                ...state,
                isLoading: false,
                seasons: action.seasons,
            };
        //}
        //break;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
