import React, { useState } from 'react'
import FunctionContextComponent from './FunctionContextComponent'
// import ClassContextComponent from "./ClassContextComponent"
import { ThemeProvider } from './ThemeContext'
export const ThemeContext = React.createContext()

export default function App() {
  return (
    <ThemeProvider>
      <FunctionContextComponent />
    </ThemeProvider>
  );
}

// <ClassContextComponent />




