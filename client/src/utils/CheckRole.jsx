import React from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

export default function CheckRole(props) {
  const { user } = React.useContext(UserContext);

  if ("not" in props) {
    if (props.not && user.role === props.role) {
      return <Redirect to="/home" />;
    }
    return <div />
  } else {
    if (user.role !== props.role) {
      return <Redirect to="/home" />;
    }
    return <div />
  }
}
