import React from 'react'
import { FunctionContextComponent } from '../FunctionContextComponent/FunctionContextComponent'
import { VocabProvider } from '../VocabProvider'
export const VocabContext = React.createContext()

export default function App() {
  return (
    <VocabProvider>
      <FunctionContextComponent />
    </VocabProvider>
  );
}




