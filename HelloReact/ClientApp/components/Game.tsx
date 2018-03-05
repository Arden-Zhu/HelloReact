import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface SquareProps {
    value: string;
    onClick: () => void;
}

interface SquareStates {
    //value: string | null;
}

class Square extends React.Component<SquareProps, SquareStates> {
    constructor(props: SquareProps) {
        super(props);
        //this.state = {
        //    value: null,
        //}
    }

    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()} >
                {this.props.value}
            </button>
        );
    }
}

interface BoardStates {
    squares: string[],
}

class Board extends React.Component<{}, BoardStates> {
    constructor() {
        super();
        this.state = {
            squares: Array(9).fill(null),
        }
    }

    handleClick(i: number) {
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({ squares: squares });
    }

    renderSquare(i: number) {
        return <Square
            onClick = {() => this.handleClick(i)}
            value={this.state.squares[i]}
        />;
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export class Game extends React.Component<RouteComponentProps<{}>, {}> {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}