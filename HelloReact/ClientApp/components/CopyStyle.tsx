import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { SimpleSelect, MultiSelect } from 'react-selectize';
import * as CopyStyleStore from '../store/CopyStyle';
import { Season } from '../store/Season'

type CopyStyleProps = RouteComponentProps<{}>;
export class CopyStyle extends React.Component<CopyStyleProps, {}> {
    public render() {
        return <div>
            <h1>Copy Style</h1>
            <CopyStyleFilterContainer />
            <CopyStyleCommands/>
            <CopyStyleTable />
        </div>
    }
}

class CopyStyleCommands extends React.Component<{}, {}> {
    render() {
        return <div>
            <label>Target Season
                    <SimpleSelect placeholder="Select a season" onValueChange={value => null}>
                    <option value="PF18">PF18</option>
                    <option value="FA18">FA18</option>
                </SimpleSelect>
            </label>
            <button className="btn btn-primary btn-sm">Submit</button>
            <button className="btn btn-primary btn-sm">Change</button>
            <button className="btn btn-primary btn-sm">Change</button>
        </div>
    }
}

class CopyStyleTableHeader extends React.Component<{}, {}> {
    render() {
        return <div className="row">
            <span className="col-md-1">
                <input type="checkbox" />
            </span>
            <span className="col-md-2">
                Style
            </span>
            <span className="col-md-1">
                A
            </span>
            <span className="col-md-1">
                B
            </span>
            <span className="col-md-1">
                C
            </span>
            <span className="col-md-1">
                D
            </span>
            <span className="col-md-1">
                L
            </span>
            <span className="col-md-1">
                R
            </span>
            <span className="col-md-1">
                X
            </span>
            <span className="col-md-1">
                Result
            </span>
        </div>
    }
}

type ICopyStyleTableStylesProps = { styles: CopyStyleStore.Style[] }
    & typeof CopyStyleStore.actionCreators;

class CopyStyleTableStyles extends React.Component< ICopyStyleTableStylesProps, {}> {
    render() {
        return <div>
            {this.props.styles.map(style =>
                <div key={style.style} className="row">
                    <span className="col-md-1"><input type="checkbox" /></span>
                    <span className="col-md-2">{style.style}</span>
                    <span className="col-md-1">
                        <ul>
                            <li>Color1</li>
                            <li>Color2</li>
                        </ul>
                        <button className="btn btn-primary btn-sm">Change</button>
                    </span>
                    <span className="col-md-1">
                        <button className="btn btn-primary btn-sm">Change</button>
                    </span>
                    <span className="col-md-1">
                        <button className="btn btn-primary btn-sm">Change</button>
                    </span>
                    <span className="col-md-1">
                        <button className="btn btn-primary btn-sm">Change</button>
                    </span>
                    <span className="col-md-1">
                        <button className="btn btn-primary btn-sm">Change</button>
                    </span>
                    <span className="col-md-1">
                        <button className="btn btn-primary btn-sm">Change</button>
                    </span>
                    <span className="col-md-1">
                        <button className="btn btn-primary btn-sm">Change</button>
                    </span>
                    <span className="col-md-1">

                    </span>
                </div>
            )}
            </div>
    }
}

let CopyStyleTableStylesContainer = connect(
    (state: ApplicationState) => {
        return { styles: state.copyStyle.styles }
    },
    CopyStyleStore.actionCreators 
)(CopyStyleTableStyles);


class CopyStyleTable extends React.Component<{}, {}> {
    render() {
        return <div className="container">
            <CopyStyleTableHeader />
            <CopyStyleTableStylesContainer />
        </div>
    }
}

class temp extends React.Component<{}, {}> {
    render() {
        return <div>
        </div>
    }
}

interface ICopyStyleFilterState {
    seasonId: number;
}

type ICopyStyleFilterProps = { seasons : Season[] } &
    typeof CopyStyleStore.actionCreators;

class CopyStyleFilter extends React.Component<ICopyStyleFilterProps, ICopyStyleFilterState> {
    submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.props.requestStyles(this.state.seasonId);
    }
    public render() {
        return <div>
            <form onSubmit={(e) => this.submit(e)} >
                <label>Original Season
                    <SimpleSelect placeholder="Select a season" onValueChange={value => this.setState({ seasonId: value.value }) } >
                        <option value="454393">FA18</option>
                        <option value="454396">PF18</option>
                    </SimpleSelect>
                </label>
                <label>Original Season
                    <SimpleSelect
                        placeholder="Select a season"
                        options={this.props.seasons}
                        onValueChange={value => this.setState({ seasonId: value.value })} >
                    </SimpleSelect>
                </label>
                <label>Fabric#
                    <input name="fabric" placeholder="*0231" />
                </label>
                <label>Body
                    <MultiSelect
                        placeholder="Select bodies"
                        options={["Blouses", "Coats", "Pants"].map(
                            item => ({ label: item, value: item })
                        )}
                        onValuesChange={value => null}
                    />
                </label>
                <label>Fit
                    <SimpleSelect placeholder="(Optional)Select a fit" onValueChange={value => null}>
                        <option value="M">Missy</option>
                        <option value="W">Plus</option>
                        <option value="P">Petite</option>
                    </SimpleSelect>
                </label>
                <label>Style
                    <input placeholder="(Optional)Style#" />
                </label>
                <button className="btn-save btn btn-primary btn-sm">Query</button>
            </form>
        </div>
    }
}

let CopyStyleFilterContainer = connect(
    (state: ApplicationState) => {
        return { seasons: state.season.seasons };
    },
    CopyStyleStore.actionCreators
)(CopyStyleFilter);
