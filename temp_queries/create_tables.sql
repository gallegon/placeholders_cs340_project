create table 'Users' (
	'userID' int(11) NOT NULL AUTO_INCREMENT,
	'firstName' varchar(255) NOT NULL,
	'lastName' varchar(255) NOT NULL,
	'latitude' decimal(8, 5) DEFAULT NULL,
	'longitude' decimal(8,5) DEFAULT NULL,
	PRIMARY KEY ('userID')
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table 'Events' (
	'eventID' INT(11) NOT NULL AUTO_INCREMENT UNIQUE,
	'hostID' INT(11) NOT NULL,
	'dateTime' DATETIME NOT NULL,
	'eventName' VARCHAR(255) NOT NULL,
	'venueNAME' VARCHAR(255) NOT NULL,
	'addressLine1' VARCHAR(255) NOT NULL,
	'addressLine2' Varchar(255) NOT NULL,
	'city' VARCHAR(255) DEFAULT NULL,
	'state' VARCHAR(255) DEFAULT NULL,
	'country' VARCHAR(255) DEFAULT NULL,
	'zip' VARCHAR(255) DEFAULT NULL,
	'latitude' DECIMAL(8,5) NOT NULL,
	'longitude' DECIMAL(8,5) NOT NULL,
	'eventCapacity' INT(11) NOT NULL,
	'hasEntryFee' BOOLEAN NOT NULL,
	'ticketPrice' DECIMAL(8,2) NOT NULL,
	'numberAttending' INT NOT NULL,
	PRIMARY KEY ('eventID'),
	KEY 'hostID' ('hostID'),
	CONSTRAINT 'event_host_fk' FOREIGN KEY ('hostID') REFERENCES 'Users' ('usersID') ON DELETE CASCADE
	) ENGINE=innodb DEFAULT CHARSET=utf8;

create table 'Tickets' (
	'ticketID' INT(11) NOT NULL AUTO_INCREMENT UNIQUE,
	'ownerID' INT(11) NOT NULL,
	'eventID' INT(11) NOT NULL,
	'confirmedArrival' BOOLEAN NOT NULL,
	PRIMARY KEY ('ticketID'),
	KEY 'ownerID' ('ownerID'),
	KEY 'eventID' ('eventID'),
	CONSTRAINT 'ticketOwnerFK' FOREIGN KEY ('ownerID') REFERENCES 'Users' ('userID') ON DELETE CASCADE,
	CONSTRAINT 'ticketEventFK' FOREIGN KEY ('eventID') REFERENCES 'Events' ('eventID') ON DELETE CASCADE
) ENGINE=innodb DEFAULT CHARSET=utf8;

create table Tags (
	'tagName' VARCHAR (255) NOT NULL UNIQUE PRIMARY KEY
) ENGINE=innodb DEFAULT CHARSET=utf8;

create table Tags_Events (
	'tagName' VARCHAR(255) NOT NULL,
	'eventID' INT(11) NOT NULL,
	KEY 'tagName' ('tagName'),
	KEY 'eventID' ('eventID'),
	CONSTRAINT 'eventTagNameFK' FOREIGN KEY ('tagName') REFERENCES 'Tags' ('tagName') ON DELETE CASCADE,
	CONSTRAINT 'taggedEventFK' FOREIGN KEY ('eventID') REFERENCES 'Events' ('eventID') ON DELETE CASCADE
) ENGINE=innodb DEFAULT CHARSET=utf8;

create table Users_Users(
	'followedBy' INT(11) NOT NULL,
	'followedUser' INT(11) NOT NULL,
	KEY 'followedBy' ('followedBy'),
	KEY 'followedUser' ('followedUser'),
	CONSTRAINT 'followingUserFK' FOREIGN KEY ('followedBy') REFERENCES 'Users' ('userID') ON DELETE CASCADE,
	CONSTRAINT 'userBeingFollowedFK' FOREIGN KEY ('followedUser') REFERENCES 'Users' ('userID') ON DELETE CASCADE
) ENGINE=innodb DEFAULT CHARSET=utf8;
