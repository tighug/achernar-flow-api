-- CreateTable
CREATE TABLE "Feeder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "networkNum" INTEGER NOT NULL,
    "feederNum" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Node" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "feederId" INTEGER NOT NULL,
    "num" INTEGER NOT NULL,
    "posX" REAL NOT NULL,
    "posY" REAL NOT NULL,
    "hasLoad" BOOLEAN NOT NULL,

    FOREIGN KEY ("feederId") REFERENCES "Feeder"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Line" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "feederId" INTEGER NOT NULL,
    "prevNodeId" INTEGER NOT NULL,
    "nextNodeId" INTEGER NOT NULL,
    "lengthM" REAL NOT NULL,
    "phase" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "rOhmPerKm" REAL NOT NULL,
    "xOhmPerKm" REAL NOT NULL,

    FOREIGN KEY ("feederId") REFERENCES "Feeder"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("prevNodeId") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("nextNodeId") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE
);