import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../services/UserDetails";
export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData: User) => {
    const response = await fetch(
      "https://642ec45a8ca0fe3352d85666.mockapi.io/userdetails",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );
    const data = await response.json();
    return data;
  }
);
export const loginUserAsync = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string, password: string }) => {
    const response = await fetch(
      `https://642ec45a8ca0fe3352d85666.mockapi.io/userdetails?username=${username}&password=${password}`
    );
    const data = await response.json();
    if (data.length > 0) {
      return data[0];
    } else {
      throw new Error("Invalid username or password");
    }
  }
);
