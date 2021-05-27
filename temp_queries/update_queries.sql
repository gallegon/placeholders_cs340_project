--query for searching by tags
--TAGIN is used as the searched tag
SELECT E.eventName FROM Events E
INNER JOIN Tags T ON T.tagName = TAGIN AND T.eventID = E.eventID;

--query for creating a ticket for a given user ID
--EVENTIN is the event being viewed
--USERIN is the userID specified
INSERT INTO 'Tickets' (ownerID, eventID, confirmedArrival) VALUES (USERIN, EVENTIN, 0);

--query template for updating users
--<userparam> is what parameter is being updated
--PARAMIN is given input
--USERIN is the user being viewed 
UPDATE 'Users' SET <userparam> = PARAMIN WHERE userID = USERIN;

--query template for updating events
--<eventparam>
--PARAMIN
--EVENTIN
UPDATE 'Events' SET <eventparam> = PARAMIN WHERE eventID = EVENTIN;

--adding tag to an event
--TAGIN is the given tag
--EVENTIN is the event ID
INSERT INTO 'Tags_Events' (tagName, eventID) VALUES (TAGIN, EVENTID);


