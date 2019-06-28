import axios from "axios"

export const FETCHING_FRIENDS = "FETCHING_FRIENDS"
export const FRIENDS_FETCHED = "FRIENDS_FETCHED"
export const FETCH_ERROR = "FETCH_ERROR"

export const ADDING_FRIEND = "ADDING_FRIEND"
export const FRIEND_ADDED = "FRIEND_ADDED"
export const ADDING_ERROR = "ADDING_ERROR"

export const fetchFriends = () => {
	const promise = axios.get("http://localhost:5000/api/friends")

	return function(dispatch) {
		dispatch({ type: FETCHING_FRIENDS })
		promise
			.then(response => {
				console.log("response", response.data)
				dispatch({ type: FRIENDS_FETCHED, payload: response.data })
			})
			.catch(error => {
				console.log(error)
				dispatch({ type: FETCH_ERROR })
			})
	}
}

export const newFriend = friend => {
	const promise = axios.post("http://localhost:5000/api/friends", friend)

	return function(dispatch) {
		dispatch({ type: ADDING_FRIEND })
		promise
			.then(response => {
				console.log(friend)
				console.log("newFriend response", response)
				dispatch({ type: FRIEND_ADDED, payload: response.data })
			})
			.catch(error => {
				dispatch({ type: ADDING_ERROR, payload: error })
			})
	}
}
