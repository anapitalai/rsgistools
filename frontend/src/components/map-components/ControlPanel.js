import React from 'react'

const ControlPanel = (props) => {
    const {year} = props;
    return (
        <div className="control-panel">
          <h3>Coral Reef Bleaching in PNG</h3>
          <p>
            Map showing coral bleached area.
          </p>
 
          <hr />
    
          <div key={'year'} className="input">
            <label>Coral Bleached Areas Overtime </label>
            <input
              type="range"
              value={year}
              min={1995}
              max={2015}
              step={1}
              onChange={evt => props.onChange(evt.target.value)}
            />
          </div>
        </div>
      );
}

export default ControlPanel


