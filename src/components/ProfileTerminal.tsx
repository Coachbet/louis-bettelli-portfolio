"use client";

import { useState } from "react";

const prompts = [
  {
    label: "Expérience en IA ?",
    command: "cat experience-ai.md",
    answer:
      "Chez Natixis, j'ai conçu DevXAI de bout en bout : prototype Python/Streamlit, plateforme Angular/Python, agents IA, MCP et mise en production sur une infrastructure Linux.",
  },
  {
    label: "Parle-moi de tes projets",
    command: "ls ~/projects --featured",
    answer:
      "Je travaille sur des produits qui relient IA, data et usages réels. Mon GitHub présente notamment des projets Python autour de l'IA et de la programmation.",
  },
  {
    label: "Pourquoi le rugby ?",
    command: "cat sport/rugby.md",
    answer:
      "Le rugby m'a appris la discipline, la lecture collective et le leadership. J'ai joué au Stade Niçois et à CentraleSupélec, puis entraîné une équipe féminine de rugby à 7.",
  },
];

export function ProfileTerminal() {
  const [active, setActive] = useState(0);

  return (
    <div className="terminal-shell" aria-label="Présentation interactive">
      <div className="terminal-bar">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
        <span className="terminal-path">~/louis/summary.md</span>
      </div>
      <div className="terminal-body">
        <p className="terminal-command">
          <span>louis@portfolio</span> <b>~</b> % {prompts[active].command}
        </p>
        <p className="terminal-answer">{prompts[active].answer}</p>
        <p className="terminal-command terminal-command-muted">
          <span>louis@portfolio</span> <b>~</b> % <i className="terminal-caret" />
        </p>
      </div>
      <div className="terminal-suggestions">
        <span>💡 Essayez :</span>
        {prompts.map((prompt, index) => (
          <button type="button" key={prompt.label} className={index === active ? "is-active" : ""} onClick={() => setActive(index)}>
            {prompt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
