
// src/components/UserInfo.jsx
import React, { useState } from 'react'; 

function UserInfo({ initialData }) {
  const [userInfo, setUserInfo] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Implement saving logic here
    handleEdit();
  };

  return (
    <div style={{ marginLeft: "220px", padding: "20px" }}>
        <h1>User Info</h1>
      {isEditing ? (
        <div>
          <input type="text" name="name" value={userInfo.name} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <p>Name: {userInfo.name}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
