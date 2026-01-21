"use client";

import { useState } from "react";

const questions = [
  "Quel âge as-tu ?",
  "Quelle est ta taille (cm) ?",
  "Tu préfères TikTok ou YouTube ?",
  "Tu dors combien d’heures par nuit ?",
  "Tu joues aux jeux vidéo souvent ?",
  "Tu préfères sortir ou rester chez toi ?",
  "Tu écoutes de la musique tous les jours ?",
  "Tu utilises ton téléphone avant de dormir ?",
  "Tu préfères l’école ou les vacances ?",
  "Tu fais du sport ?",
  "Tu préfères l’argent ou le bonheur ?",
  "Tu regardes des séries tous les jours ?",
  "Tu préfères les jeux solo ou multi ?",
  "Tu passes beaucoup de temps sur internet ?",
  "Tu penses être plus mature que la moyenne ?",
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const answer = (value: number) => {
    setScore(score + value);
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      setDone(true);
    }
  };

  const shareText = `J’ai fait ${score} points au Quizz 😎🔥 Tu ferais combien toi ?`;

  const share = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Quizz",
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(shareText + " " + window.location.href);
      alert("Lien copié 📋 Colle-le sur Insta / Snap / TikTok");
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.7)",
          color: "white",
          padding: 30,
          borderRadius: 16,
          maxWidth: 600,
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: 20 }}>🧠 Quizz</h1>

        {!done ? (
          <>
            <p style={{ fontSize: 22, marginBottom: 30 }}>
              {questions[index]}
            </p>

            <button onClick={() => answer(2)} style={btn}>Oui</button>
            <button onClick={() => answer(1)} style={btn}>Bof</button>
            <button onClick={() => answer(0)} style={btn}>Non</button>

            <p style={{ marginTop: 20, opacity: 0.6 }}>
              Question {index + 1} / {questions.length}
            </p>
          </>
        ) : (
          <>
            <h2>🎯 Résultat</h2>
            <p style={{ fontSize: 26, margin: "20px 0" }}>
              Score : {score}
            </p>
            <p>
              {score > 20
                ? "🔥 T’es au-dessus de la moyenne"
                : score > 10
                ? "😎 T’es normal"
                : "🫠 Faut sortir un peu"}
            </p>

            <button onClick={share} style={{ ...btn, marginTop: 20 }}>
              📤 Partager mon score
            </button>

            <div style={{ marginTop: 20, fontSize: 14, opacity: 0.8 }}>
              Insta • TikTok • Snap • YouTube • Messages
            </div>

            <p style={{ marginTop: 20, opacity: 0.8 }}>
              — Mattéo Delattre
            </p>
          </>
        )}
      </div>
    </main>
  );
}

const btn = {
  padding: "12px 24px",
  margin: "8px",
  fontSize: 16,
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
};
