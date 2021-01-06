import React, { useContext } from 'react'
// import { PatientCardList } from '../PatientCardList/PatientCardList';
// import { Header } from '../Header/Header';
import { VocabContext } from './components/FunctionContextComponent/VocabProvider'

export const FunctionContextComponent = () => {
    const {
        state: { vocabulary },
        addVocab,
        setNewName,
        setNewTranslation,
        hidden
    } = useContext(VocabContext);
    return (
        <div>
            {
                vocabulary.length === 0 ? (
                    <div>
                        <p>No hi</p>
                    </div>
                ) : (
                        <div>
                            <p>Hi</p>
                            <form>
                                <p id="43" hidden={hidden !== 43}>Easy</p>
                                <input onChange={(e) => { setNewName(e.target.value) }} />
                                <input onChange={(e) => { setNewTranslation(e.target.value) }} />
                                <button onClick={() => { addVocab() }} >Submit</button>
                            </form>
                        </div>
                    )
            }
        </div>
    )
}