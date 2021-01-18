import React, { useContext } from 'react'
import { VocabContext } from '../../VocabProvider'
import './LoginPage.css'

export const LoginPage = () => {
    const {
        state: { hover },
        login,
        setHover
    } = useContext(VocabContext);
    return (
        <div id="signed-out">
            <div id="signed-out-left">
            </div>
            <div id="signed-out-right">
            </div>
            <div id="transparent-bar-signed-out">
            </div>
            <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} id="sign-in-box">
                <div id={hover === true ? "animation-animated" : "animation-not-animated"}></div>
                <p id="sign-in">Random Vocabulary</p>
                <div id={hover === true ? "other-animation-animated" : "other-animation-not-animated"}></div>
                <button onClick={() => { login() }} id="sign-in-button">Sign in with Google</button>
            </div>
        </div>
    )
}

// <button onMouseEnter={() => setHover(true)}
// onMouseLeave={() => setHover(false)}>Hover</button>
// {hover && <p>Hi!</p>}
