import React from 'react'
import { googleAuthProvider, firebase } from './fire'
import database from './fire'
import "firebase/auth"


export const VocabContext = React.createContext();

export class VocabProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newVocabulary: [],
            category: 'old',
            newVocabularyRef: '',
            newName: '',
            newTranslation: '',
            hidden: '',
            idsToHide: [],
            hi: '',
            uid: '',
            errorCode: '',
            errorMessage: '',
            hover: false,
            currentlyAdding: false
        };
    }

    addNew = async () => {
        this.setState({
            currentlyAdding: !this.state.currentlyAdding
        })
        console.log('currently adding ' + this.state.currentlyAdding)
    }

    getVocab = async () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    uid: user.uid
                })
                database.ref(`users/${this.state.uid}/newVocabulary`).once('value').then((snapshot) => {
                    const newWords = []
                    const ids = []
                    snapshot.forEach((childSnapshot) => {
                        newWords.push({
                            id: childSnapshot.key,
                            ...childSnapshot.val()
                        })
                        ids.push(childSnapshot.key)
                    })
                    this.setState({
                        newVocabulary: newWords,
                        idsToHide: ids,
                        hidden: ids[0],
                    });
                }).catch((e) => {
                    this.setState({
                        newVocabulary: []
                    });
                })
            }
            else {
                console.log("state = definitely signed out")
            }
        })
    }

    passVocabBack = async () => {
        let vocab = this.state.newVocabulary.find((voc) => voc.id === this.state.hidden)
        const others = this.state.newVocabulary.filter((voc) => voc.id !== this.state.hidden)
        vocab.category === 'new' ? vocab.category = 'med' : vocab.category = 'old'
        others.push(vocab)
        const newOthers = {}
        others.map((oth) => {
            return newOthers[oth.id] = oth
        })
        this.setState({
            newVocabulary: others
        })
        database.ref(`users/${this.state.uid}/newVocabulary`).set(newOthers)
        console.log('pass vocab back')
        console.log(this.state.category)
    }

    setHover = async (hover) => {
        this.setState({ hover })
    }

    passVocabForward = async () => {
        let vocab = this.state.newVocabulary.find((voc) => voc.id === this.state.hidden)
        const others = this.state.newVocabulary.filter((voc) => voc.id !== this.state.hidden)
        vocab.category === 'med' ? vocab.category = 'new' : vocab.category = 'med'
        others.push(vocab)
        const newOthers = {}
        others.map((oth) => {
            return newOthers[oth.id] = oth
        })
        this.setState({
            newVocabulary: others
        })
        database.ref(`users/${this.state.uid}/newVocabulary`).set(newOthers)
    }

    rotateVocab = async (category) => {
        let vocab = this.state.newVocabulary
        let medVocab = []
        let oldVocab = []
        let newVocab = []
        vocab.forEach((voc) => {
            if (this.state.category === 'new') {
                newVocab.push(voc.id)
            } else if (this.state.category === 'med') {
                medVocab.push(voc.id)
            } else {
                oldVocab.push(voc.id)
            }
        })
        if (category === 'new') {
            for (let i = 1; i < 5000; i++) {
                setTimeout(() => {
                    this.setState({ hidden: newVocab[Math.floor(Math.random() * Math.floor(newVocab.length - 1))] })
                }, 1000);
            }
        } else if (category === 'med') {
            for (let i = 1; i < 5000; i++) {
                setTimeout(() => {
                    this.setState({ hidden: medVocab[Math.floor(Math.random() * Math.floor(medVocab.length - 1))] })
                }, 1000);
            }
        } else {
            for (let i = 1; i < 5000; i++) {
                setTimeout(() => {
                    this.setState({ hidden: oldVocab[Math.floor(Math.random() * Math.floor(oldVocab.length - 1))] })
                }, 1000);
            }
        }
    }

    setCategory = async (category) => {
        this.setState({ category })
        console.log('happened')
    }


    login = async () => {
        firebase.auth()
            .signInWithPopup(googleAuthProvider)
            .then((result) => {
                var user = result.user;
                if (!this.state.uid) {
                    this.setState({
                        uid: user.uid,
                    })
                }
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                this.setState({ errorCode, errorMessage })
            });
    }

    logout = async () => {
        firebase.auth().signOut();
        this.setState({
            newVocabulary: [],
            newVocabularyRef: '',
            newName: '',
            newTranslation: '',
            hidden: '',
            idsToHide: [],
            hi: '',
            uid: '',
            errorCode: '',
            errorMessage: ''
        })
    }

    addVocab = async (event) => {
        event.preventDefault()
        const oldVocab = this.state.newVocabulary
        const newVocab = {
            vocab: this.state.newName,
            translation: this.state.newTranslation,
            date: Date.now(),
            category: 'new'
        }
        oldVocab.push(newVocab)
        this.setState({
            newVocabulary: oldVocab
        })
        database.ref(`users/${this.state.uid}/newVocabulary`).push(newVocab)
    };

    setNewName = async (newName) => {
        this.setState({
            newName: newName
        });
        console.log(this.state.newVocabulary)
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
                    setNewTranslation: this.setNewTranslation,
                    rotateVocab: this.rotateVocab,
                    passVocabBack: this.passVocabBack,
                    passVocabForward: this.passVocabForward,
                    login: this.login,
                    logout: this.logout,
                    setHover: this.setHover,
                    setCategory: this.setCategory,
                    addNew: this.addNew
                }}>
                {!this.state.loading ? this.props.children : "Loading Vocab List..."}
            </VocabContext.Provider>
        );
    }
}

export default VocabContext;
