import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Divider, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { router } from 'Constants/constants';
import { useTranslation } from 'react-i18next';

NavigationBar.propTypes = {};

const useStyles = makeStyles((theme) => ({
  appBarNavigation: {
    display: 'flex',
    width: '100%',
    '&>a': {
      textDecoration: 'none',
      '& button': {
        marginRight: '16px',
      },
    },
    '& a.active': {
      '& button': {
        color: 'red',
      },
    },
  },
}));

function NavigationBar(props) {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  return (
    <Box className={classes.appBarNavigation}>
      <NavLink exact to={router.home}>
        <Button startIcon={<HomeOutlinedIcon />}>{t('common.home')}</Button>
      </NavLink>
      <Divider />
      <NavLink to={router.news}>
        <Button startIcon={<WhatshotIcon />}>{t('common.news')}</Button>
      </NavLink>
    </Box>
  );
}

export default NavigationBar;
