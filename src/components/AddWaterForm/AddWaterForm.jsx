import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// import React, { useState } from "react";

import { useForm } from "react-hook-form";
import SaveButton from "../SaveButton/SaveButton.jsx";
import icons from "../../assets/sprite.svg";
import s from "./AddWaterForm.module.css";
import Modal from "../Modal/Modal.jsx";

const AddWaterForm = ({ onCloseModal }) => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: { waterUsed: 50, recordingTime: "" },
  });

  const waterAmount = watch("waterUsed");
  const [timeValue, setTimeValue] = useState("");

  useEffect(() => {
    const now = new Date();
    const formattedTime = now.toTimeString().slice(0, 5);
    setTimeValue(formattedTime);
    setValue("recordingTime", formattedTime);
  }, [setValue]);

  const handleChangeTime = (event) => {
    let inputTime = event.target.value;
    const timePattern = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/;
    if (timePattern.test(inputTime)) {
      setTimeValue(inputTime);
      setValue("recordingTime", inputTime);
    }
  };

  const handleWaterAmountChange = (event) => {
    let value = event.target.value;
    // Проверка на пустое значение
    if (value === "") {
      setValue("waterUsed", 0);
      return;
    }


    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    if (/^\d+$/.test(value) && Number(value) <= 5000) {
      setValue("waterUsed", Number(value));
    }
    
    // else if (value === "") {
    //   setValue("waterUsed", 0);
    // }
  };

  // const onSubmit = (data) => {
  //   const validatedAmount = Math.min(5000, data.waterUsed);
  //   setValue("waterUsed", validatedAmount);


  const onSubmit = async (data) => {
    try {
      const validatedAmount = Math.min(5000, data.waterUsed);
      setValue("waterUsed", validatedAmount);

      await toast.promise(
        new Promise((resolve) => setTimeout(resolve, 1000)), // Симуляция асинхронной операции
        {
          loading: "Saving water data...",
          success: <b>Water added successfully!</b>,
          error: <b>Failed to add water.</b>,
        }
      );

      onCloseModal();
    } catch (error) {
      toast.error("Something went wrong!");
    }



    // onCloseModal();
  };

  const handleClickMinus = (event) => {
    event.preventDefault();
    setValue("waterUsed", Math.max(50, waterAmount - 50));
  };

  const handleClickPlus = (event) => {
    event.preventDefault();
    setValue("waterUsed", Math.min(5000, waterAmount + 50));
  };
  

  return (
    <Modal onCloseModal={onCloseModal}>
      <div className={s.container}>
        <h3 className={s.title}>Add water</h3>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <p className={s.text}>Choose a value:</p>
          <p className={s.label}>Amount of water:</p>
          <div className={s.water_controls}>
            <button
              type="button"
              className={s.water_btn}
              onClick={handleClickMinus}
              disabled={waterAmount <= 50}
            >
              <svg className={s.icon}>
                <use href={icons + "#icon-minus"} />
              </svg>
            </button>

            <p className={s.water_display}>{`${waterAmount} ml`}</p>

            <button
              type="button"
              className={s.water_btn}
              onClick={handleClickPlus}
              disabled={waterAmount >= 5000}
            >
              <svg className={s.icon}>
                <use href={icons + "#icon-plus"} />
              </svg>
            </button>
          </div>

          <label className={s.label} htmlFor="time">
            Recording time:
          </label>
          <input
            id="time"
            name="recordingTime"
            className={s.input}
            value={timeValue}
            placeholder="--:--"
            onChange={handleChangeTime}
            inputMode="numeric"
            maxLength={5}
          />

          <label className={s.amount} htmlFor="yourInput">
            Enter the value of the water used:
          </label>
          <input
            id="yourInput"
            name="yourInput"
            className={s.input}
            {...register("waterUsed")}
            onChange={handleWaterAmountChange}
            value={waterAmount}
            maxLength={4}
            type="number"
          />
          <SaveButton />
        </form>
      </div>
    </Modal>
  );
};


export default AddWaterForm;

// import { useForm } from "react-hook-form";
// import { useState, useEffect } from "react";
// import SaveButton from "../SaveButton/SaveButton.jsx";
// import Modal from "../Modal/Modal.jsx";
// import s from "./AddWater.module.css";

// const AddWater = ({ onCloseModal }) => {
//   const { register, handleSubmit, setValue } = useForm();
//   const [waterAmount, setWaterAmount] = useState(50);

