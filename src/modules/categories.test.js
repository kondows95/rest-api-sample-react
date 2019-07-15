import { categoriesReducer, fetchAllCategories } from './categories';

describe("categories reducer actions", () => {
  const initialState = {
    alreadyFetched: true,
    rows: [{
      "id": 1,
      "name": "Vermeer",
      "deleted_at": null,
      "created_at": "2019-06-30 10:42:24",
      "updated_at": "2019-07-09 03:40:12"
    }],
  }
  it("category already fetch", () => {
    const action = {
      type: "CATEGORY_SET_ALREADY_FETCHED"
    };
    const expectedAction = {
      alreadyFetched: true,
      rows: [{
        "id": 1,
        "name": "Vermeer",
        "deleted_at": null,
        "created_at": "2019-06-30 10:42:24",
        "updated_at": "2019-07-09 03:40:12"
      }],
    }
    expect(categoriesReducer(initialState, action)).toEqual(expectedAction);
  });
  it("category fetch row done", () => {
    const action = {
      type: "CATEGORY_FETCH_ROWS_DONE",
    };
    const expectedAction = {
      alreadyFetched: true,
    }
    expect(categoriesReducer(initialState, action)).toEqual(expectedAction);
  });

});
// describe("fetch all categories actions", () => {
//   it("fetch all category", () => {
//     const expectedAction = {
//       type: 'CATEGORY_FETCH_ROWS_DONE',
//       payload: [
//         {
//           "id": 1,
//           "name": "Vermeer",
//           "deleted_at": null,
//           "created_at": "2019-06-30 10:42:24",
//           "updated_at": "2019-07-09 03:40:12"
//         },
//         {
//           "id": 2,
//           "name": "Rembrandt",
//           "deleted_at": null,
//           "created_at": "2019-06-30 10:42:24",
//           "updated_at": "2019-07-09 04:14:54"
//         },
//         {
//           "id": 3,
//           "name": "Manet",
//           "deleted_at": null,
//           "created_at": "2019-06-30 10:42:24",
//           "updated_at": "2019-06-30 10:42:24"
//         },
//         {
//           "id": 4,
//           "name": "Gogh",
//           "deleted_at": null,
//           "created_at": "2019-06-30 10:42:24",
//           "updated_at": "2019-06-30 10:42:24"
//         },
//         {
//           "id": 5,
//           "name": "Gauguin",
//           "deleted_at": null,
//           "created_at": "2019-06-30 10:42:24",
//           "updated_at": "2019-07-07 08:38:19"
//         },
//         {
//           "id": 6,
//           "name": "Modigliani",
//           "deleted_at": null,
//           "created_at": "2019-06-30 10:42:24",
//           "updated_at": "2019-07-07 08:38:04"
//         }
//        ]
//     }
//     expect(fetchAllCategories()).toEqual(expectedAction);
//   });
 

// });