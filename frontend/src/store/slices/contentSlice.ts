import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ContentState = {
    contentType: 'movie' | 'tv';
};

const initialState: ContentState = {
    contentType: 'movie',
};

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        setContentType(state, action: PayloadAction<'movie' | 'tv'>) {
            state.contentType = action.payload;
        },
    },
});

export const { setContentType } = contentSlice.actions;

export default contentSlice.reducer;
