import React from 'react';
import './App.css';
import DogSpans from './Components/dogSpans'
import DogDiv from './Components/dogDiv'

class App extends React.Component {

  state = {
    doggos: [],
    dog: {},
    filter: false
  }

  componentDidMount() {
    fetch('http://localhost:3000/pups')
      .then(res => res.json())
      .then(doggies => {
        this.setState({
          doggos: doggies
        })
      })
  }

  handleDogClick = (clickedDog) => {
    this.setState({
      dog: clickedDog
    })
  }

  handleGoodBadDog = () => {
    this.updateDog(this.state.dog)
  }

  updateDog = (dog) => {
    const options = {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: !dog.isGoodDog
      })
    }
    fetch(`http://localhost:3000/pups/${dog.id}`, options)
      .then(res => res.json())
      .then(newDog => {
        this.state.doggos.splice(dog.id - 1, 1, newDog)
        this.setState({
          dog: newDog,
          doggos: this.state.doggos
        })
      })
  }

  handleFilter = () => {
    this.setState({
      filter: !this.state.filter
    })
  }

  updatedList = () => {
    let filtered = [...this.state.doggos]
    switch (this.state.filter) {
      case true:
        return filtered = filtered.filter(dog => (
          dog.isGoodDog === true
        ))
      default:
        return filtered
    }
    // let filtered = [...this.state.doggos]
    // if (this.state.filter) {
    //   filtered = filtered.filter(dog => dog.isGoodDog === true)
    //   return filtered
    // } else {
    //   return filtered
    // }
  }


  render() {
    let filtered = this.updatedList()
    return (
      <div className="App">
        <div id="filter-div">
          <button onClick={this.handleFilter} id="good-dog-filter">Filter good dogs: {this.state.filter ? "OFF" : "ON"}</button>
        </div>
        <div id="dog-bar">
          <DogSpans handleClick={this.handleDogClick} doggos={filtered}/>
        </div>
        <div id="dog-summary-container">
          <h1>DOGGO:</h1>
          <div id="dog-info">
            <DogDiv handleGoodBadDog={this.handleGoodBadDog} dog={this.state.dog}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
