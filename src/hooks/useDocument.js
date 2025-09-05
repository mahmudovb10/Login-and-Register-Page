import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

function useDocument(collectionName, documentId) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!documentId) return;

    const unsub = onSnapshot(
      doc(db, collectionName, documentId),
      (snapshot) => {
        setData({
          id: snapshot.id,
          ...snapshot.data(),
        });
      }
    );

    return () => unsub();
  }, [collectionName, documentId]);

  return { data };
}

export default useDocument;
