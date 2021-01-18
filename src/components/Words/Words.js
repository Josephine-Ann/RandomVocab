import React, { useContext } from 'react'
import { VocabContext } from '../../VocabProvider'
import './Words.css'

export const Words = (props) => {
    const {
        state: {
            hidden,
            uid
        },
        passVocabBack,
        passVocabForward
    } = useContext(VocabContext);
    return (
        <div id="words" hidden={props.id !== hidden || !uid}>
            <h1 className="vocab">{props.translation}</h1>
            <div id="bar"></div>
            <div id="card-buttons">
                <button className="card-button" onClick={() => { passVocabBack() }}>Too easy!</button>
                <button className="card-button" onClick={() => { passVocabForward() }}>Too hard!</button>
            </div>
        </div>
    )
}



export default Words