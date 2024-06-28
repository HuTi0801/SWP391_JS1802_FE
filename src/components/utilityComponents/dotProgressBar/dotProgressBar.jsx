import React from 'react';
import { makeStyles } from '@mui/system';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  dotProgressBar: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  dot: {
    height: 20,
    width: 20,
    borderRadius: '50%',
    backgroundColor: theme.palette.grey[300],
    border: `2px solid ${theme.palette.primary.main}`,
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  done: {
    backgroundColor: theme.palette.primary.main,
    transform: 'scale(1.2)', // Increase the size of the dot when it's done
  },
}));

const DotProgressBar = ({ progress }) => {
  const classes = useStyles();

  return (
    <div className={classes.dotProgressBar}>
      <div className={clsx(classes.dot, progress >= 1 && classes.done)} />
      <div className={clsx(classes.dot, progress >= 2 && classes.done)} />
    </div>
  );
};

export default DotProgressBar;
