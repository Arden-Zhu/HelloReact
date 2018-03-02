import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export class ClickableItem {
    displayName: string;
    id: number;
}

export interface IArrayViewProps {
    items: ClickableItem[],
    title: string,
    selectedItem?: ClickableItem
};

export class ArrayView extends
    React.Component<IArrayViewProps, {}> {
    selectedItem: ClickableItem;
    constructor() {
        super();
        this.selectedItem = { id: 0, displayName: 'none' };
    }

    render() {
        var that = this;
        return (<div>
            <h1>{this.props.title}</h1>
            <ul>
                {this.props.items.map(function (item, i) {
                    return (
                        <li key={i} onClick={that.handleClick.bind(that, i, item)}>
                            <button id={'select_button_' + item.id} >
                                {item.displayName}</button>
                        </li>
                    );
                }, this)}
            </ul>

            <div id="selectedItem">Selected : {this.selectedItem.id} - {this.selectedItem.displayName}</div>
        </div>

        );
    }

    handleClick(i: number, props: any) {
        //console.log(`handleClick : ${props}`);
        this.selectedItem = props;
        this.forceUpdate();
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