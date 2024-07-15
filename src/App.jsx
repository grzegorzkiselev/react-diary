import { useContext, useEffect, useState } from "react";
import "./App.css";
import JournalForm from "./components/JournalForm/JournalForm";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import Body from "./layouts/Body/Body";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import { UserContext, UserContextProvider } from "./context/user.context";

const getFormattedDate = (date) => {
  try {
    return new Intl.DateTimeFormat("ru-RU").format(new Date(date));
  } catch (error) {
    return new Intl.DateTimeFormat("ru-RU").format(new Date());
  }
};

const prepareItem = (item, oldItems) => {
  item.id = oldItems.length > 0 ? Math.max(...oldItems.map((oldItem) => parseInt(oldItem.id))) + 1 : 1;
  item.date = getFormattedDate(item.date);
  return item;
};

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});

  // const [items, setItems] = useLocalStorage("data");

  useEffect(() => {
    const rawData = localStorage.getItem("data");
    if (!rawData.length) {
      localStorage.setItem("data", JSON.stringify([]));
      return;
    }

    const data = JSON.parse(rawData);

    if (data) {
      setItems(data.map(item => {
        item.date = getFormattedDate(item.date);
        return item;
      }));
    }
  }, []);

  useEffect(() => {
    if (items.length) {
      localStorage.setItem("data", JSON.stringify(items));
    }
  }, [items]);

  const addItem = (item) => {
    if (item.id) {
      setItems((oldItems) => (oldItems.map((exsitingItem) => {
        if (exsitingItem.id === item.id) {
          return { ...item };
        }

        return exsitingItem;
      })));
    } else {
      setItems((oldItems) => {
        prepareItem(item, oldItems);
        return [item, ...oldItems];
      });
    }
  };

  const deleteItem = (id) => {
    setItems((oldItems) => oldItems.filter(item => item.id !== id));
    // setSelectedItem(() => ({}));
  };

  const clearForm = () => {
    setSelectedItem({});
  };

  return (
    <UserContextProvider>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton clearForm={clearForm} />
          <JournalList items={items} setSelectedItem={setSelectedItem} />
        </LeftPanel>
        <Body>
          <JournalForm onSubmit={addItem} selectedItem={selectedItem} setSelectedItem={setSelectedItem} onItemDelete={deleteItem} />
        </Body>
      </div>
    </UserContextProvider>);
}

export default App;
