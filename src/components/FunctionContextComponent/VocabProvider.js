import React from 'react'
import fire from '../../fire'

export const VocabContext = React.createContext();

export class VocabProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vocabulary: [],
            newName: '',
            newTranslation: '',
            hidden: 43
        };
    }

    getVocab = async () => {
        fire.database().ref('vocabulary').once('value').then((snapshot) => {
            const words = []
            snapshot.forEach((childSnapshot) => {
                words.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            this.setState({
                vocabulary: words,
            });
        }).catch((e) => {
            this.setState({
                vocabulary: e
            });
        })
    }

    addVocab = async () => {
        fire.database().ref('vocabulary').push({
            vocab: this.state.newName,
            translation: this.state.newTranslation
        })
    };

    setNewName = async (newName) => {
        this.setState({
            newName: newName
        });
        console.log(this.state.vocabulary)
    }

    setNewTranslation = async (newTranslation) => {
        this.setState({
            newTranslation: newTranslation
        });
    }

    componentDidMount() {
        this.getVocab();
    }

    render() {
        return (
            <VocabContext.Provider
                value={{
                    state: this.state,
                    addVocab: this.addVocab,
                    setNewName: this.setNewName,
                    setNewTranslation: this.setNewTranslation
                }}>
                {!this.state.loading ? this.props.children : "Loading Vocab List..."}
            </VocabContext.Provider>
        );
    }
}

export default VocabContext;
