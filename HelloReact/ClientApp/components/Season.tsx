import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect, DispatchProp } from 'react-redux';
import { ApplicationState } from '../store';
import { SimpleSelect, MultiSelect, OptionValue } from 'react-selectize';
import * as SeasonStore from '../store/Season'
import { Dispatch } from 'redux';

interface ISeasonProps {
    seasons: SeasonStore.Season[];
    onValueChange: (value: OptionValue) => void;
}

type SeasonProps = ISeasonProps & DispatchProp<any>;

class Season extends React.Component<SeasonProps, {}> {
    render() {
        return <SimpleSelect
            placeholder="Select a season"
            options={this.props.seasons}
            onValueChange={value => this.props.onValueChange ? this.props.onValueChange(value) : null} >
        </SimpleSelect>
    }
}

export default connect(
    (state: ApplicationState, ownProps: { onValueChange?: (value: OptionValue) => void }) => (
        {
            seasons: state.season.seasons,
            onValueChange : ownProps.onValueChange,
        })
)(Season);