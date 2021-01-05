USE flow;
LOAD DATA LOCAL INFILE "/docker-entrypoint-initdb.d/feeders.csv" INTO TABLE feeders FIELDS TERMINATED BY "," ENCLOSED BY "" LINES TERMINATED BY "\n";
LOAD DATA LOCAL INFILE "/docker-entrypoint-initdb.d/nodes.csv" INTO TABLE `nodes` FIELDS TERMINATED BY "," ENCLOSED BY "" LINES TERMINATED BY "\n";
LOAD DATA LOCAL INFILE "/docker-entrypoint-initdb.d/lines.csv" INTO TABLE `lines` FIELDS TERMINATED BY "," ENCLOSED BY "" LINES TERMINATED BY "\n";
LOAD DATA LOCAL INFILE "/docker-entrypoint-initdb.d/loads.csv" INTO TABLE loads FIELDS TERMINATED BY "," ENCLOSED BY "" LINES TERMINATED BY "\n";
LOAD DATA LOCAL INFILE "/docker-entrypoint-initdb.d/pvs.csv" INTO TABLE pvs FIELDS TERMINATED BY "," ENCLOSED BY "" LINES TERMINATED BY "\n";
LOAD DATA LOCAL INFILE "/docker-entrypoint-initdb.d/ehps.csv" INTO TABLE ehps FIELDS TERMINATED BY "," ENCLOSED BY "" LINES TERMINATED BY "\n";
LOAD DATA LOCAL INFILE "/docker-entrypoint-initdb.d/uchps.csv" INTO TABLE uchps FIELDS TERMINATED BY "," ENCLOSED BY "" LINES TERMINATED BY "\n";
