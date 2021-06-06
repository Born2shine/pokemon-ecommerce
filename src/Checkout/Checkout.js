import { useState } from "react";
import { useHistory } from "react-router-dom";
import  { setUser } from "../common/userStorage"

import "../App.css"
import { getCartItems } from "../common/pokemonStorage";



export function Checkout() {
  const [cart] = useState(getCartItems());
  const [error, setError] = useState('');
  const history = useHistory()

  const Total = () => cart.reduce((acc, current) => acc + (current.price * current.quantity), 0)
  
  const [userData, setUserData] = useState({
    firstname: '',
    surname: '',
    card_number: '',
    expiry_month: '',
    expiry_year: '',
    cvc: '',
    zip_code: '',
    address: ''
  });

  const validateForm = (data) => {
    const inputData = Object.keys(data).map(key => data[key]);
    const check = inputData.map((d) => {
       if(d.length === 0) {
         return  true
       }
         return false
      
      })
    const isValidated = check.find((c) => c === true)
    if(!isValidated) return true;
    return false
  }

  const handleOnChange = (e) => {
    setUserData((currentData) => {
      // const name = e.target.name;
      // const value = e.target.value;
      const {name, value} = e.target
      console.log(userData)
      return {...currentData, [name]: value }
    })
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isValidated = validateForm(userData)
    if(isValidated){
      setUser(userData)
      history.push(`/order-completed`)
    }else{
      setError('Please fill all data')
    }
  }
  return (
    <div className="container">
      <h3>Checkout</h3>
      {
        error && (
          <div className="error">
            {error}
          </div>
        )
      }
      <form>
        <div className="wrapper">
            <div className="box">
            <div className="form-group">
                {/* <label>Firstname</label> */}
                <input 
                type="text"
                name='firstname'
                value={userData.firstname}
                onChange={(e) => handleOnChange(e)}
                placeholder="John" required/>
            </div>
            <div className="form-group">
              {/* <label>Surname</label> */}
              <input type="text" 
               name='surname'
               value={userData.surname}
               onChange={(e) => handleOnChange(e)}
              placeholder="Doe" />
            </div>
              <div className="form-group">
                {/* <label>Card Number</label> */}
                <input type="number" 
                 name='card_number'
                 value={userData.card_number}
                 onChange={(e) => handleOnChange(e)}
                placeholder="35728397392729" />
              </div>
              <div className="form-group">
               <div className="grid grid-gap">
                <div className="grid-1">
                    {/* <label>Expiry date</label> */}
                    <input type="number" 
                     name='expiry_month'
                     value={userData.expiry_month}
                     onChange={(e) => handleOnChange(e)}
                    placeholder="08"/>
                  </div>
                  <div className="grid-1">
                    {/* <label>.</label> */}
                    <select 
                     name='expiry_year'
                     value={userData.expiry_year}
                     onChange={(e) => handleOnChange(e)}
                    >
                      <option value="">Year</option>
                      <option value="18">18</option>
                    </select>
                  </div>
               </div>
              </div>
              <div className="form-group">
               <div className="grid">
                <div className="grid-1">
                    {/* <label>CVC</label> */}
                    <input type="password" 
                     name='cvc'
                     value={userData.cvc}
                     onChange={(e) => handleOnChange(e)}
                    placeholder="***"/>
                  </div>
                  <div className="grid-1">
                    {/* <label>ZIP Code</label> */}
                    <input type="text" 
                     name='zip_code'
                     value={userData.zip_code}
                     onChange={(e) => handleOnChange(e)}
                    placeholder="4002" />
                  </div>
               </div>
              </div>
            <div className="form-group">
                {/* <label>Address</label> */}
                <textarea rows="6"
                 name='address'
                 value={userData.address}
                 onChange={(e) => handleOnChange(e)}
                />
            </div>
          </div>
        </div>
        <button type="submit" onClick={(e) => handleFormSubmit(e)}>${ Total() } Pay</button>
      </form>
      <div className="price">${ Total() } </div>
    </div>
  );
}
