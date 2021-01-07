import React, { useContext } from 'react'
import { VocabContext } from './components/FunctionContextComponent/VocabProvider'

export const Words = (props) => {
    const {
        state: { hidden },
        passVocabBack,
        passVocabForward
    } = useContext(VocabContext);
    return (
        <div hidden={props.id !== hidden}>
            <p>{props.vocab}</p>
            <p>{props.category}</p>
            <button onClick={() => { passVocabBack() }}>That wasn't difficult.</button>
            <button onClick={() => { passVocabForward() }}>That was really difficult!</button>
        </div>
    )
}



export default Words