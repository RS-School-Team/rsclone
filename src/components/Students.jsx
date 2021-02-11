import React, { useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  ButtonGroup,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import {
  changeSort,
  fetchOrders,
  updateOrderStatus,
} from '../slices/ordersSlice';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    margin: '0 auto',
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

const Students = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.app.token);
  useEffect(() => {
    dispatch(fetchOrders(token));
  }, []);
  let activeSort = useSelector((state) => state.orders.activeSort);
  const sortingTypes = ['accepted', 'pending', 'declined', 'archive'];
  const handleChange = (e) => {
    dispatch(changeSort(e.target.value));
  };
  const handleClick = (id, status) => {
    dispatch(updateOrderStatus([id, token, status]));
  };

  const orders = useSelector((state) =>
    state.orders.orders.filter((order) => order.status === activeSort)
  );
  const getNameFromOrder = (order) => {
    const { firstName, lastName } = order.executorID.name;
    return `${firstName} ${lastName}`;
  };

  return (
    <React.Fragment>
      <FormControl variant="outlined">
        <Select
          native
          inputProps={{
            name: 'sort-teachers',
            id: 'select-sort-teachers',
          }}
          onChange={handleChange}
          style={{ marginBottom: '1ch' }}
        >
          {sortingTypes.map((type) => (
            <option value={type}>{type.toUpperCase()}</option>
          ))}
        </Select>
      </FormControl>
      <List className={classes.root}>
        {orders.map((order) => (
          <ListItem key={order._id} button>
            <ListItemText primary={getNameFromOrder(order)} key={order._id} />
            <ListItemSecondaryAction key={order._id}>
              <Button
                className={classes.button}
                variant="outlined"
                color="primary"
                onClick={() => handleClick(order._id, 'accepted')}
              >
                Accept
              </Button>

              <Button
                className={classes.button}
                variant="outlined"
                color="secondary"
                onClick={() => handleClick(order._id, 'declined')}
              >
                Decline
              </Button>
              {order.status === 'accepted' && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleClick(order._id, 'archive')}
                >
                  Send to archive
                </Button>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student's name</TableCell>
            <TableCell>Tasks done</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
      </Table> */}
    </React.Fragment>
  );
};

export default Students;
