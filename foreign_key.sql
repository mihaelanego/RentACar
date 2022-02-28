alter table booking add foreign key (car_ID) references car (ID)

alter table booking add foreign key (customer_ID) references customer (ID)

alter table car add foreign key (car_type_ID) references car_type (ID)

alter table car add foreign key (agency_ID) references agency (ID)

alter table agency add foreign key (location_ID) references location (ID)

alter table agency_location add foreign key (location_ID) references location (ID)

alter table agency_location add foreign key (agency_ID) references agency (ID)