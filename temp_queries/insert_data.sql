INSERT INTO 'Users' VALUES 
(1, 'Seth', 'Houchins', 44.5642, 123.2621),
(2, 'Nicholai', 'Gallegos', 44.5631, 123.2591),
(3, 'Jabob', 'Hawkins', 44.5599, 123.2620),
(4, 'Jethro', 'Dowzers', 50.0239, 145.023),
(5, 'Dorkin', 'Borkin', 60.1234, 120.1234),
(6, 'Sensual', 'Sasquatch'),
(7, 'Your', 'Mom', 69.6969, 69.4200),
(8, 'Hewbert', 'Cumberdale', 90.0000, 0.0000),
(9, 'Puberman', 'Chimball', 89.2321, 45.0000),
(10, 'Wheresmabutt', 'Immachild', 23.1232, 167.2301),
(11, 'Icantthinkofanygoodnames', 'fart', 12.1212, 67.7348),
(12, 'Ithoughtofsomething', 'funnierthantwentyfour', 25.2525, 25.2525),
(13, 'Doot', 'Boop', 62.3512, 10.2412),
(14, 'Steve', 'Chiliman', 47.2536, 122.4444);

INSERT INTO 'Events' (hostID, dateTime, eventName, venueNAME, addressLine1, addressLine2, city, state, country, zip, latitude, longitude, eventCapacity, hasEntryFee, ticketPrice, numberAttending) VALUES
(1, '12-02-20 18.00.00', 'Come hangout in my basement', 'Seths house', '444 SW WHACK', ' ', 'Corvallis', 'Oregon', 'United States of America', 97333, 44.5642, 123.2621, 100, 0, 0.0, 69),
(7, '12-25-20 22.00.00', 'You up?', 'Your moms house', '1232 Baseline', ' ', 'Beaverton', 'Oregon', 'United States of America', '91230', 42.3215, 140.2034, 2000, 0, 0.0, 0),
(1, '6-20-21 12.00.00', 'Crab Fest', 'Seths house', '444 SW WHACK', ' ', 'Corvallis', 'Oregon', 'United States of America', '97333', 44.5642, 123.2621, 1000, 1, 20.0, 1500),
(14, '12-02-22 12.00.00', 'Steves 112th annual Chili Cookout Carnival', 'Steves Chili Farm', '1234 Burp', ' ', 'Tacoma', 'Washington', 'United States of America', '91234', 47.2536, 122.4444, 3000, 1, 10.00, 1556),
(2, '08-07-20 9.00.00', 'Eco-Restore Initiative Spring Charity Run', 'Wonder Commune', '1232 yooble', ' ', 'Yreka', 'California', 'United States of America', '96543', 39.1234, 120.1234, 6, 1, 2163.32, 2);

INSERT INTO 'Tickets' VALUES
(1, 1, 2, 0),
(2, 1, 5, 0),
(3, 2, 1, 0),
(4, 7, 1, 1),
(5, 8, 1, 1),
(6, 9, 5, 1),
(7, 10, 5, 1),
(8, 1, 4, 1),
(9, 9, 4, 1),
(10, 10, 4, 1),
(11, 14, 4, 1);

INSERT INTO 'Tags' VALUES
('Food'),
('Help'),
('Therapy'),
('NotCreepy'),
('Chili'),
('Green'),
('Crabs');

INSERT INTO 'Tags_Events' VALUES
('Food', 1),
('Food', 2),
('Food', 4),
('Food', 3),
('Help', 1),
('NotCreepy', 1),
('Therapy', 1),
('Green', 2),
('Crabs', 2),
('Crabs', 3),
('Chili', 4);

INSERT INTO 'Users_Users' VALUES
(1, 2),
(2, 1),
(1, 8),
(1, 7),
(2, 7),
(3, 7),
(4, 7),
(5, 7),
(6, 7),
(8, 7),
(9, 7),
(10, 7),
(11, 7),
(12, 7),
(13, 7),
(14, 7),
(1, 4), 
(4, 1),
(2, 14),
(7, 9),
(7, 10),
(11, 1),
(3, 2),
(3, 1),
(13, 2),
(14, 2),
(8, 2);
