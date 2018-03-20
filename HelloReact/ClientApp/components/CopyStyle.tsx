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