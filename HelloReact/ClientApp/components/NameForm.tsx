import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

class NameForm extends React.Component<{}, { value: string }> {
    constructor(props: {}) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.FormEvent<HTMLInputElement>): void {
        this.setState({ value: event.currentTarget.value }); // what's difference between target vs currentTarget?
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={(e)=>this.handleSubmit(e)}>
                <label>
                    Name:
          <input type="text" value={this.state.value} onChange={(e)=>this.handleChange(e)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
