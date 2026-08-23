# note.

Página pessoal do Note (Noteboom Nonicon), feita em Next.js.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## O que editar

- **Título/bio**: em `app/page.tsx`, troque o texto `"seu título aqui"` (dentro de `<div className="title-slot">`) pela sua frase de efeito.
- **Links**: em `app/page.tsx`, edite o array `linkPlaceholders` no topo do arquivo — troque `label` pelo nome do link (ex: "Instagram") e `href="#"` pela URL real.
- **Foto**: troque o arquivo `public/avatar.png` pela sua foto (mantenha o nome `avatar.png`, ou troque o `src` em `app/page.tsx`).
- **Cores**: todas no topo de `app/globals.css`, dentro de `:root`.

## Subir pro GitHub

```bash
git init
git add .
git commit -m "primeira versão da página"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

## Deploy na Vercel

1. Entre em https://vercel.com e faça login com sua conta do GitHub.
2. Clique em **Add New → Project**.
3. Selecione o repositório que você acabou de criar.
4. Deixe tudo no padrão (a Vercel detecta Next.js sozinha) e clique em **Deploy**.
5. Em ~1 minuto sua página estará no ar em um link tipo `seu-projeto.vercel.app`.

Depois disso, qualquer `git push` pra branch `main` atualiza o site automaticamente.
