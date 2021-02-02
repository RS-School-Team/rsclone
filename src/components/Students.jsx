import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import {
  MenuItem,
  Select,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

const Students = () => {
  return (
    <React.Fragment>
      <FormControl
        variant="outlined"
        style={{
          minWidth: 150,
        }}
      >
        <Select
          // value={age}
          // onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={0}>Your students</MenuItem>
          <MenuItem value={1}>New requests</MenuItem>
          <MenuItem value={2}>Declined requests</MenuItem>
          <MenuItem value={3}>Archive</MenuItem>
        </Select>
      </FormControl>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student's name</TableCell>
            <TableCell>Tasks done</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </React.Fragment>
  );
};

export default Students;
