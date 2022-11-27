import { addDoc, collection, getFirestore } from "firebase/firestore"

export const uploadOrder = async (buyer, items, total, type) => {
    const db = getFirestore();
    const queryCollection = collection(db, 'orders');
    await addDoc(queryCollection, { buyer, items, total, type })

    return new Promise((resolve, reject) => resolve(123))
}

export const paymentSimulator = (info) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                (info.cardSecurity === '111')? reject('Incorrect card information') : resolve('Payment approved')
            }, 2000)
        })
}