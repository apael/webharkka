-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Laskutustietokanta
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Laskutustietokanta
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Laskutustietokanta` DEFAULT CHARACTER SET utf8 ;
USE `Laskutustietokanta` ;

-- -----------------------------------------------------
-- Table `Laskutustietokanta`.`Osoite`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Laskutustietokanta`.`Osoite` ;

CREATE TABLE IF NOT EXISTS `Laskutustietokanta`.`Osoite` (
  `idOsoite` INT NOT NULL AUTO_INCREMENT,
  `Katu` VARCHAR(45) NULL,
  `Postinumero` CHAR(5) NULL,
  `Paikkakunta` VARCHAR(45) NULL,
  PRIMARY KEY (`idOsoite`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Laskutustietokanta`.`Numerot`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Laskutustietokanta`.`Numerot` ;

CREATE TABLE IF NOT EXISTS `Laskutustietokanta`.`Numerot` (
  `idNumerot` INT NOT NULL AUTO_INCREMENT,
  `Pnumero` VARCHAR(45) NULL,
  `Ynumero` VARCHAR(45) NULL,
  PRIMARY KEY (`idNumerot`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Laskutustietokanta`.`Email`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Laskutustietokanta`.`Email` ;

CREATE TABLE IF NOT EXISTS `Laskutustietokanta`.`Email` (
  `EmailID` INT NOT NULL AUTO_INCREMENT,
  `sposti` VARCHAR(45) NULL,
  PRIMARY KEY (`EmailID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Laskutustietokanta`.`Yritykset`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Laskutustietokanta`.`Yritykset` ;

CREATE TABLE IF NOT EXISTS `Laskutustietokanta`.`Yritykset` (
  `Ytunnus` VARCHAR(45) NOT NULL,
  `Nimi` VARCHAR(45) NOT NULL,
  `Osoite_idOsoite` INT NOT NULL,
  `Numerot_idNumerot` INT NULL DEFAULT NULL,
  `Email_EmailID` INT NULL DEFAULT NULL,
  INDEX `fk_Yritykset_Osoite1_idx` (`Osoite_idOsoite` ASC),
  INDEX `fk_Yritykset_Numerot1_idx` (`Numerot_idNumerot` ASC),
  PRIMARY KEY (`Ytunnus`),
  INDEX `fk_Yritykset_Email1_idx` (`Email_EmailID` ASC),
  CONSTRAINT `fk_Yritykset_Osoite1`
    FOREIGN KEY (`Osoite_idOsoite`)
    REFERENCES `Laskutustietokanta`.`Osoite` (`idOsoite`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Yritykset_Numerot1`
    FOREIGN KEY (`Numerot_idNumerot`)
    REFERENCES `Laskutustietokanta`.`Numerot` (`idNumerot`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Yritykset_Email1`
    FOREIGN KEY (`Email_EmailID`)
    REFERENCES `Laskutustietokanta`.`Email` (`EmailID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Laskutustietokanta`.`Asiakas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Laskutustietokanta`.`Asiakas` ;

CREATE TABLE IF NOT EXISTS `Laskutustietokanta`.`Asiakas` (
  `idAsiakas` INT NOT NULL AUTO_INCREMENT,
  `Etunimi` VARCHAR(45) NULL,
  `Sukunimi` VARCHAR(45) NULL,
  `käytössä` TINYINT NULL,
  `Yritykset_Ytunnus` VARCHAR(45) NULL DEFAULT 'null',
  `Numerot_idNumerot` INT NOT NULL,
  `Osoite_idOsoite` INT NOT NULL,
  `Email_EmailID` INT NULL,
  PRIMARY KEY (`idAsiakas`),
  INDEX `fk_Asiakas_Yritykset1_idx` (`Yritykset_Ytunnus` ASC),
  INDEX `fk_Asiakas_Numerot1_idx` (`Numerot_idNumerot` ASC),
  INDEX `fk_Asiakas_Osoite1_idx` (`Osoite_idOsoite` ASC),
  INDEX `fk_Asiakas_Email1_idx` (`Email_EmailID` ASC),
  CONSTRAINT `fk_Asiakas_Yritykset1`
    FOREIGN KEY (`Yritykset_Ytunnus`)
    REFERENCES `Laskutustietokanta`.`Yritykset` (`Ytunnus`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Asiakas_Numerot1`
    FOREIGN KEY (`Numerot_idNumerot`)
    REFERENCES `Laskutustietokanta`.`Numerot` (`idNumerot`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Asiakas_Osoite1`
    FOREIGN KEY (`Osoite_idOsoite`)
    REFERENCES `Laskutustietokanta`.`Osoite` (`idOsoite`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Asiakas_Email1`
    FOREIGN KEY (`Email_EmailID`)
    REFERENCES `Laskutustietokanta`.`Email` (`EmailID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Laskutustietokanta`.`Laskut`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Laskutustietokanta`.`Laskut` ;

CREATE TABLE IF NOT EXISTS `Laskutustietokanta`.`Laskut` (
  `LaskuID` INT NOT NULL AUTO_INCREMENT,
  `Työnkuva` VARCHAR(45) NULL,
  `Määrä` INT NULL,
  `ALV` DECIMAL NULL,
  `Hinta` INT NULL,
  `Viitenro` INT NULL,
  `Viitteenne` VARCHAR(45) NULL,
  `Toimitettu` DATE NULL,
  `Eräpäivä` DATE NULL,
  `Maksettu` TINYINT NOT NULL,
  `Asiakas_idAsiakas` INT NOT NULL,
  PRIMARY KEY (`LaskuID`),
  INDEX `fk_Laskut_Asiakas1_idx` (`Asiakas_idAsiakas` ASC),
  CONSTRAINT `fk_Laskut_Asiakas1`
    FOREIGN KEY (`Asiakas_idAsiakas`)
    REFERENCES `Laskutustietokanta`.`Asiakas` (`idAsiakas`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `Laskutustietokanta`.`Osoite`
-- -----------------------------------------------------
START TRANSACTION;
USE `Laskutustietokanta`;
INSERT INTO `Laskutustietokanta`.`Osoite` (`idOsoite`, `Katu`, `Postinumero`, `Paikkakunta`) VALUES (1, 'Kuninkaankatu 27b11', '70100', 'Kuopio');
INSERT INTO `Laskutustietokanta`.`Osoite` (`idOsoite`, `Katu`, `Postinumero`, `Paikkakunta`) VALUES (2, 'Jyrä 6', '40520', 'Jyväskylä');

COMMIT;


-- -----------------------------------------------------
-- Data for table `Laskutustietokanta`.`Numerot`
-- -----------------------------------------------------
START TRANSACTION;
USE `Laskutustietokanta`;
INSERT INTO `Laskutustietokanta`.`Numerot` (`idNumerot`, `Pnumero`, `Ynumero`) VALUES (1, '0456516542', '+358456516542');
INSERT INTO `Laskutustietokanta`.`Numerot` (`idNumerot`, `Pnumero`, `Ynumero`) VALUES (2, '044 550 9892', '044 550 9892');

COMMIT;


-- -----------------------------------------------------
-- Data for table `Laskutustietokanta`.`Email`
-- -----------------------------------------------------
START TRANSACTION;
USE `Laskutustietokanta`;
INSERT INTO `Laskutustietokanta`.`Email` (`EmailID`, `sposti`) VALUES (1, 'mikkomyllari@gmail.com');
INSERT INTO `Laskutustietokanta`.`Email` (`EmailID`, `sposti`) VALUES (2, 'testiosoite@gmail.com');

COMMIT;


-- -----------------------------------------------------
-- Data for table `Laskutustietokanta`.`Yritykset`
-- -----------------------------------------------------
START TRANSACTION;
USE `Laskutustietokanta`;
INSERT INTO `Laskutustietokanta`.`Yritykset` (`Ytunnus`, `Nimi`, `Osoite_idOsoite`, `Numerot_idNumerot`, `Email_EmailID`) VALUES ('3085280-2', 'Atk Apa', 1, 1, NULL);
INSERT INTO `Laskutustietokanta`.`Yritykset` (`Ytunnus`, `Nimi`, `Osoite_idOsoite`, `Numerot_idNumerot`, `Email_EmailID`) VALUES ('2824467-2', 'Midas Entertainment  Oy', 2, 2, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `Laskutustietokanta`.`Asiakas`
-- -----------------------------------------------------
START TRANSACTION;
USE `Laskutustietokanta`;
INSERT INTO `Laskutustietokanta`.`Asiakas` (`idAsiakas`, `Etunimi`, `Sukunimi`, `käytössä`, `Yritykset_Ytunnus`, `Numerot_idNumerot`, `Osoite_idOsoite`, `Email_EmailID`) VALUES (1, 'Jarkko', 'Pirkkalainen', 1, '2824467-2', 2, 2, NULL);
INSERT INTO `Laskutustietokanta`.`Asiakas` (`idAsiakas`, `Etunimi`, `Sukunimi`, `käytössä`, `Yritykset_Ytunnus`, `Numerot_idNumerot`, `Osoite_idOsoite`, `Email_EmailID`) VALUES (2, 'Testi', 'mies', 0, NULL, 1, 1, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `Laskutustietokanta`.`Laskut`
-- -----------------------------------------------------
START TRANSACTION;
USE `Laskutustietokanta`;
INSERT INTO `Laskutustietokanta`.`Laskut` (`LaskuID`, `Työnkuva`, `Määrä`, `ALV`, `Hinta`, `Viitenro`, `Viitteenne`, `Toimitettu`, `Eräpäivä`, `Maksettu`, `Asiakas_idAsiakas`) VALUES (1, 'DJ', 1, 0, 900, 13, NULL, NULL, '2019-11-28', false, 1);

COMMIT;

