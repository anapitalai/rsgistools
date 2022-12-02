import { Container } from 'react-bootstrap'

import React from 'react';
import { useValue } from '../../context/ContextProvider';

const marks = [
  { value: 0, label: '$0' },
  { value: 25, label: '$25' },
  { value: 50, label: '$50' },
];

const CoralSlider = () => {
  const {
    state: { priceFilter },
    dispatch,
  } = useValue();
  return (
    <Container sx={{ mt: 5 }}>
      <h2>Max Price: {'$ ' + priceFilter}</h2>
      <Slider
        min={0}
        max={50}
        defaultValue={50}
        valueLabelDisplay="auto"
        marks={marks}
        value={priceFilter}
        onChange={(e, price) =>
          dispatch({ type: 'FILTER_PRICE', payload: price })
        }
      />
    </Container>
  );
};

export default CoralSlider;