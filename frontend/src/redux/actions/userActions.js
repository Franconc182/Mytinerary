import axios from "axios";

const userActions = {
  signUp: (data) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/auth/signUp",
          data
        );
        dispatch({
          type: "MESSAGE",
          payload: {
            view: true,
            message: res.data.message,
            success: res.data.success,
          },
        });
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  },

  signIn: (data) => {
    //console.log(data)
    return async (dispatch, getState) => {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/auth/signIn",
          data
        );
        //console.log(res)
        if (res.data.success) {
          localStorage.setItem("token", res.data.response.token);
          dispatch({ type: "USER", payload: res.data.response.user });
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  },

  signOut: (mail) => {
    return async (dispatch, getState) => {
      await axios.post("http://localhost:4000/api/auth/signOut", { mail });
      localStorage.removeItem("token");
      dispatch({
        type: "USER",
        payload: null,
      });
    };
  },

  verifyToken: (token) => {
    return async (dispatch, getState) => {
      //console.log(token)
      const user = await axios.get(
        "http://localhost:4000/api/auth/verifyToken",
        { headers: { Authorization: "Bearer " + token } }//bearer metodo de https request para auntenticar y autorizar usuario
      );
      if (user.data.success) {
        dispatch({
          type: "USER",
          payload: user.data.response,
        });
        dispatch({
          type: "MESSAGE",
          payload: {
            view: true,
            message: user.data.message,
            success: user.data.success,
          },
        });
      } else {
        localStorage.removeItem("token");
      }
    };
  },
};

export default userActions;