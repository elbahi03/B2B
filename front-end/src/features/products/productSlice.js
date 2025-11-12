import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

// function : get all
export const fetchProducts = createAsyncThunk(
    "products/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosClient.get("/products");
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Erreur lors du chargement des produits");
        }
    }
);

// function : get id
export const fetchProductById = createAsyncThunk(
    "products/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosClient.get(`/products/${id}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Produit non trouvé");
        }
    }
);

// function : create
export const createProduct = createAsyncThunk(
    "products/create",
    async (productData, { rejectWithValue }) => {
        try {
            const res = await axiosClient.post("/products", productData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Erreur lors de la création du produit");
        }
    }
);

// function : update
export const updateProduct = createAsyncThunk(
    "products/update",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const res = await axiosClient.put(`/products/${id}`, updatedData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Erreur lors de la mise à jour");
        }
    }
);

// function : delete
export const deleteProduct = createAsyncThunk(
    "products/delete",
    async (id, { rejectWithValue }) => {
        try {
            await axiosClient.delete(`/products/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Erreur lors de la suppression");
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        currentProduct: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // fetch all
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false; state.error = action.payload;
            });

        // fetch id
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false; state.currentProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false; state.error = action.payload;
            });

        // creer
        builder
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false; state.products.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false; state.error = action.payload;
            });

        // modifier
        builder
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const updated = action.payload;
                state.products = state.products.map((p) => p.id === updated.id ? updated : p);
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false; state.error = action.payload;
            });

        // supprimer
        builder
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter((p) => p.id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false; state.error = action.payload;
            });
    },
});

export default productSlice.reducer;
