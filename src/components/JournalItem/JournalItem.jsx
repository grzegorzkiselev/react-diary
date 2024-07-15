import "./JournalItem.css";

function JournalItem({ title, date, post }) {
  return <>
    <h2 className="journal-item__header">{title}</h2>
    <div className="journal-item__body">
      <p className="journal-item__date">{date}</p>
      <p className="journal-item__text">{post}</p>
    </div>
  </>;
}

export default JournalItem;