npm install react-router-dom@6

import { BrowserRouter } from "react-router-dom";

buat react app 
    => create-react-app client
masuk ke folder 
    => cd client
instalasi package
    => npm i react-router-dom redux react-redux
    redux core libray
    react-redux binding untuk core library
import react router dom di index.js 
    => {BrowserRouter as Router}
    masukan dalam ReactDOM.render

import react router dom di App.js 
    => {Swtich, Route, Link }


buat store
    buat index.js
    buat folder reducer => disini ada state

    setelah store selesai buat provider di index.js
    pasang provider sebelum tag router
    <Provider store={store}>

    jangan lupa import store di index js

    setelah itu install redux-thunk

    pasang applyMiddleware di store index.js
    buat actions folder

    buat fetcher dalam taskAction
    jngn lupa return dispatch dan getstate

    handle dalam reducer setelah 

## NOTE 

Initialization:
1. Generate a new React Project 
	a. npx create-react-app <app-name> --template react-redux
2. Install Redux & React-Redux
	a. npm install redux
	b. npm install react-redux
3. Install Thunk
	a. npm install redux-thunk
	b. ref [https://github.com/reduxjs/redux-thunk]
4. Install React-Router	
	a. npm install react-router-dom

In case packages are already set up:
1. npm install
2. make 'components', 'store', 'middlewares' folder inside of /src

Folder Structure:
1. /root
	a. /public
		1. index.html
			* Your base HTML file, insert //swal//, //bootstrap//, etc here
	b. /src
		1. App.js
		2. Index.js
		3. Index.css
		4. /store
			a. action.js
			b. actionTypes.js
			c. index.js
			d. reducer.js
			e. /reducers
				1. index.js ; for //**combineReducers**//
				* A place to store all of your //middlewares//
		5. components
			* A place to store all of your //components//
		6. middlewares
			* A place to store all of your //middlewares//

Folder Description (and Notable files):
1. root
2. index.js (///src//);
	1. import & use 'BrowserRouter' from 'react-router-dom', remember to use deconstructor for it
	2. import & use 'Provider' from 'react-redux', remember to use deconstructor for it; also give 'store' as props in the 'render'. 
	* Order doesn't matter
3. App.js ; 	
	1. is the place to put in all of your components
	2. is also the place where all of your 'routes' meets
	3. import //every component that you need// here
	4. import **Switch & Router** from 'react-router-dom', remember to use deconstructor
4. index.css ; 
	1. //**global styling**//, since it's already imported in 'index.js'
5. **/components**
	1. This is the place where you store all of your //components//, except for App.js
	2. imports :
		a. React, useState, useEffect  => react
		b. useSelector, useDispatch => react-redux
		c. useHistory, useParams, Link => react-router-dom
		d. import also //actions//, and other //components// needed
	3. useState
		a. Is a local storage for data
		b. For data that used only once, and exclusively in the component it's in
		c. Possible for multiple state, or one or two using objects (if using object, remember your best friend the spread operator!)
		d. ref (https://www.w3schools.com/react/react_usestate.asp)
	4. useEffect
		a. ref (https://www.w3schools.com/react/react_useeffect.asp)
		b. ref (https://reactjs.org/docs/hooks-effect.html)
		c. For its hooks, if you're lost on which one to put it on, leave it empty or enter //dispatch// as its hook
	5. Handle multiple <input> change
		a. ref (https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react)
		b. Remember to set the input's 'name' attribute to the same attribute as the 'state', also its 'value' attribute to directly refer to the 'state' via interpolation ( { } ), and use onChange!
	6. useSelector & useDispatch
		a. First, import both of them from 'react-redux'
		b. Then, import the action functions from ' store/actions '
		c. For dispatch, invoke the useDispatch, and store it as a variable (say, dispatch), then invoke said variable with the action as its parameter
		d. For useSelector, refer to the #example in (https://react-redux.js.org/api/hooks#useselector). Remember to use //deconstructors//!
	7. Displaying multiple data:
		a. use //.map// to loop through the data, return an HTML element whose value is made dynamic via //interpolation ( { } )//
6. **/middlewares**
	1. This is the place where you store all of your //middlewares//
7. **/store**
	1. This is the main operational space for //redux & thunk//
8. **/reducers**
	1. This is the place where you store all of your //reducers//
9. index.js (///store//)
	1. import: 
		* //createStore & applyMiddleware// from 'redux'
		* 'thunk' from 'redux-thunk' (https://redux.js.org/usage/writing-logic-thunks)
		* import middlewares from
		* import reducer
	2. define 'store'
		a. ref (https://redux.js.org/api/store/)
		b. alt ref (https://daveceddia.com/where-fetch-data-redux/ ; take a look at 'createStore')
		c. insert reducer (the combined one) as a parameter in createStore
		d. remember that '//createStore'// accepts middlewares via the use //'applyMiddleware//'. Also //thunk// is a middleware.
	* remember to //import //the //**store**//
	* remember to use deconstructor! 
10. action.js
	a. ref for basic action function (https://redux-toolkit.js.org/api/createaction/ ; look at 'increment' function, replace amount with payload)
		1. alt ref (https://dev.to/markusclaus/fetching-data-from-an-api-using-reactredux-55ao)
	b. import:
		1. All of the names in '//.actionTypes'//
	c. define baseUrl (to use in action fetchers)
	d. For action Fetcher:
		1. use async-await, and fetch(<url>, <options>)
		2. For Pagination use URLSearchParams
			a. ref (https://stackoverflow.com/questions/54181169/how-to-update-query-param-in-url-in-react)
			b. https://medium.com/@techrally/react-to-async-await-553c43f243e2
			c. https://stackoverflow.com/questions/41930443/how-to-async-await-redux-thunk-actions
		3. Remember to set //isLoading // to false & true, before & after fetching (use //.finally()//)
		4. Remember to //**include headers**// for access token and the like
11. actionTypes.js 
	a. export a variable containing a string command for input in reducer
	b. ref (https://redux-resource.js.org/api-reference/action-types)
12. index.js (///reducers//)
	a. import 'combineReducers' from 'redux', remember to use curly braces
	b. import all the //reducers// from each entity/part
	c. combine them in said combineReducers, by introducing them as params
	d. ref (https://redux.js.org/api/combinereducers/)
13. reducer<entity>
	a. import //all of the actionTypes// needed (to prevent typo and such)
	b. setup the //**initialState**//, preferrably an //object// containing needed properties, and also //isLoading// & //isError// for handling //loading & errors//
	c. make a function that accepts two params: 
		1. //state// ; this is the //data storage// (default value //initialState//) 
		2. //action// ; the one that is able to change data in //states//
	d. Since //actions// update the state as a whole, use spread operators ( ...rest) to update the state. Also, use //switch-case// or plenty of i//f's//
	e. ref (https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers ; take a look at 'State, Actions, and Reducers')
	f. //**export the reducer**//

**REACT-ROUTER**
* ref (https://reactrouter.com/web/guides/quick-start)
* Basic how-to:
	* ref (https://reactrouter.com/web/guides/primary-components)
	* Keyword is 'Route Matchers'
* Private Route / Navguard
	* ref (https://reactrouter.com/web/example/auth-workflow)
	* Keyword is 'PrivateRoute'
	* Copy the function, and replace '//auth.user//', with your own condition for entering a protected route, say like checking for an access token
	* //**Remember to import the 'PrivateRoute' to App.js to use it**//
* Elements to note:
	* <Switch> ; the prologue to <Route>, used for //matching paths//
	* <Route> ; has an attribute '//path="<url>//', replace <url> with the tail end (e.g. '/users' from 'localhost:3000/users') and React will render its children component if the URL matches the one in the 'path' attribute
	* <Link> ; similar to <a href="<url>">, this one has an attribute called //'to=<url>'// where you can replace the <url> with the tail end of your baseUrl, and it will point the client towards the matching //Route//
	* useHistory: this is the JS Script version of <Link>, once you invoke it (and store it as a variable), you can use //**.push(<url>)**//, to point the client towards a specific <Route>.

**IMPORTS**
1. //useState, useEffect, React// => **react**
2. //useSelector, useDispatch// => **react-redux**
3. //Link, Switch, BrowserRouter, useHistory, useParams// => **react-router-dom**
4. //thunk// from **redux-thunk**

**Notes** :
1. Remember to use //**rfc**// to generate a component template
2. Middleware Logger : (https://redux.js.org/understanding/history-and-design/middleware)
3. Pretty nifty guide on using Thunk:
	a. https://reactgo.com/redux-fetch-data-api/
4. Thunk ref 
	a. (https://github.com/reduxjs/redux-thunk)
	b. https://daveceddia.com/what-is-a-thunk/
5. Remember for //**fetch**// , you need to:
	a. JSON.stringify the content you want to send, inside of //body//
	b. Use 'Content-Type': 'application/json' as //headers// (along with access token, perhaps) if you want to send data to server
	c. Also, data received from //fetch// needs to be converted using //.json()// !