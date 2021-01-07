USE flow;
LOAD DATA LOCAL INFILE "/docker-entrypoint-initdb.d/feeders.csv" INTO TABLE feeders FIELDS TERMINATED BY "," ENCLOSED BY "" LINES TERMINATED BY "\n";
LOAD DATA LOCAL INFILE "/docker-entrypoint-initdb.d/nodes.csv" INTO TABLE `nodes` FIELDS TERMINATED BY "," ENCLOSED BY "" LINES TERMINATED BY "\n";
LOAD DATA LOCAL INFILE "/docker-entrypoint-initdb.d/lines.csv" INTO TABLE `lines` FIELDS TERMINATED BY "," ENCLOSED BY "" LINES TERMINATED BY "\n";
LOAD DATA LOCAL INFILE "/docker-entrypoint-initdb.d/load_samples.csv" INTO TABLE load_samples FIELDS TERMINATED BY "," ENCLOSED BY "" LINES TERMINATED BY "\n";
LOAD DATA LOCAL INFILE "/docker-entrypoint-initdb.d/pv_samples.csv" INTO TABLE pv_samples FIELDS TERMINATED BY "," ENCLOSED BY "" LINES TERMINATED BY "\n";
LOAD DATA LOCAL INFILE "/docker-entrypoint-initdb.d/ehp_samples.csv" INTO TABLE ehp_samples FIELDS TERMINATED BY "," ENCLOSED BY "" LINES TERMINATED BY "\n";
LOAD DATA LOCAL INFILE "/docker-entrypoint-initdb.d/uchp_samples.csv" INTO TABLE uchp_samples FIELDS TERMINATED BY "," ENCLOSED BY "" LINES TERMINATED BY "\n";
