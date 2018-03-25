import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect, DispatchProp } from 'react-redux';
import { ApplicationState } from '../store';
import { SimpleSelect, MultiSelect } from 'react-selectize';
import * as SeasonStore from '../store/Season'
import { Dispatch } from 'redux';

//interface SeasonProps {
//    seasons: SeasonStore.Season[];
//}

type SeasonProps = SeasonStore.SeasonState & typeof SeasonStore.actionCreators;

class Season extends React.Component<SeasonProps, {}> {
    render() {
        return <SimpleSelect
            placeholder="Select a season"
            options={this.props.seasons}
            onValueChange={value => null } >
        </SimpleSelect>
    }
}
//export default connect(
//    (state: ApplicationState) => state.weatherForecasts, // Selects which state properties are merged into the component's props
//    WeatherForecastsState.actionCreators                 // Selects which action creators are merged into the component's props
//)(FetchData) as typeof FetchData;

export default connect(
    (state: ApplicationState) => state.season,
    SeasonStore.actionCreators
)(Season);