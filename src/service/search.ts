import { collection, orderBy, query, where, getDocs } from '@firebase/firestore'
import { firestore } from 'config/firebase'

async function BasicSearch(Subject: string, Tag: Array<string>) {
  console.log(Subject)
  try {
    if (Tag.length == 0) {
      Tag = [
        'ทั่วไป',
        'รีวิวรายวิชา',
        'คลังความรู้',
        'แบบฝึกหัด',
        'Lecture',
        'สรุป',
        'อื่นๆ',
      ]
    }
    const all_post = [] as any
    //console.log(Tag)
    const q = await query(
      collection(firestore, 'Post'),
      where('SubjectID', '==', Subject),
      where('Status', '==', true),
      where('TagID', 'array-contains-any', Tag),
      orderBy('DateEdited', 'desc')
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      all_post.push([doc.id, doc.data()])
      // console.log(doc.id, ' => ', doc.data())
    })
    // console.log(all_post)
    // console.log(querySnapshot)
    return all_post
  } catch (e) {
    console.error('Error searching: ', e)
    return false
  }
}

export { BasicSearch }
