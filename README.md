# Fut da JUF

App de uma página só (HTML/CSS/JS, sem servidor) para gerir o elenco, os futs semanais, as estatísticas e o campeonato do grupo. Já vem preparado como **PWA**: dá para "instalar" no iPhone/Android com ícone e tela cheia, e funciona **offline**.

## Arquivos
- `index.html` — o app.
- `manifest.webmanifest` — dados de instalação (nome, ícone, cores).
- `sw.js` — service worker (offline).
- `icon-180.png`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` — ícones.

> Todos os arquivos precisam ficar **na mesma pasta**.

## Publicar no GitHub Pages (grátis, com HTTPS)
1. Crie uma conta no GitHub (se ainda não tiver) e um repositório **público**, por exemplo `fut-da-juf`.
2. Envie **todos** os arquivos desta pasta para o repositório (botão *Add file → Upload files*, arraste tudo, *Commit*).
3. No repositório: **Settings → Pages**.
4. Em *Build and deployment*, escolha **Deploy from a branch**, selecione a branch `main` e a pasta `/ (root)`. Salve.
5. Aguarde ~1 minuto e acesse o endereço que aparecer, algo como:
   `https://SEU-USUARIO.github.io/fut-da-juf/`

Pronto — esse link é o app. Mande no grupo.

## Instalar no iPhone (vira "app")
1. Abra o link **no Safari** (precisa ser o Safari no iOS).
2. Toque em **Compartilhar** (o quadrado com a seta para cima).
3. **Adicionar à Tela de Início** → *Adicionar*.
4. O ícone do Fut da JUF aparece na tela inicial e abre em tela cheia.

No Android é igual pelo Chrome: menu **⋮ → Adicionar à tela inicial / Instalar app**.

## Dados compartilhados via `dados.json` (todos veem a mesma versão)
Todos os dados (elenco, futs, estatísticas, campeonatos) ficam no arquivo **`dados.json`** do repositório. Ao abrir o link, o app busca esse arquivo e, se ele for **mais novo** que o do aparelho, adota automaticamente — então quem tem o link sempre vê a versão publicada mais recente.

**Publicar uma atualização (você, organizador):**
1. Faça as alterações no app normalmente (cadastrar jogador, lançar fut, etc.). Aparece a faixa "alterações não publicadas".
2. **Config. (⚙) → Publicar → Baixar dados.json para publicar.**
3. No GitHub: **Add file → Upload files** → arraste o `dados.json` (sobrescreve o antigo).
4. Edite o `sw.js` e suba o número da versão do cache (ex.: `futdajuf-v6` → `futdajuf-v7`).
5. **Commit changes.** Em ~1–2 minutos, todos que abrirem/reabrirem o link já pegam a versão nova.

**Como funciona a sincronia (importante):**
- O app decide pela **data** (`updatedAt`): a versão mais nova ganha. Publicou → a do GitHub fica mais nova → todos adotam.
- Ele **nunca apaga em silêncio** alterações locais suas ainda não publicadas: elas ficam no aparelho e o app avisa para publicar.
- Quem só quer ver (não é o organizador) pode usar **Config. → Usar versão publicada** para descartar qualquer alteração local e voltar ao que está no GitHub.
- É colaboração de "uma pessoa publica": não é tempo real. Se duas pessoas editarem ao mesmo tempo em aparelhos diferentes, quem publicar por último prevalece. Para tempo real de verdade (vários editando juntos), seria preciso um backend (ex.: Firebase/Supabase).
- **Privacidade:** como o GitHub Pages gratuito exige repositório **público**, o `dados.json` (com nomes dos jogadores) fica visível na web. Se isso for um problema, use um repositório privado (requer plano pago para Pages) ou não publique o `dados.json` e troque dados via **Baixar/Importar JSON** manual.

## Notas dos jogadores (estrelas) ficam separadas
As notas em estrelas (0–5) **nunca** entram no `dados.json` nem nos outros backups — ficam só no aparelho e num arquivo próprio **`notas.json`**. Em **Config**, bem discreto no rodapé, há o botão "Mostrar notas" (pede a senha) e, com a senha ativa, os botões **Baixar/Importar notas.json**. Assim as notas não vão para o repositório público. Para levar as notas a outro aparelho, use Baixar/Importar `notas.json` (não publique esse arquivo no GitHub se quiser mantê-lo privado).

## Tamanho mínimo dos times
Ao gerar times (no fut da semana ou no campeonato), cada time tem no mínimo **4 jogadores**. Se houver **3 ou mais goleiros** na lista, o mínimo sobe para **5 por time**. Se o número de times pedido não couber, o app avisa o máximo possível.

## Mata-mata: dois tempos nas semis/final
No cronômetro do jogo ao vivo, a partir das **semifinais** os jogos rodam em **dois tempos** (5 min cada por padrão, configurável no card de estimativa). Aparece o indicador "1º/2º tempo" e um botão para encerrar o 1º tempo.

## Atualizar o app (o código) depois de publicado
Editou o `index.html` (ou trocou ícones/`dados.json`)? Suba os arquivos novos e, no `sw.js`, troque o número da versão do cache (ex.: `futdajuf-v9` → `futdajuf-v10`) e suba também. Isso garante que todo mundo receba a versão nova em vez de uma em cache.
