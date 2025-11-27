import './App.css';
import React from 'react';
import like7 from './like7.png';
import Love from './Love.png';
import happy from './happy.png';

class FacebookEmojiCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            number: 0 
        };
        this.increment = this.increment.bind(this);
        
        // Initialize image based on prop type
        this.pic = this.getImageByType(props.type);
    }

    getImageByType(type) {
        switch(type) {
            case "Love":
                return Love;
            case "Like":
                return like7;
            case "happy":
                return happy;
            default:
                return like7; // default fallback
        }
    }

    increment() {
        this.setState((prevState) => ({
            number: prevState.number + 1
        }));
    }

    render() {
        const { number } = this.state;
        const { type } = this.props;

        return (
            <div className="emoji-counter">
                <h5>It is {number} {type}.</h5>
                <button onClick={this.increment} className="emoji-button">
                    <img src={this.pic} alt={type} />
                    <b>{number}</b>
                </button>
            </div>
        );
    }
}

export default FacebookEmojiCounter;