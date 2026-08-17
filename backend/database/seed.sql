-- Seed Data for: yoga_studio
-- Generated from backend/src/database/seeds/01_initial_seed.ts

-- 1. Seed Yoga Practices
INSERT INTO yoga_practices (name, short_description, description, difficulty, duration, category, image) VALUES 
('Vinyasa Flow', 'A fluid, dynamic practice connecting breath with creative movement.', 'A fluid, dynamic practice connecting breath with creative movement. Build strength, flexibility, and mindfulness in this flow.', 'ALL_LEVELS', 60, 'Dynamic', '/class-vinyasa.jpg'),
('Hatha Harmony', 'Focus on classical postures, proper alignment, and pranayama.', 'Focus on classical postures, proper alignment, and pranayama (breathwork). Perfect for establishing a strong, mindful foundation.', 'BEGINNER', 75, 'Alignment', '/class-hatha.jpg'),
('Restorative Yin', 'Deep passive stretches held for longer periods to target connective tissues.', 'Deep passive stretches held for longer periods to target connective tissues, promote relaxation, and quiet the mind.', 'ALL_LEVELS', 60, 'Restorative', '/class-yin.jpg');

-- 2. Seed Instructors
INSERT INTO instructors (name, bio, specialization, image) VALUES 
('Elena Rostova', 'Elena teaches with high energy and creative sequencing. With over 8 years of instruction, she believes in alignment-based freedom.', 'Vinyasa & Flow Guide', '/instructor-1.png'),
('Marcus Vance', 'Marcus is dedicated to grounding and breathing. His gentle posture adjustments help students of all levels deepen their focus safely.', 'Hatha & Alignment Specialist', '/instructor-2.png'),
('Sarah Jenkins', 'Sarah brings restorative sound bath journeys and meditative yin postures to soothe the nervous system and nurture quiet strength.', 'Yin & Sound Meditation Therapist', '/instructor-3.png'),
('Darius Coleman', 'Darius teaches with a focus on functional movement, anatomical awareness, and mindful strength, building physical and mental resilience.', 'Strength & Vinyasa Guide', '/darius-coleman.png');
