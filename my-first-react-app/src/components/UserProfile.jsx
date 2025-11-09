import { useState } from 'react';

export default function UserProfile() {
  const [user, setUser] = useState({
    name: 'Danny Flores',
    email: 'danny@gmail.com',
    age: 27,
    bio: 'Learning React',
    isOnline: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(user);

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm(user);
  };

  const handleSave = () => {
    setUser(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm(user);
  };

  const handleInputChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleOnlineStatus = () => {
    setUser((prev) => ({
      ...prev,
      isOnline: !prev.isOnline,
    }));
  };

  return (
    <div className="user-profile">
      <h3>👤 User Profile</h3>

      {!isEditing ? (
        // Vista de perfil
        <div className="profile-view">
          <div className="profile-header">
            <span className={`status ${user.isOnline ? 'online' : 'offline'}`}>
              {user.isOnline ? '🟢 Online' : '🔴 Offline'}
            </span>
            <button onClick={toggleOnlineStatus} className="btn btn-small">
              {user.isOnline ? 'Go Offline' : 'Go Online'}
            </button>
          </div>

          <div className="profile-info">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Age:</strong> {user.age}
            </p>
            <p>
              <strong>Bio:</strong> {user.bio}
            </p>
          </div>

          <button onClick={handleEdit} className="btn btn-primary">
            ✏️ Edit Profile
          </button>
        </div>
      ) : (
        <div className="profile-edit">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => handleInputChange(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={editForm.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              value={editForm.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
            />
          </div>

          <div className="Edit-actions">
            <button onClick={handleSave} className="btn btn-success">
              💾 Save
            </button>
            <button onClick={handleCancel} className="btn btn-secodary">
              💾 Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
