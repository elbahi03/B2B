import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

// function : get all
export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get("/users");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Erreur lors du chargement des utilisateurs");
    }
  }
);

// function : get id
export const fetchUserById = createAsyncThunk(
  "users/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get(`/users/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Utilisateur non trouvé");
    }
  }
);

// function : modifier
export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const res = await axiosClient.put(`/users/${id}`, userData);
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Erreur lors de la mise à jour");
    }
  }
);

// function : suprimmer
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/users/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Erreur lors de la suppression");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    userDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetch all
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // fetch id
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // fetch id
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.map((u) =>
          u.id === action.payload.id ? action.payload : u
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // fetch id
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((u) => u.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
