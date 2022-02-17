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
values ('Cool Thing', 'That One Guy', 'images/image-123456.jpg', 'Saw this and it was really cool.', 42.361145, -71.057083, 1 ),
  ('Interesting', 'Some Person', 'images/image-987654.jpg', 'Interesesting sculpture.', 42.3587999, -71.0707389, 1 ),
  ('Mural Awesome', 'Namey McNamerson', 'images/image-45678.jpg', 'Big mural that also happens to be awesome.', 42.3448902, -71.0866892, 1 );
