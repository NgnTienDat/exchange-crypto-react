import { createSlice } from '@reduxjs/toolkit';

const marketDataSlice = createSlice({
  name: 'marketData',
  initialState: {},
  reducers: {
    updateMarketData: (state, action) => {
      const { productId, data } = action.payload;
      state[productId] = data;
    }
  }
});

export const { updateMarketData } = marketDataSlice.actions;
export default marketDataSlice.reducer;
