import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [addNew, setAddNew] = useState("");
  const [checklist, setChecklist] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/login')
    }

    axios.get('http://94.74.86.174:8080/api/checklist', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(data => {
        setChecklist(data.data.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [navigate]);

  const getAll = () => {
    axios.get('http://94.74.86.174:8080/api/checklist', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(data => {
        setChecklist(data.data.data)
      })
  }

  const handleDelete = (id) => {
    axios.delete('http://94.74.86.174:8080/api/checklist/' + id, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(data => {
        getAll()
      })
  }

  const handleAdd = () => {
    const body = {
      name: addNew
    }

    axios.post('http://94.74.86.174:8080/api/checklist', body, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(data => {
        getAll();
        setAddNew("");
      })
      .catch(err => {
        console.log(err, ' ==> ini dari add');
      })
  }

  return (
    <div>
      <p className='cursor-pointer' onClick={() => {
        localStorage.clear();
        navigate('/login');
      }}>{'<'} Logout</p>

      <h1>Checklist Name</h1>

      <input type="text" className="border px-3 py-2 mr-5" value={addNew} onChange={(e) => setAddNew(e.target.value)} />
      <button className="btn-primary px-5" onClick={() => handleAdd()}>Add</button>

      <table className="table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {checklist.map((el, i) => (
            <tr key={i}>
              <td className="w-60">{el.name}</td>
              <td className="flex gap-2">
                <button className="btn-primary px-5" onClick={() => navigate(`/items/${el.id}`)}>View</button>
                <button className="btn-danger px-3" onClick={() => handleDelete(el.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
