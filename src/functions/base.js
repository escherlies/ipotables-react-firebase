import Rebase from 're-base'
import firebaseApp from './firebaseApp';


const firebaseDatabase = firebaseApp.database()
const base = Rebase.createClass(firebaseDatabase)

export default base