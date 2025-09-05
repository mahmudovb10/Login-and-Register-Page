import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

function useDocument(collectionName, documentId) {
  const [data, setData] = useState(null);
  return useEffect(() => {
    const unsub = onSnapshot(doc(db, collectionName, documentId), (doc) => {
      setData({
        id: doc.id,
        ...doc.data(),
      });
    });
    return () => unsub();
  }, [documentId]);
}

export default useDocument;
