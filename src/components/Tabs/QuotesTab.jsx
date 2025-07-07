import React from 'react';

const quotes = [
  // Jujutsu Kaisen
  { source: 'Gojo – Jujutsu Kaisen', text: 'Throughout Heaven and Earth, I alone am the honored one.' },
  { source: 'Yuji – Jujutsu Kaisen', text: 'Dying to win and risking death to win are completely different, Megumi.' },
  { source: 'Geto – Jujutsu Kaisen', text: 'Only those who are truly strong can decide their own worth.' },

  // Naruto
  { source: 'Naruto Uzumaki', text: 'I’m not gonna run away, I never go back on my word!' },
  { source: 'Itachi Uchiha', text: 'People live their lives bound by what they accept as correct and true…' },
  { source: 'Kakashi Hatake', text: 'In the ninja world, those who break the rules are scum…' },

  // Haikyuu!!
  { source: 'Hinata – Haikyuu!!', text: 'The future belongs to those who believe in the beauty of their dreams.' },
  { source: 'Kageyama – Haikyuu!!', text: 'The court is a battlefield. Let’s go to war!' },

  // Blue Lock
  { source: 'Isagi – Blue Lock', text: 'I’ll devour you to become the striker who leads Japan!' },
  { source: 'Bachira – Blue Lock', text: 'Let the monster inside guide you.' },
  { source: 'Rin – Blue Lock', text: 'Don’t block my light. I’m born to dominate.' },

  // Hajime no Ippo
  { source: 'Ippo Makunouchi', text: 'It’s not about how hard you hit. It’s about how much you can take!' },
  { source: 'Takamura – Ippo', text: 'Fighting is life. You quit, you die.' },

  // Solo Leveling
  { source: 'Sung Jin-Woo', text: 'I’m not weak anymore.' },
  { source: 'Sung Jin-Woo', text: 'Arise.' },

  // My Hero Academia
  { source: 'Deku – MHA', text: 'Don’t worry about what other people think. Hold your head up high and plunge forward.' },
  { source: 'All Might – MHA', text: 'A hero’s job is to risk his life to turn his promises into reality!' },
  { source: 'Shoto Todoroki – MHA', text: 'Never forget who you want to become.' },

  // Tokyo Ghoul
  { source: 'Kaneki Ken – Tokyo Ghoul', text: 'It’s not the world that’s messed up; it’s those of us in it.' },
  { source: 'Arima – Tokyo Ghoul', text: 'In this world, the strong devour the weak.' },

  // Attack on Titan
  { source: 'Eren Yeager – AOT', text: 'If you win, you live. If you lose, you die. If you don’t fight, you can’t win!' },
  { source: 'Levi Ackerman', text: 'The only thing we’re allowed to do is believe.' },
  { source: 'Erwin Smith – AOT', text: 'My soldiers, rage! My soldiers, scream! My soldiers, fight!' },

  // Demon Slayer
  { source: 'Tanjiro – Demon Slayer', text: 'The bond between Nezuko and I can’t be severed by anyone!' },
  { source: 'Rengoku – Demon Slayer', text: 'Set your heart ablaze.' },

  // Death Note
  { source: 'Light Yagami – Death Note', text: 'I am Justice!' },
  { source: 'L – Death Note', text: 'Being alone is better than being with the wrong person.' },

  // One Piece
  { source: 'Luffy – One Piece', text: 'I don’t want to conquer anything. I just think the guy with the most freedom in this world is the king of the pirates.' },
  { source: 'Zoro – One Piece', text: 'When the world shoves you around, you just gotta stand up and shove back.' },
  { source: 'Sanji – One Piece', text: 'A man forgives a woman’s lies.' },

  // Marvel
  { source: 'Iron Man – Tony Stark', text: 'Heroes are made by the paths they choose, not the powers they are graced with.' },
  { source: 'Spider-Man', text: 'With great power comes great responsibility.' },
  { source: 'Captain America', text: 'I can do this all day.' },
  { source: 'Black Panther', text: 'In times of crisis, the wise build bridges while the foolish build barriers.' },
  { source: 'Thor', text: 'You’re not a god. You’re just a man with a hammer.' },
  { source: 'Doctor Strange', text: 'We never lose our demons, we only learn to live above them.' },
  { source: 'Loki', text: 'I am burdened with glorious purpose.' },

  // DC / Comic Universe
  { source: 'Batman', text: 'It’s not who I am underneath, but what I do that defines me.' },
  { source: 'Superman', text: 'Dreams save us. Dreams lift us up and transform us.' },
  { source: 'Flash', text: 'Life doesn’t give us purpose. We give life purpose.' },
  { source: 'Wonder Woman', text: 'It’s about what you believe. And I believe in love.' },
  { source: 'Green Arrow', text: 'You have failed this city!' },
  { source: 'Nightwing', text: 'The world doesn’t need another Batman. It needs a Nightwing.' },

  // More anime & legacy quotes
  { source: 'Gon – Hunter x Hunter', text: 'When you’re feeling sad, smile – even if it’s a fake smile.' },
  { source: 'Killua – Hunter x Hunter', text: 'I’m so tired of killing. I want to be a kid.' },
  { source: 'Mob – Mob Psycho 100', text: 'It’s okay to run. Just don’t give up.' },
  { source: 'Saitama – One Punch Man', text: 'I’m just a guy who’s a hero for fun.' },
  { source: 'Reigen – Mob Psycho', text: 'You’re not special. But that doesn’t mean you’re not great.' },
  { source: 'Ash Ketchum – Pokémon', text: 'I want to be the very best, like no one ever was!' },
  { source: 'Kenshin – Rurouni Kenshin', text: 'A sword is a weapon. The art of sword is the art of killing.' },
  { source: 'Inosuke – Demon Slayer', text: 'If you’re gonna hit me, at least put some muscle into it!' },
];

function QuotesTab() {
  const todayIndex = new Date().getDate() % quotes.length;
  const { source, text } = quotes[todayIndex];

  return (
    <div className="bg-gradient-to-br from-blackBg to-cursedPurple/10 p-6 rounded-2xl shadow-inner shadow-cursedBlue text-whiteText text-center">
      <h2 className="text-2xl font-bold mb-4 text-cursedBlue">🔥 Daily Power Quote</h2>
      <blockquote className="text-lg italic mb-2 max-w-xl mx-auto text-cursedGreen">
        “{text}”
      </blockquote>
      <p className="text-sm text-cursedRed mt-1">— {source}</p>
    </div>
  );
}

export default QuotesTab;
