import React, {useState, useEffect} from 'react';
import './style/usercard.css';
// import ProfilePhoto from './ProfilePhoto';

 

const UserCard = (props) => {
    let name = props.name;
    let checkd = props.checkd;
    let email = props.email;
    let statColor = {
        in: 'green',
        out: 'red',
        dnd: 'yellow'
    }
    const [status, setStatus] = useState(checkd);
    const [color,setColor] = useState(statColor[checkd]);
    const options = ['in','out','dnd'];

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
            {/* <ProfilePhoto email={email} /> */}
        <h3 className="user">{name}</h3>
        <div className='indicator' style={indStyle}></div>

        <form className='statusForm' name="statusForm" onChange={(event) => changeStatus(event)}>
        {options.map(o => {
            return(
                <>
                <input
                    type='radio'
                    name='status'
                    value={o}
                    checked={status === o}
                />{" "}
                {o === 'dnd' ? o.toUpperCase(): o.charAt(0).toUpperCase() + o.slice(1)  }
                </>
            )
            })}
            
        </form>
          
        <div className="clear" />
    </div>
    )

}

export default UserCard;

  
       
        {/* <input type="radio" id="in" name="status" value="in"    /> 
            <label htmlFor="in">In</label>
            <input type="radio" id="out" name="status" value="out"  />
            <label htmlFor="out">Out</label>
            <input type="radio" id="dnd" name="status" value="dnd" />
            <label htmlFor="dnd">DND</label> */}