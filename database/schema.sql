DROP TABLE "Customer";

CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" text NOT NULL,
    "ICE" text,
    "RC" text,
    "deliveryAddress" text,
    "phone" text,
    "comment" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

