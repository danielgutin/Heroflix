import React from 'react';

export default function EditField(props) {
  return (
    <div className="EditModal_fields-field">
        <label htmlFor="">{props.label}</label>
        <input onChange={props.change} type="text" value={props.value}/>
    </div>
  )
}
