import React from 'react';

export default class dogSpans extends React.Component {
    render() {
        return (
            this.props.doggos.map(dog => (
                <span onClick={() => this.props.handleClick(dog)}>{dog.name}</span>
            ))
        )  
    }
}