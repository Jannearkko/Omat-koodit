import { useState, useEffect } from 'react'
import './App.css'

function App() {
	const [sites, setSites] = useState([])
	const [keyword, setKeyword] = useState('')

	const fetchData = () => {
		fetch('https://api.github.com/search/repositories?q='+ keyword)
		.then(response => {
		  if (response.status !== 200) {
			throw new Error('Response status not ok');
		  }
	
		  return response.json();
		})
		.then(resData => setSites(resData.items))
		.catch(err => console.error(err))
	  };

	/* useEffect(()=>{
		fetch('https://api.github.com/search/repositories?q='+ keyword)
		.then(response => response.json())
		.then(resData => setSites(resData.items))
		.catch(err => console.error(err))
		
	}, []) */

	const inputChanged = (event) => {
		setKeyword(event.target.value);
	}

	return (
		<>
		<input placeholder="Keyword" value={keyword} onChange={inputChanged}></input>
		<button onClick={fetchData}>Search!</button>
		<table>
			<tbody>
				{
				<tr>
					<td>Name</td>
					<td>URL</td>
				</tr>
				}
			</tbody>
			<tbody>
				{
					
					sites.map((site) =>
					<tr key={site.id}>
						<td>{site.full_name}</td>
						<td><a  href={site.html_url}>{site.html_url}</a></td>
					</tr>
					)
					
				}
			</tbody>
		</table>
		</>
	)
}

export default App

/* import { useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState({});
  const [userid, setUserid] = useState('')

  const fetchData = () => {
    fetch('https://reqres.in/api/users/' + userid)
    .then(response => {
      if (response.status !== 200) {
        throw new Error('Response status not ok');
      }

      return response.json();
    })
    .then(resData => setUser(resData.data))
    .catch(err => console.error(err))
  };

  const inputChanged = (event) => {
    setUserid(event.target.value);
  }

  return (
    <>
      <input placeholder="User ID" value={userid} onChange={inputChanged} />
      <button onClick={fetchData}>Fetch</button>
      <p>{user.first_name} {user.last_name} {user.email}</p>
    </>
  );
}

export default App; */