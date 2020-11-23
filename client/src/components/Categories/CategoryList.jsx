import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import CreateCategoryDialog from './CreateCategoryDialog';
import CategoryTable from './CategoryTable';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  }
}))

export default function CategoryList() {
  const classes = useStyles();
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    axios.get(`/api/categories`)
    .then((res) => {
      setCategories(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  console.log(categories);

  if (!categories) {
    return <div />
  }

  return (
    <Container className={classes.root} maxWidth="md">
      <div className={classes.toolbar}>
        <Typography variant="h4">Categories</Typography>
        <CreateCategoryDialog />
      </div>
      <CategoryTable categories={categories} />
    </Container>
  )
}