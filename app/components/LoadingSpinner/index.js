import React from 'react';
import { RingLoader } from 'react-spinners';
import { View } from 'mdbreact';

const LoadingSpinner = () => (
  <View
    style={{ zIndex: 1000, height: '100vh' }}
    className="d-flex justify-content-center align-items-center sweet-loading"
  >
    <RingLoader
      color={'#123abc'}
      loading
    />
  </View>
);

export default LoadingSpinner;
