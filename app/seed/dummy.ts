import bcrypt from "bcryptjs";

export const dummyTexts = [
  "It went through such rapid contortions that the little bear was forced to change his hold on it so many times he became confused in the darkness, and could not, for the life of him, tell whether he held the sheep right side up, or upside down. But that point was decided for him a moment later by the animal itself, who, with a sudden twist, jabbed its horns so hard into his lowest ribs that he gave a grunt of anger and disgust.",
  "She glanced up into the sky to watch the clouds taking shape. First, she saw a dog. Next, it was an elephant. Finally, she saw a giant umbrella and at that moment the rain began to pour.",
  "She was aware that things could go wrong. In fact, she had trained her entire life in anticipation that things would go wrong one day. She had quiet confidence as she started to see that this was the day that all her training would be worthwhile and useful. At this point, she had no idea just how wrong everything would go that day.",
  "She put the pen to paper but she couldn't bring herself to actually write anything. She just stared at the blank card and wondered what words she could write that would help in even a small way. She thought of a dozen ways to begin but none seemed to do justice to the situation. There were no words that could help and she knew it.",
  "Dragons don't exist they said. They are the stuff of legend and people's imagination. Greg would have agreed with this assessment without a second thought 24 hours ago. But now that there was a dragon staring directly into his eyes, he questioned everything that he had been told.",
  "She didn't like the food. She never did. She made the usual complaints and started the tantrum he knew was coming. But this time was different. Instead of trying to placate her and her unreasonable demands, he just stared at her and watched her meltdown without saying a word.",
  "Then came the night of the first falling star. It was seen early in the morning, rushing over Winchester eastward, a line of flame high in the atmosphere. Hundreds must have seen it and taken it for an ordinary falling star. It seemed that it fell to earth about one hundred miles east of him.",
  "He walked down the steps from the train station in a bit of a hurry knowing the secrets in the briefcase must be secured as quickly as possible. Bounding down the steps, he heard something behind him and quickly turned in a panic. There was nobody there but a pair of old worn-out shoes were placed neatly on the steps he had just come down. Had he past them without seeing them? It didn't seem possible. He was about to turn and be on his way when a deep chill filled his body.",
  "The leather jacked showed the scars of being his favorite for years. It wore those scars with pride, feeling that they enhanced his presence rather than diminishing it. The scars gave it character and had not overwhelmed to the point that it had become ratty. The jacket was in its prime and it knew it.",
  "Was it a whisper or was it the wind? He wasn't quite sure. He thought he heard a voice but at this moment all he could hear was the wind rustling the leaves of the trees all around him. He stopped and listened more intently to see if he could hear the voice again. Nothing but the wind rustling the leaves could be heard. He was about to continue his walk when he felt a hand on his shoulder, and he quickly turned to see who it was. There was nobody there, but he heard the voice again.",
  "A long black shadow slid across the pavement near their feet and the five Venusians, very much startled, looked overhead. They were barely in time to see the huge gray form of the carnivore before it vanished behind a sign atop a nearby building which bore the mystifying information 'Pepsi-Cola.'",
  "'So, what do you think?' he asked nervously. He wanted to know the answer, but at the same time, he didn't. He'd put his heart and soul into the project and he wasn't sure he'd be able to recover if they didn't like what he produced. The silence from the others in the room seemed to last a lifetime even though it had only been a moment since he asked the question. 'So, what do you think?' he asked again.",
  "The words hadn't flowed from his fingers for the past few weeks. He never imagined he'd find himself with writer's block, but here he sat with a blank screen in front of him. That blank screen taunting him day after day had started to play with his mind. He didn't understand why he couldn't even type a single word, just one to begin the process and build from there. And yet, he already knew that the eight hours he was prepared to sit in front of his computer today would end with the screen remaining blank.",
  "The words hadn't flowed from his fingers for the past few weeks. He never imagined he'd find himself with writer's block, but here he sat with a blank screen in front of him. That blank screen taunting him day after day had started to play with his mind. He didn't understand why he couldn't even type a single word, just one to begin the process and build from there. And yet, he already knew that the eight hours he was prepared to sit in front of his computer today would end with the screen remaining blank.",
  "It was a question of which of the two she preferred. On the one hand, the choice seemed simple. The more expensive one with a brand name would be the choice of most. It was the easy choice. The safe choice. But she wasn't sure she actually preferred it.",
  "Twenty-five stars were neatly placed on the piece of paper. There was room for five more stars but they would be difficult ones to earn. It had taken years to earn the first twenty-five, and they were considered the 'easy' ones.",
  "He heard the crack echo in the late afternoon about a mile away. His heart started racing and he bolted into a full sprint. 'It wasn't a gunshot, it wasn't a gunshot,' he repeated under his breathlessness as he continued to sprint.",
  "She was aware that things could go wrong. In fact, she had trained her entire life in anticipation that things would go wrong one day. She had quiet confidence as she started to see that this was the day that all her training would be worthwhile and useful. At this point, she had no idea just how wrong everything would go that day.",
  "Benny was tired. Not the normal every day tired from a hard day o work. The exhausted type of tired where you're surprised your body can even move. All he wanted to do was sit in front of the TV, put his feet up on the coffee table, and drink a beer. The only issue was that he had forgotten where he lived.",
  "The robot clicked disapprovingly, gurgled briefly inside its cubical interior and extruded a pony glass of brownish liquid. 'Sir, you will undoubtedly end up in a drunkard's grave, dead of hepatic cirrhosis,' it informed me virtuously as it returned my ID card. I glared as I pushed the glass across the table.",
];

