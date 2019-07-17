import { categoriesReducer, fetchAllCategories } from './categories';

describe("categories reducer actions", () => {
  const initialState = {
    alreadyFetched: false,
    rows: [{id:2,test:"test2"}],
  }
  it("category already fetch", () => {
    const action = {
      type: "CATEGORY_SET_ALREADY_FETCHED"
    };
    const expectedState = {
      ...initialState,
      alreadyFetched: true,
    }
    const inputState=categoriesReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
  it("category fetch row done", () => {
    const action = {
      type: "CATEGORY_FETCH_ROWS_DONE",
      payload:[{test:"test1"}]
    };
    const expectedState = {
      ...initialState,
      rows:[{test:"test1"}]
    }
    expect(categoriesReducer(initialState, action)).toEqual(expectedState);
  });
  it("category post done", () => {
    const action = {
      type: "CATEGORY_POST_DONE",
      payload:{test:"test1"}
    };
    const expectedState = {
      ...initialState,
      rows:[...initialState.rows,{test:"test1"}]
    }
    expect(categoriesReducer(initialState, action)).toEqual(expectedState);
  });
  it("category put done", () => {
    const action1 = {
      type: "CATEGORY_PUT_DONE",
      payload:{id:1,test:"test1"}
    };
    const action2 = {
        type: "CATEGORY_PUT_DONE",
        payload:{id:2,test:"test3"}
      };
    const expectedState1 = {
      ...initialState,
      rows:[...initialState.rows]
    }
    const expectedState2 = {
        ...initialState,
        rows:[{id:2,test:"test3"}]
      }
    expect(categoriesReducer(initialState, action1)).toEqual(expectedState1);
    expect(categoriesReducer(initialState, action2)).toEqual(expectedState2);
  });
  it("category delete done", () => {
    const action = {
      type: "CATEGORY_DELETE_DONE",
      payload:2
    };
    const expectedState = {
      ...initialState,
      rows:[]
    }
    expect(categoriesReducer(initialState, action)).toEqual(expectedState);
  });
});
