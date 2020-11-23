import React from 'react';
import {useRouteMatch, Link as RouteLink} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

import EditCategoryDialog from './EditCategoryDialog';
import DeleteCategoryDialog from './DeleteCategoryDialog';

const useStyles = makeStyles((theme) => ({
  actions: {
    display: 'flex',
  }
}))

function ActionButtons(props) {
  const classes = useStyles();
  return (
    <div className={classes.actions}>
      <EditCategoryDialog />
      <DeleteCategoryDialog />
    </div>
  );
}

const columns = [
  { field: 'id', headerName: 'ID', width: 70, disableClickEventBubbling: true, },
  { field: 'name', headerName: 'Name', width: 300, disableClickEventBubbling: true,},
  { field: 'description', headerName: 'Description', width: 250, disableClickEventBubbling: true },
  {
    field: 'actions',
    width: 120,
    headerName: 'Actions',
    renderCell: (params) => <ActionButtons user={params.value} />,
    disableClickEventBubbling: true,
  },
];

export default function CategoryTable(props) {
  const rows = props.categories.map((item, index) => ({
    id: index, 
    name: item.name, 
    description: item.description
  }))

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}
