-- Sample rows for local development, mirroring client/src/api/seed.json
-- (the mock-API seed) so demo mode and the real API show the same world.

INSERT INTO categories (id, name, icon, accent_color, order_index) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Orcs',            'axe',   '#D9B36C', 0),
  ('22222222-2222-2222-2222-222222222222', 'Human Factions',  'flag',  '#9FD8FF', 1),
  ('33333333-3333-3333-3333-333333333333', 'Notable NPCs',    'users', '#D9B36C', 2),
  ('44444444-4444-4444-4444-444444444444', 'Locations',       'map',   '#9FD8FF', 3),
  ('55555555-5555-5555-5555-555555555555', 'House Rules',     'scroll','#D9B36C', 4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO segments (category_id, title, display_mode, blocks, tags, order_index) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Classes', 'list',
   '["Render — The frontline fighters bound by clan oath", "Ashwalker — scouts and skirmishers trained in the Severed Lands", "Hecate-touched — spellcasters who speak to ancestor spirits"]',
   '["culture", "orcs"]', 0),
  ('11111111-1111-1111-1111-111111111111', 'Culture & Rites', 'bullet',
   '["Naming Customs — clan name precedes given name, earned after first hunt", "Death rites — ash-burial facing the home ridge; a lit tallow candle for one year", "Clan structure — matrilineal council of five elders, one seat rotates yearly"]',
   '["culture", "orcs"]', 1),
  ('11111111-1111-1111-1111-111111111111', 'Notable NPCs', 'paragraph',
   '["Tradines Hecate leads the council and distrusts outsiders more than she lets on. She lost a daughter to the Lament''s border raids and has never forgiven the human factions for it. She is a skilled orator and a cunning strategist; given the name Hecate as acknowledgment of her talent."]',
   '["npcs", "orcs"]', 2),
  ('22222222-2222-2222-2222-222222222222', 'The Severed Lands', 'paragraph',
   '["A loose alliance of border towns that formally treats with the Orc clans but quietly arms its militias against them. Players who side with the Compact will find Orc settlements closed to them."]',
   '["factions"]', 0)
ON CONFLICT DO NOTHING;