export const dummyComments = [
  " But that point was decided for him a moment later by the animal itself, who, with a sudden twist, jabbed its horns so hard into his lowest ribs that he gave a grunt of anger and disgust.",
  "She glanced up into the sky to watch the clouds taking shape.",
  "She was aware that things could go wrong. In fact, she had trained her entire life in anticipation that things would go wrong one day. She had quiet confidence as she started to see that this was the day that all her training would be worthwhile and useful. At this point, she had no idea just how wrong everything would go that day.",
  "She put the pen to paper but she couldn't bring herself to actually write anything.",
  "Dragons don't exist they said. They are the stuff of legend and people's imagination. But now that there was a dragon staring directly into his eyes, he questioned everything that he had been told.",
  "She didn't like the food. But this time was different. Instead of trying to placate her and her unreasonable demands, he just stared at her and watched her meltdown without saying a word.",
  "Then came the night of the first falling star.",
  "He walked down the steps from the train station in a bit of a hurry knowing the secrets in the briefcase must be secured as quickly as possible.",
  "The leather jacked showed the scars of being his favorite for years.",
  "Was it a whisper or was it the wind? He wasn't quite sure.",
  "A long black shadow slid across the pavement near their feet and the five Venusians, very much startled, looked overhead.",
  "'So, what do you think?' he asked nervously.",
  " He never imagined he'd find himself with writer's block, but here he sat with a blank screen in front of him. That blank screen taunting him day after day had started to play with his mind. He didn't understand why he couldn't even type a single word, just one to begin the process and build from there. And yet, he already knew that the eight hours he was prepared to sit in front of his computer today would end with the screen remaining blank.",
  "The words him day after day had started to play with his mind.",
  "It was a question of which of the two she preferred. On the one hand, the choice seemed simple.",
  "Twenty-five stars were neatly placed on the piece of paper. There was room for five more stars but they would be difficult ones to earn.",
  "He heard the crack echo in the late afternoon about a mile away. His heart started racing and he bolted into a full sprint.",
  "She was aware that things could go wrong that things would go wrong one day. She had quiet confidence would be worthwhile and useful..",
  "Benny was tired. Not the normal every day tired from a hard day o work. The only issue was that he had forgotten where he lived.",
  "Sir, you will undoubtedly end up in a drunkard's grave, dead of hepatic cirrhosis,' it informed me virtuously as it returned my ID card. I glared as I pushed the glass across the table.",
];

