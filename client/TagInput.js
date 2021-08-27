import React from "react";

const TagInput = ({ tagTitle, setTagTitle, setTags, tags, student }) => {
  return (
    <input
      type="text"
      name="tagTitle"
      autoComplete="off"
      placeholder="Add a tag"
      className="add-tag"
      value={tagTitle[student.id] || ""}
      onChange={(event) => {
        let newTitle = { ...tagTitle };
        newTitle[student.id] = event.target.value;
        setTagTitle(newTitle);
      }}
      onKeyDown={(evt) => {
        if (evt.key === "Enter") {
          setTags([
            ...tags,
            {
              studentId: Object.keys(tagTitle)[0],
              title: Object.values(tagTitle)[0],
            },
          ]);
          setTagTitle("");
        }
      }}
    />
  );
};

export default TagInput;
