import React, { useContext } from 'react'
import { VocabContext } from '../../VocabProvider'
import { Words } from '../Words/Words';
import './Dashboard.css'

export const Dashboard = () => {
    const {
        state: { newVocabulary, currentlyAdding, category, lessThanTen },
        addVocab,
        setNewName,
        setNewTranslation,
        rotateVocab,
        addNew,
        setCategory,
        logout,
        setLessThanTen
    } = useContext(VocabContext);
    return (
        <div id="entire-screen">
            <div id="image-grey">
                <div className="levels" id="hidden-small">
                    <button className={category === 'new' ? "level-button-chosen" : "level-button"} onClick={() => { setCategory('new') }}>Hard</button>
                    <button className={category === 'med' ? "level-button-chosen" : "level-button"} onClick={() => { setCategory('med') }}>Medium</button>
                    <button className={category === 'old' ? "level-button-chosen" : "level-button"} onClick={() => { setCategory('old') }}>Easy</button>
                </div>
                <div id="adding-container-big">
                    <div id="button-add">
                        <button onClick={() => { addNew() }} id="cross"></button>
                    </div>
                    <div hidden={!currentlyAdding} onSubmit={(e) => { addVocab(e) }} id="input">
                        <form>
                            <p>English</p><input maxlength="12" onChange={(e) => { setNewName(e.target.value) }} />
                            <p>Spanish</p><input maxlength="12" onChange={(e) => { setNewTranslation(e.target.value) }} />
                            <button id="add-new-button">Add</button>
                        </form>
                    </div>
                </div>
                <div id={lessThanTen ? 'modal' : 'no-modal'}>
                    <p id="modal-para">You need to have at least ten cards in a category to play</p>
                    <button id="modal-button" onClick={() => { setLessThanTen() }} >Ok</button>
                    <p></p>
                </div>
            </div>
            <div id="background">
                <div id="adding-container-small">
                    <div id="button-add">
                        <button onClick={() => { addNew() }} id="cross"></button>
                    </div>
                    <div hidden={!currentlyAdding} onSubmit={(e) => { addVocab(e) }} id="input">
                        <form>
                            <p>English</p><input maxlength="12" onChange={(e) => { setNewName(e.target.value) }} />
                            <p>Spanish</p><input maxlength="12" onChange={(e) => { setNewTranslation(e.target.value) }} />
                            <button id="add-new-button">Add</button>
                        </form>
                    </div>
                </div>
                <div className="levels" id="hidden-big">
                    <button className={category === 'new' ? "level-button-chosen" : "level-button"} onClick={() => { setCategory('new') }}>Hard</button>
                    <button className={category === 'med' ? "level-button-chosen" : "level-button"} onClick={() => { setCategory('med') }}>Medium</button>
                    <button className={category === 'old' ? "level-button-chosen" : "level-button"} onClick={() => { setCategory('old') }}>Easy</button>
                </div>
                <div id="sign-out-button-box">
                    <button id="sign-out-button" onClick={() => { logout() }}>Sign out</button>
                </div>
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
