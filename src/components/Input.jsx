import React from 'react'

const Input = ({id, placeholder, value, onChange }) => {
  return (
    <div>
      <input 
      type="text" 
      id={id} 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className='w-[400px] h-10 border rounded focus:outline-none p-3' />
    </div>
  )
}

export default Input
