import React from 'react';

export default class dogDiv extends React.Component {
    render() {
        return (
            <div>
                <img src={this.props.dog.image} alt="doggo pic"/>
                <h2>{this.props.dog.name}</h2>
                <button onClick={this.props.handleGoodBadDog}>{this.props.dog.isGoodDog ? "Bad Dog" : "Good Dog"}</button>
            </div>
        )  
    }
}