-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uploadedBy" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "documentOrigin" TEXT NOT NULL,
    "totalTaxes" REAL NOT NULL,
    "netValue" REAL NOT NULL,
    "attachment" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdateDate" DATETIME NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Document" ("attachment", "creationDate", "documentOrigin", "documentType", "id", "lastUpdateDate", "netValue", "totalTaxes", "uploadedBy") SELECT "attachment", "creationDate", "documentOrigin", "documentType", "id", "lastUpdateDate", "netValue", "totalTaxes", "uploadedBy" FROM "Document";
DROP TABLE "Document";
ALTER TABLE "new_Document" RENAME TO "Document";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
