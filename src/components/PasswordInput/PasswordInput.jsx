import { useState } from "react";

const PasswordInput = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <input type={isVisible ? "text" : "password"} placeholder="input password" />
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide" : "Show"} password
      </button>

    </div>
  );
};
export default PasswordInput;