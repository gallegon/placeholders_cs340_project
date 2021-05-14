--Queries for profile page
--Profile being viewed will be referred to as: VIEWID
--Profile signed in will be referred to as:    SIGNID
--Input into a form will be referred to as:    'INPUT'

--Query for name at top
--should we replace first and last names with profile names?
SELECT firstName FROM Users WHERE userID = VIEWID;

--For userID just reuse VIEWID?

--Logout button
VIEWID = SIGNID

--Follow vs Unfollow button
SELECT * FROM Users_Users WHERE followedBy = SIGNID AND followedUser = VIEWID;

--Current Location
SELECT latitude, longitude FROM Users WHERE userID = VIEWID;

--Change Location - Available if VIEWID = SIGNID. Maybe a second form needed?
UPDATE Users SET latitude='INPUT' WHERE userID = SIGNID;
UPDATE Users SET longitude='INPUT' WHERE userID = SIGNID;

--Following section
SELECT A.firstName, A.lastName FROM Users A 
INNER JOIN Users_Users B ON A.userID = B.followedUser AND B.followedBy = VIEWID;

--Followers section
SELECT A.firstName, A.lastName FROM Users A
INNER JOIN Users_Users B ON A.userID = B.followedBy AND B.followedUser = VIEWID;

--Tickets section
SELECT E.eventName FROM Events E
INNER JOIN Tickets T ON T.ownerID = VIEWID AND E.eventID = T.eventID;

--Events Hosted section
SELECT eventName FROM Events WHERE hostID = VIEWID;

--
