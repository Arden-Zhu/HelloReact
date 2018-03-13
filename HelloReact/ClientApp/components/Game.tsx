import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as GameStore from '../store/Game';


interface ISquareProps {
    value: string;
    onClick: () => void;
}

type SquareProps = ISquareProps & typeof GameStore.actionCreators;

class Square extends React.Component<SquareProps, {}> {
    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

interface SquareContainerProps {
    location: number;
}

let SquareContainer = connect(
    (state: ApplicationState, ownProp: SquareContainerProps) => {
        const history = state.game.history;
        const current = history[state.game.stepNumber];
        const squares = current.squares;
        return {
            location: ownProp.location,
            value: squares[ownProp.location],
        }
    },
    //GameStore.actionCreators,
    (dispatch, ownProps: SquareContainerProps) => {
        return {
            onClick: () => { dispatch(GameStore.actionCreators.clickSquare(ownProps.location)) }
        }
    },
    (state, dispatchProps, ownProps) => {
        return {
            value: state.value,
            onClick: dispatchProps.onClick,
        }
    }
)(Square);

class Board extends React.Component<{}, {}> {
    renderSquare(i: number) {
        return <SquareContainer
            location={i}
        />;
    }

    render() {
        return (
            <div>
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

type GameProps =
    GameStore.IGameStates
    & typeof GameStore.actionCreators
    & RouteComponentProps<{}>;

class Game extends React.Component<GameProps, {}> {
    render() {
        const history = this.props.history;
        const current = history[this.props.stepNumber];
        const winner = GameStore.calculateWinner(current.squares);  

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.props.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.game, // Selects which state properties are merged into the component's props
    GameStore.actionCreators                 // Selects which action creators are merged into the component's props
)(Game) as typeof Game;