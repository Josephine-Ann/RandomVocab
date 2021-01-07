import React, { useContext } from 'react'
// import { PatientCardList } from '../PatientCardList/PatientCardList';
// import { Header } from '../Header/Header';
import { VocabContext } from './components/FunctionContextComponent/VocabProvider'
import { Words } from './Words';

export const FunctionContextComponent = () => {
    const {
        state: { newVocabulary },
        addVocab,
        setNewName,
        setNewTranslation,
        rotateVocab,
        login,
        logout
    } = useContext(VocabContext);
    return (
        <div>
            <div>
                <button onClick={() => { login() }}>Login</button>
                <button onClick={() => { logout() }}>Logout</button>
                <form>
                    <input onChange={(e) => { setNewName(e.target.value) }} />
                    <input onChange={(e) => { setNewTranslation(e.target.value) }} />
                    <button onClick={() => { addVocab() }} >Submit</button>
                </form>
                {
                    newVocabulary.map((voc) => {
                        return <Words key={voc.id} {...voc} />
                    })
                }
                <button onClick={() => { rotateVocab('new') }}>New</button>
                <button onClick={() => { rotateVocab('old') }}>Old</button>
                <button onClick={() => { rotateVocab('med') }}>Med</button>
            </div>
        </div>
    )
}

