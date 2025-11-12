import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

// function : get all
export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get("/categories");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// function : get id
export const fetchCategorieById = createAsyncThunk(
  "categories/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get(`/categories/${id}`);
      return res.data.categorie;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// function : creer
export const addCategorie = createAsyncThunk(
  "categories/addCategorie",
  async (categorieData, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post("/categories", categorieData);
      return res.data["categorie est cree"];
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// function : modifier
export const updateCategorie = createAsyncThunk(
  "categories/updateCategorie",
  async ({ id, categorieData }, { rejectWithValue }) => {
    try {
      const res = await axiosClient.put(`/categories/${id}`, categorieData);
      return res.data["categorie est modifiee"];
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// function : suprimmer
export const deleteCategorie = createAsyncThunk(
  "categories/deleteCategorie",
  async (id, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/categories/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const categorieSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    currentCategorie: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearCategorieMessage: (state) => {
      state.successMessage = null;
    },
  },

  extraReducers: (builder) => {
    // fetch all
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // fetch id
    builder
      .addCase(fetchCategorieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategorieById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCategorie = action.payload;
      })
      .addCase(fetchCategorieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // function : creer
    builder
      .addCase(addCategorie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategorie.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
        state.successMessage = "Catégorie cree";
      })
      .addCase(addCategorie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // function : modifier
    builder
      .addCase(updateCategorie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategorie.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.map((c) =>
          c.id === action.payload.id ? action.payload : c
        );
        state.successMessage = "Catégorie modifiee";
      })
      .addCase(updateCategorie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // function : suprimmer
    builder
      .addCase(deleteCategorie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategorie.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter((c) => c.id !== action.payload);
        state.successMessage = "Catégorie supprimee";
      })
      .addCase(deleteCategorie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCategorieMessage } = categorieSlice.actions;
export default categorieSlice.reducer;
