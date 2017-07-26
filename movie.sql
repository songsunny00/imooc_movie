/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : movie

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-07-26 15:11:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `_id` int(10) NOT NULL AUTO_INCREMENT,
  `movieId` varchar(50) NOT NULL,
  `content` varchar(300) DEFAULT '',
  `createAt` varchar(20) DEFAULT '',
  `updateAt` varchar(20) DEFAULT '',
  `fromUserId` int(20) NOT NULL,
  PRIMARY KEY (`_id`),
  KEY `movieId` (`movieId`),
  KEY `fromUserId` (`fromUserId`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`movieId`) REFERENCES `movie` (`_id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`fromUserId`) REFERENCES `user` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('1', '201705181529002', 'test', '2017-06-05', '', '11');
INSERT INTO `comment` VALUES ('2', '201705181529002', 'testa', '2017-06-05', '', '11');
INSERT INTO `comment` VALUES ('3', '201705181529002', 'hello', '2017-07-26', '', '10');
INSERT INTO `comment` VALUES ('5', '201705181529002', 'hello33', '2017-07-26', '', '10');
INSERT INTO `comment` VALUES ('7', '201705181529002', 'onssdf', '2017-07-26 14:43:00', '', '10');

-- ----------------------------
-- Table structure for movie
-- ----------------------------
DROP TABLE IF EXISTS `movie`;
CREATE TABLE `movie` (
  `_id` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `doctor` varchar(20) NOT NULL,
  `language` varchar(10) NOT NULL,
  `country` varchar(20) NOT NULL,
  `summary` varchar(300) DEFAULT NULL,
  `flash` varchar(100) DEFAULT NULL,
  `poster` varchar(100) DEFAULT NULL,
  `year` varchar(12) DEFAULT NULL,
  `createAt` varchar(20) DEFAULT NULL,
  `updateAt` varchar(20) DEFAULT NULL,
  `type` int(4) DEFAULT '0',
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of movie
-- ----------------------------
INSERT INTO `movie` VALUES ('201705181529002', 'The King Of Forest355', 'Sam Tylor', 'english', 'America', '', 'http://720yun.com/t/6a925mz8w46', 'http://blog.itpub.net/image/IT168.jpg', '2017-05-18', '', '2017-07-26', '0');
INSERT INTO `movie` VALUES ('33070883-80cb-4561-88c5-fa57b7a32733', 'two2', 'two2', 'chinese', 'china', 'eee', 'ee', 'e', '2017', '2017-06-02', null, '0');

-- ----------------------------
-- Table structure for reply
-- ----------------------------
DROP TABLE IF EXISTS `reply`;
CREATE TABLE `reply` (
  `_id` int(10) NOT NULL AUTO_INCREMENT,
  `commentId` int(10) NOT NULL,
  `fromUserId` int(20) NOT NULL,
  `replyUserId` int(20) NOT NULL,
  `content` varchar(300) NOT NULL,
  `createAt` varchar(20) DEFAULT '',
  `updateAt` varchar(20) DEFAULT '',
  `fromUserName` varchar(30) NOT NULL,
  `replyUserName` varchar(30) NOT NULL,
  PRIMARY KEY (`_id`),
  KEY `commentId` (`commentId`),
  KEY `fromUserId` (`fromUserId`),
  KEY `replyUserId` (`replyUserId`),
  CONSTRAINT `reply_ibfk_1` FOREIGN KEY (`commentId`) REFERENCES `comment` (`_id`),
  CONSTRAINT `reply_ibfk_2` FOREIGN KEY (`fromUserId`) REFERENCES `user` (`_id`),
  CONSTRAINT `reply_ibfk_3` FOREIGN KEY (`replyUserId`) REFERENCES `user` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of reply
-- ----------------------------
INSERT INTO `reply` VALUES ('1', '1', '10', '11', 'one huifu admin', '2017-06-05', '', 'one', 'admin');
INSERT INTO `reply` VALUES ('2', '1', '11', '10', 'admin huifu one', '2017-06-05', '', 'admin', 'one');
INSERT INTO `reply` VALUES ('3', '2', '10', '11', 'one testa huifu admin', '2017-06-06', '', 'one', 'admin');
INSERT INTO `reply` VALUES ('4', '5', '10', '10', 'test20170726 13:54\r\n', '2017-07-26', '', 'one', 'one');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `_id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `createAt` varchar(20) DEFAULT NULL,
  `updateAt` varchar(20) DEFAULT NULL,
  `role` int(4) DEFAULT '1',
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('10', 'one', '$2a$10$hL.03j1VW1vcZ8NvkKnQOet.pVEQnMh.hFw135dzm.9WRbbJChMj.', '2017-06-01 16:01:12', null, '1');
INSERT INTO `user` VALUES ('11', 'admin', '$2a$10$hGeawZj0uNZ82yk.lItIWOVGGR2nQHRWHXj063IdF0.yTzw2SKD7e', '2017-06-01 16:01:12', null, '11');

-- ----------------------------
-- Procedure structure for pro_searAllComment
-- ----------------------------
DROP PROCEDURE IF EXISTS `pro_searAllComment`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `pro_searAllComment`(
IN movieId VARCHAR(40)
)
BEGIN
SELECT * FROM
(
SELECT w._id ,r._id as replyId,r.fromUserId,r.fromUserName, r.replyUserId,r.replyUserName,r.content from(select * from (select c.*,u.name from comment c,user u where c.fromUserId=u._id) m where m.movieId=movieId) w,reply r where w._id=r.commentId
UNION
select c._id ,'' as replyId,c.fromUserId,u.name as fromUserName,'' as replyUserId,''as replyUseName, c.content from comment c,user u WHERE c.fromUserId=u._id AND c.movieId=movieId
) ttt
ORDER BY _id ASC,replyId ASC;
END
;;
DELIMITER ;
