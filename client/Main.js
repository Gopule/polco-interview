import React from "react";
import axios from "axios";
import RingLoader from "react-spinners/RingLoader";
import { FaPlus, FaMinus } from "react-icons/fa";

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      data: [],
      searchName: "",
      searchTag: "",
      tagTitle: {},
      isActive: [],
      tags: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.openTests = this.openTests.bind(this);
    this.closeTests = this.closeTests.bind(this);
    this.addTagFunc = this.addTagFunc.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 750);
    try {
      const res = await axios.get(
        "https://api.hatchways.io/assessment/students"
      );
      const data = res.data;
      this.setState({ data });
    } catch (err) {
      console.log(err);
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  openTests(studentId) {
    this.setState({
      isActive: [...this.state.isActive, studentId],
    });
  }

  closeTests(studentId) {
    const filteredIsActive = (arr) => {
      return arr.filter((id) => {
        if (id !== studentId) return id;
      });
    };
    this.setState({
      isActive: [...filteredIsActive(this.state.isActive)],
    });
  }

  addTagFunc() {
    this.setState({
      tags: [
        ...this.state.tags,
        {
          studentId: Object.keys(this.state.tagTitle)[0],
          title: Object.values(this.state.tagTitle)[0],
        },
      ],
      tagTitle: "",
    });
  }

  render() {
    const { handleChange, openTests, closeTests, addTagFunc } = this;
    const { loading, searchName, searchTag, data, isActive, tagTitle, tags } =
      this.state;
    const students = data.students || [];

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
                <input
                  type="text"
                  name="searchName"
                  autoComplete="off"
                  placeholder="Search by name"
                  onChange={handleChange}
                  className="search-bar"
                />
                <input
                  type="text"
                  name="searchTag"
                  autoComplete="off"
                  placeholder="Search by tag"
                  onChange={handleChange}
                  className="search-bar"
                />
                {students
                  .filter((student) => {
                    if (searchName === "" && searchTag === "") return student;
                    else {
                      const name =
                        `${student.firstName} ${student.lastName}`.toLowerCase();
                      let combinedTagNames = "";
                      tags.forEach((tagObj) => {
                        if (tagObj.studentId === student.id) {
                          combinedTagNames += tagObj.title + " ";
                        }
                      });
                      if (searchName.length && searchTag.length) {
                        if (
                          name.includes(searchName.toLowerCase()) &&
                          combinedTagNames.toLowerCase().includes(searchTag)
                        )
                          return student;
                      } else if (searchName.length && !searchTag.length) {
                        if (name.includes(searchName.toLowerCase()))
                          return student;
                      } else if (!searchName.length && searchTag.length) {
                        if (combinedTagNames.toLowerCase().includes(searchTag))
                          return student;
                      }
                    }
                  })
                  .map((student) => (
                    <>
                      <div key={student.id} className="single-student">
                        <img
                          src={student.pic}
                          alt={student.firstName}
                          className="image"
                        />
                        <div className="student-description">
                          <h2 className="student-name">
                            {student.firstName} {student.lastName}
                          </h2>
                          <p>Email: {student.email}</p>
                          <p>Company: {student.company}</p>
                          <p>Skill: {student.skill}</p>
                          <p>Average: {average(student.grades)}%</p>

                          <div
                            className="all-test"
                            style={{
                              display: isActive.includes(student.id)
                                ? "block"
                                : "none",
                            }}
                          >
                            {student.grades.map((grade, idx) => (
                              <div key={idx} className="single-grade">
                                <p>Test {idx + 1}:</p>
                                <p>{grade}%</p>
                              </div>
                            ))}
                          </div>
                          <div className="student-tags">
                            {tags.map((tagObj, idx) => {
                              if (tagObj.studentId === student.id) {
                                return (
                                  <span key={idx} className="tags">
                                    {tagObj.title}
                                  </span>
                                );
                              }
                            })}
                          </div>
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
                              this.setState({
                                tagTitle: newTitle,
                              });
                            }}
                            onKeyDown={(evt) => {
                              if (evt.key === "Enter") {
                                addTagFunc();
                              }
                            }}
                          />
                        </div>
                        {!isActive.includes(student.id) ? (
                          <FaPlus
                            className="drop-icon"
                            onClick={() => openTests(student.id)}
                          />
                        ) : (
                          <FaMinus
                            className="drop-icon"
                            onClick={() => closeTests(student.id)}
                          />
                        )}
                      </div>
                      <hr />
                    </>
                  ))}
              </div>
            ) : (
              <div>There are no students in the database.</div>
            )}
          </div>
        )}
      </div>
    );
  }
}
