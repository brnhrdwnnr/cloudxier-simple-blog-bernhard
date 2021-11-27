import { SET_ISLOADING, SET_ISERROR, SET_ISSUCCESS, SET_BLOGS, SET_BLOG, SET_COMMENTS } from './actionTypes'

export function setLoading(payload) {
	return {
		type: SET_ISLOADING,
		payload: payload,
	};
}
export function setError(payload) {
	return {
		type: SET_ISERROR,
		payload: payload,
	};
}
export function setIsSuccess(payload) {
	return {
		type: SET_ISSUCCESS,
		payload: payload,
	};
}
export function setBlogs(payload) {
	return {
		type: SET_BLOGS,
		payload: payload,
	};
}
export function setBlog(payload) {
	return {
		type: SET_BLOG,
		payload: payload,
	};
}
export function setComments(payload) {
	return {
		type: SET_COMMENTS,
		payload: payload,
	};
}

export function fetchBlogs(payload) {
	return (dispatch, getState) => {
		dispatch(setLoading(true));
		fetch("https://cloudxier-bernhard.herokuapp.com/blogs")
			.then((resp) => {
				if (resp.ok) {
					return resp.json();
				} else {
					return Promise.reject({
						status: resp.status,
						statusText: resp.statusText,
					});
				}
			})
			.then((data) => {
				dispatch(setBlogs(data));
			})
			.catch((err) => {
				if (err.status === 404) {
					dispatch(setError(err.statusText));
				}
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	};
}

export function addBlog(payload) {
	console.log(payload, "PAYLOAD")
	return (dispatch, getState) => {
		dispatch(setLoading(true));
		dispatch(setIsSuccess(false))
		fetch("https://cloudxier-bernhard.herokuapp.com/blogs", {
			method: "POST",
			body: payload
		})
			.then((resp) => {
				if (resp.ok) {
					return resp.json();
				} else {
					return Promise.reject({
						status: resp.status,
						statusText: resp.statusText,
					});
				}
			})
			.then((data) => {
				// dispatch(setBlog(data));
			})
			.catch((err) => {
				dispatch(setError(err.message));
			})
			.finally(() => {
				dispatch(setBlog({}));
				dispatch(setLoading(false));
			});
	};
}

export function fetchBlogsById(payload) {
	return (dispatch, getState) => {
		dispatch(setLoading(true));
		fetch("https://cloudxier-bernhard.herokuapp.com/blogs/" + payload)
			.then((resp) => {
				if (resp.ok) {
					return resp.json();
				} else {
					return Promise.reject({
						status: resp.status,
						statusText: resp.statusText,
					});
				}
			})
			.then((data) => {
				dispatch(setBlog(data));
			})
			.catch((err) => {
				dispatch(setError(err.message));
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	};
}

export function EditBlogHandler(payload) {
	return (dispatch, getState) => {
		dispatch(setLoading(true));
		fetch("https://cloudxier-bernhard.herokuapp.com/blogs/" + payload.id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		})
			.then((resp) => {
				if (resp.ok) {
					return resp.json();
				} else {
					return Promise.reject({
						status: resp.status,
						statusText: resp.statusText,
					});
				}
			})
			.then((data) => {
				dispatch(setBlog(data));
			})
			.catch((err) => {
				dispatch(setError(err.message));
			})
			.finally(() => {
				dispatch(setBlog({}));
				dispatch(setLoading(false));
			});
	};
}

export function deleteBlogHandler(payload) {
	return (dispatch, getState) => {
		fetch("https://cloudxier-bernhard.herokuapp.com/blogs/" + payload.id, {
			method: "DELETE",
		})
			.then((resp) => {
				if (resp.ok) {
					return resp.json();
				} else {
					return Promise.reject({
						status: resp.status,
						statusText: resp.statusText,
					});
				}
			})
			.then((data) => {
				const newBlogs = payload.Blogs.filter((food) => food.id !== payload.id);
				dispatch(setBlogs(newBlogs));
			})
			.catch((err) => {
				dispatch(setError(err.message));
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	};
}

export function fetchComments(payload) {
	return (dispatch, getState) => {
		dispatch(setLoading(true));
		fetch("https://cloudxier-bernhard.herokuapp.com/comments", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				if (resp.ok) {
					return resp.json();
				} else {
					return Promise.reject({
						status: resp.status,
						statusText: resp.statusText,
					});
				}
			})
			.then((data) => {
				dispatch(setComments(data));
			})
			.catch((err) => {
				dispatch(setError(err.message));
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	};
}