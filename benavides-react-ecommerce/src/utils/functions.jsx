import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore"

export const uploadOrder = async (buyer, items, total, type) => {
    const db = getFirestore();
    const queryCollection = collection(db, 'orders');
    const docRef = await addDoc(queryCollection, { buyer, items, total, type, date: serverTimestamp() })

    return new Promise((resolve, reject) => resolve(docRef.id))
}

export const paymentSimulator = (info) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                (info.cardSecurity === '111')? reject('Incorrect card information') : resolve('Payment approved')
            }, 2000)
        })
}