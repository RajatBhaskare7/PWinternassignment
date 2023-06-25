import logo from './logo.svg';
import './App.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data,setData]= useState({});
  const [details, setDetails] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuerylocation, setSearchQuerylocation] = useState('');
  const [loading , setLoading] = useState(true);
  const [range, setRange] = useState([0, 100000]);
  const [filteredDataSalary, setFilteredDataSalary] = useState([]);
  const [searchQuerySalary, setSearchQuerySalary] = useState('');

  
  useEffect(()=>{
    
   fetchfun();

  },[]);
  function fetchfun(){
    axios.get('https://internportal.rajatbhaskare7.repl.co/getall')
    .then((res)=>{
      console.log(res.data);
      setData(res.data);
      setFilteredData(res.data);
      setDetails(res.data[0]);
      setLoading(false);
      console.log(data.stipend);
      

      
    }
    )
    .catch((err)=>{
      console.log(err);
    }
    )
    console.log(details);
  }
  const handleRangeChange = (newRange) => {
    setRange(newRange);
    const filteredResults = data.filter(item =>
      item.stipend >= newRange[0] && item.stipend <= newRange[1]
    );
    
    setFilteredData(filteredResults);
  };
  function handleSearchChangelocation(event) {
    const query = event.target.value;
    setSearchQuerylocation(query);

    const filteredResults = data.filter(item =>
      item.location.toLowerCase().includes(query.toLowerCase())
    );
    console.log(filteredResults);
    setFilteredData(filteredResults);
  }


  function hello(key){
    // console.log(key);
    const newDetails = data.find((item)=>item.id===key);
    setDetails(newDetails);
    console.log(newDetails);
  }
  
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filteredResults = data.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.jobTitle.toLowerCase().includes(query.toLowerCase()) 
    );

    setFilteredData(filteredResults);
  };

 
  const [darkMode, setDarkMode] = useState(true);
  
  function dark() {
    
    setDarkMode(!darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }




  

  return (
    <div className="App" >
       <div class="job">
        <div class="header">
         <div class="logo">
         
          Internship portal
         </div>
         <div class="header-menu">
          <a href="#" class="active">Browse Listing</a>
          <a href="#">Application History </a>
          <a href="#">Blog</a>
          <a href="#">Contact Us</a>
         </div>
         <div class="user-settings">
          <div class="dark-light" onClick={dark}>
           <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
          </div>
          
          <img class="user-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png" alt=""/>
          <div class="user-name">User Name</div>
         </div>
        </div>
        <div class="wrapper detail-page">
         <div class="search-menu">
          <div class="search-bar">
           <input type="text" class="search-box" autoFocus
             value={searchQuery}
             onChange={handleSearchChange}
             placeholder='Search for jobs/company'
           />
         
         
          </div>
          <div class="search-location">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
           </svg>
           <input type="text" class="search-box" autoFocus
             value={searchQuerylocation}
             onChange={handleSearchChangelocation}
             placeholder='Search by location'
           />
          </div>
          <div class="search-job">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-briefcase">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>
            <p>Min Salary: ${range[0]}</p><br/>
            --
    <p>Max Salary: ${range[1]}</p>
          </div>
          <div class="search-salary">
           <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="currentColor" stroke-width=".4">
            <path d="M12.6 18H9.8a.8.8 0 010-1.5h2.8a.9.9 0 000-1.8h-1.2a2.4 2.4 0 010-4.7h2.8a.8.8 0 010 1.5h-2.8a.9.9 0 000 1.8h1.2a2.4 2.4 0 010 4.7z" stroke="currentColor" />
            <path d="M12 20a.8.8 0 01-.8-.8v-2a.8.8 0 011.6 0v2c0 .5-.4.8-.8.8zM12 11.5a.8.8 0 01-.8-.8v-2a.8.8 0 011.6 0v2c0 .5-.4.8-.8.8z" stroke="currentColor" />
            <path d="M21.3 23H2.6A2.8 2.8 0 010 20.2V3.9C0 2.1 1.2 1 2.8 1h18.4C22.9 1 24 2.2 24 3.8v16.4c0 1.6-1.2 2.8-2.8 2.8zM2.6 2.5c-.6 0-1.2.6-1.2 1.3v16.4c0 .7.6 1.3 1.3 1.3h18.4c.7 0 1.3-.6 1.3-1.3V3.9c0-.7-.6-1.3-1.3-1.3z" stroke="currentColor" />
            <path d="M23.3 6H.6a.8.8 0 010-1.5h22.6a.8.8 0 010 1.5z" stroke="currentColor" /></svg>
            <Slider
        min={0}
        max={100000}
        value={range}
        onChange={handleRangeChange}
        range
      />
          </div>
          <button class="search-button">Find Job</button>
         </div>
        { loading ? <div class="loader">
                <div class="loader-inner"></div>
                </div> :
                  <div class="main-container">
         
          <div class="searched-jobs">
           
        
           <div class="job-overview">
            <div class="job-overview-cards"
            
            >
              {
                
         
                filteredData.map((item)=>{
                  return(
                    <div class="job-overview-card"  key={item.id} onClick={()=>hello(item.id)}>
              <div class="job-card overview-card">
               <div class="overview-wrapper">
                <div class="overview-detail">
                 <div class="job-card-title">{item.jobTitle}</div>
                 <div class="job-card-subtitle">
                 {item.location}
                 </div>
                </div>
                <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=" heart feather feather-heart">
                 <path d="M20.8 4.6a5.5 5.5 0 00-7.7 0l-1.1 1-1-1a5.5 5.5 0 00-7.8 7.8l1 1 7.8 7.8 7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z" /></svg>
               </div>
               <div class="job-overview-buttons">
                <div class="search-buttons time-button">{item.duration}</div>
                <div class="search-buttons level-button">Stipend:{item.stipend}</div>
                
               </div>
               <div class="job-overview-buttons">
                <div class="search-buttons time-button">{item.noofapplicants} Applicants</div>
                <div class="search-buttons level-button">Ends in {item.endsin}</div>
                
               </div>
              </div>
             </div>
                  )
                }
                )
             
              }
           
             
            
            </div>
            <div class="job-explain">
            
             <div class="job-logos">
             </div>
             <div class="job-explain-content">
             <div class="job-title-wrapper">
              <div class="job-card-title">{details.jobTitle}</div>
              <div class="job-action">
               {/* <svg class="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart">
                 <path d="M20.8 4.6a5.5 5.5 0 00-7.7 0l-1.1 1-1-1a5.5 5.5 0 00-7.8 7.8l1 1 7.8 7.8 7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z" /></svg> */}
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share-2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>
              </div>
              </div>
              <div class="job-subtitle-wrapper">
               <div class="company-name">{
                  details.name
               }<span class="comp-location">{details.location}</span></div>
               <div class="posted">{details.posted}<span class="app-number">{details.noofapplicants} Application</span></div>
              </div>
              <div class="explain-bar">
               <div class="explain-contents">
               <div class="explain-title">Duration</div>
               <div class="explain-subtitle">{
                  details.duration
}</div>
                </div>
               <div class="explain-contents">
               <div class="explain-title">Experience</div>
               <div class="explain-subtitle">
                  {details.experience}
               </div>
                </div>
               <div class="explain-contents">
               <div class="explain-title">Stipend</div>
               <div class="explain-subtitle">
                  {details.stipend}
               </div>
                </div>
               <div class="explain-contents">
               <div class="explain-title">Location</div>
               <div class="explain-subtitle">
                  {details.location}
               </div>
                </div>
              </div>
              <div class="explain-bar">
               <div class="explain-contents">
               <div class="explain-title">Posted:</div>
               <div class="explain-subtitle">{details.posted}</div>
                </div>
               <div class="explain-contents">
               <div class="explain-title">Ends In</div>
               <div class="explain-subtitle">{details.endsin}</div>
                </div>
               <div class="explain-contents">
               <div class="explain-title">Open Position:</div>
               <div class="explain-subtitle">{
                  details.openPosition
               }</div>
                </div>
               <div class="explain-contents">
               <div class="explain-title">Total Applicants</div>
               <div class="explain-subtitle">
                  {details.noofapplicants}
               </div>
                </div>
              </div>
              <div class="overview-text">
               <div class="overview-text-header">Overview</div>
               <div class="overview-text-subheader">{details.desc}</div>
              </div>
              <div class="overview-text">
               <div class="overview-text-header">Requirements:</div>
                                   {details.skills?.map((item)=>{
                    return(
                      <div class="overview-text-item">{item}</div>
                    )
                  })

                  }
              </div>
             </div>
            </div>
           </div>
          </div>
         </div>
}
        </div>
       </div>
     
    </div>
  );
}

export default App;
