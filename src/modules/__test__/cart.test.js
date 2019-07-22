import { cartReducer, addCartItem, fetchCartData, deleteCartItem, changeQuantity } from '../cart';
//Reducer testing
describe("categories reducer actions", () => {
  const initialState = {
    rows: [],
    totalQuantity: 0,
    maxQuantity: 0,
    totalPrice: 0,
  }
  const state = {
    "maxQuantity": 1,
    "rows": [
      {
        "id": 1,
        "name": "item1",
        "quantity": 1,
        "subTotal": 1000,
      },
    ],
    "totalPrice": 1000,
    "totalQuantity": 1,
  }
  it("adding item to cart reducer", () => {
    const action = {
      type: 'CART_ADD_ITEM',
      payload: [{ id: 1, name: "item1", quantity: 1 }]
    };
    const expectedState = {
      "maxQuantity": 1,
      "rows": [
        {
          "id": 1,
          "name": "item1",
          "quantity": 1,
          "subTotal": NaN,
        },
      ],
      "totalPrice": NaN,
      "totalQuantity": 1,
    }
    const inputState = cartReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
  it("fetching cart data", () => {
    const action = {
      type: 'CART_FETCH_DATA',
      payload: []
    }
    const expectedState = {
      rows: [],
      totalQuantity: 0,
      maxQuantity: 0,
      totalPrice: 0,
    }
    const inputState = cartReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });

  it("changing cart quantity", () => {
    const action = {
      type: 'CART_CHANGE_QUANTITY',
      payload: [{ id: 1, name: "item1", quantity: 2 }]
    };
    const expectedState = {
      "maxQuantity": 2,
      "rows": [
        {
          "id": 1,
          "name": "item1",
          "quantity": 2,
          "subTotal": NaN,
        },
      ],
      "totalPrice": NaN,
      "totalQuantity": 2,
    }
    const inputState = cartReducer(state, action);
    expect(inputState).toEqual(expectedState);
  });
  it("deleting cart", () => {
    const action = {
      type: 'CART_DELETE_ITEM',
      payload: []
    };
    const expectedState = {
      rows: [],
      totalQuantity: 0,
      maxQuantity: 0,
      totalPrice: 0,
    }
    const inputState = cartReducer(state, action);
    expect(inputState).toEqual(expectedState);
  });

  it("clear cart", () => {
    const action = {
      type: 'CART_CLEAR_CART'
    };
    const inputState = cartReducer(state, action);
    expect(inputState).toEqual(initialState);
  });

  it("default", () => {
    const action = {
      type: 'default',
    };
    const expectedState = {
      ...initialState
    }
    const inputState = cartReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
});
//=============================================================================
//ActionCreators Testing
//=============================================================================

describe("ActionCreators Testing", () => {

  it("add cart item", async () => {
    const getState = () => {
      return { cart: { rows: [{ id: 1, name: "item1", quantity: 2 }, { id: 2, name: "item2", quantity: 1 }] } }
    }
    const item = {
      id: 1, name: "item1", quantity: 0
    }
    const expectedAction = [{
      type: 'CART_ADD_ITEM',
      payload: [{ id: 1, name: "item1", quantity: 3 }, { id: 2, name: "item2", quantity: 1 }]
    }]
    Storage.prototype.setItem = jest.fn(() => 'cart')
    const dispatch = jest.fn();
    addCartItem(item)(dispatch, getState)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(dispatch.mock.calls[0]).toEqual(expectedAction);
  });

  it("fetching cart data", async () => {
    const cart = [{ id: 1, name: "item1", quantity: 2 }, { id: 2, name: "item2", quantity: 2 }]
    Storage.prototype.getItem = jest.fn(() => cart);
    JSON.parse = jest.fn().mockImplementationOnce(() => 
      [{ id: 1, name: "item1", quantity: 2 }, { id: 2, name: "item2", quantity: 2 }]
    );
    const expectedAction = [{
      type: 'CART_FETCH_DATA',
      payload: [{ id: 1, name: "item1", quantity: 2 }, { id: 2, name: "item2", quantity: 2 }]
    }];
    const dispatch = jest.fn();
    fetchCartData()(dispatch)
    expect(dispatch.mock.calls[0]).toEqual(expectedAction);
  });

    it("delete cart item", async () => {
      const item = 2;
      const getState = () => {
        return { cart: { rows: [{ id: 1, name: "item1", quantity: 2 }, { id: 2, name: "item2", quantity: 1 }] } }
      }
      const expectedAction = [{
        type: 'CART_DELETE_ITEM',
        payload: [{ id: 1, name: "item1", quantity: 2 }]
      }]
      Storage.prototype.setItem = jest.fn(() => 'cart')
      const dispatch = jest.fn();
      deleteCartItem(item)(dispatch,getState)
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(dispatch.mock.calls[0]).toEqual(expectedAction);
    });

    it("changing cart item quantity", async () => {
      const item = 1;
      const quantity = 3;
      const getState = () => {
        return { cart: { rows: [{ id: 1, name: "item1", quantity: 2 }, { id: 2, name: "item2", quantity: 1 }] } }
      }
      const expectedAction = [{
        type: 'CART_CHANGE_QUANTITY',
        payload: [{ id: 1, name: "item1", quantity: 3 }, { id: 2, name: "item2", quantity: 1 }] 
      }]
      Storage.prototype.setItem = jest.fn(() => 'cart')
      const dispatch = jest.fn();
      changeQuantity(item, quantity)(dispatch,getState)
      
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(dispatch.mock.calls[0]).toEqual(expectedAction);
    });
});