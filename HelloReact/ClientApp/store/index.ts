import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import * as Game from './Game';
import * as CopyStyle from './CopyStyle';
import * as Season from './Season'

// The top-level state object
export interface ApplicationState {
    counter: Counter.CounterState;
    weatherForecasts: WeatherForecasts.WeatherForecastsState;
    game: Game.IGameStates;
    copyStyle: CopyStyle.CopyStyleState;
    season: Season.SeasonState
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    game: Game.reducer,
    copyStyle: CopyStyle.reducer,
    season: Season.reducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
