import * as Cookies from 'js-cookie';
import {browserHistory} from 'react-router';

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const fetchUserSuccess = (user) => ({
    type: FETCH_USER_SUCCESS,
    name: user.name,
    picture: user.profilePicUrl,
});

export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const fetchUserFailure = (error) => ({
    type: FETCH_USER_FAILURE,
    error,
});
export const FETCH_LISTINGS_SUCCESS = 'FETCH_LISTINGS_SUCCESS';
export const fetchListingsSuccess = (listings) => ({
    type: FETCH_LISTINGS_SUCCESS,
    listings
});

export const FETCH_LISTINGS_FAILURE = 'FETCH_LISTINGS_FAILURE';
export const fetchListingsFailure = (error) => ({
    type: FETCH_LISTINGS_FAILURE,
    error,
});

export const FETCH_LISTING_SUCCESS = 'FETCH_LISTING_SUCCESS';
export const fetchListingSuccess = (listing) => ({
    type: FETCH_LISTING_SUCCESS,
    listing
});
export const FETCH_LISTING_FAILURE = 'FETCH_LISTING_FAILURE';
export const fetchListingFailure = (error) => ({
    type: FETCH_LISTING_FAILURE,
    error,
});
//--------------------USERS REQUEST -----------------------------------------//
export const fetchUser = () => dispatch => {
    const accessToken = Cookies.get('accessToken');
    return fetch(`/api/auth/me`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            Cookies.remove('accessToken');
            browserHistory.replace('/login');
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then(user => {
        dispatch(fetchUserSuccess(user));
    })
    .catch(error => {
        dispatch(fetchUserFailure(error));
    });
};

//-------------------- FETCH LISTINGS ASYNC REQUEST---------------------------------//

export const fetchListings = () => dispatch => {
  return fetch('/api/listings')
  .then(response => response.json())
  .then(json => {
    dispatch(fetchListingsSuccess(json));
  })
  .catch(error => {
    dispatch(fetchListingsFailure());
  });
};

//-------------------------FETCH SINGLE LISTING REQUEST-------------------------//

export const fetchListing = id => dispatch => {
  return fetch(`/api/listing/${id}`)
    .then(response => response.json())
    .then(listing => {
      dispatch(fetchListingSuccess(listing[0]));
    })
    .catch(error => {
      dispatch(fetchListingFailure);
    });
};
