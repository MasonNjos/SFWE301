import './styles/StudentPage.css';
import React, { useEffect, useState } from 'react';

function StudentPage(){
  const [searchQuery, setSearchQuery] = useState('');
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  useEffect(() => {
    const fetchScholarships = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:8080/api/scholarships');
        if (!res.ok) throw new Error('Failed to load scholarships');
        const data = await res.json();
        const normalized = data.map((s, idx) => ({
          id: s.id || idx+1,
          name: s.name || '',
          status: (s.status || '').toLowerCase(),
          amount: s.amount || '',
          deadline: s.deadline || '',
          major: s.major || '',
          gpa: s.gpa || '',
          year: s.year || ''
        }));
        setScholarships(normalized);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();
    // fetch students as well
    const fetchStudents = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/students');
        if (!res.ok) throw new Error('Failed to load students');
        const data = await res.json();
        // normalize: give each an id
        const normalized = data.map((s, idx) => ({
          id: s.id || idx+1,
          firstName: s.firstName || s.first || '',
          lastName: s.lastName || s.last || s.lastName || '',
          major: s.major || '',
          gpa: s.gpa || '' ,
          year: s.year || '',
          // student.csv 'score' column may be named score, match, or matchScore
          score: s.score ?? s.match ?? s.matchScore ?? s.scoreValue ?? ''
        }));
        setStudents(normalized);
        if(normalized.length>0) setSelectedStudentId(normalized[0].id);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudents();
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSearchSubmit = (e) => e.preventDefault();

  const filteredScholarships = scholarships.filter(scholarship =>
    scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (scholarship.amount || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (scholarship.deadline || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (scholarship.status || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // selected student object
  const selectedStudent = students.find(s => String(s.id) === String(selectedStudentId));
  //TODO: matchRate should execute java backend to get real match rate
  const matchRate = selectedStudent && selectedStudent.score !== '' && selectedStudent.score != null
    ? (isNaN(parseFloat(selectedStudent.score)) ? String(selectedStudent.score) : Math.round(parseFloat(selectedStudent.score)))
    : null;

  return (
    <div className="App">
      <main className='content'>
        <p><strong>Welcome to Scholar Cats!</strong></p>
        <p>Explore Scholarships tailored to your goals and achievements</p>
        {/* Student selector */}
        <div style={{margin: '12px 0'}}>
          <label htmlFor="student-select" style={{marginRight:8}}>Viewing as:</label>
          <select id="student-select" value={selectedStudentId} onChange={e => setSelectedStudentId(e.target.value)}>
            {students.length === 0 && <option value="">(No students)</option>}
            {students.map(s => (
              <option key={s.id} value={s.id}>{s.firstName} {s.lastName} — {s.major} (GPA: {s.gpa})</option>
            ))}
          </select>
        </div>

        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            id="search-input"
            placeholder='Search Scholarships...'
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>

        {loading && <div style={{marginTop: '8px'}}>Loading scholarships…</div>}
        {error && <div style={{marginTop: '8px', color: 'red'}}>Error: {error}</div>}

        <div className="Top-Horziontal-Boxes">
          <div className="Top-Box">Total Available
            <p>{scholarships.length}</p>
          </div>
          <div className="Top-Box">Your Applications
            <p>0</p>
          </div>
          <div className="Top-Box">Match Rate
            <p>{selectedStudent ? `${matchRate}%` : '—'}</p>
          </div>
        </div>

        <p>Available Scholarships {searchQuery && `(${filteredScholarships.length} results)`}</p>

        <div className="Scholarship-list">
          {filteredScholarships.length > 0 ? (
            filteredScholarships.map(scholarship => (
              <div className="Scholarship" key={scholarship.id}>
                <p>{scholarship.name}</p>
                {scholarship.status && (
                  <span className={`status-badge ${scholarship.status}`}>
                    {scholarship.status === 'open' ? 'Open' : 
                     scholarship.status === 'closed' ? 'Closed' : 
                     'Closing Soon'}
                  </span>
                )}
                <button className='scholar-ship-button'>View</button>
                <div className='money-info'>{scholarship.amount}</div>
                <div className='date-info'>{scholarship.deadline}</div>
              </div>
            ))
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              color: '#666',
              fontSize: '1.1rem'
            }}>
              No scholarships found matching "{searchQuery}"
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default StudentPage;