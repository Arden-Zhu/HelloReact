import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { SimpleSelect, MultiSelect } from 'react-selectize';

type CopyStyleProps = RouteComponentProps<{}>;
export class CopyStyle extends React.Component<CopyStyleProps, {}> {
    testValue(value: any) {
        alert(value);
        console.log(value);
    }
    public render() {
        return <div>
            <h1>Copy Style</h1>
            <CopyStyleFilter />
            <SimpleSelect placeholder="Select a fruit" onValueChange={value => this.testValue(value.value)}>
                <option value="apple">apple</option>
                <option value="mango">mango</option>
                <option value="orange">orange</option>
                <option value="banana">banana</option>
            </SimpleSelect>
            <MultiSelect
                placeholder="Select fruits"
                options={["apple", "mango", "orange", "banana"].map(
                    fruit => ({ label: fruit, value: fruit })
                )}
                onValuesChange={value => alert(value)}
            />
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