import { itemsReducer, fetchAllItems, deleteItem, saveItem, setCategoryId } from '../items';
import mockAxios from "axios";
import { Storage } from 'aws-amplify';
//Reducer testing
describe("item reducer actions", () => {
  const initialState = {
    alreadyFetched: false,
    rows: [],
    error: "",
    loading: false,
    selectedCateogryId: null,
    noMoreFetch: false,
  }
  const state = {
    alreadyFetched: false,
    rows: [{ id: 1, name: "item1" }, { id: 2, name: "item2" }],
    error: "",
    selectedCateogryId: null,
    noMoreFetch: false,
  }
  it("item set already fetched", () => {
    const action = {
      type: 'ITEM_SET_ALREADY_FETCHED'
    };
    const expectedState = {
      ...initialState,
      alreadyFetched: true
    }
    const inputState = itemsReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
  it("item fetch rows done", () => {
    const action = {
      type: 'ITEM_FETCH_ROWS_DONE',
      payload: [{ id: 1, name: "item1" }]
    };
    const expectedState = {
      ...initialState,
      rows: [...initialState.rows, ...[{ id: 1, name: "item1" }]]
    }
    const inputState = itemsReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
  it("item post done", () => {
    const action = {
      type: 'ITEM_POST_DONE',
      payload: { id: 1, name: "item1" }
    };
    const expectedState = {
      ...initialState,
      rows: [...initialState.rows, ...[{ id: 1, name: "item1" }]]
    }
    const inputState = itemsReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
  it("item put done", () => {
    const action = {
      type: 'ITEM_PUT_DONE',
      payload: { id: 1, name: "item2" }
    };
    const expectedState = {
      ...state,
      rows: [{ id: 1, name: "item2" }, { id: 2, name: "item2" }]
    }
    const inputState = itemsReducer(state, action);
    expect(inputState).toEqual(expectedState);
  });

  it("item delete done", () => {
    const action = {
      type: 'ITEM_DELETE_DONE',
      payload: 1
    };
    const expectedState = {
      ...state,
      rows: [{ id: 2, name: "item2" }]
    }

    const inputState = itemsReducer(state, action);
    expect(inputState).toEqual(expectedState);
  });

  it("item set category id", () => {
    const action = {
      type: 'ITEM_SET_CATEGORY_ID',
      payload: 1
    };
    const expectedState = {
      ...state,
      selectedCateogryId: 1
    }

    const inputState = itemsReducer(state, action);
    expect(inputState).toEqual(expectedState);
  });

  it("no more fetch item", () => {
    const action = {
      type: 'ITEM_NO_MORE_FETCH',
    };
    const expectedState = {
      ...state,
      noMoreFetch: true
    }
    const inputState = itemsReducer(state, action);
    expect(inputState).toEqual(expectedState);
  });
  it("default", () => {
    const action = {
      type: 'default',
    };
    const expectedState = {
      ...initialState
    }
    const inputState = itemsReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
});
//=============================================================================
//ActionCreators Testing
//=============================================================================

describe("ActionCreators Testing", () => {
  const getState = () => {
    return {
      items: { rows: [{ id: 1, name: "item1" }] },
      auth: {
        user: {
          signInUserSession: {
            accessToken: { jwtToken: "123456789" }
          }
        }
      }
    }
  }
  const fileData ={
    type: "jpg"
  }
  it("fetch all items with data", async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: [{ id: 1, name: "item1" }] }
      })
    );
    const expectedAction1 =[{
      type: 'ITEM_BEGIN_LOADING'
    }];
    const expectedAction2 = [{
      type: 'ITEM_FETCH_ROWS_DONE',
      payload: [{ id: 1, name: "item1" }]
    }];
    const dispatch = jest.fn();
    await fetchAllItems()(dispatch, getState);
    expect(dispatch.mock.calls[0]).toEqual(expectedAction1);
    expect(dispatch.mock.calls[1]).toEqual(expectedAction2);
  });

  it("fetch all items no data", async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: [] }
      })
    );
    const expectedAction1 =[{
      type: 'ITEM_BEGIN_LOADING'
    }];
    const expectedAction2 = [{
      type: 'ITEM_NO_MORE_FETCH'
    }];
    const dispatch = jest.fn();
    await fetchAllItems()(dispatch, getState);
    expect(dispatch.mock.calls[0]).toEqual(expectedAction1);
    expect(dispatch.mock.calls[1]).toEqual(expectedAction2);
  });

  it("delete item", async () => {
    mockAxios.delete.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: [{ id: 2, name: "item2" }] }
      })
    );
    const expectedAction = [{
      type: 'ITEM_DELETE_DONE',
      payload: 1
    }];
    const dispatch = jest.fn();
    await deleteItem(1)(dispatch, getState);
    expect(dispatch.mock.calls[0]).toEqual(expectedAction);
  });

  it("save item", async () => {
    const item_id = {
      id: 1,
      name: "item 11"
    }
    const item = {
      name: "item 5"
    }
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: { id: 5, name: "item 5" } }
      })
    );
    mockAxios.put.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: { id: 1, name: "item 11" } }
      })
    );
    Storage.put = jest.fn().mockImplementation(
      () => {
         return "successfully upload image"
     });
  
    const expectedAction_post = [{
      type: 'ITEM_POST_DONE',
      payload: { id: 5, name: "item 5" }
    }]
    const expectedAction_put = [{
      type: 'ITEM_PUT_DONE',
      payload: { id: 1, name: "item 11" }
    }]
    const dispatch_put = jest.fn();
    const dispatch_post = jest.fn();
    await saveItem(item_id,"abcd",fileData)(dispatch_put, getState);
    expect(dispatch_put.mock.calls[0]).toEqual(expectedAction_put);
    await saveItem(item,"abcd",fileData)(dispatch_post, getState);
    expect(dispatch_post.mock.calls[0]).toEqual(expectedAction_post)
  });

  it("set category id ", async () => {
    const expectedAction = {
      type: 'ITEM_SET_CATEGORY_ID',
      payload: 5
    };
    const action = setCategoryId(5);
    expect(action).toEqual(expectedAction);
  });
});