//   useEffect(() => {
//     const now = new Date();
//     const formattedTime = now.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     setValue("recordingTime", formattedTime); // Устанавливаем время в форму
//     setValue("waterUsed", 50); // Дефолтное значение воды
//   }, [setValue]);

//   const increaseWater = () => {
//     setWaterAmount((prev) => prev + 50);
//     setValue("waterUsed", waterAmount + 50);
//   };

//   const decreaseWater = () => {
//     setWaterAmount((prev) => (prev > 0 ? prev - 50 : 0));
//     setValue("waterUsed", waterAmount > 0 ? waterAmount - 50 : 0);
//   };

//   const onSubmit = (data) => {
//     console.log("Submitted data:", data);
//     onCloseModal();
//   };

//   return (
//     <Modal onCloseModal={onCloseModal}>
//       <form onSubmit={handleSubmit(onSubmit)} className={s.container}>
//         <h3>Add water</h3>

//         <p>Choose a value:</p>

//         <div className={s.water_controls}>

//         <button
//             type="button"
//             onClick={decreaseWater}
//             className={s.water_btn}
//           >-

//         </button>
//           <span className={s.water_display}>{waterAmount} ml</span>

//         <button
//             type="button"
//             onClick={increaseWater}
//             className={s.water_btn}
//           >+
//           </button>
//         </div>

//         <label>Recording time:</label>
//         <input type="text" {...register("recordingTime")} readOnly />

//         <label>Enter the value of the water used:</label>
//         <input type="number" {...register("waterUsed")} defaultValue={50} />

//         <SaveButton />
//       </form>
//     </Modal>
//   );
// };

// export default AddWater;

// // import { useForm } from "react-hook-form";
// // import SaveButton from "../SaveButton/SaveButton.jsx"
// // import Modal from "../Modal/Modal.jsx"

// // const AddWater = ({ onCloseModal }) => {
// //     const { register, handleSubmit } = useForm();

// //   return (
// //     <Modal onCloseModal={onCloseModal}>
// //       <form>
// //         <h3>Choose a value</h3>
// //         <p>Amount of water</p>

// //         <button type="button"></button>
// //         <button type="button"></button>
// //         <button type="button"></button>
// //         <input type="number" />

// //         <input type="number" />
// //         <input
// //           type="number"
// //           {...register("waterAmount")}
// //           placeholder="Enter amount"
// //         />
// //         <SaveButton />
// //       </form>
// //     </Modal>
// //   );
// // }

// // export default AddWater

// // Первый пул риквест по этому компоненту

// // import { useForm } from "react-hook-form";
// // import { useState, useEffect } from "react";
// // import SaveButton from "../SaveButton/SaveButton.jsx";
// // import Modal from "../Modal/Modal.jsx";
// // import s from "./AddWater.module.css";

// // const AddWater = ({ onCloseModal }) => {
// //   const { register, handleSubmit, setValue } = useForm();
// //   const [waterAmount, setWaterAmount] = useState(50);

// //   useEffect(() => {
// //     const now = new Date();
// //     const formattedTime = now.toLocaleTimeString([], {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });
// //     setValue("recordingTime", formattedTime);
// //     setValue("waterUsed", 50);
// //   }, [setValue]);

// //   const increaseWater = () => {
// //     setWaterAmount((prev) => prev + 50);
// //     setValue("waterUsed", waterAmount + 50);
// //   };

// //   const decreaseWater = () => {
// //     setWaterAmount((prev) => (prev > 0 ? prev - 50 : 0));
// //     setValue("waterUsed", waterAmount > 0 ? waterAmount - 50 : 0);
// //   };

// //   const onSubmit = (data) => {
// //     console.log("Submitted data:", data);
// //     onCloseModal();
// //   };

// //   return (
// //     <Modal onCloseModal={onCloseModal}>
// //       <form onSubmit={handleSubmit(onSubmit)} className={s.container}>
// //         <h3 className={s.title}>Add water</h3>

// //         <p className={s.text}>Choose a value:</p>

// //         <div className={s.water_controls}>

// //         <button
// //             type="button"
// //             onClick={decreaseWater}
// //             className={s.water_btn}
// //           >-

// //         </button>
// //           <span className={s.water_display}>{waterAmount} ml</span>

// //         <button
// //             type="button"
// //             onClick={increaseWater}
// //             className={s.water_btn}
// //           >+
// //           </button>
// //         </div>

