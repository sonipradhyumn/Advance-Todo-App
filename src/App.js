import React, {Fragment, useState, useEffect} from 'react';
import './App.css';
import Firstpage from './components/Firstpage';
import GoogleLogin from 'react-google-login';

function App () {
  const [name, setName] = useState ('Login for Advance Option');

  let responseGoogle = response => {
    console.log (response);
    setName (response.Ys.Ve);
    // return(response.Ys.Ve);
  };

  return (
    <div className="App">
      {/* <div className="g-signin2" data-onsuccess={()=>onSignIn( )} data-theme="dark"></div> */}

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
          : <h2>{`Welcome ${name}`}</h2>}
      </span>
      <Firstpage name={name} />
    </div>
  );
}

export default App;
