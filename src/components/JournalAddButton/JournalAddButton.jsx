import CardButton from "../CardButton/CardButton";
import "./JournalAddButton.css";

function JournalAddButton({ clearForm }) {
  return <CardButton onClick={clearForm} className="journal-add">Новое воспоминание</CardButton>;
}

export default JournalAddButton;