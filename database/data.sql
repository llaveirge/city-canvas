set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- You should NEVER EVER check user data into Git!

insert into "users" (	"firstName",
	"lastName",
	"email",
	"userName",
	"photoUrl",
	"hashedPassword")
values ('John', 'Doe', 'test@test.com', 'AwesomeFirstUser', 'images/image-129387123.jpg', 'djasldjhasjhawlejqwejnqmwnebmnabsdasuskyaudas1287361892763dajkshdlkj');


insert into "posts" (
  "title",
	"artistName",
	"artPhotoUrl",
	"comment",
	"lat",
	"lng",
	"userId"
)
values ('Cool Thing', 'That One Guy', 'https://images.unsplash.com/photo-1624198376649-c121a452d157?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80', 'Saw this and it was really cool.', 42.361145, -71.057083, 1 ),
  ('Interesting', 'Some Person', 'https://images.unsplash.com/photo-1633185077583-45eac5a73c80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80', 'Interesesting sculpture.', 42.3587999, -71.0707389, 1 ),
  ('Mural Awesome', 'Namey McNamerson', 'https://images.unsplash.com/photo-1561149872-9e581fb713d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1927&q=80', 'Big mural that also happens to be awesome.', 42.3448902, -71.0866892, 1 );
