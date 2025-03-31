import { useState } from "react";
import css from "./PasswordInput.module.css";

const PasswordInput = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={css.inputWrapper}>
      <input className={css.inputPassword} type={isVisible ? "text" : "password"} placeholder="input password" />
      <button className={css.btnPassword} onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide" : "Show"} password
      </button>

    </div>
  );
};
export default PasswordInput;