import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  description: string;
}

interface CarState {
  cars: Car[];
}

const initialState: CarState = {
  cars: [],
};

const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<Car[]>) => {
      state.cars = action.payload;
    },
  },
});

export const { setCars } = carSlice.actions;
export default carSlice.reducer;
