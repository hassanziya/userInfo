import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import styles from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
  const entereName = useRef();
  const entereAge = useRef();
  const [enteredUserName, setenteredUserName] = useState("");
  const [enteredUserAge, setenteredUserAge] = useState("");
  const [error, seterror] = useState();
  const addUserHandler = (event) => {
    console.log(entereName.current.value);
    console.log(entereAge.current.value);
    event.preventDefault();
    if (
      enteredUserName.trim().length === 0 ||
      enteredUserAge.trim().length === 0
    ) {
      seterror({
        title: "Invalid input",
        message: "Please enter a valid name and age (non Empty values)",
      });
      return;
    }

    if (+enteredUserAge < 1) {
      seterror({
        title: "Invalid age",
        message: "Please enter a valid age (> 0 )",
      });
      return;
    }
    props.onAddUser(enteredUserName, enteredUserAge);
    setenteredUserName("");
    setenteredUserAge("");
  };

  const userNameChangeHandler = (event) => {
    setenteredUserName(event.target.value);
  };
  const userAgeChangeHandler = (event) => {
    setenteredUserAge(event.target.value);
  };

  const closeModalHandler = () => {
    seterror(null);
  };
  return (
    <Wrapper>
      {error && (
        <ErrorModal
          closeModal={closeModalHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">UserName</label>
          <input
            className="form-control"
            id="username"
            type="text"
            onChange={userNameChangeHandler}
            value={enteredUserName}
            ref={entereName}
          />
          <label htmlFor="age">Age (year)</label>
          <input
            className="form-control"
            id="age"
            type="number"
            onChange={userAgeChangeHandler}
            value={enteredUserAge}
            ref={entereAge}
          />
          <div className="pt-3">
            <Button type="submit" className="btn btn-md btn-primary ">
              Add User
            </Button>
          </div>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
