import './App.css';
import { useState}from 'react';
import axios from 'axios';
function App() {  
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [skindata, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("submit");

  const sendRequest =  (e)=>{
    e.preventDefault();
    setError("")
    setLoading("loading...")
    axios.post("https://valo-store.herokuapp.com/both",{username, password}).then((res)=>{
      const data = res.data;
      console.log(res);
      if(data["error"] !== undefined){
         setError(data["error"]);
      }
      setData(data);
      setLoading("submit")

     })
    
  }
    // useEffect( () => {
    //   const send = async () => {
    //     await sendRequest()
    //   }
    //   send();
    // }, []);
  
  const parseIdToGuns = ()=>{
    // if(setView1)
    // await sendRequest()
    // setLoading("submit")
    if(error !== ""){
      return <>error: {error}</>
    }
    return skindata.map((item)=>
      <>
          <div className="container-item">
            <img src={`https://media.valorant-api.com/weaponskinlevels/${item.id}/displayicon.png`} className="App" alt="logo" />
            <div>{item.name}</div>
          </div>
      </>
    )
  }
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <h2>Valo Store</h2>
        <div className="inputs">
          <input
          type="text"
          name="username"
          value={username}
          placeholder="username"
          onChange={e => setUsername(e.target.value)}
        />
        
          <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />

          <input
          type="submit"
          id="submit"
          value={loading}
          onClick={e =>sendRequest(e)}
        />

        </div>
        <div className="container">
          {/* <div className="container-item">
          <img src={logo} className="App" alt="logo" />
           <div>Hey</div>
          </div>

          {error} */}
          {parseIdToGuns() }
        </div>
      </header>

      
    </div>
  );
}

export default App;
