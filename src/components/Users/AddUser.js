import React, { useState } from "react";
import Card from "../UI/Card";
import styles from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [enteredUserName, setenteredUserName] = useState("");
  const [enteredUserAge, setenteredUserAge] = useState("");
  const [error, seterror] = useState();
  const addUserHandler = (event) => {
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
    <div>
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
            id="username"
            type="text"
            onChange={userNameChangeHandler}
            value={enteredUserName}
          />
          <label htmlFor="age">Age (year)</label>
          <input
            id="age"
            type="number"
            onChange={userAgeChangeHandler}
            value={enteredUserAge}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
