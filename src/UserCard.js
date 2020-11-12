import React, {useState, useEffect} from 'react';
import './style/usercard.css';

 

const UserCard = (props) => {
    let name = props.name;
    let checkd = props.checkd;
    let statColor = {
        in: 'green',
        out: 'red',
        dnd: 'yellow'
    }
    const [status, setStatus] = useState(checkd);
    const [color,setColor] = useState(statColor[checkd]);
    // const [isChecked, setIsChecked] = useState(checked)

    useEffect(() => {
        setStatus(checkd);
        setColor(statColor[checkd]);

    },[5000])

    function postStatusChange(data) {
        fetch('http://inout.fcsa-water.local:5000/status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(response) {
        console.log( response);
    })
    }
    const changeStatus = (event) => {
        let newStatus = event.target.value;
        setStatus(newStatus);
        postStatusChange({name: name, status: newStatus})
        if (newStatus === 'out') {
            setColor("red");
        } else if (newStatus === 'in') {
            setColor("green");
        }else if (newStatus === 'dnd') {
            setColor("yellow");
        }
    }

    const indStyle = {
        backgroundColor: color
    };

    return(
        <div className="userContainer">
        <h3 className="user">{name}</h3>
        <div className='indicator' style={indStyle}></div>

        <form className='statusForm' name="statusForm" onChange={(event) => changeStatus(event)}>
            <input type="radio" id="in" name="status" value="in"    /> 
            <label htmlFor="in">In</label>
            <input type="radio" id="out" name="status" value="out"  />
            <label htmlFor="out">Out</label>
            <input type="radio" id="dnd" name="status" value="dnd" />
            <label htmlFor="dnd">DND</label>
        </form>
        <div className="clear" />
    </div>
    )

}

export default UserCard;