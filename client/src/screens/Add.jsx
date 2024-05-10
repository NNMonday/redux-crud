import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/reducers/UserReducer";
import { useNavigate } from "react-router-dom";

export default function Add() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, age: parseInt(age) };
    dispatch(addUser(newUser)).then((action) => {
      window.alert(action.payload.message);
      navigate("/");
    });
  };

  return (
    <div className="w-100 d-flex justify-content-center">
      <Form style={{ width: "80%", maxWidth: "700px" }} onSubmit={handleSubmit}>
        <h2>Add User Form</h2>
        <Form.Group className="mb-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-3" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
}