export const users = [
  {
    userid: 2,
    fname: "Meron",
    lname: "Tegegn",
    birthDay: new Date(),
    gender: "female",
    mobileOrPhoneNumber: "meri.zi@gmail.com",
    password: bcrypt.hashSync("Fb.Oath.49", 10),
    profilepic: "/users/2.jpg",
  },
  {
    userid: 3,
    fname: "Aster",
    lname: "Molalign",
    birthDay: new Date(),
    gender: "female",
    mobileOrPhoneNumber: "astuka.zi@gmail.com",
    password: bcrypt.hashSync("Fb.Oath.49", 10),
    profilepic: "/users/3.jpg",
  },
  {
    userid: 4,
    fname: "Kefa",
    lname: "Abebe",
    birthDay: new Date(),
    gender: "male",
    mobileOrPhoneNumber: "keffamideksa.zi@gmail.com",
    password: bcrypt.hashSync("Fb.Oath.49", 10),
    profilepic: "/users/4.jpg",
  },
  {
    userid: 5,
    fname: "Zemen",
    lname: "Kebede",
    profilepic: "/users/5.jpg",
    birthDay: new Date(),
    gender: "male",
    mobileOrPhoneNumber: "zemenu.zi@gmail.com",
    password: bcrypt.hashSync("Fb.Oath.49", 10),
  },
  {
    userid: 6,
    fname: "Zinash",
    lname: "Amare",
    birthDay: new Date(),
    gender: "female",
    mobileOrPhoneNumber: "ziniabiy.zi@gmail.com",
    password: bcrypt.hashSync("Fb.Oath.49", 10),
    profilepic: "/users/6.jpg",
  },
  {
    userid: 7,
    fname: "Zenit",
    lname: "Molla",
    birthDay: new Date(),
    gender: "female",
    mobileOrPhoneNumber: "amanii.zii@gmail.com",
    password: bcrypt.hashSync("zenit.Oath.49", 10),
    profilepic: "/users/7.jpg",
  },
  {
    userid: 8,
    fname: "Zerfe",
    lname: "Moges",
    birthDay: new Date(),
    gender: "female",
    mobileOrPhoneNumber: "zerfe.zi@gmail.com",
    password: bcrypt.hashSync("Fb.Oath.49", 10),
    profilepic: "/users/8.jpg",
  },
  {
    userid: 10,
    fname: "Manaye",
    lname: "Abebe",
    birthDay: new Date(),
    gender: "male",
    mobileOrPhoneNumber: "mana.zi@gmail.com",
    password: bcrypt.hashSync("Fb.Oath.49", 10),
    profilepic: "/users/10.jpg",
  },
  {
    userid: 11,
    fname: "Zetseat",
    lname: "Ferede",
    birthDay: new Date(),
    gender: "male",
    mobileOrPhoneNumber: "zetsu.zi@gmail.com",
    password: bcrypt.hashSync("Fb.Oath.49", 10),
    profilepic: "/users/11.jpg",
  },
  {
    userid: 12,
    fname: "Bereket",
    lname: "Asseffa",
    profilepic: "/users/12.jpg",
    birthDay: new Date(),
    gender: "male",
    mobileOrPhoneNumber: "beki.zi@gmail.com",
    password: bcrypt.hashSync("Fb.Oath.49", 10),
  },
  {
    userid: 13,
    fname: "Afomia",
    lname: "Anagaw",
    birthDay: new Date(),
    gender: "female",
    mobileOrPhoneNumber: "afomi.zi@gmail.com",
    password: bcrypt.hashSync("Fb.Oath.49", 10),
    profilepic: "/users/13.jpg",
  },
  {
    userid: 14,
    fname: "Menberu",
    lname: "Zemi",
    birthDay: new Date(),
    gender: "male",
    mobileOrPhoneNumber: "menbe.zi@gmail.com",
    password: bcrypt.hashSync("Fb.Oath.49", 10),
    profilepic: "/users/14.jpg",
  },
  {
    userid: 15,
    fname: "Haymi",
    lname: "Alaska",
    birthDay: new Date(),
    gender: "female",
    mobileOrPhoneNumber: "hyami.zi@gmail.com",
    password: bcrypt.hashSync("Fb.Oath.49", 10),
    profilepic: "/users/15.jpg",
  },
];

