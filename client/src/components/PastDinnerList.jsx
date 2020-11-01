import axios from 'axios'
import React, {useState, useEffect} from 'react'

const initialValues = {mainCourse: "", sideDish: ""}

const PastDinnerList = (props) => {
    const [pastDinner, setPastDinner] = useState([])
    const [pastDinnerItem, setPastDinnerItem] = useState(initialValues)
    const [toggle, setToggle] = useState(false)


    console.log("PastDinner item, top:", pastDinnerItem)

    useEffect(()=>{
        axios
            .get('http://localhost:4420/past-dinners')
            .then(response => setPastDinner(response.data), setToggle(false))
            .catch(error=> console.log(error.message, error.stack))
    }, [toggle])

    const pastDinnerChange = (event) => {
        setPastDinnerItem({...pastDinnerItem, [event.target.name]: event.target.value})
        console.log("pastDinner item in change:", pastDinnerItem)
    }

    const pastDinnerSubmit = (event) => {
        event.preventDefault()
        const lastDinner = pastDinnerItem
        console.log({lastDinner})
        axios
            .post('http://localhost:4420/past-dinners', lastDinner)
            .then(response => console.log("post pastDinner response:", response), setToggle(true))
            .catch(error=> console.log(error))
        setPastDinnerItem(initialValues)    
    }

    console.log("pastDinner:", pastDinner)

    return (
        <div>
            <h4>These are previous meals:</h4>
            <form onSubmit={pastDinnerSubmit}>
                <input 
                    name="mainCourse"
                    type="text"
                    value={pastDinnerItem.mainCourse}
                    onChange={pastDinnerChange}
                    placeholder="whats the main course?"
                />
                <input 
                    name="sideDish"
                    type="text"
                    value={pastDinnerItem.sideDish}
                    onChange={pastDinnerChange}
                    placeholder="whats the side dish?"
                /> 
                <button>add that food!</button>
            </form>  
            {
                pastDinner.map(item => 
                    {return(<h3>{item.mainCourse}, {item.sideDish}</h3>)}
                )
            }
        </div>
    )
}

export default PastDinnerList