// //         <label>Recording time:</label>
// //         <input type="text" {...register("recordingTime")} readOnly />

// //         <label>Enter the value of the water used:</label>
// //         <input type="number" {...register("waterUsed")} defaultValue={50} />

// //         <SaveButton />
// //       </form>
// //     </Modal>
// //   );
// // };

// // export default AddWater;



// форма с логикой отправки на сервер
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { toast } from "react-hot-toast";
// import { addWaterEntry } from "../../redux/waterSlice"; заменить на мои данные
// import SaveButton from "../SaveButton/SaveButton.jsx";
// import icons from "../../assets/sprite.svg";
// import s from "./AddWaterForm.module.css";
// import Modal from "../Modal/Modal.jsx";

// const AddWaterForm = ({ onCloseModal }) => {
//   const dispatch = useDispatch();
//   const { register, handleSubmit, setValue, watch } = useForm({
//     defaultValues: { waterUsed: 50, recordingTime: "" },
//   });

//   const waterAmount = watch("waterUsed");
//   const [timeValue, setTimeValue] = useState("");

//   useEffect(() => {
//     const now = new Date();
//     const formattedTime = now.toTimeString().slice(0, 5);
//     setTimeValue(formattedTime);
//     setValue("recordingTime", formattedTime);
//   }, [setValue]);

//   const handleChangeTime = (event) => {
//     let inputTime = event.target.value;
//     const timePattern = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/;
//     if (timePattern.test(inputTime)) {
//       setTimeValue(inputTime);
//       setValue("recordingTime", inputTime);
//     }
//   };

//   const handleWaterAmountChange = (event) => {
//     let value = event.target.value;
//     if (value.length > 4) {
//       value = value.slice(0, 4);
//     }
//     if (/^\d+$/.test(value) && Number(value) <= 5000) {
//       setValue("waterUsed", Number(value));
//     } else if (value === "") {
//       setValue("waterUsed", 0);
//     }
//   };

//   const onSubmit = async (data) => {
//     const validatedAmount = Math.min(5000, data.waterUsed);
//     setValue("waterUsed", validatedAmount);

//     toast.promise(
//       dispatch(addWaterEntry({ ...data, waterUsed: validatedAmount })).unwrap(),
//       {
//         loading: "Saving water data...",
//         success: <b>Water data saved successfully!</b>,
//         error: <b>Error: failed to save water data!</b>,
//       }
//     );

//     onCloseModal();
//   };

//   const handleClickMinus = (event) => {
//     event.preventDefault();
//     setValue("waterUsed", Math.max(50, waterAmount - 50));
//   };

//   const handleClickPlus = (event) => {
//     event.preventDefault();
//     setValue("waterUsed", Math.min(5000, waterAmount + 50));
//   };

//   return (
//     <Modal onCloseModal={onCloseModal}>
//       <div className={s.container}>
//         <h3 className={s.title}>Add water</h3>
//         <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
//           <p className={s.text}>Choose a value:</p>
//           <p className={s.label}>Amount of water:</p>
//           <div className={s.water_controls}>
//             <button
//               type="button"
//               className={s.water_btn}
//               onClick={handleClickMinus}
//               disabled={waterAmount <= 50}
//             >
//               <svg className={s.icon}>
//                 <use href={icons + "#icon-minus"} />
//               </svg>
//             </button>

//             <p className={s.water_display}>{`${waterAmount} ml`}</p>

//             <button
//               type="button"
//               className={s.water_btn}
//               onClick={handleClickPlus}
//               disabled={waterAmount >= 5000}
//             >
//               <svg className={s.icon}>
//                 <use href={icons + "#icon-plus"} />
//               </svg>
//             </button>
//           </div>

//           <label className={s.label} htmlFor="time">
//             Recording time:
//           </label>
//           <input
//             id="time"
//             name="recordingTime"
//             className={s.input}
//             value={timeValue}
//             placeholder="--:--"
//             onChange={handleChangeTime}
//             inputMode="numeric"
//             maxLength={5}
//           />

//           <label className={s.amount} htmlFor="yourInput">
//             Enter the value of the water used:
//           </label>
//           <input
//             id="yourInput"
//             name="yourInput"
//             className={s.input}
//             {...register("waterUsed")}
//             onChange={handleWaterAmountChange}
//             value={waterAmount}
//             maxLength={4}
//             type="number"
//           />
//           <SaveButton />
//         </form>
//       </div>
//     </Modal>
//   );
// };

// export default AddWaterForm;


