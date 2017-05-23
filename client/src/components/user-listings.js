import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import UserItem from './user-item';
import Header from './common/header';
import AddItemForm from './add-item-form';
import * as Cookies from 'js-cookie';



class UserListings extends Component {
  constructor(props){
    super(props);
    this.state = {
      hidden: true
    };
    this.onClick = this.onClick.bind(this);
    this.oldDate = this.oldDate.bind(this);
    this.newDate = this.newDate.bind(this);
  }

 componentDidMount() {
    this.props.dispatch(actions.fetchUserListings());
  }
  oldDate(listings) {
    let result=[]
    for(let i=0;i<listings.length;i++) {
      result.push(listings[i].createdAt.slice(0,10))
    }
    result.sort(function(a, b){
      var aa = a.split('/').reverse().join(),
          bb = b.split('/').reverse().join();
    return aa < bb ? -1 : (aa > bb ? 1 : 0);
  })
  return result[0]
  }
  newDate(listings) {
    let result=[]
    for(let i=0;i<listings.length;i++) {
      result.push(listings[i].createdAt.slice(0,10))
    }
    result.sort(function(a, b){
      var aa = a.split('/').reverse().join(),
          bb = b.split('/').reverse().join();
    return aa < bb ? -1 : (aa > bb ? 1 : 0);
  })
  return result[0]
  }

  onClick() {
    this.setState({hidden: !this.state.hidden});
  }

  redirect() {
    location.replace('/');
    }

  render() {

    if(!Cookies.get('accessToken')) {
      this.redirect();
      return null;
    }
    const formBtn = this.state.hidden ? 'Add a Listing' : 'Close Form';
    const hidden = this.state.hidden ? 'hidden' : '';
    const listings = this.props.userListings;
    const listItem = listings.length > 0 ? listings.map (listItem => {
      return (
        <div key={listItem._id}>
          <UserItem userId={listItem.createdBy} images={listItem.images} title={listItem.title}
           price={listItem.price} id={listItem._id} />
        </div>
      );
    }) :  <div>`You don't have any listings yet`</div>;

    return (
      <div className="user-listings">
        <div className={hidden}>
          <AddItemForm onClick={this.onClick}/>
        </div>
        <button className='btn-round'
          onClick={this.onClick}>{formBtn}</button>
        <div className='row dashboard-listings'>
        <div className='col-7'>
        <h2>Your Listings</h2>
          <div className='listings-gallery'>
            {listItem}
          </div>
         </div>
         <div className='col-5 dashboard-stats'>
           <h2>Your Info!</h2>
           <h4 className='all-items-seller-heading'>NUMBER OF ITEMS LISTED</h4>
             <p className='dash-stat'>{listings.length}</p>
           <h4 className='all-items-seller-heading'>NEWEST LISTING</h4>
             <p className='dash-stat'>{this.newDate(listings)}</p>
           <h4 className='all-items-seller-heading'>OLDEST LISTING</h4>
             <p className='dash-stat'>{this.oldDate(listings)}</p>
           <h4 className='all-items-seller-heading'>BEST BARGAIN</h4>
         </div>
         </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  userListings: state.listings.userListings,
  userId: state.listings.userId
});


export default connect(mapStateToProps)(UserListings);
