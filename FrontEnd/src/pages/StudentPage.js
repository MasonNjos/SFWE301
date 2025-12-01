import './styles/StudentPage.css';
import React, { useEffect, useState } from 'react';

function StudentPage(){
  const [searchQuery, setSearchQuery] = useState('');
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [userPersonalStatement, setUserPersonalStatement] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

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
          year: s.year || '',
          ps: s.ps || '',
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

  // If a scholarship is selected, show a simple detail page and stop rendering the list
  if (selectedScholarship) {
    return (
      <div className="App">
        <main className='content'>
          <button className='scholar-ship-button' onClick={() => setSelectedScholarship(null)} style={{marginBottom: '12px'}}>←</button>
          <div className='Scholarship-Detail'>
            <h2>{selectedScholarship.name}</h2>
            <p><strong>Amount:</strong> {selectedScholarship.amount || '—'}</p>
            <p><strong>Deadline:</strong> {selectedScholarship.deadline || '—'}</p>
            <p><strong>Major requirement:</strong> {selectedScholarship.major || '—'}</p>
            <p><strong>GPA requirement:</strong> {selectedScholarship.gpa || '—'}</p>
            <hr />
            <p><strong>Personal statement / question</strong></p>
            {String(selectedScholarship.ps).trim().toLowerCase() === 'yes' ? (
            <textarea
              className="personal-statement-box"
              placeholder="Enter your personal statement here..."
              value={userPersonalStatement}
              onChange={(e) => setUserPersonalStatement(e.target.value)}
              rows={6}
              style={{ width: "100%", padding: "10px" }}
            />
          ) : (
            <p style={{ whiteSpace: "pre-wrap" }}>
              {'No personal statement question provided.'}
            </p>
)}
          </div>
        </main>
      </div>
    );
  }

  // Help button for students
  return (
    <div className="App">
      {/* Help / chat floating button and panel */}
      <button className="help-button" title="Help" onClick={() => setChatOpen(o => !o)}>?</button>
      {chatOpen && (
        <div className="chat-panel">
          <div className="chat-header">Help Chat</div>
          <div className="chat-messages">
            {chatMessages.length === 0 && <div style={{color:'#666'}}>Hi — ask me about scholarships or how to apply.</div>}
            {chatMessages.map((m, i) => (
              <div key={i} className={`chat-message ${m.role}`}>
                <div className="bubble">{m.text}</div>
              </div>
            ))}
          </div>
          <div className="chat-input-row">
            <input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder="Type a question..." />
            <button onClick={() => {
              if(!chatInput.trim()) return;
              const userMsg = {role: 'user', text: chatInput.trim()};
              setChatMessages(prev => [...prev, userMsg]);
              setChatInput('');
              //automatic reponse
              setTimeout(() => {
                const lower = userMsg.text.toLowerCase();
                let reply = "Sorry, I don't know that yet. Try asking about deadlines or how to apply.";
                setChatMessages(prev => [...prev, {role:'assistant', text: reply}]);
              }, 400);
            }}>Send</button>
          </div>
        </div>
      )}
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
                <button onClick={() => setSelectedScholarship(scholarship)} className='scholar-ship-button'>View</button>
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