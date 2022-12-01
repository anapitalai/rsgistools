import React from 'react'

const SideBar = () => {
    return (
        <div className="sidebar">
        <h3>Les Adventures de Tintin</h3>
        <hr />

        <div>
       
          <label>Year: 1930 - 'selectedTime'</label>
          <input
            type="range"
            id = 'slider'
            min={1930}
            max={1989}
            step={1}
            defaultValue='selectedTime'
            value='selectedTime'
            onChange='onChangeDay'
          />
        </div>
        
        <hr/>
        <i>Note: Fictional locations are approximate</i>
      </div>
    )
}

export default SideBar
