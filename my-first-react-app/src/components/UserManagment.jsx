import { useState } from 'react';

export default function UserManagment() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Danny Flores',
      email: 'danny@gmail.com',
      role: 'Admin',
      active: true,
    },
    {
      id: 2,
      name: 'Maria Garcia',
      email: 'maria@example.com',
      role: 'User',
      active: true,
    },
    {
      id: 3,
      name: 'Carlos Lopez',
      email: 'carlos@example.com',
      role: 'Moderator',
      active: false,
    },
    {
      id: 4,
      name: 'Ana Martinez',
      email: 'ana@example.com',
      role: 'User',
      active: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'all' || user.role === roleFilter;

    const matchesActive =
      activeFilter === 'all' ||
      (activeFilter === 'active' && user.active) ||
      (activeFilter === 'inactive' && !user.active);

    return matchesSearch && matchesRole && matchesActive;
  });

  const toggleUserStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const roleCounts = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="user-management">
      <h3>👥 User Management</h3>

      {/* Search and Filters */}
      <div className="management-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Moderator">Moderator</option>
            <option value="User">User</option>
          </select>

          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      {/* Conditional Rendering - Results Message */}
      <div className="results-info">
        <p>
          Showing {filteredUsers.length} of {users.length} users
          {searchTerm && ` matching "${searchTerm}"`}
          {roleFilter !== 'all' && ` with role "${roleFilter}"`}
          {activeFilter !== 'all' && ` that are ${activeFilter}`}
        </p>
      </div>
      {/* Conditional Rendering - Results Message */}
      {filteredUsers.length === 0 ? (
        <div className="empty-state">
          <h4>No users found</h4>
          <p>Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="users-table">
          <div className="table-header">
            <span>User</span>
            <span>Email</span>
            <span>Role</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`user-row ${user.active ? '' : 'inactive'}`}
            >
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
              <span className={`user-role ${user.role.toLowerCase()}`}>
                {user.role}
              </span>
              <span
                className={`user-status ${user.active ? 'active' : 'inactive'}`}
              >
                {user.active ? 'Active' : 'Inactive'}
              </span>
              <div className="user-actions">
                <button
                  onClick={() => toggleUserStatus(user.id)}
                  className={`btn btn-small ${
                    user.active ? 'btn-warning' : 'btn-success'
                  }`}
                >
                  {user.active ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="btn btn-small btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Statistics */}
      <div className="managment-stats">
        <h4>User Statistics</h4>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">{users.length}</span>
            <span className="stat-label">Total Users</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {users.filter((u) => u.active).length}
            </span>
            <span className="stat-label">Active Users</span>
          </div>
          {Object.entries(roleCounts).map(([role, count]) => (
            <div key={role} className="stat-item">
              <span className="stat-number">{count}</span>
              <span className="stat-label">{role}s</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
