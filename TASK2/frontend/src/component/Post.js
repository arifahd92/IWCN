import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Post() {
  const [input, setInput] = useState({ title: "", content: "" });
  const [note, setNote] = useState([]);
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/post");
        if (response.status !== 200) {
          alert("something went wrong");
          return;
        }
        console.log(response.data);
        setNote(response.data);
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    };
    getNotes();
  }, []);
  const handleAddButtonClick = async () => {
    console.log("add button clicked");
    try {
      if (!input.content || !input.title) {
        alert("Title and Note can not be empty");
        return;
      }
      const response = await axios.post("http://localhost:4000/post", input);
      if (response.status === 201) {
        setNote([...note, response.data]);
        setInput({ title: "", content: "" });
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };
  const handleDelete = async (id, index) => {
    try {
      const response = await axios.delete(`http://localhost:4000/post/${id}`);
      if (response.status !== 204) {
        alert("something went wrong try again");
        return;
      }
      let copyNote = [...note];
      copyNote.splice(index, 1);
      setNote(copyNote);
    } catch (error) {}
  };
  return (
    <div>
      <div className="container-fluid  ">
        <div className="row bg-black ps-1 p-2 text-white display-6">NOTES</div>
      </div>
      <div
        className=" container-fluid bg-primary"
        style={{ minHeight: "100vh" }}>
        <div className="row bg-primary d-flex justify-content-center ">
          <div className=" col-12 col-md-4 col-sm-6   mt-3 mb-2">
            <div className="input-group">
              <input
                required
                className="form-control"
                id="title"
                name="title"
                placeholder="Enter Title "
                value={input.title}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className=" col-12 col-md-4 col-sm-6   mt-3 mb-2">
            <div className="input-group">
              <input
                required
                className="form-control"
                id="content"
                name="content"
                placeholder="Enter Note "
                value={input.content}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-auto mt-3  mb-2 me-2">
            <button className="btn btn-danger" onClick={handleAddButtonClick}>
              add
            </button>
          </div>
        </div>
        <div className="row bg-primary  ">
          {note.map((item, index) => {
            return (
              <>
                <div className="col-md-4 col-sm-6 col-lg-3" key={item.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">{item.content}</p>
                      <p className="text-muted">{item.createdAt}</p>

                      <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={() => handleDelete(item.id, index)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-trash"
                          viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
