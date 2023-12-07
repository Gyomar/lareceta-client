import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useAxios } from "@hooks/useAxios";
import endPoints from '@api';
import { setLoading, setSnackbar } from "@reducers/ui.slice";

const initialState = {
  activeStep: 0,
  id: "",
  puntoVenta: "",
  calificaProducto: 0,
  calificaServicio: 0,
  calificaNps: 0,
  mejora: {
    presentacionProducto: {estado: false, valor: "Presentacion del producto"},
    calidadProducto: {estado: false, valor: "Calidad del producto"},
    temperaturaProducto: {estado: false, valor: "Temperatura del producto"},
    tiempoEspera: {estado: false, valor: "Tiempos de Servicio o espera"},
    actitudAsesores: {estado: false, valor: "Actitud de los asesores"},
    variedadMenu: {estado: false, valor: "Variedad del menu"},
    ambientes: {estado: false, valor: "Ambiente de los restaurantes"},
    precios: {estado: false, valor: "Precios"}
  },
  nota: "",
  nombre: "",
  apellido: "",
  cedula: "",
  celular: "",
  email: ""
};

export const fetchEncuesta = createAsyncThunk(
  "encuesSatisIlforno/fetchEncuesta",
  async ({limit, offset}, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const encuestasCount = await useAxios("get", endPoints.getCountEncuestas);
      const encuestasRes = await useAxios("get", endPoints.getEncuestas(limit, offset));
      dispatch(setCountEncuestas(encuestasCount));
      dispatch(setEncuestas(encuestasRes));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  }
);

export const postEncuesta = createAsyncThunk(
  "encuesSatisIlforno/postEncuesta",
  async ({nuevaEncuesta}, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await useAxios("post", endPoints.encuesSatisIlforno.addEncuesta, nuevaEncuesta);
      dispatch(setLoading(false));
      dispatch(setActiveStep(3));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setSnackbar({ children: error, severity: "error" }));
    }
  }
);

export const delEncuesta = createAsyncThunk(
  "encuesSatisIlforno/delEncuesta",
  async ({filaid, limit, offset}, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await useAxios("delete", endPoints.deleteEncuesta(filaid));
      dispatch(fetchEncuesta({limit, offset}));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  }
);
  
export const patchEncuesta = createAsyncThunk(
  "encuesSatisIlforno/putEncuesta",
  async ({filaid, updatedRecord, limit, offset}, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await useAxios("patch", endPoints.updateEncuesta(filaid), updatedRecord);
      dispatch(fetchEncuesta({limit, offset}));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  }
);

export const encuesSatisIlfornoSlice = createSlice({
  name: "encuesSatisIlforno",
  initialState,
  reducers: {
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setPuntoVenta: (state, action) => {
      state.puntoVenta = action.payload;
    },
    setCalificaProducto: (state, action) => {
      state.calificaProducto = action.payload;
    },
    setCalificaServicio: (state, action) => {
      state.calificaServicio = action.payload;
    },
    setCalificaNps: (state, action) => {
      state.calificaNps = action.payload;
    },
    setMejora: (state, action) => {
      state.mejora = action.payload;
    },
    setNota: (state, action) => {
      state.nota = action.payload;
    },
    setNombre: (state, action) => {
      state.nombre = action.payload;
    },
    setApellido: (state, action) => {
      state.apellido = action.payload;
    },
    setCedula: (state, action) => {
      state.cedula = action.payload;
    },
    setCelular: (state, action) => {
      state.celular = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setActiveStep, setId, setPuntoVenta, setCalificaProducto, setCalificaServicio, setCalificaNps, setMejora, setNota, setNombre, setApellido, setCedula, setCelular, setEmail} = encuesSatisIlfornoSlice.actions;

export default encuesSatisIlfornoSlice.reducer;
