-- MariaDB dump 10.18  Distrib 10.4.17-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_gallegon
-- ------------------------------------------------------
-- Server version	10.4.18-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Events`
--

DROP TABLE IF EXISTS `Events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Events` (
  `eventID` int(11) NOT NULL AUTO_INCREMENT,
  `hostID` int(11) NOT NULL,
  `dateTime` datetime NOT NULL,
  `eventName` varchar(255) NOT NULL,
  `venueName` varchar(255) NOT NULL,
  `addressLine1` varchar(255) NOT NULL,
  `addressLine2` varchar(255) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `latitude` decimal(8,5) NOT NULL,
  `longitude` decimal(8,5) NOT NULL,
  `eventCapacity` int(11) NOT NULL,
  `hasEntryFee` tinyint(1) NOT NULL,
  `ticketPrice` int(11) NOT NULL,
  `numberAttending` int(11) NOT NULL,
  PRIMARY KEY (`eventID`),
  UNIQUE KEY `eventID` (`eventID`),
  KEY `hostID` (`hostID`),
  CONSTRAINT `event_host_fk` FOREIGN KEY (`hostID`) REFERENCES `Users` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Events`
--

LOCK TABLES `Events` WRITE;
/*!40000 ALTER TABLE `Events` DISABLE KEYS */;
INSERT INTO `Events` VALUES (12,12,'2021-02-13 13:00:00','Refined Robert\'s Autumn Ball','The Park at sixth street','','','San Francisco','California','USA','',123.12345,123.12345,13211,0,0,13214),(13,11,'0000-00-00 00:00:00','An event part 3','asdfffffff','','','Sandpoint','','USA','',123.43652,123.43245,15,1,25,7),(14,12,'0000-00-00 00:00:00','Crabfest 2021','The crab shack','123 bob ave','123 bob ave','Bozeman','Montana','USA','97333',123.12344,123.12344,22,1,25,7),(15,14,'2012-02-22 18:00:00','Lobster Festival - Better than crabfest','The lobster palace','','','','','','',123.12345,123.12345,3,1,123,7),(23,14,'2021-05-10 00:13:00','The party','The party palace','','','','','','',45.12345,123.12345,6,0,0,7),(25,13,'2021-06-09 14:00:00','Another event','venue','','','','','','',-43.00000,170.00000,6,0,0,7),(29,15,'2021-06-05 12:00:00','qerw','qewr','','','','','','',0.00000,0.00000,0,0,0,7),(30,15,'2021-06-03 00:00:00','Event test','13th ave','','','','','','',0.00000,-0.00001,22,0,0,7),(31,15,'2021-06-05 13:34:00','Event test 2','Venue Avenue','','','','','','',3.00000,3.00000,13,0,0,7);
/*!40000 ALTER TABLE `Events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tags`
--

DROP TABLE IF EXISTS `Tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tags` (
  `tagName` varchar(255) NOT NULL,
  PRIMARY KEY (`tagName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tags`
--

LOCK TABLES `Tags` WRITE;
/*!40000 ALTER TABLE `Tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `Tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tags_Events`
--

DROP TABLE IF EXISTS `Tags_Events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tags_Events` (
  `tagName` varchar(255) NOT NULL,
  `eventID` int(11) NOT NULL,
  KEY `tagName` (`tagName`),
  KEY `eventID` (`eventID`),
  CONSTRAINT `eventTagNameFK` FOREIGN KEY (`tagName`) REFERENCES `Tags` (`tagName`) ON DELETE CASCADE,
  CONSTRAINT `taggedEventFK` FOREIGN KEY (`eventID`) REFERENCES `Events` (`eventID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tags_Events`
--

LOCK TABLES `Tags_Events` WRITE;
/*!40000 ALTER TABLE `Tags_Events` DISABLE KEYS */;
/*!40000 ALTER TABLE `Tags_Events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tickets`
--

DROP TABLE IF EXISTS `Tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tickets` (
  `ticketID` int(11) NOT NULL AUTO_INCREMENT,
  `ownerID` int(11) NOT NULL,
  `eventID` int(11) NOT NULL,
  `confirmedArrival` tinyint(1) NOT NULL,
  PRIMARY KEY (`ticketID`),
  UNIQUE KEY `ticketID` (`ticketID`),
  KEY `ownerID` (`ownerID`),
  KEY `eventID` (`eventID`),
  CONSTRAINT `ticketEventFK` FOREIGN KEY (`eventID`) REFERENCES `Events` (`eventID`) ON DELETE CASCADE,
  CONSTRAINT `ticketOwnerFK` FOREIGN KEY (`ownerID`) REFERENCES `Users` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tickets`
--

LOCK TABLES `Tickets` WRITE;
/*!40000 ALTER TABLE `Tickets` DISABLE KEYS */;
INSERT INTO `Tickets` VALUES (3,13,12,0),(4,15,12,0),(5,16,12,0),(7,15,14,0),(8,14,14,0),(9,14,14,0),(10,15,14,0),(11,15,14,0),(12,11,14,0),(13,11,14,0),(14,11,14,0),(15,11,14,0),(16,10,14,0),(17,15,13,0);
/*!40000 ALTER TABLE `Tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `latitude` decimal(8,5) DEFAULT NULL,
  `longitude` decimal(8,5) DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `userID` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (10,'Seth','Houchins',44.56420,123.26210),(11,'Nicholai','Gallegos',44.56310,123.25910),(12,'Jabob','Hawkins',44.55990,123.26200),(13,'Jethro','Dowzers',50.02390,145.02300),(14,'Dorkin','Borkin',60.12340,120.12340),(15,'Sensual','Sasquatch',NULL,NULL),(16,'Your','Mom',69.69690,69.42000),(17,'Hewbert','Cumberdale',90.00000,0.00000),(18,'Puberman','Chimball',89.23210,45.00000),(19,'Wheresmabutt','Immachild',23.12320,167.23010),(20,'Icantthinkofanygoodnames','fart',12.12120,67.73480),(21,'Ithoughtofsomething','funnierthantwentyfour',25.25250,25.25250),(23,'Steve','Chiliman',47.25360,122.44440),(24,'Rekka','Jean',NULL,NULL),(32,'ppdppd','ddpe',0.00000,0.00000),(40,'Leeroy','Jenkins',0.00000,0.00000),(46,'AAHHH','HELP I NEED HELP AHHH',0.00000,0.00000),(48,'Wiggle','Piggle',0.00000,0.00000),(55,'asdf','asdf',0.00000,0.00000),(56,'asdf','asdfasdf',0.00000,0.00000),(63,'Jessie','Jonas',0.00000,0.00000);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users_Users`
--

DROP TABLE IF EXISTS `Users_Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users_Users` (
  `followedBy` int(11) NOT NULL,
  `followedUser` int(11) NOT NULL,
  KEY `followedBy` (`followedBy`),
  KEY `followedUser` (`followedUser`),
  CONSTRAINT `followingUserFK` FOREIGN KEY (`followedBy`) REFERENCES `Users` (`userID`) ON DELETE CASCADE,
  CONSTRAINT `userBeingFollowedFK` FOREIGN KEY (`followedUser`) REFERENCES `Users` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users_Users`
--

LOCK TABLES `Users_Users` WRITE;
/*!40000 ALTER TABLE `Users_Users` DISABLE KEYS */;
/*!40000 ALTER TABLE `Users_Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-06 16:06:41
