-- MySQL dump 10.13  Distrib 5.6.32, for Linux (x86_64)
--
-- Host: localhost    Database: health_home_v2
-- ------------------------------------------------------
-- Server version	5.6.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) DEFAULT NULL,
  `author_id` varchar(128) DEFAULT NULL,
  `editor` varchar(64) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `tags` varchar(128) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `summary` varchar(512) DEFAULT NULL,
  `cover_url` varchar(1024) DEFAULT NULL,
  `content` text,
  `uuid` varchar(128) DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `article_all_info`
--

DROP TABLE IF EXISTS `article_all_info`;
/*!50001 DROP VIEW IF EXISTS `article_all_info`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `article_all_info` AS SELECT 
 1 AS `id`,
 1 AS `state`,
 1 AS `title`,
 1 AS `author_id`,
 1 AS `author`,
 1 AS `author_desp`,
 1 AS `author_head_url`,
 1 AS `editor`,
 1 AS `type_id`,
 1 AS `tags`,
 1 AS `create_time`,
 1 AS `modify_time`,
 1 AS `summary`,
 1 AS `cover_url`,
 1 AS `like_cnt`,
 1 AS `click_cnt`,
 1 AS `comment_cnt`,
 1 AS `collect_cnt`,
 1 AS `content`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `article_author_info`
--

DROP TABLE IF EXISTS `article_author_info`;
/*!50001 DROP VIEW IF EXISTS `article_author_info`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `article_author_info` AS SELECT 
 1 AS `id`,
 1 AS `state`,
 1 AS `title`,
 1 AS `author_id`,
 1 AS `author`,
 1 AS `author_desp`,
 1 AS `author_head_url`,
 1 AS `editor`,
 1 AS `type_id`,
 1 AS `tags`,
 1 AS `create_time`,
 1 AS `modify_time`,
 1 AS `summary`,
 1 AS `cover_url`,
 1 AS `content`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `article_click`
--

DROP TABLE IF EXISTS `article_click`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article_click` (
  `article_id` bigint(20) NOT NULL DEFAULT '0',
  `user_name` varchar(64) NOT NULL DEFAULT '',
  `click_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`article_id`,`user_name`,`click_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_click`
--

LOCK TABLES `article_click` WRITE;
/*!40000 ALTER TABLE `article_click` DISABLE KEYS */;
/*!40000 ALTER TABLE `article_click` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `article_click_stat`
--

DROP TABLE IF EXISTS `article_click_stat`;
/*!50001 DROP VIEW IF EXISTS `article_click_stat`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `article_click_stat` AS SELECT 
 1 AS `article_id`,
 1 AS `click_cnt`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `article_collection_stat`
--

DROP TABLE IF EXISTS `article_collection_stat`;
/*!50001 DROP VIEW IF EXISTS `article_collection_stat`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `article_collection_stat` AS SELECT 
 1 AS `article_id`,
 1 AS `collect_cnt`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `article_comment_stat`
--

DROP TABLE IF EXISTS `article_comment_stat`;
/*!50001 DROP VIEW IF EXISTS `article_comment_stat`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `article_comment_stat` AS SELECT 
 1 AS `article_id`,
 1 AS `comment_cnt`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `article_like`
--

DROP TABLE IF EXISTS `article_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article_like` (
  `article_id` bigint(20) NOT NULL DEFAULT '0',
  `user_name` varchar(64) NOT NULL DEFAULT '',
  `like_time` datetime DEFAULT NULL,
  PRIMARY KEY (`article_id`,`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_like`
--

LOCK TABLES `article_like` WRITE;
/*!40000 ALTER TABLE `article_like` DISABLE KEYS */;
/*!40000 ALTER TABLE `article_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `article_like_stat`
--

DROP TABLE IF EXISTS `article_like_stat`;
/*!50001 DROP VIEW IF EXISTS `article_like_stat`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `article_like_stat` AS SELECT 
 1 AS `article_id`,
 1 AS `like_cnt`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `author` (
  `id` varchar(128) NOT NULL,
  `author` varchar(64) DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL,
  `head_url` varchar(1024) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carousel`
--

DROP TABLE IF EXISTS `carousel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carousel` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `article_id` bigint(20) DEFAULT NULL,
  `create_user` varchar(64) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `img_url` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carousel`
--

LOCK TABLES `carousel` WRITE;
/*!40000 ALTER TABLE `carousel` DISABLE KEYS */;
/*!40000 ALTER TABLE `carousel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carousel_publish`
--

DROP TABLE IF EXISTS `carousel_publish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carousel_publish` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `publish_user` varchar(64) DEFAULT NULL,
  `publish_time` datetime DEFAULT NULL,
  `carousel_ids` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carousel_publish`
--

LOCK TABLES `carousel_publish` WRITE;
/*!40000 ALTER TABLE `carousel_publish` DISABLE KEYS */;
/*!40000 ALTER TABLE `carousel_publish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collection`
--

DROP TABLE IF EXISTS `collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `collection` (
  `user_name` varchar(64) NOT NULL DEFAULT '',
  `article_id` bigint(20) NOT NULL DEFAULT '0',
  `collect_time` datetime DEFAULT NULL,
  PRIMARY KEY (`article_id`,`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection`
--

LOCK TABLES `collection` WRITE;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
/*!40000 ALTER TABLE `collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `id` varchar(128) NOT NULL,
  `parent_id` varchar(128) DEFAULT NULL,
  `user_name` varchar(64) DEFAULT NULL,
  `article_id` bigint(20) DEFAULT NULL,
  `comment_time` datetime DEFAULT NULL,
  `content` text,
  `state` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `comment_all_info`
--

DROP TABLE IF EXISTS `comment_all_info`;
/*!50001 DROP VIEW IF EXISTS `comment_all_info`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `comment_all_info` AS SELECT 
 1 AS `id`,
 1 AS `state`,
 1 AS `parent_id`,
 1 AS `user_name`,
 1 AS `article_id`,
 1 AS `comment_time`,
 1 AS `like_cnt`,
 1 AS `unlike_cnt`,
 1 AS `content`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `comment_like`
--

DROP TABLE IF EXISTS `comment_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment_like` (
  `comment_id` varchar(128) NOT NULL DEFAULT '',
  `user_name` varchar(64) NOT NULL DEFAULT '',
  `opt_type` tinyint(4) DEFAULT NULL,
  `opt_time` datetime DEFAULT NULL,
  PRIMARY KEY (`comment_id`,`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_like`
--

LOCK TABLES `comment_like` WRITE;
/*!40000 ALTER TABLE `comment_like` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `comment_like_stat`
--

DROP TABLE IF EXISTS `comment_like_stat`;
/*!50001 DROP VIEW IF EXISTS `comment_like_stat`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `comment_like_stat` AS SELECT 
 1 AS `comment_id`,
 1 AS `like_cnt`,
 1 AS `unlike_cnt`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `effect_carousel`
--

DROP TABLE IF EXISTS `effect_carousel`;
/*!50001 DROP VIEW IF EXISTS `effect_carousel`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `effect_carousel` AS SELECT 
 1 AS `id`,
 1 AS `publish_user`,
 1 AS `publish_time`,
 1 AS `carousel_ids`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `user_name` varchar(64) NOT NULL DEFAULT '',
  `role_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('hua',1),('ljianhui',1);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_name` varchar(64) NOT NULL,
  `email` varchar(128) DEFAULT NULL,
  `passwd` varchar(512) DEFAULT NULL,
  `register_time` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `active_code` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`user_name`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('hua','2353912151@qq.com','74c7687c16b15915c37f14257bdaeb0575e9f1da5efe7209774402fc2a60f6b1','2016-07-19 23:48:03',1,'a7f821d38251ab6c8dffe2ebb93d75b6'),('ljianhui','891915908@qq.com','e8452dc9e0de9bba963f2d976f06f5bcf130174724502020985bd928b2147521','2016-07-19 00:26:13',1,'aa4cf67c7a4874dd528dca6348d4908f'),('test1',NULL,'e8452dc9e0de9bba963f2d976f06f5bcf130174724502020985bd928b2147521',NULL,1,NULL),('test2',NULL,'e8452dc9e0de9bba963f2d976f06f5bcf130174724502020985bd928b2147521',NULL,1,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `article_all_info`
--

/*!50001 DROP VIEW IF EXISTS `article_all_info`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `article_all_info` AS select `article`.`id` AS `id`,`article`.`state` AS `state`,`article`.`title` AS `title`,`article`.`author_id` AS `author_id`,`author`.`author` AS `author`,`author`.`description` AS `author_desp`,`author`.`head_url` AS `author_head_url`,`article`.`editor` AS `editor`,`article`.`type_id` AS `type_id`,`article`.`tags` AS `tags`,`article`.`create_time` AS `create_time`,`article`.`modify_time` AS `modify_time`,`article`.`summary` AS `summary`,`article`.`cover_url` AS `cover_url`,(case when (`article_like_stat`.`like_cnt` > 0) then `article_like_stat`.`like_cnt` else 0 end) AS `like_cnt`,(case when (`article_click_stat`.`click_cnt` > 0) then `article_click_stat`.`click_cnt` else 0 end) AS `click_cnt`,(case when (`article_comment_stat`.`comment_cnt` > 0) then `article_comment_stat`.`comment_cnt` else 0 end) AS `comment_cnt`,(case when (`article_collection_stat`.`collect_cnt` > 0) then `article_collection_stat`.`collect_cnt` else 0 end) AS `collect_cnt`,`article`.`content` AS `content` from (((((`article` left join `author` on((`article`.`author_id` = `author`.`id`))) left join `article_like_stat` on((`article`.`id` = `article_like_stat`.`article_id`))) left join `article_click_stat` on((`article`.`id` = `article_click_stat`.`article_id`))) left join `article_comment_stat` on((`article`.`id` = `article_comment_stat`.`article_id`))) left join `article_collection_stat` on((`article`.`id` = `article_collection_stat`.`article_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `article_author_info`
--

/*!50001 DROP VIEW IF EXISTS `article_author_info`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `article_author_info` AS select `article`.`id` AS `id`,`article`.`state` AS `state`,`article`.`title` AS `title`,`article`.`author_id` AS `author_id`,`author`.`author` AS `author`,`author`.`description` AS `author_desp`,`author`.`head_url` AS `author_head_url`,`article`.`editor` AS `editor`,`article`.`type_id` AS `type_id`,`article`.`tags` AS `tags`,`article`.`create_time` AS `create_time`,`article`.`modify_time` AS `modify_time`,`article`.`summary` AS `summary`,`article`.`cover_url` AS `cover_url`,`article`.`content` AS `content` from (`article` left join `author` on((`article`.`author_id` = `author`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `article_click_stat`
--

/*!50001 DROP VIEW IF EXISTS `article_click_stat`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`normal_user`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `article_click_stat` AS select `article_click`.`article_id` AS `article_id`,count(0) AS `click_cnt` from `article_click` group by `article_click`.`article_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `article_collection_stat`
--

/*!50001 DROP VIEW IF EXISTS `article_collection_stat`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `article_collection_stat` AS select `collection`.`article_id` AS `article_id`,count(0) AS `collect_cnt` from `collection` group by `collection`.`article_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `article_comment_stat`
--

/*!50001 DROP VIEW IF EXISTS `article_comment_stat`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `article_comment_stat` AS select `comment`.`article_id` AS `article_id`,count(0) AS `comment_cnt` from `comment` group by `comment`.`article_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `article_like_stat`
--

/*!50001 DROP VIEW IF EXISTS `article_like_stat`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`normal_user`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `article_like_stat` AS select `article_like`.`article_id` AS `article_id`,count(0) AS `like_cnt` from `article_like` group by `article_like`.`article_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `comment_all_info`
--

/*!50001 DROP VIEW IF EXISTS `comment_all_info`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `comment_all_info` AS select `comment`.`id` AS `id`,`comment`.`state` AS `state`,`comment`.`parent_id` AS `parent_id`,`comment`.`user_name` AS `user_name`,`comment`.`article_id` AS `article_id`,`comment`.`comment_time` AS `comment_time`,`comment_like_stat`.`like_cnt` AS `like_cnt`,`comment_like_stat`.`unlike_cnt` AS `unlike_cnt`,`comment`.`content` AS `content` from (`comment` left join `comment_like_stat` on((`comment`.`id` = `comment_like_stat`.`comment_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `comment_like_stat`
--

/*!50001 DROP VIEW IF EXISTS `comment_like_stat`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `comment_like_stat` AS select `comment_like`.`comment_id` AS `comment_id`,sum((case when (`comment_like`.`opt_type` = 1) then 1 else 0 end)) AS `like_cnt`,sum((case when (`comment_like`.`opt_type` = 2) then 1 else 0 end)) AS `unlike_cnt` from `comment_like` group by `comment_like`.`comment_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `effect_carousel`
--

/*!50001 DROP VIEW IF EXISTS `effect_carousel`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `effect_carousel` AS select `carousel_publish`.`id` AS `id`,`carousel_publish`.`publish_user` AS `publish_user`,`carousel_publish`.`publish_time` AS `publish_time`,`carousel_publish`.`carousel_ids` AS `carousel_ids` from `carousel_publish` where (`carousel_publish`.`id` = (select max(`carousel_publish`.`id`) from `carousel_publish`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-08-31  1:00:01
