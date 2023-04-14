import { useEffect, useState } from "react"
import { projectFireStore } from "../config/config"

const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const ref = projectFireStore.collection(collection).doc(id)

        const unsubscribe = ref.onSnapshot(snapshot => {

            if (snapshot.data()) {
                setDocument({ ...snapshot.data(), id: snapshot.id })
                setError(null)
            } else {
                setError("no such document exists")
            }

        }, (err) => {
            console.log(err.message)
            setError("Can't fetch document")
        })

        return () => unsubscribe()
    }, [collection, id])

    return { document, error }
}

export default useDocument