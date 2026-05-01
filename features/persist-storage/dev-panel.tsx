"use client";

import {
  usePersistStorageHydration,
  usePersistStorageStore,
} from "./provider";

export function PersistStorageDevPanel() {
  const letters = usePersistStorageStore((state) => state.letters);
  const addLetter = usePersistStorageStore((state) => state.addLetter);
  const hasHydrated = usePersistStorageHydration();

  if (!hasHydrated) {
    return <main style={{ padding: 24 }}>Loading saved letters...</main>;
  }

  return (
    <main style={{ padding: 24, display: "grid", gap: 16 }}>
      <h1>Persist storage (dev)</h1>
      <div>
        <button type="button" onClick={addLetter}>
          Add letter
        </button>
      </div>

      {letters.length === 0 ? (
        <p>No letters yet.</p>
      ) : (
        <ul
          style={{
            display: "grid",
            gap: 12,
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {letters.map((letter) => (
            <li
              key={letter.id}
              style={{
                border: "1px solid #d4d4d4",
                borderRadius: 8,
                padding: 12,
              }}
            >
              <strong>{letter.title}</strong>
              <p style={{ marginTop: 8, marginBottom: 8 }}>{letter.content}</p>
              <small>Created: {letter.createdAt}</small>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
