import Cookies from 'js-cookie';

//set in cookie
export const setCookie = (key, value) => {
  if(window !== 'undefined'){
    Cookies.set(key, value, {expires: 1});
  }
}

//remove from cookie
export const removeCookie = (key) => {
  if(window !== 'undefined'){
    Cookies.remove(key)
  }

}

// get from cookie such as stored token, it will be useful when we need to communicate/make request to server
export const getFromCookie = (key) => {
  if(window !== 'undefined'){
    return Cookies.get(key)
  }
}

//set in localstorage
export const setLocalStorage = (key, value) => {
  if(window !== 'undefined'){
    localStorage.setItem(key, JSON.stringify(value))
  }
}

//remove from localstorage
export const removeFromLocalStorage = (key) => {
  if(window !== 'undefined'){
    localStorage.removeItem(key)
  }
}

//authenticate user by passing data to localstorage and cookie during signin
export const authenticate = (response, next) => {
  console.log("AUTHENTICATE MIDDLEWARE GETS THIS RESPONSE: ", response)

  setCookie('token', response.data.token);
  setLocalStorage('user', response.data.user);
  next();
}

//access user info from localstorage
export const isAuth =() => {
  if(window !== 'undefined'){
    const cookieTokenChecked = getFromCookie('token');
    if(cookieTokenChecked){
      if(localStorage.getItem('user')){
        return JSON.parse(localStorage.getItem('user'));
      } else {
        return false;
      }
    }
  }
}

//signout user by removing cookie and localstorage
export const signout = (next) => {
  removeCookie('token');
  removeFromLocalStorage('user');
  next();
}

export const updateUserMiddleware = (response, next) => {
  console.log("UPDATE MIDDLEWARE HELPERS: ", response);
  if(window !== 'undefined'){
    let auth = localStorage.getItem('user');
    auth = response.data;
    localStorage.setItem("user", auth);
  }
  next();
}