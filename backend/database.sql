-- Active: 1657630527381@@127.0.0.1@3306
DROP DATABASE IF EXISTS dogtrain;

CREATE DATABASE dogtrain
    DEFAULT CHARACTER SET = 'utf8';

USE dogtrain;

DROP TABLE user;

CREATE TABLE `user`(
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `pseudo` varchar(255),
  `password` varchar(255)
);

Drop TABLE dogs;
CREATE TABLE `dogs` (
  `dogId` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL ,
  `race` varchar(255) NOT NULL ,
  `alive` BOOLEAN ,
  `age` int NOT NULL ,
  `level` int DEFAULT 1,
  `image` varchar(255) DEFAULT "",
  `userId` int
) DEFAULT CHARACTER SET = 'utf8';

ALTER TABLE dogs ADD FOREIGN KEY (userId) REFERENCES user (id);

CREATE TABLE `competences` (
  `competenceId` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `time` int default 1
) DEFAULT CHARACTER SET = 'utf8';

CREATE TABLE `learning` (
  `dogId` INT NOT NULL,
  `competenceId` INT NOT NULL,
  `acquired` BOOLEAN NOT NULL
) DEFAULT CHARACTER SET = 'utf8';

INSERT INTO user (pseudo,password) VALUES
("tantan","password1"),
("titi","password2");

INSERT INTO competences (name,time) VALUES
("sit",4),
("bark",6),
("walking",15),
("stand",8),
("Drop",4),
("Bed",7),
("Jump",13);


INSERT INTO dogs (name,race, alive, age, level,userId) VALUES
  ("Ryn","Malinois",true,2,2,1),
  ("Paco","Boxer",true,4,5,2),
  ("Masaï","Staff",true,8,9,1),
  ("PasdePot","Berger-Allemand",false,12,10,1);

INSERT INTO learning (dogId,competenceId,acquired) VALUES
(1,2,false),
(1,3,true),
(2,2,false),
(3,5,true),
(3,1,true),
(3,2,true);

SELECT * FROM dogs
INNER JOIN learning ON dogs.dogId = learning.dogID 
INNER JOIN competences ON learning.competenceId = competences.competenceId;

SELECT * FROM dogs
INNER JOIN user ON dogs.userId = user.id;

  