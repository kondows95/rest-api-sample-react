import { ordersReducer, setRequestParams, postOrder } from '../order';
import mockAxios from "axios";
import { async } from 'q';

//Reducer testing
describe("categories reducer actions", () => {
  const initialState = {
    postResultObj: null,
    requestParams: null,
  }

  it("order set request params", () => {
    const action = {
      type: "ORDERS_SET_REQUEST_PARAMS",
      payload: { first_name: "toko", last_name: "toko" }
    };
    const expectedState = {
      ...initialState,
      requestParams: { first_name: "toko", last_name: "toko" },
      postResultObj: null
    }
    const inputState = ordersReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });

  it("make order", () => {
    const action = {
      type: "ORDERS_POST_DONE",
      payload: { first_name: "toko", last_name: "toko" }
    };
    const expectedState = {
      ...initialState,
      requestParams: null,
      postResultObj: { first_name: "toko", last_name: "toko" }
    }
    const inputState = ordersReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });

  it("default", () => {
    const action = {
      type: "Default"
    };
    const expectedState = {
      ...initialState
    }
    const inputState = ordersReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
});
//=============================================================================
//　ActionCreators
//=============================================================================
describe("ActionCreators Testing", () => {
  const getState = () => {
    return {
      cart: {
        totalPrice: 8000,
        rows: [
          { id: 1, quantity: 2, price: 2000 },
          { id: 2, quantity: 4, price: 1000 }
        ]
      },
      order:{
        requestParams: { id: 1, quantity: 2, price: 2000 }
      },
      auth: {
        user: {
          signInUserSession: {
            accessToken: { jwtToken: "123456789" }
          }
        }
      }
    }
  }
 
  const addressFrom = {
    first_name: "Manda",
    last_name: "lay",
  };

  it("set request params", () => {
    const expectedAction = [{
      type: 'ORDERS_SET_REQUEST_PARAMS',
      payload: {
        ...addressFrom,
        total_price: 8000,
        item_id_array: [1, 2],
        item_qty_array: [2, 4],
        item_price_array: [2000, 1000]
      }
    }]
    const dispatch = jest.fn();
    setRequestParams(addressFrom)(dispatch, getState)
    expect(dispatch.mock.calls[0]).toEqual(expectedAction)
  });

  it("post order", async() => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: { id: 1, totalPrice: 8000 } }
      })
    );
    const expectedAction1 = [{
      type: 'ORDERS_POST_DONE',
      payload: { id: 1, totalPrice: 8000 }
    }]
    const expectedAction2 = [{
      type: 'CART_CLEAR_CART'
    }]
    const dispatch = jest.fn();
    await postOrder()(dispatch, getState);
    expect(dispatch.mock.calls[0]).toEqual(expectedAction1);
    expect(dispatch.mock.calls[1]).toEqual(expectedAction2)
  });

});