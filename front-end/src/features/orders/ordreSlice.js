import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

// function : get all
export const fetchOrdres = createAsyncThunk(
    "ordres/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosClient.get("/ordres");
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Erreur lors du chargement des ordres");
        }
    }
);

// function : get id
export const fetchOrdreById = createAsyncThunk(
    "ordres/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosClient.get(`/ordres/${id}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Ordre non trouvé");
        }
    }
);

// function : get user auth
export const fetchOrdresByUserId = createAsyncThunk(
    "ordres/fetchByUserId",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosClient.get(`/ordres-user`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Ordres non trouvées");
        }
    }
);

// function : get store_id
export const fetchOrdresByStoreId = createAsyncThunk(
    "ordres/fetchByStoreId",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosClient.get(`/ordres-store`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Ordres non trouvées");
        }
    }
);

// function : creer
export const createOrdre = createAsyncThunk(
    "ordres/create",
    async (ordreData, { rejectWithValue }) => {
        try {
            const res = await axiosClient.post("/ordres", ordreData);
            console.log(res.data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Erreur lors de la création de l'ordre");
        }
    }
);

// function : modifier
export const updateOrdre = createAsyncThunk(
    "ordres/update",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const res = await axiosClient.put(`/ordres/${id}`, updatedData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Erreur lors de la mise à jour de l'ordre");
        }
    }
);

// function : supprimer
export const deleteOrdre = createAsyncThunk(
    "ordres/delete",
    async (id, { rejectWithValue }) => {
        try {
            await axiosClient.delete(`/ordres/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Erreur lors de la suppression de l'ordre");
        }
    }
);

const ordreSlice = createSlice({
    name: "ordres",
    initialState: {
        ordres: [],
        currentOrdre: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // fetch all
        builder
            .addCase(fetchOrdres.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrdres.fulfilled, (state, action) => {
                state.loading = false; state.ordres = action.payload;
            })
            .addCase(fetchOrdres.rejected, (state, action) => {
                state.loading = false; state.error = action.payload;
            });

        // fetch id
        builder
            .addCase(fetchOrdreById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrdreById.fulfilled, (state, action) => {
                state.loading = false; state.currentOrdre = action.payload;
            })
            .addCase(fetchOrdreById.rejected, (state, action) => {
                state.loading = false; state.error = action.payload;
            });

        // fetch auth
        builder
            .addCase(fetchOrdresByUserId.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrdresByUserId.fulfilled, (state, action) => {
                state.loading = false;
                state.ordres = action.payload;
                console.log("ok",action.payload);
            })
            .addCase(fetchOrdresByUserId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log("rejected", action.payload);
            });

        // fetch store_id
        builder
            .addCase(fetchOrdresByStoreId.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrdresByStoreId.fulfilled, (state, action) => {
                state.loading = false;
                state.ordres = action.payload;
                console.log("ok",action.payload);
            })
            .addCase(fetchOrdresByStoreId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log("rejected", action.payload);
            });

        // creer
        builder
            .addCase(createOrdre.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrdre.fulfilled, (state, action) => {
                state.loading = false;
                state.ordres.push(action.payload);
                console.log("ok",action.payload);
            })
            .addCase(createOrdre.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log("rejected", action.payload);
            });

        // modifier
        builder
            .addCase(updateOrdre.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateOrdre.fulfilled, (state, action) => {
                state.loading = false;
                const updated = action.payload;
                state.ordres = state.ordres.map((o) => o.id === updated.id ? updated : o);
            })
            .addCase(updateOrdre.rejected, (state, action) => {
                state.loading = false; state.error = action.payload;
            });

        // supprimer
        builder
            .addCase(deleteOrdre.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteOrdre.fulfilled, (state, action) => {
                state.loading = false;
                state.ordres = state.ordres.filter((o) => o.id !== action.payload);
            })
            .addCase(deleteOrdre.rejected, (state, action) => {
                state.loading = false; state.error = action.payload;
            });
    },
});

export default ordreSlice.reducer;
