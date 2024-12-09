import axios from "axios";

// Action Types
export const GET_ADDRESSES = "GET_ADDRESSES";
export const ADD_ADDRESS = "ADD_ADDRESS";
export const EDIT_ADDRESS = "EDIT_ADDRESS";
export const DELETE_ADDRESS = "DELETE_ADDRESS";

// Action Creators
export const getAddresses = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8090/address");
    dispatch({
      type: GET_ADDRESSES,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const addAddress = (addressData) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:8090/address", addressData);
    dispatch({
      type: ADD_ADDRESS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const editAddress = (id, addressData) => async (dispatch) => {
  try {
    const res = await axios.put(`http://localhost:8090/address${id}`, addressData);
    dispatch({
      type: EDIT_ADDRESS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteAddress = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8090/address${id}`);
    dispatch({
      type: DELETE_ADDRESS,
      payload: id,
    });
  } catch (err) {
    console.error(err);
  }
};
