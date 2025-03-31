import { useState } from "react";

const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <div
      style={{
        background: isDark ? "black" : "white",
        color: isDark ? "white" : "black",
        width: "800px",
        padding: "20px",
      }}
    >
      <p>Theme:{isDark ? "Dark" : "Light"} </p>
      <button onClick={() => setIsDark(!isDark)}>Switch the theme</button>
    </div>
  );

};
export default ThemeSwitcher;
