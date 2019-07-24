import validator from 'validator';

//Use for refresh "store.rows" after update row.
export const replaceRowInRows = (rows, replaceRow) => {
  const newRows = [];
  for (const row of rows) {
    if (row.id === replaceRow.id) {
      newRows.push(replaceRow)
    }
    else {
      newRows.push(row)
    }
  }
  return newRows
}

//Use for refresh "store.rows" after delete row.
export const deleteRowFromRows = (rows, deleteRowId) => {
  const newRows = [];
  for (const row of rows) {
    if (row.id !== deleteRowId) {
      newRows.push(row)
    }
  }
  return newRows
}


export const validateForm  = (validationSettings, values) => {
  let errors = {}
  for (const [method, fields] of Object.entries(validationSettings)) {
    errors = {...errors, ...validateByMethod(method, fields, values)}
  }
  return Object.keys(errors).length === 0 ? null : errors
}

const validateByMethod = (method, fields, values) => {
  const errors = {}
  
  //key check if method isEmpty
  if (method === 'isEmpty') {
    for (let key of fields) {
      if (!(key in values)) {
        errors[key] = true
      }
    }
  }
  
  //value check
  for (let key of Object.keys(values)) {
    if (fields.indexOf(key) >= 0) {
      const value = String(values[key])
      let result = null
      switch (method) {
        case 'isEmpty':
          result = validator.isEmpty(value) ? true : null
          break
        case 'isEmail':
          if (!validator.isEmpty(value) && !validator.isEmail(value)) {
            result = true
          }
          break
        case 'isNumeric':
          if (!validator.isEmpty(value) && !validator.isNumeric(value)) {
            result = true
          }
          break
        default:
      }//switch
      if (result === true) {
        errors[key] = true
      }
    }
  }//for(key)
  return errors
}

