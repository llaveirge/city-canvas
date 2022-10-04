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
values ('Are You Daft?', 'CityMarx', 'https://images.unsplash.com/photo-1628064009888-ef9e3d2d14c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', 'Looks like someone else loves Daft Punk as much as I do! Go check out this colorful work by CityMarx near Post Office Square before someone tags over it!', 38.82626206625101, -104.82481625368032, 2 ),
  ('Brasil in NY', 'Tito Ferrara', 'https://images.unsplash.com/photo-1624198376649-c121a452d157?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80', 'Saw this on my way to the pub and thought it was really cool. There are a few walls with Ferrera tags around the area, recommend talking a walking tour of the area.', 38.827717459996556, -104.82239317418798, 3 ),
  ('Look Up', 'Unknown', 'https://images.unsplash.com/photo-1608317024553-9769b09329cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80', 'Awesome paint up by the park near Beacon St. Love the blue color study and the texture the wall adds, it is a really neat addition to this little wall.', 38.828145585347016, -104.82227295785923, 2 ),
  ('Take Back the Power', 'Gregg Deal', 'https://www.uncovercolorado.com/wp-content/uploads/2020/12/colorado-springs-murals-take-back-the-power.jpg', 'Awesome indigenous work by Gregg. This is a portrait of his daughter on the side of the building wearing a rad Interrupters shirt. Another great addition to the Springs', 38.834158324677844, -104.82302912287078, 1 ),
  ('Mother', 'L.N. Naga', 'https://images.unsplash.com/photo-1633185077583-45eac5a73c80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80', 'A small but sriking sculpture outside the housing block, adds a little bit of beauty to the neighborhood.', 38.826879040446585, -104.82756820082965, 3 ),
  ('Under the Same Sky', 'Kevin Ledo', 'https://images.unsplash.com/photo-1561149872-9e581fb713d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1927&q=80', 'Gigantic piece up on the side of the Gold Age Center parking garage in the alley in Chinatown. A hidden gem in the area for sure. Hope to see more work by Ledo around town.', 38.831050713266464, -104.82233008746961, 3 ),
  ('Guardian', 'Matthew Carlson', 'https://bloximages.newyork1.vip.townnews.com/gazette.com/content/tncms/assets/v3/editorial/1/11/111fbde2-a061-11ea-ad32-bfb117588960/5ecedbafd9e1f.image.jpg?crop=1637%2C1228%2C0%2C19&resize=1637%2C1228&order=crop%2Cresize', 'This scary/interesting/chaotic dude is in the median by the theater. Not sure what it is guarding, but I would NOT mess with this thing. Be sure to check it out!', 38.83387105305894, -104.82266124016441, 1 ),
  ('Greetings from Colorado Springs', 'Drake Drastik', 'https://www.uncovercolorado.com/wp-content/uploads/2020/12/colorado-springs-murals-greetings.jpg', 'Great mural depicting some local coolness and celebs, like Nikola Tesla and Elvira! On the side of the tattoo shop, across from the church. Definitely worth checking out. The previous mural here was also really well done and was painted by the same artist.', 38.84327863655874, -104.85675948410532, 4 );
