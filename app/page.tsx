import MusicToggle from "./components/MusicToggle";

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

const bio =
  "Oie! eu sou o note, eu tô criando essa pagina interativa aqui para vocês se divertirem e saber mais sobre mim também. abaixo terá link, minijogos super legais e em breve muitas coisas!";

export default function Home() {
  return (
    <main>
      <MusicToggle />

      <div className="avatar-wrap">
        <Sunburst />
        <div className="sticker">
          {/* troque public/avatar.jpg pela sua foto quando quiser */}
          <img src="/avatar.jpg" alt="Foto de perfil de Note" />
        </div>
      </div>

      <h1 className="name">Note</h1>
      <span className="handle">Noteboom Nonicon</span>

      <p className="title-slot">{bio}</p>

      <p className="coming-soon">
        Em construção
        <br />
        Em breve vai ter muitas coisas legais..
        <br />
        mal posso aguardar...
      </p>

      <footer>note. — em construção</footer>
    </main>
  );
}
