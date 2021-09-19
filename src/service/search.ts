import { collection, orderBy, query, where, getDocs } from '@firebase/firestore'
import { firestore } from 'config/firebase'

async function TagSearch(Tag: Array<string>) {
  try {
    const all_post = [] as any
    console.log(Tag)
    const q = await query(
      collection(firestore, 'Post'),
      where('Status', '==', true),
      where('TagID', 'array-contains-any', Tag),
      orderBy('DateEdited')
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      all_post.push(doc.data())
      // console.log(doc.id, ' => ', doc.data())
    })
    return all_post
  } catch (e) {
    console.error('Error searching: ', e)
    return false
  }
}

export { TagSearch }
