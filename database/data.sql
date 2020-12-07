INSERT INTO organization (name, address, phone)
VALUES 
('Haskelis', 'Vytauto 1', '123'),
('Jupyteris', 'Mindaugo 12', '+371'),
('Javainis', 'Ulrich Strasse 99', '+80871'),
('Pitoncas', 'Kalnų 38', '0044371');

CREATE EXTENSION moddatetime;

CREATE TRIGGER organization_moddatetime
    BEFORE UPDATE ON organization
    FOR EACH ROW
    EXECUTE PROCEDURE moddatetime (modtime);

UPDATE organization SET phone = '1141184' WHERE id = 1;

INSERT INTO app_user (id, username, full_name, email, organization, role_type)
VALUES 
('dhjbwau74a6', 'Svx', 'Sveikas', 'svx@svx.lt', 1, 'Owner'),
('aiubfaw4io09', 'Hi', 'Hello', 'hi@hi.lt', 1, 'Member'),
('afhu9w4f78', 'Carl', 'Red', 'hi@hi.lt', 2, 'Owner'),
('278y2378ryb', 'Bob', 'Blue', 'hi@hi.lt', 2, 'Member'),
('0932hfdsa', 'Mamba', 'Black', 'hi@hello.lt', 2, NULL);

CREATE TRIGGER app_user_moddatetime
    BEFORE UPDATE ON app_user
    FOR EACH ROW
    EXECUTE PROCEDURE moddatetime (modtime);

UPDATE app_user SET email = 'black@mamba.lt' WHERE id = 'dhjbwau74a6';

INSERT INTO animal (organization, registration_no, status, image_url, birth_date, name, species, gender, microchip_id, chip_install_date)
VALUES 
(1, '123Svx', 'vaccinated', 'www.url.lt', '2020-08-01', 'Haskelis', 'dog', 'female', '123', '2020-08-11'),
(2, '321Hi', 'sick', 'www.url.lt', '2020-01-01', 'Jupyteris', 'parrot', 'female', '666666', '2020-09-01'),
(3, '456Carl', 'healthy', 'www.url.lt', '2020-01-01', 'Pitoncas', 'snake', 'male', '2893402', '2020-03-01'),
(3, '555Bob', 'adopted', 'www.url.lt', '2020-01-01', 'Javainis', 'hamster', 'male', '29387', '2020-04-14'),
(1, '999Mamba', 'healthy', 'www.url.lt', '2019-09-16', 'Murkė', 'cat', 'male', '001010101', '2020-09-01');

CREATE TRIGGER animal_moddatetime
    BEFORE UPDATE ON animal
    FOR EACH ROW
    EXECUTE PROCEDURE moddatetime (modtime);

UPDATE animal SET image_url = 'www.black.mamba' WHERE id = 1;

INSERT INTO animal_event_check_in (animal, date_time, comments, organization)
VALUES
(1, '2020-03-01', 'Beautiful dog', 1),
(2, '2020-03-01', 'Beautiful parrot', 1),
(3, '2020-03-01', 'Beautiful snake', 1),
(4, '2020-03-01', 'Beautiful hamster', 1),
(5, '2020-04-01', 'Beautiful cat', 1),
(1, '2020-03-02', 'Re-registering', 1),
(2, '2020-03-02', 'Re-registering', 1),
(3, '2020-03-02', 'Re-registering', 1),
(4, '2020-03-02', 'Re-registering', 1),
(5, '2020-04-02', 'Re-registering', 1);

INSERT INTO animal_event_check_out (animal, date_time, comments, organization)
VALUES
(5, '2020-10-01', 'Adopted cat', 1);

INSERT INTO animal_event_general (animal, date_time, comments, organization, type, expenses)
VALUES
(2, '2020-07-01', 'Birthday party!', 1, 'birthday', 109.03);

INSERT INTO animal_event_medical_record (animal, date_time, comments, organization, type, expenses)
VALUES
(4, '2020-05-21', 'Dewormed', 1, 'deworm', 26.74);