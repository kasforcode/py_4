import { useEffect, useState } from "react";

export default function App() {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8000/events");

    eventSource.addEventListener("progress", (event) => {
      setProgress(Number(event.data));
    });

    eventSource.addEventListener("complete", () => {
      setCompleted(true);
      eventSource.close();
    });

    eventSource.onerror = () => {
      setError("Ошибка соединения");
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return (
    <main>
      <progress value={progress} max="100" />
      <p>{progress}%</p>
      {completed && <p>Задача завершена</p>}
      {error && <p>{error}</p>}
    </main>
  );
}
