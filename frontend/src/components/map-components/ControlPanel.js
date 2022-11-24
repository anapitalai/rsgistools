// import React, { PureComponent } from 'react';
// import moment from 'moment';

// const defaultContainer = ({ children }) => <div className="control-panel">{children}</div>;

// export default class ControlPanel extends PureComponent {

//   render() {
//     const Container = this.props.containerComponent || defaultContainer;
//     const { settings } = this.props;

//     const getDate = (number) => {
//       let date = moment('2019').add(number - 1, 'months');
//       return date.format('MMM-YYYY')
//     }

//     return (
//       <Container>
//         <h3>Events by state</h3>
//         <p>
//           Map showing the number of CISF events for the month of
//         <b>{getDate(settings.month)}</b>. Hover over a state to see details.
//       </p>
//         <hr />

//         <div key={'month'} className="input">
//           <label>Month</label>
//           <input type="range" value={settings.month} min={1} max={12} step={1} onChange={evt => this.props.onChange('month', evt.target.value)} />
//         </div>
//       </Container>
//     );
//   }
// }

import * as React from 'react';

function ControlPanel() {
  return (
    <div className="control-panel">
      <h3>Marker, Popup, NavigationControl and FullscreenControl </h3>
      <p>
        Map showing top 20 most populated cities of the United States. Click on a marker to learn
        more.
      </p>
      <p>
        Data source:{' '}
        <a href="https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population">
          Wikipedia
        </a>
      </p>
      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/7.0-release/examples/controls"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);


