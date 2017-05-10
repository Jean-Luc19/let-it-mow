import React from 'react';
import * as Cookies from 'js-cookie';
import Home from './home';
import LoginPage from './login-page';
import ImgUpload from './image-uploader';

class App extends React.Component {


    render() {
        return(
        <div>
          <Home />
          <LoginPage />
          <ImgUpload />
        </div>
    );
    }
}

export default App;
