import {
  collection,
  orderBy,
  query,
  where,
  getDocs,
  OrderByDirection,
  QueryDocumentSnapshot,
  DocumentData,
} from '@firebase/firestore'
import { firestore } from 'config/firebase'

async function DateSearch(
  Subject: string,
  Tag: Array<string>,
  Order: OrderByDirection
) {
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
    const allPost = [] as any
    const q = await query(
      collection(firestore, 'Post'),
      where('SubjectID', '==', Subject),
      where('Status', '==', true),
      where('TagID', 'array-contains-any', Tag),
      orderBy('DateCreate', Order)
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      allPost.push([doc.id, doc.data()])
      // console.log(doc.id, ' => ', doc.data())
    })
    return allPost
  } catch (e) {
    console.error('Error searching: ', e)
    return false
  }
}

export { DateSearch }
