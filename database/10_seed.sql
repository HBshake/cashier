INSERT INTO access_token (name)
VALUES ('dev');

INSERT INTO account (username, display_name, pass_hash, perms)
VALUES (
    'dev',
    'Dev Account',
    '$2b$12$XqFDLWjJwvpAOncz2F7oU.b7ER8pxkIY/toGlgCsCaX/JG9Ofg.Wi',
    ARRAY['ADMIN']
  );