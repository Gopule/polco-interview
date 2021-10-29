import React, { useState, useEffect } from "react";
import axios from "axios";
import RingLoader from "react-spinners/RingLoader";
import SearchBar from "./components/SearchBar";
import StudentDetails from "./components/StudentDetails";
import StudentsTests from "./components/StudentsTests";
import Tags from "./components/Tags";
import TagInput from "./components/TagInput";
import Accordian from "./components/Accordian";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [tagTitle, setTagTitle] = useState({ id: "", title: "" });
  const [isActive, setIsActive] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 750);
    const getData = async () => {
      const res = await axios.get(
        "https://api.hatchways.io/assessment/students"
      );
      const data = res.data.students;
      setStudents(data);
    };
    getData();
  }, []);

  const average = (arr) => {
    return (
      arr.reduce((accum, cv) => {
        return accum + Number(cv);
      }, 0) / arr.length
    );
  };

  return (
    <div>
      {loading ? (
        <div id="load-spinner">
          <RingLoader
            color="#61DBFB"
            loading={loading}
            size={150}
            speedMultiplier={1.25}
          />
        </div>
      ) : (
        <div id="main">
          {students.length > 0 ? (
            <div className="all-students">
              <SearchBar
                setSearchName={setSearchName}
                setSearchTag={setSearchTag}
              />
              {students
                .filter((student) => {
                  const name =
                    `${student.firstName} ${student.lastName}`.toLowerCase();
                  let combinedTagNames = "";
                  tags.forEach((tagObj) => {
                    if (tagObj.studentId === student.id) {
                      combinedTagNames += tagObj.title + " ";
                    }
                  });
                  const nameSearch = name.includes(searchName.toLowerCase());
                  const tagSearch = combinedTagNames
                    .toLowerCase()
                    .includes(searchTag.toLowerCase());

                  if (searchName.length && searchTag.length) {
                    if (nameSearch && tagSearch) return student;
                  } else if (searchName.length && !searchTag.length) {
                    if (nameSearch) return student;
                  } else if (!searchName.length && searchTag.length) {
                    if (tagSearch) return student;
                  } else return student;
                })
                .map((student) => (
                  <div key={student.id}>
                    <div className="single-student">
                      <img
                        src={student.pic}
                        alt={student.firstName}
                        className="image"
                      />
                      <div className="student-description">
                        <StudentDetails average={average} student={student} />

                        <StudentsTests student={student} isActive={isActive} />

                        <Tags tags={tags} student={student} />

                        <TagInput
                          student={student}
                          tagTitle={tagTitle}
                          tags={tags}
                          setTagTitle={setTagTitle}
                          setTags={setTags}
                        />
                      </div>

                      <Accordian
                        student={student}
                        setIsActive={setIsActive}
                        isActive={isActive}
                      />
                    </div>
                    <hr />
                  </div>
                ))}
            </div>
          ) : (
            <div>There are no students in the database.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
