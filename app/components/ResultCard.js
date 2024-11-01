"use client";
import { useEffect, useState, useRef } from "react";
import styles from "../page.module.css";
import Link from "next/link";

export default function ResultCard({ score }) {
  const [pokemon, setPokemon] = useState(null);
  const [amiibo, setAmiibo] = useState(null);

  const dataExists = useRef(false);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const typeColors = {
    fire: `rgba(235, 70, 70, 0.8)`,
    water: `rgba(64, 167, 227, 0.8)`,
    grass: `rgba(114, 222, 87, 0.8)`,
    electric: `rgba(242, 225, 70, 0.8)`,
    ice: `rgba(80, 235, 235, 0.8)`,
    fighting: `rgba(227, 137, 64, 0.8)`,
    poison: `rgba(168, 130, 237, 0.8)`,
    ground: `rgba(181, 155, 119, 0.8)`,
    flying: `rgba(187, 219, 237, 0.8)`,
    psychic: `rgba(245, 71, 225, 0.8)`,
    bug: `rgba(181, 245, 71, 0.8)`,
    rock: `rgba(171, 171, 171, 0.8)`,
    ghost: `rgba(155, 160, 209, 0.8)`,
    dark: `rgba(145, 132, 176, 0.8)`,
    dragon: `rgba(115, 140, 230, 0.8)`,
    steel: `rgba(189, 193, 201, 0.8)`,
    fairy: `rgba(255, 173, 225, 0.8)`,
    normal: `rgba(255, 255, 255, 0.8)`,
  };

  useEffect(() => {
    if (dataExists.current) return;

    const fetchData = async () => {
      dataExists.current = true;

      let finalResult = score * (Math.floor(Math.random() * 20) + 1);
      let amiiboID;

      if (finalResult <= 20) amiiboID = "Animal+Crossing";
      else if (finalResult <= 40) amiiboID = "Yu-Gi-Oh!";
      else if (finalResult <= 60) amiiboID = "Super+Smash+Bros";
      else if (finalResult <= 80) amiiboID = "Legend+Of+Zelda";
      else if (finalResult <= 100) amiiboID = "Mario+Sports+Superstars";
      else if (finalResult <= 120) amiiboID = "Chibi-Robo!";
      else if (finalResult <= 140) amiiboID = "Super+Nintendo+World";
      else if (finalResult <= 160) amiiboID = "Splatoon";
      else if (finalResult <= 180) amiiboID = "Monster+Hunter";
      else if (finalResult <= 200) amiiboID = "Fire+Emblem";
      else if (finalResult <= 220) amiiboID = "Monster+Hunter+Rise";
      else if (finalResult <= 240) amiiboID = "Pokemon";
      else if (finalResult <= 260) amiiboID = "Skylanders";
      else if (finalResult <= 280) amiiboID = "8-bit+Mario";
      else if (finalResult <= 300) amiiboID = "Shovel+Knight";
      else if (finalResult <= 320) amiiboID = "Diablo";
      else if (finalResult <= 340) amiiboID = "Metroid";
      else if (finalResult <= 360) amiiboID = "Kirby";
      else if (finalResult <= 380) amiiboID = "Power+Pros";
      else if (finalResult <= 400) amiiboID = "Yoshi's+Woolly+World";
      else if (finalResult <= 430) amiiboID = "Pikmin";
      else if (finalResult <= 460) amiiboID = "Xenoblade+Chronicles+3";
      else amiiboID = "Others";

      const pokeResult = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${finalResult}`
      );
      const pokeData = await pokeResult.json();
      setPokemon(pokeData);

      const amiiboResult = await fetch(
        `https://www.amiiboapi.com/api/amiibo/?amiiboSeries=${amiiboID}`
      );
      const amiiboData = await amiiboResult.json();
      const randomAmiibo =
        amiiboData.amiibo[Math.floor(Math.random() * amiiboData.amiibo.length)];
      setAmiibo(randomAmiibo);
    };

    fetchData();
  }, []);

  if (!pokemon || !amiibo)
    return (
      <div className={styles.resultLoading}>
        <h2>Loading...</h2>
      </div>
    );

  const pokeType = pokemon.types[0].type.name;
  const background = typeColors[pokeType];

  return (
    <div className={styles.resultCard}>
      <div className={styles.resultCardWrapper}>
        <div className={styles.resultText} style={{ background }}>
          <h2>
            Congrats {amiibo.character} from {amiibo.amiiboSeries}!
          </h2>
          <h2>
            You caught a {pokeType}-type {capitalize(pokemon.name)}
          </h2>
        </div>
        <div className={styles.resultImages}>
          <img src={amiibo.image} alt={amiibo.character} />
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
        <div className={styles.resultRestart}>
          <Link href={"/"}>
            <h2>Restart?</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
