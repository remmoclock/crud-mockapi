import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [tabledark, setTableDark] = useState("");

  const fetchData = async () => {
    await axios
      .get(`https://62f9816f3eab3503d1e5524f.mockapi.io/test`)
      .then((res) => {
        const persons = res.data;
        setData(persons);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://62f9816f3eab3503d1e5524f.mockapi.io/test/${id}`)
      .then(() => {
        fetchData();
      });
  };

  const setToLocalStorage = (id, name, email, phone, avatar) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("avatar", avatar);
  };

  return (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          onClick={() => {
            if (tabledark === "table-dark") setTableDark("");
            else setTableDark("table-dark");
          }}
        />
      </div>
      <div className="d-flex justify-content-between m-2">
        <h2>Read Operation</h2>
        <Link to="/">
          <button className="btn btn-primary">Create</button>
        </Link>
      </div>
      <table className={`table ${tabledark}`}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Avatar</th>
            <th scope="col">Phone</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        {data?.map((eachData) => {
          return (
            <>
              <tbody key={eachData.id}>
                <tr>
                  <th scope="row">{eachData.id}</th>
                  <td>{eachData.name}</td>
                  <td>
                    <img src={eachData.avatar} alt="" />
                  </td>
                  <td>{eachData.phone}</td>

                  <td>
                    <Link to="/update">
                      <button
                        className="btn-success"
                        onClick={() =>
                          setToLocalStorage(
                            eachData.id,
                            eachData.name,
                            eachData.email,
                            eachData.phone,
                            eachData.avatar
                          )
                        }
                      >
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button className="btn-danger" onClick={handleDelete(eachData.id)}>Delete</button>
                  </td>
                </tr>
              </tbody>
            </>
          );
        })}
      </table>
    </>
  );
};

export default Read;
