import React from 'react'
import { FunctionContextComponent } from '../FunctionContextComponent'
import { VocabProvider } from '../components/FunctionContextComponent/VocabProvider'
export const VocabContext = React.createContext()

export default function App() {
  return (
    <VocabProvider>
      <FunctionContextComponent />
    </VocabProvider>
  );
}




