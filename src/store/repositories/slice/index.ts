import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRepositories } from "../services";
import { IRepositoryResponse, IRepositoriesStateSchema } from "../types";

const initialState: IRepositoriesStateSchema = {
    items: [],
    total_count: 0,
    loading: false,
    error: false,
}

const repositoriesSlice = createSlice({
    name: 'repositories',
    initialState,
    reducers: {
        resetResults: () => {
            return initialState
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchRepositories.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchRepositories.fulfilled, (state, action: PayloadAction<IRepositoryResponse>) => {
                state.items = state.items.concat(action.payload.items);
                state.total_count = action.payload.total_count;
                state.error = false;
                state.loading = false;
            })
            .addCase(fetchRepositories.rejected, (state) => {
                state.error = true;
                state.loading = false;
            })
    },
})

export const { actions: repositoriesActions } = repositoriesSlice;
export const { reducer: repositoriesReducer } = repositoriesSlice;