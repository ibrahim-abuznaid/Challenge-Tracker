import React, { useState, useEffect } from 'react';
import { getEmailLogs, clearEmailLogs } from '../utils/logger';
import './EmailLogs.css';

const EmailLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = () => {
    const emailLogs = getEmailLogs();
    setLogs(emailLogs);
  };

  const handleClearLogs = () => {
    clearEmailLogs();
    setLogs([]);
  };

  return (
    <div className="email-logs">
      <div className="logs-header">
        <h2>Email Activity Logs</h2>
        <button className="btn btn-danger" onClick={handleClearLogs}>
          Clear Logs
        </button>
      </div>
      <div className="logs-container">
        {logs.length > 0 ? (
          <table className="logs-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Action</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index}>
                  <td>{log.email}</td>
                  <td>
                    <span className={`action-badge ${log.action}`}>
                      {log.action}
                    </span>
                  </td>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-logs">No activity logs found</div>
        )}
      </div>
    </div>
  );
};

export default EmailLogs; 