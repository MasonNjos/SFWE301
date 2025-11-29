import React, {useState} from "react";
import './styles/AdvisorPage.css';

function AdvisorPage() {
    const [role, setRole] = useState('');
      
    
      const handleRoleChange = (event) => {
        const selected = event.target.value;
        setRole(selected);
      };
    
    return(

   
<main className="advisor-main">

<section className="card-account-request">
    <h2>Account Approval Requests</h2>
    <div className="card-subtitle">Review pending account and approve or deny them
    </div>

    <table className="table-request-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Account Type</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>John Doe</td>
                <td>student</td>
                <td>jdoe@arizona.edu</td>
                <td>11-15-2025</td>
                <td className="Scholarship-decision">
                    <button className="button-approve">Approve</button>
                    <button className="button-deny">Deny</button>
                </td>
            </tr>    
        </tbody>
    </table>

    <section className="scholarship-reports">
        <h2>ScholarShip Reports</h2>
        <div className="card-subtitle">View summary information about scholarship and application.</div>

        <div className="report-filters">
            <div className="filter-field">
                  <p>Category</p>
 <select
          className="category-select"
          value={role}
          onChange={handleRoleChange}
        >
          <option value="" disabled>
            Field of Study
          </option>
          <option value="Stem">Stem</option>
          <option value="Busniness-Econimics">Busniness and Econimics</option>
          <option value="Health-medicine">Health and medicine</option>
          <option value="Humanities-Social-Science">Humanities and Social Science</option>
          <option value="Education and Teaching">Education and Teaching</option>
        </select>    
            </div>
        </div>

        <div className="filter-field">
            <p>Minimum Gpa</p>
            <input type="number" min="0" max="4" step="0.5" placeholder="e.g 3.5"/>
    

        <button className = "button-generate-report">Generate Report</button>
        </div>

        <table className="scholarship-table">
        <thead>
            <tr>
                <th>Scholarship Name</th>
                <th>Field</th>
                <th>Gpa required</th>
                <th>Deadline</th>
                <th>Number of application</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Stem excellence ScholarShip</td>
                <td>STEM</td>
                <td>3.5</td>
                <td>11-15-2025</td>
                <td>25</td>
            </tr>
        </tbody>
        </table>
    </section>
    </section>

    <section className="application-reports">
        <div className="card-subtle">Send an anncoument to remind users</div>
    <div className="notification-field">
        <textarea placeholder="Write your notification here..."></textarea>
        <button className="button-send-notification">Send Notification</button>
    </div>

    <div className="form-row">
        <textarea placeholder='Write the accoument here..'></textarea>
    <button className='submit-button'>Submit Accoument</button>
    </div>




</section>




</main>



    );  
  
}
    export default AdvisorPage;
