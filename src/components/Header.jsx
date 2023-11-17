import { Dropdown } from 'react-bootstrap';
import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import {Container,Button,FormControl,Navbar,Nav,Badge} from "react-bootstrap";
import {FaShoppingCart} from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import "./styles.css";
import { CartState } from '../context/Context';


const Header = () => {

const{state,dispatch,productDispatch}=CartState();
const{cart}=state;

  return (
  <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
  <Container>
    <Navbar.Brand>
    <Link to="/cart">Shoping cart</Link>
    </Navbar.Brand>
    <Navbar.Text className='search'>
     <FormControl 
      style={{ width: 500 }}
      type="search"
      placeholder="Search a product..."
      className="m-auto"
      aria-label="Search"
      onChange={(e)=>{
         productDispatch({
            type:"FILTER_BY_SEARCH",
            payload:e.target.value
         })
      }}
     />
    </Navbar.Text>

<Nav>
    <Dropdown >
     <Dropdown.Toggle variant="success">
     <FaShoppingCart color="white" fontSize="25px" />
        <Badge>{cart.length}</Badge>
     </Dropdown.Toggle>
     <Dropdown.Menu style={{ minWidth: 370 }}>
        {cart.length>0?
        (
          <>
          {cart.map((prod) => (
            <span className="cartitem" key={prod.id}>
              <img
                src={prod.image}
                className="cartItemImg"
                alt={prod.name}
              />
              <div className="cartItemDetail">
                <span>{prod.name}</span>
                <span>₹ {prod.price.split(".")[0]}</span>
              </div>
              <AiFillDelete
                fontSize="20px"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: prod,
                  })
                }
              />
            </span>
          ))}
          <Link to="/cart">
            <Button style={{ width: "95%", margin: "0 10px" }}>
              Go To Cart
            </Button>
          </Link>
        </>
        ):(
          <span style={{padding:10}}>Cart is empty</span>
        )}
        </Dropdown.Menu>
    
    </Dropdown>
   </Nav>
  </Container>
  </Navbar>
  )
}

export default Header
