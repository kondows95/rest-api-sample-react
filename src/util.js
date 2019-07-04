export const updateDbRows = (rows, updatedRow) => {
  const newRows = [];
  for (const row of rows) {
    if (row.id === updatedRow.id) {
      newRows.push(updatedRow)
    }
    else {
      newRows.push(row)
    }
  }
  return newRows
}