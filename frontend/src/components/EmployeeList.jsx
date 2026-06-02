import React from 'react';

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <p>No employees found. Click "Add Employee" to get started.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-scroll">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td className="cell-id">#{emp.id}</td>
                <td className="cell-name">{emp.name}</td>
                <td className="cell-email">{emp.email}</td>
                <td>{emp.position}</td>
                <td>
                  <span className="dept-badge">{emp.department}</span>
                </td>
                <td className="cell-salary">
                  ${parseFloat(emp.salary).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="cell-actions">
                  <button className="btn btn-edit" onClick={() => onEdit(emp)}>
                    Edit
                  </button>
                  <button className="btn btn-delete" onClick={() => onDelete(emp.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
