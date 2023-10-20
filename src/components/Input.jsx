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
      className='w-[400px] border-none h-10 rounded focus:outline-none p-3 text-black' />
    </div>
  )
}

export default Input
