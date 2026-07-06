# ISO Space Academy Source Material

Primary source: `ISO2026 Foundation Level Textbook.pdf`, supplied by the parent.

The app must treat this textbook as the source of truth for the Space Academy track. Do not invent concepts outside this source unless a parent explicitly adds a separate approved reference.

## Foundation Level Units

1. Fundamentals of Astronomy
2. The Solar System
3. Stars, Galaxies & the Universe
4. Earth & Moon
5. Satellites & Space Technology
6. Rockets & Launch Vehicles
7. ISRO & India’s Space Missions
8. Space Exploration
9. Basic Physics for Space Science
10. Scientific Reasoning & Logical Aptitude
11. General Space Awareness

## Design rule

Each textbook unit should become a Space Academy mission world. Each chapter should become a child-friendly level with:

- Mission Brief
- Story setup
- One-concept discovery step
- Observation task
- Game/activity
- STEM experiment where safe
- Mission challenge from textbook exercises
- Boss battle using textbook/unit/model-paper questions
- Reward and parent dashboard

## Safety rule

The textbook repeatedly warns that the child must never look directly at the Sun. Any Sun, shadow, sunrise, sunset, eclipse, or outdoor observation feature must show a safety warning and require adult supervision.

## Next implementation task

Replace placeholder mission mappings in `src/data/spaceAcademy.ts` with generated missions from `src/data/isoSyllabus.ts`, then progressively add question banks from the textbook exercises, unit practice questions, model papers and answer key.
