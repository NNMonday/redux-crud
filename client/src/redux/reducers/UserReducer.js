import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadAllUsers = createAsyncThunk("loadAllUsers", async () => {
  return fetch("http://localhost:9999/users")
    .then((res) => res.json())
    .catch((error) => console.log(error));
});

export const addUser = createAsyncThunk("addUser", async (newUser) => {
  return fetch("http://localhost:9999/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...newUser }),
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
});

export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ updatedUser, id }) => {
    return fetch(`http://localhost:9999/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updatedUser }),
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
  }
);

export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
  return fetch(`http://localhost:9999/users/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadAllUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.result;
    });
    builder.addCase(loadAllUsers.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload.result);
    });
    builder.addCase(addUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((u) => u._id !== action.payload.deletedId);
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedUser = action.payload.result;
      const index = state.data.findIndex(
        (user) => user._id === updatedUser._id
      );
      if (index !== -1) {
        state.data[index] = updatedUser;
      }
    });

    builder.addCase(updateUser.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
