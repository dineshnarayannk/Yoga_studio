"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../config/database"));
async function seedData() {
    const connection = await database_1.default.getConnection();
    try {
        console.log('Starting seed...');
        // 1. Seed Yoga Practices
        const practices = [
            {
                name: 'Vinyasa Flow',
                short_description: 'A fluid, dynamic practice connecting breath with creative movement.',
                description: 'A fluid, dynamic practice connecting breath with creative movement. Build strength, flexibility, and mindfulness in this flow.',
                difficulty: 'ALL_LEVELS',
                duration: 60,
                category: 'Dynamic',
                image: '/class-vinyasa.jpg'
            },
            {
                name: 'Hatha Harmony',
                short_description: 'Focus on classical postures, proper alignment, and pranayama.',
                description: 'Focus on classical postures, proper alignment, and pranayama (breathwork). Perfect for establishing a strong, mindful foundation.',
                difficulty: 'BEGINNER',
                duration: 75,
                category: 'Alignment',
                image: '/class-hatha.jpg'
            },
            {
                name: 'Restorative Yin',
                short_description: 'Deep passive stretches held for longer periods to target connective tissues.',
                description: 'Deep passive stretches held for longer periods to target connective tissues, promote relaxation, and quiet the mind.',
                difficulty: 'ALL_LEVELS',
                duration: 60,
                category: 'Restorative',
                image: '/class-yin.jpg'
            }
        ];
        for (const p of practices) {
            const [existing] = await connection.query('SELECT id FROM yoga_practices WHERE name = ?', [p.name]);
            if (existing.length === 0) {
                await connection.query(`INSERT INTO yoga_practices (name, short_description, description, difficulty, duration, category, image) VALUES (?, ?, ?, ?, ?, ?, ?)`, [p.name, p.short_description, p.description, p.difficulty, p.duration, p.category, p.image]);
            }
        }
        console.log('Seeded yoga_practices.');
        // 2. Seed Instructors
        const instructors = [
            {
                name: 'Elena Rostova',
                bio: 'Elena teaches with high energy and creative sequencing. With over 8 years of instruction, she believes in alignment-based freedom.',
                specialization: 'Vinyasa & Flow Guide',
                image: '/instructor-1.png'
            },
            {
                name: 'Marcus Vance',
                bio: 'Marcus is dedicated to grounding and breathing. His gentle posture adjustments help students of all levels deepen their focus safely.',
                specialization: 'Hatha & Alignment Specialist',
                image: '/instructor-2.png'
            },
            {
                name: 'Sarah Jenkins',
                bio: 'Sarah brings restorative sound bath journeys and meditative yin postures to soothe the nervous system and nurture quiet strength.',
                specialization: 'Yin & Sound Meditation Therapist',
                image: '/instructor-3.png'
            },
            {
                name: 'Darius Coleman',
                bio: 'Darius teaches with a focus on functional movement, anatomical awareness, and mindful strength, building physical and mental resilience.',
                specialization: 'Strength & Vinyasa Guide',
                image: '/darius-coleman.png'
            }
        ];
        for (const ins of instructors) {
            const [existing] = await connection.query('SELECT id FROM instructors WHERE name = ?', [ins.name]);
            if (existing.length === 0) {
                await connection.query(`INSERT INTO instructors (name, bio, specialization, image) VALUES (?, ?, ?, ?)`, [ins.name, ins.bio, ins.specialization, ins.image]);
            }
        }
        console.log('Seeded instructors.');
        console.log('Seed completed successfully.');
    }
    catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
    finally {
        connection.release();
        process.exit(0);
    }
}
seedData();
