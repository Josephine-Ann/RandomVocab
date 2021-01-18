import React, { useContext } from 'react'
import { VocabContext } from '../VocabProvider'
import { LoginPage } from '../components/LoginPage/LoginPage'
import { Dashboard } from '../components/Dashboard/Dashboard'

export const FunctionContextComponent = () => {
    const {
        state: { uid }
    } = useContext(VocabContext);
    return (
        <div>
            <div>
                {
                    uid === '' ? (
                        <LoginPage />
                    ) : (
                            <Dashboard />
                        )
                }
            </div>
        </div>
    )
}
