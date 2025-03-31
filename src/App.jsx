// import userData from "./userData.json";
import "./App.css";

// import Profile from "./components/Profile/Profile";
import s from "./App.module.css";

import { useState } from "react";
import Modal from "./components/Modal/Modal";
// import AddwaterBtn from "./components/AddWaterBtn/AddWaterBtn.jsx";
// import DailyWaterList from "./components/DailyWaterList/DailyWaterList.jsx";
import Counter from "./components/Counter/Counter.jsx";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher.jsx"
import PasswordInput from "./components/PasswordInput/PasswordInput.jsx";
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={s.wrapper}>
      <button onClick={onOpenModal} type="button">
        Open Modal
      </button>
      {isModalOpen && (
        <Modal onCloseModal={() => setIsModalOpen(false)}>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </Modal>
      )}
      {/* <AddwaterBtn /> */}
      {/* <DailyWaterList /> */}
      <Counter /> 
      <ThemeSwitcher />
      <PasswordInput />
    </div>
  );
};
export default App;

{
  /* <Profile
        name={userData.username}
        tag={userData.tag}
        location={userData.location}
        image={userData.avatar}
        stats={userData.stats}
      /> */
}

{
  /* {isModalOpen && <Modal />} */
}
