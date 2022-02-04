import React from 'react';
import Error from '../components/Error';
export default function custom500() {
  return <Error errorCode={500}/>;
}
