import React, { useState, useEffect } from 'react';

const EMPTY = { name: '', email: '', position: '', department: '', salary: '' };

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
  const [formData, setFormData]   = useState(EMPTY);
  const [error, setError]         = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setFormData(
      employee
        ? { name: employee.name, email: employee.email, position: employee.position,
            department: employee.department, salary: employee.salary }
        : EMPTY
    );
    setError('');
  }, [employee]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to save employee');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-card">
      <h2>{employee ? 'Edit Employee' : 'Add New Employee'}</h2>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name" name="name" type="text"
              value={formData.name} onChange={handleChange}
              placeholder="e.g. Jane Smith"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email" name="email" type="email"
              value={formData.email} onChange={handleChange}
              placeholder="e.g. jane@company.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input
              id="position" name="position" type="text"
              value={formData.position} onChange={handleChange}
              placeholder="e.g. Software Engineer"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              id="department" name="department" type="text"
              value={formData.department} onChange={handleChange}
              placeholder="e.g. Engineering"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salary (USD)</label>
            <input
              id="salary" name="salary" type="number"
              min="0" step="0.01"
              value={formData.salary} onChange={handleChange}
              placeholder="e.g. 75000"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Saving...' : employee ? 'Update Employee' : 'Add Employee'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
