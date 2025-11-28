function StudentPage() {
  return(

  
{/* content part of the webiste*/}

<main className='content'>
  <p><strong>Welcome to Scholar Cats!</strong></p>
   <p>Explore Scholarships tailored to your goals and achievements</p>



<form action ="/search" method="get">
   <input type="text" id = "search-input" placeholder='Search ScholarShips...'></input>
   <button type ="submit">Search</button>
</form>

{/* Top horizoantal boxes*/}
<div class = "Top-Horziontal-Boxes">
<div class = "Top-Box">Total Avaliable
  <p> Some number that we will find out later </p>
</div>

<div class = "Top-Box">Your Applications
<p> Some number that will also be found later</p>
</div>

<div class = "Top-Box">Match Rate
  <p> Some number that will also be found later</p>
</div>

</div>


<p>Avaliable ScholarShips</p>

<div class = "Scholarship-list">

<div class ="Scholarship">
<p>Scholar ship one</p>
<span className='status-badge open'>Open</span>
<button className='scholar-ship-button'>View</button>
<div className='money-info'> $$$$$$</div>
<div className = 'date-info'>augesu 74</div>
</div>

<div class ="Scholarship">
<p>Scholar ship two</p>
<span className='status-badge closed'>Closed</span>
<button className='scholar-ship-button'>View</button>
<div className='money-info'> $$$$$$</div>
<div className = 'date-info'>augesu 74</div>
</div>

<div class ="Scholarship">
<p>Scholar ship three</p>
<span className='status-badge soon'>Closing soon</span>
<button className='scholar-ship-button'>View</button>
<div className='money-info'> $$$$$$</div>
<div className = 'date-info'>augesu 74</div>
</div>

<div class ="Scholarship">
<p>Scholar ship four</p>
<button className='scholar-ship-button'>View</button>
<div className='money-info'> $$$$$$</div>
<div className = 'date-info'>augesu 74</div>
</div>

</div>
</main>




{/* Bottom part of the webiste*/}
<footer className='footer'>
  <small>Scholarship Tracker</small>
</footer>
</div>
  )

    );  
  

}

export default StudentPage;