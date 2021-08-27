import React from "react";

const Tags = ({ tags, student }) => {
  return (
    <div className="student-tags">
      {tags.map((tagObj, idx) =>
        tagObj.studentId === student.id ? (
          <span key={idx} className="tags">
            {tagObj.title}
          </span>
        ) : (
          <div key={idx} />
        )
      )}
    </div>
  );
};

export default Tags;
