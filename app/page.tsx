const RAY_COUNT = 16;

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

const linkPlaceholders = [
  { tag: "01", label: "link 1" },
  { tag: "02", label: "link 2" },
  { tag: "03", label: "link 3" },
];

export default function Home() {
  return (
    <main>
      <span className="eyebrow">página pessoal</span>

      <div className="avatar-wrap">
        <Sunburst />
        <div className="tape" aria-hidden="true" />
        <div className="sticker">
          {/* troque public/avatar.png pela sua foto quando quiser */}
          <img src="/avatar.png" alt="Foto de perfil de Note" />
        </div>
      </div>

      <h1 className="name">note.</h1>
      <span className="handle">Noteboom Nonicon</span>

      <div className="title-slot">
        <span>seu título aqui</span>
        <span className="pencil" aria-hidden="true">
          ✎
        </span>
      </div>

      <nav className="links" aria-label="Links">
        {linkPlaceholders.map((link) => (
          <a key={link.tag} className="link-slot" href="#">
            {link.label}
            <span className="tag">{link.tag}</span>
          </a>
        ))}
      </nav>

      <footer>note. — em construção</footer>
    </main>
  );
}
