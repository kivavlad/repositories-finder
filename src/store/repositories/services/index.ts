import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRepositoryResponse } from "../types";

interface ISearchData {
    name: string;
    page: number;
    per_page: number;
}

export const fetchRepositories = createAsyncThunk<IRepositoryResponse, ISearchData>(
    'repositories/fetchRepositories',
    async function(data) {
        const response = await fetch(`https://api.github.com/search/repositories?q=${data.name}&page=${data.page}&per_page=${data.per_page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        })

        return await response.json() as IRepositoryResponse;
    }
)