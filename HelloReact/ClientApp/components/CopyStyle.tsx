import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { SimpleSelect, MultiSelect } from 'react-selectize';

type CopyStyleProps = RouteComponentProps<{}>;
export class CopyStyle extends React.Component<CopyStyleProps, {}> {
    public render() {
        return <div>
            <h1>Copy Style</h1>
            <CopyStyleFilter />
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

class CopyStyleTable extends React.Component<{}, {}> {
    render() {
        return <div className="container">
        <CopyStyleTableHeader />
        <CopyStyleTableStyles />
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

class CopyStyleTableStyles extends React.Component<{}, {}> {
    render() {
        return <div className="row">
            <span className="col-md-1"><input type="checkbox" /></span>
            <span className="col-md-2">WV372E-KV15</span>
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
    }
}

class temp extends React.Component<{}, {}> {
    render() {
        return <div>
        </div>
    }
}


class CopyStyleFilter extends React.Component<{}, {}> {
    public render() {
        return <div>
            <form>
                <label>Original Season
                    <SimpleSelect placeholder="Select a season" onValueChange={value => null}>
                        <option value="PF18">PF18</option>
                        <option value="FA18">FA18</option>
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