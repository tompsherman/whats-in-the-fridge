import axios from 'axios'
import React, {useState, useEffect} from 'react'

const LiftedState = () => {
    const [fridge, setFridge] = useState([])
    const [pastDinner, setPastDinner] = useState([])
    const [toggle, setToggle] = useState(false)


    useEffect(()=>{
        axios
            .get('http://localhost:4420/fridge')
            .then(response => setFridge(response.data), setToggle(false))
            .catch(error=> console.log(error.message, error.stack))

        axios
            .get('http://localhost:4420/past-dinners')
            .then(response => setPastDinner(response.data), setToggle(false))
            .catch(error=> console.log(error.message, error.stack))
        
    }, [toggle])

    return (
        <>
            <div>
                 {
                    fridge.map(item => 
                        {return(<h3>{item.food}, {item.amount}</h3>)}
                    )
                }

                 {
                pastDinner.map(item => 
                    {return(<h3>{item.mainCourse}, {item.sideDish}</h3>)}
                )
                }
            </div>
        </>
    )
}

export default LiftedState