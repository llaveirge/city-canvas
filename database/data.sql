set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- You should NEVER EVER check user data into Git!

insert into "users" (	"firstName",
	"lastName",
	"email",
	"username",
	"photoUrl",
	"hashedPassword")
values ('Frank', 'Baggol', 'fbaggol@placeholdermail.com', 'TheRealSlimFrankie', 'https://citycanvaspins.s3.us-west-1.amazonaws.com/resized-image-1668114371449.jpg', 'dj43asldjhasjhawlejqwejnqmwnebmnabsdasuskyaudas1287361892763dajkshdlkj'),
('Wendy', 'Undomy', 'wundomy@placeholdermail.com', 'WendyU', 'https://citycanvaspins.s3.us-west-1.amazonaws.com/resized-image-1668114506686.jpg', 'd3342jasldjhasjhawlejqwejnqmasdasdasdasdasdasdaasdasdasd32423423492763dajkshdlkj'),
('Sam', 'Gambian', 'sgambian@placeholdermail.com', 'SamTheMan', 'https://citycanvaspins.s3.us-west-1.amazonaws.com/resized-image-1668114606313.jpg', 'd1jasdasdasdasdasjhawle234234jqwejnqmwnebmnabasdasds1287361892763dajkshdlkj'),
('Dane', 'Doe', 'demo@placeholdermail.com', 'DemoDane', 'https://citycanvaspins.s3.us-west-1.amazonaws.com/resized-image-1668114669374.jpg', '$argon2i$v=19$m=4096,t=3,p=1$iWp4oL/znMoW0Od6G3RV5w$wrVyD/Tld2oRcgr9Z3utMl7xoFo+u2+dWg8MSfjhNL4');


insert into "posts" (
  "title",
	"artistName",
	"artPhotoUrl",
	"comment",
	"lat",
	"lng",
	"userId"
)
values ('Unknown', 'Unknown','https://citycanvaspins.s3.us-west-1.amazonaws.com/resized-image-1668114185965.jpeg', 'This thing has got to be old! It is near the entrance to my office building and it has a real WPA mural vibe to it. I feel like it should get more attention, so come visit this little slice of CO. The building is on the north west corner of Cascade and Rio Grande.', 38.824658112106306, -104.82619374089172, 2),
  ('The Other Side', 'HOOTNANNIE', 'https://citycanvaspins.s3.us-west-1.amazonaws.com/resized-image-1668114135945.jpg', 'This paint made me feel like I was in a cartoon - the colors are so vibrant and bold, and the lines are so smooth. Great piece. Check it out next time you are near the Lucky Dumpling.', 38.833443010693614, -104.81826157520882, 3 ),
  ('What Makes a Community: North, East, South & West', 'PAES164 and community', 'https://citycanvaspins.s3.us-west-1.amazonaws.com/resized-image-1668114083505.jpg', 'I see this mural on my way to work everyday and it is just super heartwarming. A collaboration between local artist PAES164, CONO, Teach For America teachers, and students from surrounding schools. If you are near by, stop and give it a glance, maybe you will feel the same.', 38.829112654495965, -104.82535174608364, 2 ),
  ('Take Back the Power', 'Gregg Deal', 'https://citycanvaspins.s3.us-west-1.amazonaws.com/resized-image-1668114019158.jpg', 'Excellent indigenous work by Gregg Deal. This is a portrait of his daughter wearing a rad Interrupters shirt. You can see this mural on the east-facing side of the building by the parking lot. Another great addition to the Springs.', 38.834158324677844, -104.82302912287078, 1 ),
  ('Low Rider', 'Mel CK', 'https://citycanvaspins.s3.us-west-1.amazonaws.com/resized-image-1668113970565.jpg', 'I am always excited to find a great mural in an alley downtown! This suave toucan in a low rider is down the alley on the side of Fratelli Ristorante. I was stoked to see some Panamanian pride in our city! I hope she does more work around town. ', 38.83598854708422, -104.82189474176981, 3 ),
  ('Apache', 'Drake Drastik', 'https://citycanvaspins.s3.us-west-1.amazonaws.com/resized-image-1668113924870.jpg', 'Stumbled upon this piece when I got lost on the westside! It is on the side of the Apache Court Motel on 34th and Pikes Peak. Really cool find in that part of town, really brings a colorful vibe to the neighborhood - all of his work is really awesome, though.', 38.85706777435813, -104.87835443896886, 3 ),
  ('Guardian', 'Matthew Carlson', 'https://citycanvaspins.s3.us-west-1.amazonaws.com/resized-image-1668113597125.jpg', 'This scary, interesting, and chaotic dude is in the median by the theater. Not sure what it is guarding, but I would NOT mess with this thing. Be sure to check it out next time you are downtown!', 38.83387105305894, -104.82266124016441, 1 ),
  ('Greetings from Colorado Springs', 'Drake Drastik', 'https://citycanvaspins.s3.us-west-1.amazonaws.com/resized-image-1668113443022.jpg', 'Great mural depicting some local coolness and celebs, like Nikola Tesla and Elvira! It is on the side of the tattoo shop, across from the church. This one is definitely worth checking out. The previous mural here, done by the same artist, was also really well done. This is certainly a spot to keep an eye on.', 38.84327863655874, -104.85675948410532, 4 );
