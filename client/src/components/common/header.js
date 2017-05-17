import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logout} from '../../actions/index';
import { Link } from 'react-router-dom';
import * as Cookies from 'js-cookie';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    };
    this.authCheck = this.authCheck.bind(this);
  }

  authCheck(e) {
    if(!Cookies.get('accessToken')) {
      this.setState({hidden: false});
    }
  }

  render() {
    const hidden = this.state.hidden ? 'hidden' : '';
    let disableLink;
    let isLoggedIn;

    if(!Cookies.get('accessToken')) {
      disableLink = 'disable-link';
      isLoggedIn = (
        <a href={'/api/auth/google'}>Login with Google</a>
      );
    } else {
      disableLink = '';
      isLoggedIn = (
        <a href={'/api/auth/logout'}>Log Out</a>
      );
    }

    return (
      <div>
        <nav className="flex-nav">
          <ul>
<<<<<<< HEAD
            <li><Link to='/'><h1>Let it mow</h1></Link></li>
            <li className="right">{isLoggedIn}</li>
            <li className="right" onClick={this.authCheck}>
              <div className={disableLink} >
                <Link to={`/mylistings/`}>Rent your equipment</Link>
              </div>
||||||| merged common ancestors
            <li><Link to='/'><h1>Let it mow</h1></Link></li>
            <li className="right">{isLoggedIn}</li>
            <li className="right">
              <Link to={`/mylistings/`}>Rent your equipment</Link>
=======
            <li className="one"><Link to='/'><h1>Let it mow</h1></Link></li>
            <li className="two">{isLoggedIn}</li>
            <li className="three">
              <Link to={`/mylistings/`}>Rent your equipment</Link>
>>>>>>> cce703b6b8c3532ef64b3e01611b09d924161778
            </li>
          </ul>
          <span className={hidden}>You must login to manage your rentals</span>
        </nav>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  name: state.listings.name
});

export default connect(mapStateToProps)(Header);
