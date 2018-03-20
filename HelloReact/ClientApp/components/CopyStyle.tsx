import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';

type CopyStyleProps = RouteComponentProps<{}>;
export class CopyStyle extends React.Component<CopyStyleProps, {}> {
    public render() {
        return <div>
            <h1>Copy Style</h1>
            <CopyStyleFilter/>
        </div>
    }
}

class CopyStyleFilter extends React.Component<{}, {}> {
    public render() {
        return <div>
            <form>
                <label>Original Season
                    <select>
                        <option>PF18</option>
                        <option>FA18</option>
                    </select>
                </label>
                <label>Fabric#
                    <input name="fabric" placeholder="*0231" />
                </label>
                <label>Body
                    <select className="mdb-select colorful-select dropdown-primary" multiple>
                        <option>Blouses</option>
                        <option>Coats</option>
                        <option>abc</option>
                    </select>
                </label>
                <button className="btn-save btn btn-primary btn-sm">Save</button>
            </form>
        </div>
    }
}