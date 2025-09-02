import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BookPage, Occupation } from './types';

export interface MasterState {
  isFetching: boolean;
  testimonials: any[];
  occupations: Occupation[];
  bookPages: BookPage[];
  provinces: any[];
}

const initialState: MasterState = {
  isFetching: false,
  testimonials: [],
  occupations: [],
  bookPages: [],
  provinces: [],
};

const masterSlice = createSlice({
  name: 'master',
  initialState,
  reducers: {
    loadTestimonials(state, action: PayloadAction<{ data: any[]; isFetching: boolean }>) {
      state.testimonials = action.payload.data;
      state.isFetching = action.payload.isFetching;
    },
    loadOccupations(state, action: PayloadAction<{ data: Occupation[]; isFetching: boolean }>) {
      state.occupations = action.payload.data;
      state.isFetching = action.payload.isFetching;
    },
    loadBookPages(state, action: PayloadAction<{ data: BookPage[]; isFetching: boolean }>) {
      state.bookPages = action.payload.data;
      state.isFetching = action.payload.isFetching;
    },
    loadProvinces(state, action: PayloadAction<{ data: any[]; isFetching: boolean }>) {
      state.provinces = action.payload.data;
      state.isFetching = action.payload.isFetching;
    },
  },
});

export const { loadTestimonials, loadOccupations, loadBookPages, loadProvinces } = masterSlice.actions;

export default masterSlice.reducer;
