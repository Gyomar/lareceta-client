import { useDispatch } from "react-redux";
import {
  setIsLoggedIn,
  setRowidUser,
} from "@reducers/session.slice";
import { useAxios } from "@hooks/useAxios";
import axios from 'axios';
import Cookie from 'js-cookie';
import endPoints from '@api';

  export const useSignIn = async (email, password) => {

    const dispatch = useDispatch(); 

    const session = await useAxios("post", endPoints.auth.login, { email, password });
    if (session.token) {
      const token = session.token;
      Cookie.set('token', token, { expires: 5 });
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      dispatch(setIsLoggedIn(true));
      dispatch(setRowidUser(session.user.rowid));
    }
  }