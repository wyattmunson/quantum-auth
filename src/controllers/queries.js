module.exports = {
  test: "test",
  selectAllNotes: `SELECT * FROM notes;`,
  selectNoteById: `SELECT * FROM notes WHERE noteid=$1;`,
  updateNote: `UPDATE notes
    SET userid=$1, notecontent=$2, noteheader=$3, createddate=$4
    WHERE noteid=$5
    RETURNING *`,
  deleteNotes: `DELETE FROM notes WHERE noteid=$1 RETURNING *`
};
