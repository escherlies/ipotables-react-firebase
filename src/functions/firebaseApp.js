import firebase from 'firebase/app'
import 'firebase/database'

import config from '../config'

const firebaseApp = firebase.initializeApp(config.firebase)

export default firebaseApp