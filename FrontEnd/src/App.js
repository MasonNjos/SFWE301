import './App.css';
import { useState } from 'react';

function App(){
  const [role, setRole] = useState("");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  }

  return (
    <div className="App">
      {/* Header */}
      <header className = "top-bar">
        <h1 className='title'> Scholar Cats</h1>

        <select 
        className='role-select'
        value={role}
        onChange = {handleRoleChange}
        >
          <option value ="" disabled >
            Select Role
          </option>
          <option value="Student">Student </option>
          <option value ="Advisor">Advisor</option>
          <option value = "Scholarship provider">Scholarship Provider</option>
        </select>
      </header>


{/* content part of the webiste*/}

<main className='content'>
  <p><strong>Welcome to Scholar Cats!</strong></p>
   <p>Explore Scholarships tailored to your goals and achievements</p>



<form action ="/search" method="get">
   <input type="text" id = "search-input" placeholder='Search ScholarShips...'></input>
   <button type ="submit">Search</button>
</form>


<div class = "Top-Horziontal-Boxes">
<div class = "Top-Box">Total Avaliable</div>
<div class = "Top-Box">Total Avaliable2</div>
<div class = "Top-Box">Total Avaliable3</div>


  
</div>





</main>




{/* Bottom part of the webiste*/}
<footer className='footer'>
  <small>Scholarship Tracker</small>
</footer>
</div>
  )
}
export default App;
