"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import MusicToggle from "./components/MusicToggle";

const RAY_COUNT = 16;
const SECRET_PASSWORD = "noteps582";

function Sunburst() {
  const rays = Array.from({ length: RAY_COUNT });
  return (
    <svg
      className="sunburst"
      viewBox="0 0 300 300"
      fill="none"
      aria-hidden="true"
    >
      {rays.map((_, i) => {
        const angle = (360 / RAY_COUNT) * i;
        const long = i % 2 === 0;
        return (
          <rect
            key={i}
            x="147"
            y="0"
            width="6"
            height={long ? "46" : "30"}
            rx="3"
            fill={long ? "var(--cream)" : "var(--yellow-pop)"}
            transform={`rotate(${angle} 150 150)`}
          />
        );
      })}
    </svg>
  );
}

type LinkItem = { id: string; label: string; url: string };
type ToolItem = { id: string; label: string; href: string };

function moveItem<T>(list: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction;
  if (target < 0 || target >= list.length) return list;
  const copy = [...list];
  [copy[index], copy[target]] = [copy[target], copy[index]];
  return copy;
}

export default function Home() {
  const [editMode, setEditMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const clickCount = useRef(0);
  const lastClickTime = useRef(0);

  const [name, setName] = useState("Note");
  const [handle, setHandle] = useState("Noteboom Nonicon");
  const [bio, setBio] = useState(
    "Oie! eu sou o note, eu tô criando essa pagina interativa aqui para vocês se divertirem e saber mais sobre mim também. abaixo terá link, minijogos super legais e em breve muitas coisas!"
  );
  const [comingSoon, setComingSoon] = useState(
    "Em construção\nEm breve vai ter muitas coisas legais..\nmal posso aguardar..."
  );

  const [linksLabel, setLinksLabel] = useState("Links");
  const [links, setLinks] = useState<LinkItem[]>([
    {
      id: "l1",
      label: "Xu-Mi-Li-Xi: Escute AGORA!!",
      url: "https://open.spotify.com/track/52k2v3bFkO3kAN02vZZgJO?si=2db225dafca74da8",
    },
  ]);

  const [toolsLabel, setToolsLabel] = useState("Tools");
  const [tools, setTools] = useState<ToolItem[]>([
    { id: "t1", label: "Calculadora", href: "/calculadora" },
    { id: "t2", label: "Tradutor Morse", href: "/morse" },
    { id: "t3", label: "Cifra de Texto", href: "/cifra" },
  ]);

  function handleAvatarClick() {
    const now = Date.now();
    if (now - lastClickTime.current > 1500) {
      clickCount.current = 0;
    }
    lastClickTime.current = now;
    clickCount.current += 1;

    if (clickCount.current >= 5) {
      clickCount.current = 0;
      setPasswordInput("");
      setPasswordError(false);
      setShowPasswordModal(true);
    }
  }

  function handlePasswordSubmit() {
    if (passwordInput === SECRET_PASSWORD) {
      setEditMode(true);
      setShowPasswordModal(false);
      setPasswordInput("");
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }

  function addLink() {
    setLinks([
      ...links,
      { id: `l${Date.now()}`, label: "Novo link", url: "https://" },
    ]);
  }

  function removeLink(id: string) {
    setLinks(links.filter((l) => l.id !== id));
  }

  function removeTool(id: string) {
    setTools(tools.filter((t) => t.id !== id));
  }

  return (
    <main>
      <MusicToggle />

      {editMode && (
        <div className="edit-badge">
          modo edição ativo
          <button className="edit-badge-exit" onClick={() => setEditMode(false)}>
            sair
          </button>
        </div>
      )}

      <div className="avatar-wrap" onClick={handleAvatarClick}>
        <Sunburst />
        <div className="sticker">
          <img src="/avatar.jpg" alt="Foto de perfil de Note" />
        </div>
      </div>

      {editMode ? (
        <input
          className="edit-input edit-input--name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <h1 className="name">{name}</h1>
      )}

      {editMode ? (
        <input
          className="edit-input edit-input--handle"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
        />
      ) : (
        <span className="handle">{handle}</span>
      )}

      {editMode ? (
        <textarea
          className="title-slot edit-textarea"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
        />
      ) : (
        <p className="title-slot">{bio}</p>
      )}

      {editMode ? (
        <input
          className="edit-input edit-input--category"
          value={linksLabel}
          onChange={(e) => setLinksLabel(e.target.value)}
        />
      ) : (
        <span className="category-label">{linksLabel}</span>
      )}

      {links.map((link, i) =>
        editMode ? (
          <div className="edit-row" key={link.id}>
            <div className="edit-row-fields">
              <input
                className="edit-input"
                value={link.label}
                onChange={(e) =>
                  setLinks(
                    links.map((l) =>
                      l.id === link.id ? { ...l, label: e.target.value } : l
                    )
                  )
                }
                placeholder="Nome do link"
              />
              <input
                className="edit-input"
                value={link.url}
                onChange={(e) =>
                  setLinks(
                    links.map((l) =>
                      l.id === link.id ? { ...l, url: e.target.value } : l
                    )
                  )
                }
                placeholder="https://"
              />
            </div>
            <div className="edit-row-actions">
              <button onClick={() => setLinks(moveItem(links, i, -1))}>↑</button>
              <button onClick={() => setLinks(moveItem(links, i, 1))}>↓</button>
              <button onClick={() => removeLink(link.id)}>×</button>
            </div>
          </div>
        ) : (
          <a
            key={link.id}
            className="link-slot"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        )
      )}

      {editMode && (
        <button className="edit-add-button" onClick={addLink}>
          + adicionar link
        </button>
      )}

      {editMode ? (
        <input
          className="edit-input edit-input--category"
          value={toolsLabel}
          onChange={(e) => setToolsLabel(e.target.value)}
        />
      ) : (
        <span className="category-label">{toolsLabel}</span>
      )}

      {tools.map((tool, i) =>
        editMode ? (
          <div className="edit-row" key={tool.id}>
            <div className="edit-row-fields">
              <input
                className="edit-input"
                value={tool.label}
                onChange={(e) =>
                  setTools(
                    tools.map((t) =>
                      t.id === tool.id ? { ...t, label: e.target.value } : t
                    )
                  )
                }
              />
            </div>
            <div className="edit-row-actions">
              <button onClick={() => setTools(moveItem(tools, i, -1))}>↑</button>
              <button onClick={() => setTools(moveItem(tools, i, 1))}>↓</button>
              <button onClick={() => removeTool(tool.id)}>×</button>
            </div>
          </div>
        ) : (
          <Link key={tool.id} href={tool.href} className="link-slot">
            {tool.label}
          </Link>
        )
      )}

      {editMode ? (
        <textarea
          className="coming-soon edit-textarea edit-textarea--center"
          value={comingSoon}
          onChange={(e) => setComingSoon(e.target.value)}
          rows={3}
        />
      ) : (
        <p className="coming-soon">
          {comingSoon.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </p>
      )}

      <footer>note. — em construção</footer>

      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <p className="modal-title">Insira a senha secreta!</p>
            <input
              type="password"
              className="modal-input"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setPasswordError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handlePasswordSubmit();
              }}
              autoFocus
            />
            {passwordError && (
              <p className="modal-error">senha incorreta, tenta de novo</p>
            )}
            <div className="modal-actions">
              <button
                className="modal-cancel"
                onClick={() => setShowPasswordModal(false)}
              >
                cancelar
              </button>
              <button className="modal-confirm" onClick={handlePasswordSubmit}>
                confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
