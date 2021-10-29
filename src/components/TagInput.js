import React from "react";

const TagInput = ({ tagTitle, setTagTitle, setTags, tags, student }) => {
  return (
    <input
      type="text"
      name="tagTitle"
      autoComplete="off"
      placeholder="Add a tag"
      className="add-tag"
      value={tagTitle.id === student.id ? tagTitle.title : ""}
      onChange={(event) => {
        const studentsTagTitle = { ...tagTitle };
        studentsTagTitle.id = student.id;
        studentsTagTitle.title = event.target.value;
        setTagTitle(studentsTagTitle);
      }}
      onKeyDown={(evt) => {
        if (evt.key === "Enter") {
          setTags([
            ...tags,
            {
              studentId: tagTitle.id,
              title: tagTitle.title,
            },
          ]);
          setTagTitle({ id: "", title: "" });
        }
      }}
    />
  );
};

export default TagInput;
