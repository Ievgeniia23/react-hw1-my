import { useState } from "react";
import css from "./ThemeSwitcher.module.css"

const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={css.switcherWrapper}
      style={{
        background: isDark ? "black" : "white",
        color: isDark ? "white" : "black",
        width: "800px",
             }}
    >
      <p>Theme: {isDark ? "Dark" : "Light"} </p>
      <button className={css.btnSwitcher} onClick={() => setIsDark(!isDark)}>Switch the theme</button>
    </div>
  );

};
export default ThemeSwitcher;
