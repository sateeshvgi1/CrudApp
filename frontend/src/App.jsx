import React, { useState, useEffect, useCallback } from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from './api/employeeApi';
import './App.css';

function App() {
  const [employees, setEmployees]         = useState([]);
  const [editingEmployee, setEditing]     = useState(null);
  const [showForm, setShowForm]           = useState(false);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState('');

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await getEmployees();
      setEmployees(res.data);
    } catch {
      setError('Failed to load employees. Make sure the backend server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEmployees(); }, [fetchEmployees]);

  const handleSubmit = async (formData) => {
    if (editingEmployee) {
      await updateEmployee(editingEmployee.id, formData);
    } else {
      await createEmployee(formData);
    }
    await fetchEmployees();
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (employee) => {
    setEditing(employee);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      await deleteEmployee(id);
      await fetchEmployees();
    } catch {
      setError('Failed to delete employee.');
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <h1>Employee Management</h1>
          <span className="badge">{employees.length} employees</span>
        </div>
        {!showForm && (
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Add Employee
          </button>
        )}
      </header>

      {error && (
        <div className="alert alert-error">
          {error}
          <button className="alert-close" onClick={() => setError('')}>×</button>
        </div>
      )}

      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      {loading ? (
        <div className="loading">
          <div className="spinner" />
          Loading employees...
        </div>
      ) : (
        <EmployeeList
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
