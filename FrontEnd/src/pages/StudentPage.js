import './styles/StudentPage.css';
import React from 'react';
import { useState } from 'react';

function StudentPage(){
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Scholarship data array
  const scholarships = [
    {
      id: 1,
      name: 'Scholarship One',
      status: 'closed',
      amount: '$5,000',
      deadline: 'November 15, 2025'
    },
    {
      id: 2,
      name: 'Scholarship Two',
      status: 'open',
      amount: '$3,000',
      deadline: 'December 20, 2025'
    },
    {
      id: 3,
      name: 'Scholarship Three',
      status: 'open',
      amount: '$10,000',
      deadline: 'January 30, 2026'
    },
    {
      id: 4,
      name: 'Scholarship Four',
      status: 'open',
      amount: '$7,500',
      deadline: 'December 10, 2025'
    }
  ];

  // Filter scholarships based on search query
  const filteredScholarships = scholarships.filter(scholarship => 
    scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scholarship.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scholarship.deadline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submit (prevent page reload)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      {/* content part of the website*/}
      <main className='content'>
        <p><strong>Welcome to Scholar Cats!</strong></p>
        <p>Explore Scholarships tailored to your goals and achievements</p>
        
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

        {/* Top horizontal boxes*/}
        <div className="Top-Horziontal-Boxes">
          <div className="Top-Box">Total Available
            <p>{scholarships.length}</p>
          </div>
          <div className="Top-Box">Your Applications
            <p>0</p>
          </div>
          <div className="Top-Box">Match Rate
            <p>75% (insert java output here)</p>
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