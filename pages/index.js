import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const key = 'employeeStories';
  const [employeeInput, setEmployeeInput] = useState("");
  const [wearingInput, setWearingInput] = useState("");
  const [result, setResult] = useState('');

  
  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employee: employeeInput, wearing: wearingInput }),
    });

    const data = await response.json();
    setResult( data.result );
    setEmployeeInput("");
    setWearingInput("");
  }

  return (
    <div>
      <Head>
        <title>Story Maker</title>
        <link rel="icon" href="/pen.svg" />
      </Head>

      <main className={styles.main}>
        <img src="/pen.svg" className={styles.icon} />
        <h3>Fun story maker</h3>
        <h4 className={styles.slogan}>More amusing than the truth</h4>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Which Employee?"
            value={employeeInput}
            onChange={ (e) => setEmployeeInput( e.target.value ) }
          />
          <input
            type="text"
            name="wearing"
            placeholder="What is he/she wearing?"
            value={wearingInput}
            onChange={(e) => setWearingInput(e.target.value)}
          />
          <input type="submit" value="Create Story" />
        </form>

        <div className={styles.result}>
          { result }
        </div>
      </main>
    </div>
  );
}
