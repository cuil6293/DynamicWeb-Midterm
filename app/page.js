import styles from "./page.module.css";
import Link from "next/link";

export default async function Home() {
  const dittoData = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  const pokeDitto = await dittoData.json();

  return (
    <div className={styles.home}>
      <div className={styles.homeWrapper}>
        <main>
          <div className={styles.homeTextBox}>
            <h1>Hello new Trainer! I'm Professor Ditto,</h1>
            <h1>let me welcome you to-</h1>
          </div>
          <img
            className={styles.homeProf}
            src={pokeDitto.sprites.front_default}
            alt="Professor Ditto
          "
          />
          <div className={styles.homeTextBox}>
            <h2>A wild pokemon has appeared! Catch it!</h2>
          </div>
          <Link href={"/quiz"} className={styles.homeBall}>
            <img
              src="https://www.pngall.com/wp-content/uploads/4/Pokeball-PNG-HD-Image.png"
              alt="Pokeball start button"
            />
          </Link>
        </main>
      </div>
    </div>
  );
}
