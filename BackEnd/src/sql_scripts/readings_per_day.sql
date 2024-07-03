SELECT count("Readings"."readingId") from "Readings" where
"Readings"."date" > '2021/09/02' 
AND
"Readings"."date" < '2021/09/03';