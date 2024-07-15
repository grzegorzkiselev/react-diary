import { useContext, useMemo } from "react";
import { UserContext } from "../../context/user.context";
import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";
import "./JournalList.css";

const sortByDate = (items) => {
  return items.sort((a, b) => new Date(a.date) < new Date(b.date));
};

function JournalList({ items, setSelectedItem }) {
  const { userId } = useContext(UserContext);
  const currentUserItems = useMemo(() => items.filter((item) => item.userId === userId), [items, userId]);
  const sortedItems = useMemo(() => sortByDate(currentUserItems), [currentUserItems]);

  if (currentUserItems.length === 0) {
    return <p>Записей пока нет, добавьте первую</p>;
  } else {
    return (
      <div className="journal-list">
        {
          sortedItems.map((element) => {
            return <CardButton key={element.id} onClick={() => setSelectedItem(element)}>
              <JournalItem
                title={element.title}
                date={element.date}
                post={element.post}
              />
            </CardButton>;
          })}
      </div>
    );
  }
}

export default JournalList;