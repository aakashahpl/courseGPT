import React from 'react'
import CourseModule from '../Homepage'
interface children {
  children: React.ReactNode
}

const layout = ({ children }: children) => {
  return (
    <div>
      <CourseModule>
        {children}
      </CourseModule>
    </div>
  )
}

export default layout