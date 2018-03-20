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
            Filters
        </div>
    }
}