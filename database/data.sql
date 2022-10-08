set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- You should NEVER EVER check user data into Git!

insert into "users" (	"firstName",
	"lastName",
	"email",
	"userName",
	"photoUrl",
	"hashedPassword")
values ('Frank', 'Baggins', 'fbaggins@middlemail.com', 'TheRealSlimFrankie', 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80', 'dj43asldjhasjhawlejqwejnqmwnebmnabsdasuskyaudas1287361892763dajkshdlkj'),
('Wendy', 'Undomiel', 'aundomiel@middlemail.com', 'WendyU', 'https://qph.fs.quoracdn.net/main-qimg-7cfed85bb8a41d239fae5d82fece79b1', 'd3342jasldjhasjhawlejqwejnqmasdasdasdasdasdasdaasdasdasd32423423492763dajkshdlkj'),
('Sam', 'Gamgee', 'sgamgee@middlemail.com', 'SamTheMan', 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80', 'd1jasdasdasdasdasjhawle234234jqwejnqmwnebmnabasdasds1287361892763dajkshdlkj'),
('Dane', 'Doe', 'demo@demo.com', 'DemoDane', 'https://images.unsplash.com/photo-1552939484-187ee3a8db82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80', '$argon2i$v=19$m=4096,t=3,p=1$vn6B7nd7b/nOXkYg6VPT2Q$AeI9LSP3pKftIEJOYxLE5KMVDcdldA7ASjMPCYhiw/s');


insert into "posts" (
  "title",
	"artistName",
	"artPhotoUrl",
	"comment",
	"lat",
	"lng",
	"userId"
)
values ('Unknown', 'Unknown','/images/resized/image-1665189710661.jpeg', 'This thing has got to be old! It is near the entrance to my office building and it has a real WPA mural vibe to it. I feel like it should get more attention, so come visit this little slice of CO. The building is on the north west corner of Cascade and Rio Grande.', 38.824658112106306, -104.82619374089172, 2),
  ('The Other Side', 'HOOTNANNIE', '/images/resized/image-1665189347817.jpg', 'This paint made me feel like I was in a cartoon - the colors are so vibrant and bold, and the lines are so smooth. Great piece. Check it out next time you are near the Lucky Dumpling.', 38.833443010693614, -104.81826157520882, 3 ),
  ('What Makes a Community: North, East, South, & West', 'PAES164 and community', '/images/resized/image-1665188921169.jpg', 'I see this mural on my way to work everyday and it is just super heartwarming. A collaboration between local artist PAES164, CONO, Teach For America teachers, and students from surrounding schools. If you are near by, stop and give it a glance, maybe you will feel the same.', 38.829112654495965, -104.82535174608364, 2 ),
  ('Take Back the Power', 'Gregg Deal', '/images/resized/image-1665183843847.jpg', 'Awesome indigenous work by Gregg. This is a portrait of his daughter on the side of the building wearing a rad Interrupters shirt. Another great addition to the Springs', 38.834158324677844, -104.82302912287078, 1 ),
  ('Low Rider', 'Mel CK', '/images/resized/image-1665187015974.jpg', 'There is nothing much better than a great mural in an alley downtown! This suave toucan in a low rider is down the alley on the side of Fratelli Ristorante. I was stoked to see some Panamanian pride in our city! I hope she does more work around town. ', 38.83598854708422, -104.82189474176981, 3 ),
  ('Apache', 'Drake Drastik', '/images/resized/image-1665184047883.jpg', 'Stumbled upon this piece when I got lost on the westside! It is on the side of the Apache Court Motel on 34th and Pikes Peak. Really cool find in that part of town, really brings a colorful vibe to the neighborhood - all of his work is really awesome, though.', 38.85706777435813, -104.87835443896886, 3 ),
  ('Guardian', 'Matthew Carlson', '/images/resized/image-1665184273997.jpg', 'This scary/interesting/chaotic dude is in the median by the theater. Not sure what it is guarding, but I would NOT mess with this thing. Be sure to check it out!', 38.83387105305894, -104.82266124016441, 1 ),
  ('Greetings from Colorado Springs', 'Drake Drastik', '/images/resized/image-1665183726746.jpg', 'Great mural depicting some local coolness and celebs, like Nikola Tesla and Elvira! On the side of the tattoo shop, across from the church. Definitely worth checking out. The previous mural here was also really well done and was painted by the same artist.', 38.84327863655874, -104.85675948410532, 4 );
