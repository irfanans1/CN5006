import React from 'react';
import sad from './sad.png';
import happy from './happy.png';

class ToggleMode extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            pic: happy,
            mode: "happy"
        };
        this.Toggle_Mode = this.Toggle_Mode.bind(this);
    }

    Toggle_Mode() {
        this.setState((prevState) => {
            if (prevState.pic === sad) {
                return {
                    pic: happy,
                    mode: "happy"
                };
            } else {
                return {
                    pic: sad,
                    mode: "sad"
                };
            }
        });
    }

    render() {
        return (
            <div>
                <h3>This is output of Task2: {this.state.mode}</h3>
                <button onClick={this.Toggle_Mode}>
                    <img 
                        src={this.state.pic} 
                        alt={this.state.mode} 
                        width="40" 
                        height="40"
                    />
                </button>
            </div>
        );
    }
}

export default ToggleMode;