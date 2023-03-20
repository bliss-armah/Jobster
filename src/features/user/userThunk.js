import { logoutUser } from "../userSlice";
import customFetch from "../utils/axios";

export const registerUserThunk = async(url,user,thunkAPI)=>{
    try {
        const resp = await customFetch.post("auth/register", user);
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
}