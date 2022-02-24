set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- You should NEVER EVER check user data into Git!

insert into "users" (	"firstName",
	"lastName",
	"email",
	"userName",
	"photoUrl",
	"hashedPassword")
values ('Frodes', 'Baggins', 'test1@test.com', 'AwesomeFirstUser', 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'dj43asldjhasjhawlejqwejnqmwnebmnabsdasuskyaudas1287361892763dajkshdlkj'),
('Wendy', 'Undomiel', 'test2@test.com', 'EquallyAwesomeSecondUser', 'https://images.unsplash.com/photo-1611590027211-b954fd027b51?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1938&q=80', 'd3342jasldjhasjhawlejqwejnqmasdasdasdasdasdasdaasdasdasd32423423492763dajkshdlkj'),
('Sam', 'Gamgee', 'test3@test.com', 'MostAwesomeThirdUser', 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'd1jasdasdasdasdasjhawle234234jqwejnqmwnebmnabasdasds1287361892763dajkshdlkj');


insert into "posts" (
  "title",
	"artistName",
	"artPhotoUrl",
	"comment",
	"lat",
	"lng",
	"userId"
)
values ('Are You Daft?', '@DifferentGuy', 'https://images.unsplash.com/photo-1628064009888-ef9e3d2d14c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', 'The best mural.', 42.3587999, -71.0707389, 2 ),
  ('Cool Thing', 'That One Guy', 'https://images.unsplash.com/photo-1624198376649-c121a452d157?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80', 'Saw this and it was really cool.', 42.361145, -71.057083, 1 ),
  ('Look Up', 'Some Person', 'https://images.unsplash.com/photo-1608317024553-9769b09329cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80', 'Interesesting work.', 42.3587999, -71.0707389, 3 ),
  ('Makey-Makey', 'Unknown', 'https://images.unsplash.com/photo-1633185077583-45eac5a73c80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80', 'Interesesting sculpture.', 42.3587999, -71.0707389, 2 ),
  ('Mural Awesome', 'Namey McNamerson', 'https://images.unsplash.com/photo-1561149872-9e581fb713d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1927&q=80', 'Big mural that also happens to be awesome.', 42.3448902, -71.0866892, 3 );
