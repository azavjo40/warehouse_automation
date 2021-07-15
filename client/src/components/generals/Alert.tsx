import React from "react"

export const Alert: React.FC<any> = ({ text }) => {
  return (
    <div className='alert btn' key={text}>
      {text}
    </div>
  )
}
export default Alert
