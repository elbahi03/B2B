import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

// function : Get all roles
export const fetchRoles = createAsyncThunk(
    "roles/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosClient.get("/roles");
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// function : Get users
export const fetchUsersRoles = createAsyncThunk(
    "roles/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosClient.get("/roles-users");
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// function : Get admins
export const fetchAdminsRoles = createAsyncThunk(
    "roles/fetchAdmins",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosClient.get("/roles-admins");
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// function :Get super admins
export const fetchSuperAdmins = createAsyncThunk(
    "roles/fetchSuperAdmins",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosClient.get("/roles-superadmins");
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// function : get id
export const fetchRoleById = createAsyncThunk(
    "roles/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosClient.get(`/roles/${id}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// function : creer role
export const addRole = createAsyncThunk(
    "roles/addRole",
    async (roleData, { rejectWithValue }) => {
        try {
            const res = await axiosClient.post("/roles", roleData);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// function : modifier role
export const updateRole = createAsyncThunk(
    "roles/updateRole",
    async ({ id, roleData }, { rejectWithValue }) => {
        try {
            const res = await axiosClient.put(`/roles/${id}`, roleData);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// function : suprimmer role
export const deleteRole = createAsyncThunk(
    "roles/deleteRole",
    async (id, { rejectWithValue }) => {
        try {
            await axiosClient.delete(`/roles/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const rolesSlice = createSlice({
    name: "roles",
    initialState: {
        roles: [],
        selectedRole: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearSelectedRole: (state) => {
            state.selectedRole = null;
        },
    },

    extraReducers: (builder) => {
        // Fetch all
        builder
            .addCase(fetchRoles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.loading = false;
                state.roles = action.payload.data || action.payload;
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // fetch users
        builder
            .addCase(fetchUsersRoles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersRoles.fulfilled, (state, action) => {
                state.loading = false;
                state.usersRoles = action.payload.data || action.payload;
            })
            .addCase(fetchUsersRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // fetch admins
        builder
            .addCase(fetchAdminsRoles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminsRoles.fulfilled, (state, action) => {
                state.loading = false;
                state.adminsRoles = action.payload.data || action.payload;
            })
            .addCase(fetchAdminsRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // fetch super admins
        builder
            .addCase(fetchSuperAdmins.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSuperAdmins.fulfilled, (state, action) => {
                state.loading = false;
                state.superAdmins = action.payload.data || action.payload;
            })
            .addCase(fetchSuperAdmins.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // fetch id
        builder
            .addCase(fetchRoleById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoleById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentRole = action.payload.data || action.payload;
            })
            .addCase(fetchRoleById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // function : ajouter role
        builder
            .addCase(addRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRole.fulfilled, (state, action) => {
                state.loading = false;
                state.roles.push(action.payload);
                state.successMessage = "Role creer";
            })
            .addCase(addRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // function : modifier role
        builder
            .addCase(updateRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                state.loading = false;
                state.roles = state.roles.map((role) =>
                    role.id === action.payload.id ? action.payload : role
                );
                state.successMessage = "Role modifie";
            })
            .addCase(updateRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // function : supprimer role
        builder
            .addCase(deleteRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRole.fulfilled, (state, action) => {
                state.loading = false;
                state.roles = state.roles.filter((r) => r.id !== action.payload);
                state.successMessage = "Role supprime";
            })
            .addCase(deleteRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearSelectedRole } = rolesSlice.actions;
export default rolesSlice.reducer;
