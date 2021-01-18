import React, { useContext } from 'react'
import { VocabContext } from '../../VocabProvider'
import { Words } from '../Words/Words';
import './Dashboard.css'

export const Dashboard = () => {
    const {
        state: { newVocabulary, currentlyAdding, category },
        addVocab,
        setNewName,
        setNewTranslation,
        rotateVocab,
        addNew,
        setCategory,
        logout
    } = useContext(VocabContext);
    return (
        <div id="entire-screen">
            <div id="image-grey">
                <div className="levels">
                    <button className={category === 'new' ? "level-button-chosen" : "level-button"} onClick={() => { setCategory('new') }}>Hard</button>
                </div>
                <div className="levels">
                    <button className={category === 'med' ? "level-button-chosen" : "level-button"} onClick={() => { setCategory('med') }}>Medium</button>
                </div>
                <div className="levels">
                    <button className={category === 'old' ? "level-button-chosen" : "level-button"} onClick={() => { setCategory('old') }}>Easy</button>
                </div>
                <div id="adding-container">
                    <div id="button-add">
                        <button onClick={() => { addNew() }} id="cross"></button>
                    </div>
                    <div hidden={!currentlyAdding} id="input">
                        <p>English</p><input onChange={(e) => { setNewName(e.target.value) }} />
                        <p>Spanish</p><input onChange={(e) => { setNewTranslation(e.target.value) }} />
                        <button id="add-new-button" onClick={(e) => { addVocab(e) }}>Add</button>
                    </div>
                </div>
            </div>
            <div id="background">
                <button id="sign-out-button" onClick={() => { logout() }}>Sign out</button>
                <div id="card-box">
                    <div id="card-border"></div>
                    <div id="card">
                        <div id="go-button-box">
                            <button onClick={() => { rotateVocab() }} id="go-button"></button>
                        </div>
                        {
                            newVocabulary.map((voc) => {
                                return <Words key={voc.id} {...voc} />
                            })
                        }
                        <div id="bar"></div>
                    </div>
                </div>
            </div>
        </div>

    )
}
