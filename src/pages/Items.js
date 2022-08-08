import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Items() {
  const [items, setItems] = useState([]);
  const [addNewItem, setAddNewItem] = useState("");
  const [showRename, setShowRename] = useState(false);
  const [rename, setRename] = useState("");
  const [item, setItem] = useState(null);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {

    axios.get(`http://94.74.86.174:8080/api/checklist/${id}/item`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(data => {
        setItems(data.data.data);
      })
      .catch(err => {
        console.log(err, " ==> ini dari items");
      })
  }, [id])

  const getAll = () => {
    axios.get(`http://94.74.86.174:8080/api/checklist/${id}/item`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(data => {
        setItems(data.data.data);
      })
      .catch(err => {
        console.log(err, ' ==> error dari getall');
      })
  }

  const handleDelete = (idItem) => {
    axios.delete(`http://94.74.86.174:8080/api/checklist/${id}/item/${idItem}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(data => {
        getAll()
      })
  }

  const handleAdd = () => {
    const body = {
      itemName: addNewItem
    }

    axios.post(`http://94.74.86.174:8080/api/checklist/${id}/item`, body, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(data => {
        setAddNewItem("");
        getAll()
      })
      .catch(err => {
        console.log(err, " ==> ini dari add item");
      })
  }

  const handleStatus = (idItem) => {

    axios.put(`http://94.74.86.174:8080/api/checklist/${id}/item/${idItem}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(data => {
        getAll()
      })
      .catch(err => {
        console.log(err, " ==> ini dari update status");
      })
  }

  const handleRename = (idItem) => {
    const body = {
      itemName: rename
    }
    axios.put(`http://94.74.86.174:8080/api/checklist/${id}/item/rename/${idItem}`, body, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(data => {
        setShowRename(false);
        setRename("");
        setItem(null)
        getAll()
      })
      .catch(err => {
        console.log(err, ' ==> eror dari rename');
      })
  }

  return (
    <div>
      <p className='cursor-pointer' onClick={() => navigate('/')}>{'<'} Back</p>
      <input type="text" className="border px-3 py-2 mr-5" value={addNewItem} onChange={(e) => setAddNewItem(e.target.value)} />
      <button className='btn-primary px-3' onClick={() => handleAdd()}>Add Item</button>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((el, i) => (
            <tr key={i}>
              <td className="w-60">{el.name}</td>
              <td>
                <input type="checkbox" checked={el.itemCompletionStatus} onChange={() => handleStatus(el.id)} />
              </td>
              <td className="flex gap-2">
                <button className="btn-warning px-5" onClick={() => {
                  setShowRename(true);
                  setRename(el.name);
                  setItem(el)
                }}>Edit</button>
                <button className="btn-danger px-3" onClick={() => handleDelete(el.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showRename ? (
        <div>
          <input type="text" className="border px-3 py-2 mr-5" value={rename} onChange={(e) => setRename(e.target.value)} />
          <button className='btn-primary px-3' onClick={() => handleRename(item.id)}>Save</button>
        </div>
      ) : ('')}
    </div>
  )
}

export default Items
