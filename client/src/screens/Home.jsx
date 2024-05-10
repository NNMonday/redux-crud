import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, loadAllUsers } from "../redux/reducers/UserReducer";
import { Link } from "react-router-dom";
export default function Home() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    window.confirm(`Do you want to delete user with id ${id}`) &&
      dispatch(deleteUser(id));
  };

  return (
    <div className="w-100 px-5">
      <div className="w-100 my-2 d-flex justify-content-end">
        <Link to={"/add"} className="btn btn-primary">
          Add +
        </Link>
      </div>
      <Table hover striped bordered>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.data.map((u, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{u.name}</td>
              <td>{u.age}</td>
              <td>{u.email}</td>
              <td>
                <Link to={`/update/${u._id}`} className="btn btn-primary me-2">
                  Update
                </Link>
                <Button onClick={() => handleDelete(u._id)} variant="danger">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
