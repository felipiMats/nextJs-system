PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "documentOrigin" TEXT NOT NULL,
    "totalTaxes" REAL NOT NULL,
    "netValue" REAL NOT NULL,
    "attachment" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdateDate" DATETIME NOT NULL,
    CONSTRAINT check_attachment_type CHECK (attachment IN ('PDF', 'DOCX', 'IMAGE', 'OTHER'))
);

INSERT INTO "new_Document" (
    "id",
    "name",
    "uploadedBy",
    "documentType",
    "documentOrigin",
    "totalTaxes",
    "netValue",
    "attachment",
    "creationDate",
    "lastUpdateDate"
) 
SELECT
    "id",
    "name",
    "uploadedBy",
    "documentType",
    'UNKNOWN',
    "totalTaxes",
    "netValue",
    "attachment",
    "creationDate",
    "lastUpdateDate"
FROM "Document";

DROP TABLE "Document";

ALTER TABLE "new_Document" RENAME TO "Document";

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
