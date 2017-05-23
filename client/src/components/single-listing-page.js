import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchListing, startConversation } from '../actions';
import MoreFromSeller from './more-from-seller';
import GoogleMapReact from 'google-map-react';
import FontAwesome from 'react-fontawesome'

class SingleListingPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: ''
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchListing(id);
  }

  onInputChange(e) {
    this.setState({text: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      listingId: this.props.listing._id,
      createdBy: this.props.listing.createdBy._id,
      message: this.state.text
    };
    this.props.startConversation(data);
    this.setState({text: ''});
  }

  render() {
    const { listing } = this.props;
    if(!listing) {
      return <div>...Loading</div>;
    }

    const position = listing.geometry.coordinates


    return (
      <div className='row single-item-listings-container'>
        <div className='col-6'>
          <img className='single-item-image' src={`http://res.cloudinary.com/letitmow/image/upload/w_500,h_700,c_scale/${listing.images[0]}.jpg`}/>
          <h4 className='all-items-seller-heading single-item-des'>DESCRIPTION</h4>
          <p className='single-des-p'>{listing.description}</p>
          <div className='static-map'>
          <GoogleMapReact
            defaultCenter={{lat: position[1], lng: position[0]}}
            defaultZoom={13}>
          </GoogleMapReact>
          </div>
        <h4 className='all-items-seller-heading single-item-des'>SHARE THIS PRODUCT</h4>
        <a href='https://github.com/Jean-Luc19/let-it-mow' className='twitter-logo faicon'>
          <FontAwesome className='fa fa-twitter-square' size='3x' aria-hidden='true'/></a>
        <a href='https://github.com/Jean-Luc19/let-it-mow' className='facebook-logo faicon'>
          <FontAwesome className='fa fa-facebook-square' size='3x' aria-hidden='true'/></a>
        <a href='https://github.com/Jean-Luc19/let-it-mow' className='email-logo faicon'>
          <FontAwesome className='fa fa-envelope-square' size='3x' aria-hidden='true'/></a>
        </div>
      <div className='col-6 user-listings-container'>
       <div className='chat-row-single'>
        <h1>${listing.price} / Day</h1>
        <h2 className='single-listing-title'>{listing.title}</h2>
          <form action="" onSubmit={this.onSubmit}>
            <input className='single-page-chat'type="text" value={this.state.text} placeholder='Type Message...' autoFocus='true' onChange={this.onInputChange}/>
            <input className='btn-square chat-with-button'type="submit" value={`Send Chat To ${listing.createdBy.name}`}/>
          </form>
        </div>
        <h4 className='all-items-seller-heading'><strong>ALL ITEMS FROM RENTER</strong></h4>
          <MoreFromSeller className='more-seller' userId={listing.createdBy} picId={this.props.match.params}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ listings }, ownProps) => ({
  listing: listings[ownProps.match.params.id],
});

export default connect(mapStateToProps, { fetchListing, startConversation })(SingleListingPage);
