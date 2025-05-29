import React, { useState, useEffect } from 'react';

const StudentSearch = ({ studentsData, nameInputRef, onSelectStudent, resetTrigger }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);

  // Reset on external trigger
  useEffect(() => {
    setSearchTerm('');
    setFilteredStudents([]);
    setIsDropdownVisible(false);
    setHasSelected(false);
  }, [resetTrigger]);

  useEffect(() => {
    const input = searchTerm.trim().toLowerCase();

    if (!input || hasSelected) {
      setFilteredStudents([]);
      setIsDropdownVisible(false);
      return;
    }

    // Try exact match on reg no or full name
    const exactMatch = studentsData.find(student =>
      student.permanent_registration_number.toLowerCase() === input ||
      student.full_name.toLowerCase() === input
    );

    if (exactMatch) {
      handleSelect(exactMatch);
      return;
    }

    // Show "not found" if no exact match
    setFilteredStudents([{ notFound: true }]);
    setIsDropdownVisible(true);
  }, [searchTerm, studentsData, hasSelected]);

  const handleSelect = (student) => {
    setSearchTerm(student.permanent_registration_number);
    setFilteredStudents([]);
    setIsDropdownVisible(false);
    setHasSelected(true);

    if (onSelectStudent) {
      onSelectStudent(student);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filteredStudents.length > 0 && !filteredStudents[0].notFound) {
      handleSelect(filteredStudents[0]);
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setHasSelected(false);
  };

  return (
    <div style={{ margin: '0 auto', paddingTop: '40px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        background: 'white',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        marginBottom: '10px'
      }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#7F56DA"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginRight: '8px' }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          type="text"
          placeholder="Search Student by Reg No or Name...."
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={{
            border: 'none',
            outline: 'none',
            width: '100%',
            fontSize: '16px',
          }}
          ref={nameInputRef}
        />
      </div>

      {isDropdownVisible && (
        <div style={{
          background: 'white',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          maxHeight: '250px',
          overflowY: 'auto',
          padding: '10px'
        }}>
          {filteredStudents[0]?.notFound ? (
            <div style={{ padding: '8px', fontSize: '14px', color: 'red' }}>
              No student found.
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default StudentSearch;
