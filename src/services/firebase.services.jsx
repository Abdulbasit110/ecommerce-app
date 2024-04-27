import { child, get, push, ref, set } from "firebase/database"
import { db } from "../config/firebaseConfig/config"
import { productEntity } from "../lib/firebase.entities"

const dbRef = ref(db)

export const getAllProducts = async () => {
    try {
        const response = await get(child(dbRef, productEntity))

        if (response.exists()) {
            const data = response.val()
            return Object.values(data)
        }
    } catch (error) {
        console.error('Error', error)
    }
}

export const addProduct = (data) => {
    try {
        const productKey = push(child(ref(db), productEntity)).key
        const productEntityRef = ref(db, productEntity + '/' + productKey)

        const response = set(productEntityRef, {
            pid: productKey,
            ...data
        })

        return response
    } catch (error) {
        console.error('Error', error)
    }
}

export const getProductById = async (pid) => {
    try {
        const response = await get(child(dbRef, productEntity + '/' + pid))

        if (response.exists()) {
            return response.val()
        }
    } catch (error) {
        console.error('Error', error)
    }
}