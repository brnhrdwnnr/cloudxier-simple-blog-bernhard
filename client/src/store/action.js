import { SET_ISLOADING, SET_ISERROR, SET_BLOGS, SET_BLOG, SET_COMMENTS } from "./actionTypes";

export function setIsLoading(payload) {
	return {
		type: SET_ISLOADING,
		payload: payload,
	};
}
export function setIsError(payload) {
	return {
		type: SET_ISERROR,
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
		dispatch(setIsLoading(true));
		fetch("http://localhost:3000/blogs")
			.then((resp) => {
				if (resp.ok) {
					return resp.json();
				} else {
					return resp.json().then((msg) => {
						throw new Error(msg.message);
					});
				}
			})
			.then((data) => {
				dispatch(setBlogs(data));
			})
			.catch((err) => {
				dispatch(setIsError(err.message));
			})
			.finally(() => {
				dispatch(setIsLoading(false));
			});
	};
}

export function addBlog(payload) {
	return (dispatch, getState) => {
		dispatch(setIsLoading(true));
		fetch("http://localhost:3000/blogs", {
			method: "POST",
			body: payload,
		})
			.then((resp) => {
				if (resp.ok) {
					return resp.json();
				} else {
					return resp.json().then((msg) => {
						throw new Error(msg.message);
					});
				}
			})
			.then((data) => {
				const { blogs } = getState()
				const newBlogs = [...blogs, data]
				dispatch(setBlogs(newBlogs))
				// dispatch(fetchBlogs());
			})
			.catch((err) => {
				dispatch(setIsError(err.message));
			})
			.finally(() => {
				dispatch(setIsLoading(false));
			});
	};
}

export function fetchBlogsById(payload) {
	return (dispatch, getState) => {
		dispatch(setIsLoading(true));
		fetch("http://localhost:3000/blogs/" + payload)
			.then((resp) => {
				if (resp.ok) {
					return resp.json();
				} else {
					return resp.json().then((msg) => {
						throw new Error(msg.message);
					});
				}
			})
			.then((data) => {
				dispatch(setBlog(data));
			})
			.catch((err) => {
				dispatch(setIsError(err.message));
			})
			.finally(() => {
				dispatch(setIsLoading(false));
			});
	};
}

export function EditBlogHandler(payload) {
	return (dispatch, getState) => {
		dispatch(setIsLoading(true));
		fetch("http://localhost:3000/blogs/" + payload.id, {
			method: "PUT",
			body: payload.form,
		})
			.then((resp) => {
				if (resp.ok) {
					return resp.json();
				} else {
					return resp.json().then((msg) => {
						throw new Error(msg.message);
					});
				}
			})
			.then((data) => {
				dispatch(fetchBlogs());
			})
			.catch((err) => {
				dispatch(setIsError(err.message));
			})
			.finally(() => {
				dispatch(setIsLoading(false));
			});
	};
}

export function deleteBlogHandler(payload) {
	return (dispatch, getState) => {
		dispatch(setIsLoading(true));
		fetch("http://localhost:3000/blogs/" + payload.id, {
			method: "DELETE",
		})
			.then((resp) => {
				if (resp.ok) {
					return resp.json();
				} else {
					return resp.json().then((msg) => {
						throw new Error(msg.message);
					});
				}
			})
			.then((data) => {
				const newBlogs = payload.blogs.filter((blog) => blog.id !== payload.id);
				dispatch(setBlogs(newBlogs))
			})
			.catch((err) => {
				dispatch(setIsError(err.message));
			})
			.finally(() => {
				dispatch(setIsLoading(false));
			});
	};
}

export function fetchComments(payload) {
	return (dispatch, getState) => {
		dispatch(setIsLoading(true));
		fetch("http://localhost:3000/comments", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				if (resp.ok) {
					return resp.json();
				} else {
					return resp.json().then((msg) => {
						throw new Error(msg.message);
					});
				}
			})
			.then((data) => {
				dispatch(setComments(data));
			})
			.catch((err) => {
				dispatch(setIsError(err.message));
			})
			.finally(() => {
				dispatch(setIsLoading(false));
			});
	};
}