export const stories = [
  {
    storyid: 1,
    fname: "Amanuel",
    lname: "Ferede",
    profilepic: "/users/1.jpg",
    post: "/users/15.jpg",
  },
  {
    storyid: 2,
    fname: "Meron",
    lname: "Tegegn",
    profilepic: "/users/2.jpg",

    post: "/users/14.jpg",
  },
  {
    storyid: 3,
    fname: "Aster",
    lname: "Molalign",
    profilepic: "/users/3.jpg",

    post: "/users/13.jpg",
  },
  {
    storyid: 4,
    fname: "Kefa",
    lname: "Abebe",
    profilepic: "/users/4.jpg",

    post: "/users/12.jpg",
  },
  {
    storyid: 5,
    fname: "Zemen",
    lname: "Kebede",
    profilepic: "/users/5.jpg",

    post: "/users/11.jpg",
  },
  {
    storyid: 6,
    fname: "Zinash",
    lname: "Amare",
    profilepic: "/users/6.jpg",

    post: "/users/10.jpg",
  },
  {
    storyid: 7,
    fname: "Zenit",
    lname: "Molla",
    profilepic: "/users/7.jpg",

    post: "/users/9.jpg",
  },
  {
    storyid: 8,
    fname: "Zerfe",
    lname: "Moges",
    profilepic: "/users/8.jpg",

    post: "/users/8.jpg",
  },
  {
    storyid: 10,
    fname: "Mona",
    lname: "Abebe",
    profilepic: "/users/10.jpg",
    post: "/users/7.jpg",
  },
  {
    storyid: 11,
    fname: "Aman",
    lname: "Ferede",
    profilepic: "/users/11.jpg",
    post: "/users/6.jpg",
  },
  {
    storyid: 12,
    fname: "Bezi",
    lname: "Afomia",
    profilepic: "/users/12.jpg",
    post: "/users/5.jpg",
  },
  {
    storyid: 13,
    fname: "Mani",
    lname: "Anagaw",
    profilepic: "/users/13.jpg",
    post: "/users/4.jpg",
  },
  {
    storyid: 14,
    fname: "Moti",
    lname: "Zemi",
    profilepic: "/users/14.jpg",
    post: "/users/3.jpg",
  },
  {
    storyid: 15,
    fname: "Haymi",
    lname: "Alaska",
    profilepic: "/users/15.jpg",
    post: "/users/2.jpg",
  },
];

export const reactionTypes = [
  "like",
  "love",
  "care",
  "haha",
  "wow",
  "sad",
  "angry",
];

export const pages = [
  {
    name: "Ethiopian Artists",
    profilePicture: "/users/3.jpg",
  },

  {
    name: "Fast Mereja",
    profilePicture: "/users/3.jpg",
  },
  {
    name: "Global News",
    profilePicture: "/users/3.jpg",
  },

  {
    name: "Beauties of Africa",
    profilePicture: "/users/3.jpg",
  },
  {
    name: "Nobody cares",
    profilePicture: "/users/3.jpg",
  },
];

export const groups = [
  {
    name: "Ai generators",
    profilePicture: "/users/3.jpg",
  },

  {
    name: "Web developers",
    profilePicture: "/users/3.jpg",
  },
  {
    name: "Gospel for Ethiopia",
    profilePicture: "/users/3.jpg",
  },

  {
    name: "Habesha Mems",
    profilePicture: "/users/3.jpg",
  },
  {
    name: "እንመካከር",
    profilePicture: "/users/3.jpg",
  },
];
