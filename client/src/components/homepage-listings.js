import React, { Component } from 'react';
import { connect } from 'react-redux';
import GalleryListing from './gallery-listing';
import Slider, {Range} from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';

function log(value) {
  console.log(value);
}
class HomepageListings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      value: [5,100]
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSliderChange = this.onSliderChange.bind(this)
  }
  handleChange(e){
    this.setState({searchString:e.target.value});
    }
  onSliderChange = (value) => {
    log(value);
    this.setState({
      value,
    });
  }

  render() {

    let listings = this.props.listings
    let searchString = this.state.searchString.trim().toLowerCase();
    let lowPrice = this.state.value[0]
    let highPrice = this.state.value[1]

    if(searchString.length > 0){
        listings = listings.filter(function(l){
        return l.title.toLowerCase().match(searchString);
        });
    }
    if(lowPrice > 0 && highPrice < 15) {
         listings = listings.filter(function(l) {
           return l.price < 15
         })
    }


    return (
      <div>
      <input type="text" value={this.state.searchString}
      onChange={this.handleChange} placeholder="Search Equipment"/>
      <div>
      <Range min={5}
             max={100}
             defaultValue={[10,50]}
             allowCross={false}
             value={this.state.value}
             onChange={this.onSliderChange}
       />
      </div>
      <div className="listings-gallery">
      {listings.map(card => {
        return (
          <div key={card._id}>
          <GalleryListing images={card.images} title={card.title}
           price={card.price} id={card._id}/>
       </div>)}
     )}
      </div>
      </div>
   )
  }
}

const mapStateToProps = (state, props) => ({
  listings: state.listings.listings
});

export default connect(mapStateToProps)(HomepageListings);
