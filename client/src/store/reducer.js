import { SET_ISLOADING, SET_ISERROR, SET_ISSUCCESS, SET_BLOGS, SET_BLOG, SET_COMMENTS } from "./actionTypes";

const initialState = {
	isLoading: false,
	isError: null,
	isSuccess: false,
	blogs: [],
	blog: {},
	comments: [],
};

function reducer(state = initialState, action) {
	if (action.type === SET_ISLOADING) {
		return { ...state, isLoading: action.payload };
	} else if (action.type === SET_ISERROR) {
		return { ...state, isError: action.payload };
	} else if (action.type === SET_ISSUCCESS) {
		return { ...state, isSuccess: action.payload };
	} else if (action.type === SET_BLOGS) {
		return { ...state, blogs: action.payload };
	} else if (action.type === SET_BLOG) {
		return { ...state, blog: action.payload };
	} else if (action.type === SET_COMMENTS) {
		return { ...state, comments: action.payload };
	} 
	return state;
}

export default reducer;
