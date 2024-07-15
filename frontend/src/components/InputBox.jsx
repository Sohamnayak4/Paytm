import React from 'react'

export default function InputBox({text,placeholder,onChange}) {
  return (
    <>
        <div className='text-sm font-medium text-left py-2'>
            {text}
        </div>
        <input onChange={onChange} type='text' placeholder={placeholder} className='w-full px-2 py-1 border rounded border-slate-200' />
    </>
  )
}
