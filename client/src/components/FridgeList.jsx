import axios from 'axios'
import React, {useState, useEffect} from 'react'

const initialValues = {food: "", amount: ""}

const FridgeList = (props) => {
    const [fridge, setFridge] = useState([])
    const [fridgeItem, setFridgeItem] = useState(initialValues)
    const [toggle, setToggle] = useState(false)


    console.log("fridge item, top:", fridgeItem)

    useEffect(()=>{
        axios
            .get('http://localhost:4420/fridge')
            .then(response => setFridge(response.data), setToggle(false))
            .catch(error=> console.log(error.message, error.stack))
    }, [toggle])

    const fridgeChange = (event) => {
        setFridgeItem({...fridgeItem, [event.target.name]: event.target.value})
        console.log("fridge item in change:", fridgeItem)
    }

    const fridgeSubmit = (event) => {
        event.preventDefault()
        const nextFood = fridgeItem
        console.log({nextFood})
        axios
            .post('http://localhost:4420/fridge', nextFood)
            .then(response => console.log("post fridge response:", response), setToggle(true))
            .catch(error=> console.log(error))
        setFridgeItem(initialValues)    
    }

    console.log("fridge:", fridge)

    return (
        <div>
            <h4>This is whats in the fridge/pantry:</h4>
            <form onSubmit={fridgeSubmit}>
                <input 
                    name="food"
                    type="text"
                    value={fridgeItem.food}
                    onChange={fridgeChange}
                    placeholder="add food to pantry/fridge"
                />
                <input 
                    name="amount"
                    type="text"
                    value={fridgeItem.amount}
                    onChange={fridgeChange}
                    placeholder="how much you got?"
                /> 
                <button>add that food!</button>
            </form>  
            {
                fridge.map(item => 
                    {return(<h3>{item.food}, {item.amount}</h3>)}
                )
            }
        </div>
    )
}

export default FridgeList
