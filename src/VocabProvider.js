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
            category: 'new',
            newVocabularyRef: '',
            newName: '',
            newTranslation: '',
            hidden: '',
            idsToHide: [],
            medVocab: [],
            oldVocab: [],
            newVocab: [],
            hi: '',
            uid: '',
            errorCode: '',
            errorMessage: '',
            lessThanTen: false,
            hover: false,
            currentlyAdding: false
        };
    }

    addNew = async () => {
        this.setState({
            currentlyAdding: !this.state.currentlyAdding
        })
    }

    setLessThanTen = async () => {
        this.setState({
            lessThanTen: false
        })
        console.log(this.state.lessThanTen)
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
                    let medVocab = []
                    let oldVocab = []
                    let newVocab = []
                    snapshot.forEach((childSnapshot) => {
                        newWords.push({
                            id: childSnapshot.key,
                            ...childSnapshot.val()
                        })
                        ids.push(childSnapshot.key)
                    })
                    newWords.forEach((word) => {
                        if (word.category === "new") {
                            newVocab.push(word.id)
                        } else if (word.category === "med") {
                            medVocab.push(word.id)
                        } else if (word.category === "old") {
                            oldVocab.push(word.id)
                        }
                    })
                    this.setState({
                        newVocabulary: newWords,
                        idsToHide: ids,
                        hidden: newVocab[0],
                        newVocab: newVocab,
                        oldVocab: oldVocab,
                        medVocab: medVocab
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
        let newCategory = ''
        if (vocab.category === 'new') {
            vocab.category = 'med'
            newCategory = 'med'
        } else if (vocab.category === 'med') {
            vocab.category = 'old'
            newCategory = 'old'
        }
        others.push(vocab)
        const newOthers = {}
        others.map((oth) => {
            return newOthers[oth.id] = oth
        })
        this.setState({
            newVocabulary: others,
            category: newCategory
        })
        database.ref(`users/${this.state.uid}/newVocabulary`).set(newOthers)
    }

    setHover = async (hover) => {
        this.setState({ hover })
    }

    passVocabForward = async () => {
        let vocab = this.state.newVocabulary.find((voc) => voc.id === this.state.hidden)
        const others = this.state.newVocabulary.filter((voc) => voc.id !== this.state.hidden)
        let newCategory = ''
        if (vocab.category === 'med') {
            vocab.category = 'new'
            newCategory = 'new'
        } else if (vocab.category === 'old') {
            vocab.category = 'med'
            newCategory = 'med'
        }
        others.push(vocab)
        const newOthers = {}
        others.map((oth) => {
            return newOthers[oth.id] = oth
        })
        this.setState({
            newVocabulary: others,
            category: newCategory
        })
        database.ref(`users/${this.state.uid}/newVocabulary`).set(newOthers)
    }

    rotateVocab = async () => {
        let vocab = this.state.newVocabulary
        let medVocab = []
        let oldVocab = []
        let newVocab = []
        vocab.forEach((voc) => {
            if (voc.category === 'new' && this.state.category === 'new') {
                newVocab.push(voc.id)
            } else if (voc.category === 'med' && this.state.category === 'med') {
                medVocab.push(voc.id)
            } else if (voc.category === 'old' && this.state.category === 'old') {
                oldVocab.push(voc.id)
            }
        })
        if (this.state.category === 'new' && newVocab.length >= 10) {
            for (let i = 1; i < 5000; i++) {
                setTimeout(() => {
                    this.setState({ hidden: newVocab[Math.floor(Math.random() * Math.floor(newVocab.length - 1))] })
                }, 1000);
            }
        } else if (this.state.category === 'med' && medVocab.length >= 10) {
            for (let i = 1; i < 5000; i++) {
                setTimeout(() => {
                    this.setState({ hidden: medVocab[Math.floor(Math.random() * Math.floor(medVocab.length - 1))] })
                }, 1000);
            }
        } else if (this.state.category === 'old' && oldVocab.length >= 10) {
            for (let i = 1; i < 5000; i++) {
                setTimeout(() => {
                    this.setState({ hidden: oldVocab[Math.floor(Math.random() * Math.floor(oldVocab.length - 1))] })
                }, 1000);
            }
        } else {
            console.log(this.state.category + ' category')
            console.log(newVocab.length + ' length new vocab')
            this.setState({
                lessThanTen: true
            })
        }
    }

    setCategory = async (category) => {
        if (category === 'new') {
            this.setState({
                hidden: this.state.newVocab[0],
                category
            })
        } else if (category === 'med') {
            this.setState({
                hidden: this.state.medVocab[0],
                category
            })
        } else if (category === 'old') {
            this.setState({
                hidden: this.state.oldVocab[0],
                category
            })
        }
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
        event.target.reset()
        const oldVocab = this.state.newVocabulary
        const newVocab = {
            vocab: this.state.newName,
            translation: this.state.newTranslation,
            date: Date.now(),
            category: 'new'
        }
        oldVocab.push(newVocab)
        this.setState({
            newVocabulary: oldVocab,
            currentlyAdding: false
        })
        database.ref(`users/${this.state.uid}/newVocabulary`).push(newVocab)
    };

    setNewName = async (newName) => {
        this.setState({
            newName: newName
        });
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
                    addNew: this.addNew,
                    setLessThanTen: this.setLessThanTen
                }}>
                {!this.state.loading ? this.props.children : "Loading Vocab List..."}
            </VocabContext.Provider>
        );
    }
}

export default VocabContext;
