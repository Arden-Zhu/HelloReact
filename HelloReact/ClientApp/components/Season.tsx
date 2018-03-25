import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect, DispatchProp } from 'react-redux';
import { ApplicationState } from '../store';
import { SimpleSelect, MultiSelect, OptionValue } from 'react-selectize';
import * as SeasonStore from '../store/Season'
import { Dispatch } from 'redux';

interface IStateProps {
    seasons: SeasonStore.Season[];
}

interface IOwnProps {
    onValueChange?: (value: OptionValue) => void;
}

type SeasonProps = IStateProps & IOwnProps  & DispatchProp<any>;

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
    (state: ApplicationState, ownProps: IOwnProps ) => (
        {
            seasons: state.season.seasons,
        })
)(Season);