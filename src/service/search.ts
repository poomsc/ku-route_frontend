import { collection, orderBy, query, where, getDocs } from "@firebase/firestore"
import { firestore } from "config/firebase"

async function TagSearch(Tag: Array<string>){
    try {
        console.log(Tag)
        const q = await query(collection(firestore, "Post"), where("Status", "==", true), orderBy("DateEdited"))
        const querySnapshot = await getDocs(q)
        return querySnapshot
    } catch (e) {
        console.error("Error searching: ", e)
        return false
    }
}

export {
    TagSearch
}