import URL from "./url"
import * as prototype from "./prototype";

// Login middleware
/* export const LOGIN_LOADING = () => ({
  type: prototype.LOGIN_LOADING
}) */

export const LOGIN_REQUEST = () => ({
  type: prototype.LOGIN_REQUEST
})

export const LOGIN_FAILED = (loginRespFail) => ({
  type: prototype.LOGIN_FAILED,
  payload: loginRespFail
})

export const LOGIN_RECEIVED = (loginResp) => ({
  type: prototype.LOGIN_RECEIVED,
  payload: loginResp
})

export const Login_user = (username, password) => async (dispatch) => {
  dispatch(LOGIN_REQUEST(true))
  const CRED = {
    username: username,
    password: password
  };
  return await fetch(URL.url + "users/signin", {
      method: 'POST',
      body: JSON.stringify(CRED),
      headers: {
        "Content-Type": "application/json"
      }
  })
  .then(resp => {
    if (resp.ok) {
      return resp;
    } else {
      const err = new Error("Error" + resp.status + ':' + resp.statusText);
      err.response = resp;
      throw err;
    }
  }, err => {
    var errMess = new Error(err.message);
    throw errMess;
  })
  .then(resp => resp.json())
  .then((resp) => {
    console.log(resp);
    if (resp.success === true) {
      localStorage.setItem("token", resp.token);
      localStorage.setItem("userId", resp.userId);
      dispatch(Get_user_details(resp.userId));
    }
  }).catch(errMess => {dispatch(LOGIN_FAILED(errMess))});
};

// LOGOUT FUNCTIONS

export const LOGOUT_RECEIVED = () => ({
  type: prototype.LOGIN_RECEIVED
})

export const LOGOUT_REQUEST = () => ({
  type: prototype.LOGOUT_REQUEST
})

export const LogOut = () => async (dispatch) => {
  dispatch(LOGOUT_REQUEST())
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userGitHubAcct");
  return await fetch("https://coral-fish-vest.cyclic.app/users/logout", {
      method: "POST",
      headers: {
          "Content_Type": "application/json"
      }
  })
  .then(resp => resp.json())
  .then(resp => {
    dispatch(LOGOUT_RECEIVED());
    window.location.assign(resp.status)
  })
}


// VALIDATE USER DETAILS // GET USER DETAILS.

export const INFO_FAILED = (errMess) => ({
  type: prototype.GET_USER_DETAILS_FAILED,
  payload: errMess
})

export const INFO_LOADING = () => ({
  type: prototype.GET_USER_DETAILS_LOADING
})

export const VALID_INFO = (user_details) => ({
  type: prototype.GET_USER_DETAILS,
  payload: user_details
})


export const Get_user_details= (userId) => async (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");
  return await fetch(URL.url + `upload/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": bearer
      }
  })
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      const err = new Error(`Error ${response.status} : ${response.statusText}`);
      err.response = response;
      throw err;
    }
  }, (err) => {
    const errMess = new Error(err.message);
    throw errMess;
  })
  .then((resp) => resp.json())
  .then((resp) => {
    dispatch(LOGIN_RECEIVED(resp.status));
    if (resp.success === true) {
      localStorage.setItem("userGitHubAcct", resp.status[0].githubname)
      window.location.assign("https://coral-fish-vest.cyclic.app/dashboard")
    } else {
      window.location.assign("https://challenge-umber-six.vercel.app/details")
    }
  })
  .catch(errMess => {dispatch(INFO_FAILED(errMess))});
};