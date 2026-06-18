export interface Continent {
  name: string;
  emoji: string;
  size: string;
  countries: string;
  animals: string;
  landmark: string;
  fact: string;
}

export interface Ocean {
  name: string;
  emoji: string;
  size: string;
  touches: string;
  animals: string;
  fact: string;
}

export interface Country {
  name: string;
  emoji: string;
  capital: string;
  currency: string;
  language: string;
  landmark: string;
  fact: string;
}

export const continents: Continent[] = [
  { name: 'Asia', emoji: '🐼', size: 'Largest continent', countries: 'India, China, Japan', animals: 'Panda, tiger, elephant', landmark: 'Mount Everest', fact: 'Asia has the most people in the world.' },
  { name: 'Africa', emoji: '🦁', size: 'Second largest continent', countries: 'Egypt, Kenya, South Africa', animals: 'Lion, giraffe, zebra', landmark: 'Sahara Desert', fact: 'Africa has the world’s largest hot desert.' },
  { name: 'North America', emoji: '🦅', size: 'Third largest continent', countries: 'USA, Canada, Mexico', animals: 'Bison, bald eagle, bear', landmark: 'Grand Canyon', fact: 'North America has countries from the Arctic to the tropics.' },
  { name: 'South America', emoji: '🦜', size: 'Fourth largest continent', countries: 'Brazil, Argentina, Peru', animals: 'Jaguar, llama, toucan', landmark: 'Amazon Rainforest', fact: 'The Amazon is the largest rainforest on Earth.' },
  { name: 'Antarctica', emoji: '🐧', size: 'Coldest continent', countries: 'No countries', animals: 'Penguins, seals, whales', landmark: 'South Pole', fact: 'Antarctica is covered mostly by ice.' },
  { name: 'Europe', emoji: '🏰', size: 'Small continent with many countries', countries: 'France, Germany, Italy', animals: 'Fox, wolf, deer', landmark: 'Eiffel Tower', fact: 'Europe has many castles, museums, and old cities.' },
  { name: 'Australia', emoji: '🦘', size: 'Smallest continent', countries: 'Australia', animals: 'Kangaroo, koala, emu', landmark: 'Great Barrier Reef', fact: 'Australia is both a country and a continent.' }
];

export const oceans: Ocean[] = [
  { name: 'Pacific Ocean', emoji: '🌊', size: 'Largest ocean', touches: 'Asia, Australia, North America, South America', animals: 'Whales, sea turtles, sharks', fact: 'The Pacific Ocean is the biggest and deepest ocean.' },
  { name: 'Atlantic Ocean', emoji: '🐋', size: 'Second largest ocean', touches: 'Africa, Europe, North America, South America', animals: 'Dolphins, cod, whales', fact: 'The Atlantic Ocean separates the Americas from Europe and Africa.' },
  { name: 'Indian Ocean', emoji: '🐠', size: 'Third largest ocean', touches: 'India, Africa, Australia, Antarctica', animals: 'Coral fish, turtles, dugongs', fact: 'The Indian Ocean touches India’s southern coast.' },
  { name: 'Southern Ocean', emoji: '🧊', size: 'Ocean around Antarctica', touches: 'Antarctica', animals: 'Penguins, seals, krill', fact: 'The Southern Ocean circles Antarctica.' },
  { name: 'Arctic Ocean', emoji: '❄️', size: 'Smallest ocean', touches: 'North America, Europe, Asia', animals: 'Polar bears, seals, walruses', fact: 'The Arctic Ocean is around the North Pole.' }
];

