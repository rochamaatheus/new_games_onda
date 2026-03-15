# Chapéu Seletor - New Games 2026

Aplicação de seleção de casas para a gincana, com balanceamento automático de equipes.

## 🚀 Como configurar o Banco de Dados (Supabase)

1. Crie uma conta gratuita em [supabase.com](https://supabase.com).
2. Crie um novo projeto.
3. No menu lateral, vá em **SQL Editor** e clique em **New Query**.
4. Cole o código abaixo e clique em **Run**:

```sql
-- Criar a tabela de respostas
create table responses (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  house_id text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar acesso público para inserção (importante para o site funcionar sem login)
alter table responses enable row level security;

create policy "Permitir inserção pública" 
on responses for insert 
with check (true);

create policy "Permitir leitura pública" 
on responses for select 
using (true);
```

5. Vá em **Project Settings** > **API** e copie a `URL` e a `anon key`.
6. Crie um arquivo chamado `.env` na raiz deste projeto e cole as chaves (veja o `.env.example`).

## 📊 Como ver os resultados

No painel do Supabase, vá em **Table Editor** e clique na tabela `responses`. Você verá o nome de cada participante e a casa em que o algoritmo os alocou. Você pode clicar em **Export to CSV** para abrir no Excel ou Google Sheets.

## ⚖️ Lógica de Balanceamento

O algoritmo funciona da seguinte forma:
1. Calcula a afinidade do usuário com cada casa baseada no Quiz.
2. Verifica quantas pessoas já existem em cada casa no banco de dados.
3. Atribui o usuário à casa de maior afinidade, **desde que** ela não esteja com mais de 1 membro acima da média das outras.
4. Se a casa ideal estiver "cheia", ele pula para a segunda maior afinidade, garantindo equipes equilibradas numericamente.

## 🎨 Personalização

Para alterar as perguntas, edite o arquivo `src/constants/houses.ts`.
# new_games_onda
