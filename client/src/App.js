import React, { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";
import Toolbar from "@material-ui/core/Toolbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Form from "./Form";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    amount: 500,
    firstName: "Ridham",
    lastName: "Patel",
    email: "ridham@gmail.com",
    phone: "1234567890",
    street: "42 -b,B Wing, Aziz Bldg,sita Estate,",
    state: "Gujarat",
    city: "Rajkot",
    zip: "123456",
    country: "India",
  });

  function handleChange(e) {
    const updateData = {
      ...data,
      [e.target.name]: e.target.value,
    };
    setData(updateData);
    // console.log(updateData);
  }

  function handleSubmit(e) {
    const { firstName, lastName, email, phone, amount} = data;
    e.preventDefault();
    setIsLoading(true);
    Axios.post("http://localhost:5000/api/token", data).then((response) => {
      const token = response.data.token;
      const billingAddress = {
        city: data.city,
        street: data.street,
        zip: data.zip,
        country: 'US',
        state: 'NY'
      };
      const customer = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        dateOfBirth: {
          day: 4,
          month: 5,
          year: 1998,
        },
      };

      const uuid = uuidv4();
      setIsLoading(
        window.checkout(token, billingAddress, customer, uuid, amount)
      );
    });
  }

  return (
    <>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          PaySafe
        </Typography>
      </Toolbar>
      <main style={{ margin: "5rem" }}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          style={{ marginBottom: "27px", textDecoration: "underline" }}
        >
          Checkout
        </Typography>
        <form onSubmit={handleSubmit}>
          <Form data={data} handleChange={handleChange} />
          <div>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Button variant="contained" color="primary" type="submit">
                Pay
              </Button>
            )}
          </div>
        </form>
      </main>
    </>
  );
}

export default App;