export const countries: Country[] = [
  { name: 'India', emoji: '🇮🇳', capital: 'New Delhi', currency: 'Indian Rupee', language: 'Hindi and English', landmark: 'Taj Mahal', fact: 'India has many languages, festivals, and the Himalayas.' },
  { name: 'United States', emoji: '🇺🇸', capital: 'Washington, D.C.', currency: 'US Dollar', language: 'English', landmark: 'Statue of Liberty', fact: 'The United States has 50 states.' },
  { name: 'Canada', emoji: '🇨🇦', capital: 'Ottawa', currency: 'Canadian Dollar', language: 'English and French', landmark: 'Niagara Falls', fact: 'Canada is famous for maple leaves and huge forests.' },
  { name: 'Brazil', emoji: '🇧🇷', capital: 'Brasília', currency: 'Brazilian Real', language: 'Portuguese', landmark: 'Christ the Redeemer', fact: 'Brazil has much of the Amazon Rainforest.' },
  { name: 'United Kingdom', emoji: '🇬🇧', capital: 'London', currency: 'Pound Sterling', language: 'English', landmark: 'Big Ben', fact: 'The UK includes England, Scotland, Wales, and Northern Ireland.' },
  { name: 'France', emoji: '🇫🇷', capital: 'Paris', currency: 'Euro', language: 'French', landmark: 'Eiffel Tower', fact: 'France is known for art, fashion, and delicious bread.' },
  { name: 'Germany', emoji: '🇩🇪', capital: 'Berlin', currency: 'Euro', language: 'German', landmark: 'Brandenburg Gate', fact: 'Germany is famous for cars, castles, and forests.' },
  { name: 'Italy', emoji: '🇮🇹', capital: 'Rome', currency: 'Euro', language: 'Italian', landmark: 'Colosseum', fact: 'Italy is shaped like a boot.' },
  { name: 'Japan', emoji: '🇯🇵', capital: 'Tokyo', currency: 'Japanese Yen', language: 'Japanese', landmark: 'Mount Fuji', fact: 'Japan is an island country with bullet trains and cherry blossoms.' },
  { name: 'China', emoji: '🇨🇳', capital: 'Beijing', currency: 'Renminbi / Yuan', language: 'Mandarin Chinese', landmark: 'Great Wall of China', fact: 'China has the world’s largest population after India.' },
  { name: 'Australia', emoji: '🇦🇺', capital: 'Canberra', currency: 'Australian Dollar', language: 'English', landmark: 'Sydney Opera House', fact: 'Australia is home to kangaroos and koalas.' },
  { name: 'South Africa', emoji: '🇿🇦', capital: 'Pretoria, Cape Town, Bloemfontein', currency: 'South African Rand', language: '11 official languages', landmark: 'Table Mountain', fact: 'South Africa has three capital cities.' },
  { name: 'Egypt', emoji: '🇪🇬', capital: 'Cairo', currency: 'Egyptian Pound', language: 'Arabic', landmark: 'Pyramids of Giza', fact: 'Ancient Egypt built pyramids near the Nile River.' },
  { name: 'Russia', emoji: '🇷🇺', capital: 'Moscow', currency: 'Russian Ruble', language: 'Russian', landmark: 'Saint Basil’s Cathedral', fact: 'Russia is the largest country by area.' },
  { name: 'Mexico', emoji: '🇲🇽', capital: 'Mexico City', currency: 'Mexican Peso', language: 'Spanish', landmark: 'Chichen Itza', fact: 'Mexico is known for ancient pyramids and colorful festivals.' },
  { name: 'United Arab Emirates', emoji: '🇦🇪', capital: 'Abu Dhabi', currency: 'UAE Dirham', language: 'Arabic', landmark: 'Burj Khalifa', fact: 'The UAE has one of the world’s tallest buildings.' },
  { name: 'Singapore', emoji: '🇸🇬', capital: 'Singapore', currency: 'Singapore Dollar', language: 'English, Malay, Mandarin, Tamil', landmark: 'Merlion', fact: 'Singapore is a city, country, and island.' },
  { name: 'Nepal', emoji: '🇳🇵', capital: 'Kathmandu', currency: 'Nepalese Rupee', language: 'Nepali', landmark: 'Mount Everest', fact: 'Nepal is home to the world’s tallest mountain.' },
  { name: 'Sri Lanka', emoji: '🇱🇰', capital: 'Sri Jayawardenepura Kotte', currency: 'Sri Lankan Rupee', language: 'Sinhala and Tamil', landmark: 'Sigiriya', fact: 'Sri Lanka is an island near southern India.' },
  { name: 'New Zealand', emoji: '🇳🇿', capital: 'Wellington', currency: 'New Zealand Dollar', language: 'English and Māori', landmark: 'Milford Sound', fact: 'New Zealand is known for mountains, sheep, and kiwis.' }
];
