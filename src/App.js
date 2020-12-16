import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {
  state = {
    pizzas: [],
    pizza: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then(resp => resp.json())
    .then(pizzas => this.setState({ pizzas: pizzas }))
  }

  editPizza = (id) => {
    let pizza = this.state.pizzas.find(pizza => pizza.id === id)
    this.setState({ pizza: pizza })
    
    // OR
    // fetch(`http://localhost:3000/pizzas/${pizza_id}`)
    // .then(resp => resp.json())
    // .then(pizza => this.setState({ pizza: pizza }))
  }

  handleChange = (e) => {    
    this.setState({
      pizza: {
        ...this.state.pizza,
        [e.target.name]: e.target.value,
      }
    })
  }

  valueSwitch = (value)  => {
    switch (value) {
      case 'Vegetarian':
        return true;
      case 'Not Vegetarian':
        return false;
    }
  }

  handleBoolean = (e) => {
    this.setState({
      pizza: {
        ...this.state.pizza,
        vegetarian: this.valueSwitch(e.target.value)
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let pizzas = [...this.state.pizzas]
    let index = pizzas.findIndex(pizza => pizza.id === this.state.pizza.id)
    pizzas[index] = this.state.pizza
    this.setState({
      pizzas: pizzas
    })
    let options = {
      method: 'PATCH',      
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state.pizza),
    }
    fetch(`http://localhost:3000/pizzas/${this.state.pizza.id}`, options)
  }

  render() {    
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state.pizza} handleChange={this.handleChange} handleBoolean={this.handleBoolean} handleSubmit={this.handleSubmit} />
        <PizzaList pizzas={this.state.pizzas} editPizza={this.editPizza} />
      </Fragment>
    );
  }
}

export default App;
