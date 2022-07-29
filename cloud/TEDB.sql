use `TrojanEatDB`;

create table if not exists `dinningHall`(
	`dHId` INT UNSIGNED,
    `dHName` VARCHAR(40) NOT NULL,
    primary key (`dHId`)
);
insert into dinningHall
	(dHId, dHName)
values
	(1, 'EVK'),
    (2, 'VLG'),
    (3, 'PKS');
    
create table if not exists `type_info`
(
	type_id INT UNSIGNED not null,
    type_name varchar(200) not null,
    primary key (`type_id`)
) default charset = utf8;
insert into type_info
	(type_id, type_name)
values
	(1, 'Dairy'),
    (2, 'Eggs'),
    (3, 'Fish'),
    (4, 'Food Not Analyzed for Allergens'),
    (5, 'Peanuts'),
    (6, 'Pork'),
    (7, 'Chicken'),
    (8, 'Beef'),
    (9, 'Sesame'),
    (10, 'Shellfish'),
    (11, 'Soy'),
    (12, 'Tree Nuts'),
    (13, 'Vegan'),
    (14, 'Vegetarian'),
    (15, 'Wheat / Gluten');
    
    
create table vlg_raw
(
    time      date         not null,
    meal_time varchar(30)  not null,
    category  varchar(200) not null,
    food_ch      varchar(200) not null,
    food	varchar(200) not null,
    type      varchar(200) not null
);

select * from evk_raw;