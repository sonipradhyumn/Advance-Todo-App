import React, {Fragment, useState, useEffect} from 'react';
import './App.css';
import Firstpage from './components/Firstpage';
import GoogleLogin from 'react-google-login';

function App () {
  const [name, setName] = useState ('Login for Advance Option');
  var profile ;
  let responseGoogle = response => {
    setName (response.Ys.Ve);
    var id_token = response.getAuthResponse().id_token;
    profile = response.getBasicProfile();
    localStorage.setItem("gmailLogin", id_token);
    localStorage.setItem("userName", profile.getGivenName());
  };
  console.log('Hi ',localStorage.userName)
  useEffect(() => {
    if(localStorage.userName){setName(localStorage.userName)};
  }, [])
function  signout(){
  localStorage.clear();
  setName('Login for Advance Option');
}
 
  return (
    <div className="App">
      <span>
        {name === 'Login for Advance Option'
          ? <>
              <h2>{name}</h2>
              <GoogleLogin
                clientId="703955709874-6flbss0mt51bned0d9173j3dikdm7vii.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </>
          :<> <h2>{`Welcome ${name}`}</h2> <button className='button1 ' onClick={()=>signout()}> sign out </button></>}
      </span>
      <Firstpage name={name} />
    </div>
  );
}

export default App;
