import React from "react"

const Pizza = ({pizza, editPizza}) => {
  return(
    <tr> 
      <td>{pizza.topping}</td>
      <td>{pizza.size}</td>
      <td>{pizza.vegetarian ? 'Yes' : 'No'}</td>
      <td><button type="button" className="btn btn-primary" onClick={() => editPizza(pizza.id)} >Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
