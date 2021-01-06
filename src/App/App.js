import React from 'react'
import { FunctionContextComponent } from '../FunctionContextComponent'
// import ClassContextComponent from "./ClassContextComponent"
import { VocabProvider } from '../components/FunctionContextComponent/VocabProvider'
export const ThemeContext = React.createContext()

export default function App() {
  return (
    <VocabProvider>
      <FunctionContextComponent />
    </VocabProvider>
  );
}

// <ClassContextComponent />




