import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

// function : get all
export const fetchStores = createAsyncThunk(
  "stores/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get("/stores");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Erreur lors du chargement des magasins");
    }
  }
);

// function : get id
export const fetchStoreById = createAsyncThunk(
  "stores/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get(`/stores/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Magasin non trouvé");
    }
  }
);

// function : creer
export const createStore = createAsyncThunk(
  "stores/create",
  async (storeData, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post("/stores", storeData);
      console.log(res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Erreur lors de la création du magasin");
    }
  }
);

// function : modifier
export const updateStore = createAsyncThunk(
  "stores/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const res = await axiosClient.put(`/stores/${id}`, updatedData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Erreur lors de la mise à jour");
    }
  }
);

// function : supprimer
export const deleteStore = createAsyncThunk(
  "stores/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/stores/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Erreur lors de la suppression");
    }
  }
);

const storeSlice = createSlice({
  name: "stores",
  initialState: {
    stores: [],
    currentStore: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetch all
    builder
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // fetch id
    builder
      .addCase(fetchStoreById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStoreById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStore = action.payload;
      })
      .addCase(fetchStoreById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // create
    builder
      .addCase(createStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStore.fulfilled, (state, action) => {
        state.loading = false;
        state.stores.push(action.payload);
        console.log("success", action.payload);
      })
      .addCase(createStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("rejected", action.payload);
      });

    // modifier
    builder
      .addCase(updateStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStore.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        state.stores = state.stores.map((store) =>
          store.id === updated.id ? updated : store
        );
      })
      .addCase(updateStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // supprimer
    builder
      .addCase(deleteStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = state.stores.filter((s) => s.id !== action.payload);
      })
      .addCase(deleteStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default storeSlice.reducer;
