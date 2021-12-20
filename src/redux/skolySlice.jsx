import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getSkoly = createAsyncThunk(
  "skoly/getSkoly",
  async ({ code, count }) => {
    try {
      let promises = [];
      let number = -30;
      const config = {
        method: "GET",
        headers: {
          "x-api-key": "yQbX0qhf4H9gCLO2RcJPB1vLGzHMSOV14qhKjsos",
        },
      };
      for (let i = 0; i < 12; i++) {
        number += 30;
        promises.push(
          axios.get(
            encodeURI(
              `https://api.apitalks.store/skoly/?filter={"limit":30,"skip":${number},"where":{"Reditelstvi.Okres":"${code}"}}`
            ),
            config
          )
        );
      }
      let allSkoly = [];
      const newPromise = await Promise.allSettled(promises).then((values) => {
        values.map((values) => {
          if (values.value.data.data.length > 0) {
            allSkoly.push(...values.value.data.data);
          }
        });
      });
      return allSkoly;
    } catch (error) {
      return error;
    }
  }
);

const skolySlice = createSlice({
  name: "skoly",
  initialState: {
    skoly: [],
    status: null,
    error: null,
  },
  reducers: {
    clearSkolyArr: (state, action) => {
      state.skoly = [];
    },
  },
  extraReducers: {
    [getSkoly.pending]: (state) => {
      state.status = "loading";
    },
    [getSkoly.fulfilled]: (state, action) => {
      state.skoly = [...state.skoly, ...action.payload];
      state.status = "success";
    },
    [getSkoly.rejected]: (state) => {
      state.status = "failed";
    },
  },
});
export const { clearSkolyArr } = skolySlice.actions;

export default skolySlice.reducer;
