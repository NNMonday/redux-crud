import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/reducers/UserReducer";

export default function Update() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:9999/users/${id}`)
      .then((res) => res.json())
      .then((res) => {
        const user = res.result;
        setName(user.name);
        setEmail(user.email);
        setAge(user.age);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { name, email, age };
    dispatch(updateUser({ updatedUser, id })).then((action) => {
      window.alert(action.payload.message);
      navigate("/");
    });
  };

  return (
    <div className="w-100 d-flex justify-content-center">
      <Form style={{ width: "80%", maxWidth: "700px" }} onSubmit={handleSubmit}>
        <h2>Update User Form</h2>
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
          Update
        </Button>
      </Form>
    </div>
  );
}
