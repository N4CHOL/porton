SELECT CASE WHEN EXISTS (SELECT 1 
FROM "Composites" INNER JOIN "CompositeComponents" ON "Composites"."compositeId" = "CompositeComponents"."componentId" 
INNER JOIN "Composites" as "Parents" ON "CompositeComponents"."parentId" = "Parents"."compositeId" AND "Parents"."compositeId" = 5)
THEN TRUE
ELSE FALSE
END;