import * as Cookies from 'js-cookie';
import {browserHistory} from 'react-router';

//----------- Reducer Actions -------------//
export const LOGOUT = 'LOGOUT';
export const logout = () => ({
  type: LOGOUT
});

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const fetchUserSuccess = (user) => ({
    type: FETCH_USER_SUCCESS,
    name: user.name,
    userId: user.googleID,
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

export const FETCH_USER_LISTINGS_SUCCESS = 'FETCH_USER_LISTINGS_SUCCESS';
export const fetchUserListingsSuccess = (userListings) => ({
    type: FETCH_USER_LISTINGS_SUCCESS,
    userListings
  });

export const FETCH_USER_LISTINGS_FAILURE= 'FETCH_USER_LISTINGS_FAILURE';
export const fetchUserListingsFailure = (error) => ({
      type: FETCH_USER_LISTINGS_FAILURE,
      error
    });

export const FETCH_MORE_FROM_USER_LISTINGS_SUCCESS = 'FETCH_MORE_FROM_USER_LISTINGS_SUCCESS';
export const fetchMoreFromUserListingsSuccess = (allUserListings) => ({
    type: FETCH_MORE_FROM_USER_LISTINGS_SUCCESS,
    allUserListings
  });

export const FETCH_MORE_FROM_USER_LISTINGS_FAILURE= 'FETCH_MORE_FROM_USER_LISTINGS_FAILURE';
export const fetchMoreFromUserListingsFailure = (error) => ({
      type: FETCH_MORE_FROM_USER_LISTINGS_FAILURE,
      error
    });


//-----------User/Auth Async Actions-------------//

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

//----Create Listing Async Action----------//

export const createListing = (values) => dispatch => {
  const accessToken = Cookies.get('accessToken');
  return fetch('/api/listing',
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(values)
    })
    .then(() => dispatch(fetchUserListings()))

    .catch(error => {
      console.error(error);
    });
};

//-----------FetchAllListing Async Action-------------//

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

//-----------Fetch Single Listing Async Action-------------//

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

//----------- FetchAllListings For A User Async Action-------------//

export const fetchUserListings = () => (dispatch) => {
  const accessToken = Cookies.get('accessToken');
  return fetch('/api/mylistings', {
    headers: {
      authorization: `bearer ${accessToken}`
    }
  })
  .then(response => response.json())
  .then(json => {
    dispatch(fetchUserListingsSuccess(json));
  })
  .catch(error => {
    dispatch(fetchUserListingsFailure());
  });
};

//----------- FetchAllListings From the same User Async Action-------------//

export const fetchMoreFromUser = (createdBy) => (dispatch) => {
  const accessToken = Cookies.get('accessToken');
  return fetch(`/api/listings/${createdBy}`, {
    headers: {
      authorization: `bearer ${accessToken}`
    }
  })
  .then(response => response.json())
  .then(json => {
    dispatch(fetchMoreFromUserListingsSuccess(json));
  })
  .catch(error => {
    dispatch(fetchUserListingsFailure());
  });
};
//-----------Delete Listing Async Action-------------//

export const deleteListing = (userId, id) => dispatch => {
  const accessToken = Cookies.get('accessToken');
  return fetch(`/api/listing/${userId}/${id}`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })
    .then(() => dispatch(fetchUserListings()))
    .catch((err) =>dispatch(fetchUserListingsFailure(err)));
};
