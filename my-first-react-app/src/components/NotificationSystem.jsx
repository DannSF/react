import { useState } from 'react';

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      message: ' Your profile has been updated successfully',
      read: false,
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    },
    {
      id: 2,
      type: 'error',
      message: 'Failed to save changes. Please try again.',
      read: true,
      timestamp: new Date(Date.now() - 600000), // 10 minutes ago
    },
    {
      id: 3,
      type: 'warning',
      message: 'Your storage is almost full (85% used)',
      read: false,
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    },
    {
      id: 4,
      type: 'info',
      message: 'New feature available! Check out the updated dashboard.',
      read: false,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    },
  ]);

  const [showType, setShowType] = useState('all'); //All, read, unread

  // Filter notifications based on type
  const filteredNotifications = notifications.filter((notification) => {
    if (showType === 'unread') return !notification.read;
    if (showType === 'read') return notification.read;
    return true;
  });

  // Mark notification as read
  const masrkAsRead = (id) =>
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );

  // Mark all as read
  const markAllAsRead = () =>
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );

  // Delete notification

  const deleteNotification = (id) =>
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );

  // Add sample notification
  const addSampleNotification = (type) => {
    const message = {
      success: 'Operation completed successfully!',
      error: 'Something went wrong, Please try again.',
      warning: 'Plese check your settings.',
      info: 'Here is some important information',
    };

    const newNotification = {
      id: crypto.randomUUID(),
      type,
      message: message[type],
      read: false,
      timestamp: new Date(),
    };

    setNotifications([newNotification, ...notifications]);
  };

  // Get unread count
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  // Format timestamp
  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;

    return timestamp.toLocateDateString();
  };

  return (
    <div className="notification-system">
      <h3> Notofication System</h3>
      <div className="notification controls">
        <div className="control-group">
          <span className="unread-badge">
            {unreadCount} unread{' '}
            {unreadCount === 1 ? 'notification' : 'notifications'}
          </span>
          <select
            value={showType}
            onChange={(e) => setShowType(e.target.value)}
          >
            <option value="all">All Notifications</option>
            <option value="unread">Unread Only</option>
            <option value="read">Read Only</option>
          </select>

          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="btn btn-primary">
              Mark all as read
            </button>
          )}
        </div>

        <div className="sample-notifications">
          <span>Add sample:</span>
          <button
            onClick={() => addSampleNotification('success')}
            className="btn btn-success btn-small"
          >
            Success
          </button>
          <button
            onClick={() => addSampleNotification('error')}
            className="btn btn-error btn-small"
          >
            Error
          </button>
          <button
            onClick={() => addSampleNotification('warning')}
            className="btn btn-warning btn-small"
          >
            Warning
          </button>
          <button
            onClick={() => addSampleNotification('info')}
            className="btn btn-info btn-small"
          >
            Info
          </button>
        </div>
      </div>

      {filteredNotifications.length === 0 ? (
        <div className="empty-state">
          <h4>🎉 No notifications</h4>
          <p>
            {showType === 'unread'
              ? "You're all caught up! No unread notifications."
              : showType === 'read'
              ? 'No read notifications found.'
              : 'No notifications to display.'}
          </p>
        </div>
      ) : (
        <div className="notifications-list">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${notification.type} ${
                notification.read ? 'read' : 'unread'
              }`}
            >
              <div className="notification-icon">
                {notification.type === 'success' && '✅'}
                {notification.type === 'error' && '❌'}
                {notification.type === 'warning' && '⚠️'}
                {notification.type === 'info' && 'ℹ️'}
              </div>
              <div className="notification-content">
                <p className="notification-message">{notification.message}</p>
                <span className="notification-time">
                  {formatTime(notification.timestamp)}
                </span>
              </div>
              <div className="notification-actions">
                {!notification.read && (
                  <button
                    onClick={() => masrkAsRead(notification.id)}
                    className="btn btn-small btn-primary"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="btn btn-small btn-danger"
                >
                  🗑️
                </button>
              </div>
              {!notification.read && <div className="unread-indicator"></div>}
            </div>
          ))}
        </div>
      )}

      <div className="notification-stats">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">{notifications.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{unreadCount}</span>
            <span className="stat-label">Unread</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {notifications.filter((n) => n.type === 'success').length}
            </span>
            <span className="stat-label">Success</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {notifications.filter((n) => n.type === 'error').length}
            </span>
            <span className="stat-label">Errors</span>
          </div>
        </div>
      </div>
    </div>
  );
}
