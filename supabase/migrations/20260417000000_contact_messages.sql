-- Contact form messages
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- Anyone (including anon) may submit a message
create policy "Anyone can insert contact messages"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (
    char_length(name) between 1 and 200
    and char_length(email) between 3 and 320
    and char_length(message) between 1 and 5000
  );

-- No public read access; admins only via service role
