const db = require("../config/connection");
const { User, Trip, Category } = require("../models");

db.once("open", async () => {

    await Trip.deleteMany({});
    await User.deleteMany({});
    await Category.deleteMany({});


  const categories = await Category.insertMany([
    { name: "Africa" },
    { name: "Asia" },
    { name: "Europe" },
    { name: "Oceania" },
    { name: "North and South America" },
  ]);

  console.log("categories seeded");

  const trips = await Trip.insertMany([
    {
      title: "Lagos, Nigeria",
      summary: "This is a test",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      img: "lagos.jpg",
      category: categories[0]._id,
      price: 2.99,
    },
    {
      title: "Zanzibar Tanzania",
      summary: "This is a test",
      description:
        "Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.",
      img: "zanzibar.jpg",
      category: categories[0]._id,
      price: 1.99,
    },
    {
      title: "Japan Excursion",
      summary: "This is a test",
      category: categories[1]._id,
      description:
        "Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.",
      img: "japan.jpg",
      price: 7.99,
    },
    {
      title: "Seoul South Korea",
      summary: "This is a test",
      category: categories[1]._id,
      description:
        "Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.",
      img: "seoul.jpg",
      price: 3.99,
    },
    {
      title: "Singapore",
      category: categories[1]._id,
      summary: "This is a test",
      description:
        "Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.",
      img: "singapore.jpg",
      price: 14.99,
    },
    {
      title: "Explore Vienna",
      summary: "This is a test",
      category: categories[2]._id,
      description:
        "Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.",
      img: "vienna.jpg",
      price: 399.99,
    },
    {
      title: "Amesterdam Holiday",
      summary: "This is a test",
      category: categories[2]._id,
      description:
        "In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.",
      img: "amesterdam.jpg",
      price: 199.99,
    },
    {
      title: "Visit the Shire",
      summary: "This is a test",
      category: categories[3]._id,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.",
      img: "shire.jpg",
      price: 9.99,
    },
    {
      title: "Mexico City Ahi Nos Vidrios",
      summary: "This is a test",
      category: categories[4]._id,
      description:
        "Ut vulputate hendrerit nibh, a placerat elit cursus interdum.",
      img: "mexico-city.jpg",
      price: 1.99,
    },
    {
      title: "Ancient City of Machu Pichu",
      summary: "This is a test",
      category: categories[4]._id,
      description:
        "Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.",
      img: "machu-pichu.jpg",
      price: 2.99,
    },
    {
      title: "Vancouver Getaway",
      summary: "This is a test",
      category: categories[4]._id,
      description:
        "Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.",
      img: "vancouver.jpg",
      price: 7.99,
    },
    {
      title: "Rio de Janeiro Brazil",
      summary: "This is a test",
      category: categories[4]._id,
      description:
        "Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.",
      img: "brazil.jpg",
      price: 9.99,
    },
  ]);

  console.log("products seeded");

  await User.create({
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
    purchased: [trips[0]._id, trips[11]._id, trips[8]._id],
    wishList: [trips[3]._id, trips[9]._id],
  });

  await User.create({
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "password12345",
    purchased: [trips[0]._id, trips[11]._id, trips[8]._id],
    wishList: [trips[3]._id, trips[9]._id],
  });

  console.log("users seeded");

  process.exit();
});
