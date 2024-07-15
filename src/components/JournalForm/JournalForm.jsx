import { useContext, useEffect, useReducer, useState } from "react";
import { INITIAL_STATE, formReducer } from "./JournalForm.state";
import cn from "classnames";
import Button from "../Button/Button";
import styles from "./JournalForm.module.css";
import { UserContext } from "../../context/user.context";

function JournalForm({ onSubmit, selectedItem, setSelectedItem, onItemDelete }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid: formValidState, isFormReadyToSubmit, values } = formState;
  const { userId } = useContext(UserContext);

  const clearForm = () => {
    dispatchForm({ type: "CLEAR" });
    dispatchForm({ type: "SET_STATE", payload: { userId } });
    setSelectedItem(() => ({}));
  };

  useEffect(() => {
    const isNotValid = Object.values(formValidState).some((value) => value === false);

    const timerId = isNotValid === true
      ? setTimeout(() => {
        dispatchForm({ type: "RESET_VALIDITY" });
        // setFormValidState((previousValidState) => ({ ...previousValidState, ...INITIAL_VALID_STATE }));
      }, 2000)
      : null;

    return () => {
      clearInterval(timerId);
    };
  }, [formValidState]);

  useEffect(() => {
    if (isFormReadyToSubmit === true) {
      onSubmit(values);
      clearForm();
    }
  }, [values, onSubmit, isFormReadyToSubmit, userId]);

  useEffect(() => {
    dispatchForm({ type: "SET_STATE", payload: { userId } });
  }, [userId]);

  useEffect(() => {
    if (Object.keys(selectedItem).length === 0) {
      dispatchForm({ type: "CLEAR" });
      dispatchForm({ type: "SET_STATE", payload: { userId } });
    } else {
      dispatchForm({ type: "SET_STATE", payload: { ...selectedItem } });
    }
  }, [selectedItem]);

  const onInputChange = (event) => {
    // setInputData(event.target.value);
    dispatchForm({ type: "SET_STATE", payload: { [event.target.name]: event.target.value } });
  };

  const onJournalFormSubmit = (event) => {
    event.preventDefault();
    // const formData = new FormData(event.target);
    // const formProps = Object.fromEntries(formData);

    dispatchForm({ type: "SUBMIT" });

    // console.log("fr", isFormReadyToSubmit);
    // if (isFormReadyToSubmit) {
    //   onSubmit(values);
    // }
  };

  const validityAwareInputClass = (field, ...classes) => {
    return cn(
      styles["input"],
      ...classes,
      { [styles["invalid"]]: formValidState.hasOwnProperty(field) && !formValidState[field] }
    );
  };

  const deleteJournalItem = (id) => {
    onItemDelete(id);
    clearForm();
  };

  return (
    <form action="" className={styles["journal-form"]} onSubmit={onJournalFormSubmit}>
      <div className={styles["form-row"]}>
        <input className={validityAwareInputClass("title", styles["input-title"])} onChange={onInputChange} value={values.title} name="title" type="text" />
        {selectedItem.id && (<button className={styles.delete} type="button" onClick={() => deleteJournalItem(selectedItem.id)}>
          <img src="/archive.svg" alt="Кнопка удалить" />
        </button>)}
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-label"]}>
          <img src="/calendar.svg" alt="Иконка календаря" />
          <span>Дата</span>
        </label>
        <input className={validityAwareInputClass("date", styles["input-date"])} onChange={onInputChange} value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ""} type="date" name="date" id="date" />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-label"]}>
          <img src="/folder.svg" alt="Иконка папка" />
          <span>Теги</span>
        </label>
        <input id="tag" className={validityAwareInputClass("tag")} value={values.tag} onChange={onInputChange} type="text" name="tag" />
      </div>

      <textarea className={validityAwareInputClass("post", styles["input-post"])} onChange={onInputChange} value={values.post} name="post" id=""></textarea>
      <Button>Сохранить</Button>
    </form >
  );
}


export default JournalForm;
