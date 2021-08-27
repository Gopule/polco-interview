import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const Accordian = ({ isActive, setIsActive, student }) => {
  return (
    <div className="drop-icon-container">
      {!isActive.includes(student.id) ? (
        <FaPlus
          className="drop-icon"
          onClick={() => setIsActive([...isActive, student.id])}
        />
      ) : (
        <FaMinus
          className="drop-icon"
          onClick={() => {
            const filteredIsActive = (arr) => {
              return arr.filter((id) => {
                if (id !== student.id) return id;
              });
            };
            setIsActive([...filteredIsActive(isActive)]);
          }}
        />
      )}
    </div>
  );
};

export default Accordian;
