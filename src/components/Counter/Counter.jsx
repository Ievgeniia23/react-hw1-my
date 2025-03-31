
import { useState } from "react";
import css from "./Counter.module.css";

const Counter = () => {
    const [count, setCount] = useState(0);

    return (
      <div className={css.counterWrapper}>
        <p>Counter: {count}</p>
        <button className={css.btnPlus} onClick={() => setCount(count + 1)}>
          +
        </button>
        <button className={css.btnMinus} onClick={() => setCount(count - 1)}>
          -
        </button>
      </div>
    );

};

export default Counter;
