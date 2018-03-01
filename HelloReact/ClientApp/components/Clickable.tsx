import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export class ClickableItem {
    displayName: string;
    id: number;
}

export class ClickItemView
    extends React.Component<ClickableItem, {}> {
    constructor() {
        super();
        this.handleClick =
            this.handleClick.bind(this); 
    }
    render() {
        return (
            <li><button onClick={this.handleClick}> {this.props.displayName}</button></li>
        );
    }

    handleClick() {
        alert(`handleClick() { id : ${this.props.id} 
        displayName : ${this.props.displayName} }`);
    } 
}

export interface IArrayViewProps {
    items: ClickableItem[],
    title: string
};

export class ArrayView extends
    React.Component<IArrayViewProps, {}> {
    render() {

        let buttonNodes =
            this.props.items.map(function (item) {
                return (
                    <ClickItemView {...item} />
                );
            });

        return <div>
            <h1>{this.props.title}</h1>
            <ul>
                {buttonNodes}
            </ul>
        </div>

            ;
    }
} 

export class Clickable extends
    React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        let ClickableItemArray: ClickableItem[] = [
            { id: 1, displayName: "firstItem" },
            { id: 2, displayName: "secondItem" },
            { id: 3, displayName: "thirdItem" },
        ];

        return <ArrayView items={ClickableItemArray}
            title="Select an option:" />;
    }
}