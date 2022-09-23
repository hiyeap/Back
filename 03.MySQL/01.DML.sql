/*
 데이터 조작 언어(DML: Data Manipulation Language)
*/

/* 조회 */

USE world;
SHOW TABLES;
DESC city; # 테이블 구조

/* 
SELECT 필드명
FROM 테이블명
WHERE 조건
LIMIT 숫자 OFFSET 숫자
GROUP BY 필드명
HAVING 그룹 조건
JOIN 테이블명
ON 조인 조건;
*/

# 필드명에 대소문자 구별 안함
SELECT * 
FROM city 
WHERE countrycode = 'KOR'; 

# name컬럼이 키워드이므로 ``안에 넣어서 원본을 출력
SELECT `NAME`,population 
from city 
where countrycode = 'KOR';

SELECT `NAME`,population 
from city 
where countrycode = 'KOR' 
AND population>1000000;

SELECT DISTINCT district 
from city 
where countrycode = 'KOR';

# 호남지역 도시
SELECT * 
FROM city 
WHERE district='Kwangju' 
OR district='Chollabuk' 
OR district='Chollanam';

# 한국의 100만보다 큰 도시중에 인구수가 짝수인 도시
SELECT * 
FROM city 
WHERE countrycode='KOR' 
AND population>1000000 
AND population%2=0;

# 한국의 100만보다 크고 200만보다 작은 도시
SELECT * 
FROM city 
WHERE countrycode='KOR' 
AND population>1000000 
AND population<2000000;

SELECT * 
FROM city 
WHERE countrycode='KOR' 
AND population BETWEEN 1000000 AND 2000000;

# 전라남북도의 도시
SELECT * 
FROM city 
WHERE countrycode='KOR'
AND district LIKE 'Cholla%';

/* 순서 */
# 인구수가 800만 이상의 도시를 인구수의 내림차순으로 조회
SELECT * 
FROM city 
WHERE population>8000000 
ORDER BY population DESC;

# 한국의 도시를 district는 오름차순, Name도 오름차순
SELECT * 
FROM city 
WHERE countrycode='KOR' 
ORDER BY district, NAME;

# 광역시도별로 도시 인구수가 많은 것부터 보여줘라.
# 한국의 도시를 district는 오름차순, 인구수는 내림차순
SELECT * 
FROM city 
WHERE countrycode='KOR' 
ORDER BY district, population DESC;

/* 함수 */
# count(*) - 건수
SELECT COUNT(*) 
FROM city 
WHERE countrycode='KOR';

SELECT AVG(population) 
FROM city 
WHERE countrycode='KOR';

SELECT AVG(population) AS average # Alias
FROM city 
WHERE countrycode='KOR';

SELECT avg(population), max(population), min(population) 
FROM city 
WHERE countrycode='KOR';

/* 그룹 */
# 광역시도별 인구수
SELECT district, SUM(population) 
FROM city 
WHERE countrycode='KOR'
GROUP BY district;

# 광역시도별 인구수를 내림차순으로
SELECT district, SUM(population) 
FROM city 
WHERE countrycode='KOR'
GROUP BY district 
ORDER BY SUM(population) DESC;

# 전라남도의 도시
SELECT GROUP_CONCAT(NAME) 
FROM city 
WHERE district='Chollanam';

# 한국의 광역시도
SELECT GROUP_CONCAT(DISTINCT district) 
FROM city 
WHERE countrycode='KOR';

# 광역시도별 도시의 개수가 많은 순서로
SELECT district, COUNT(*) 
FROM city 
WHERE countrycode='KOR'
GROUP BY district 
ORDER BY COUNT(*) DESC, district;

# 광역시도별 도시의 개수가 5개 이상
SELECT district, COUNT(*) 
FROM city 
WHERE countrycode='KOR'
GROUP BY district HAVING COUNT(*)>=5;

# 광역시도별 도시의 개수가 5개 이상을 내림차순으로 정렬
SELECT district, COUNT(*) 
FROM city 
WHERE countrycode='KOR'
GROUP BY district 
HAVING COUNT(*)>=5
ORDER BY COUNT(*) DESC;

# 도시의 갯수가 100개 이상인 국가를 도시개수 내림차순으로 정렬
SELECT countrycode, COUNT(*)
FROM city
GROUP BY countrycode 
HAVING COUNT(*)>=100 
ORDER BY COUNT(*) DESC;

/* 개수 */
# 도시의 개수가 많은 5개 국가코드
SELECT countrycode, COUNT(*) 
FROM city
GROUP BY countrycode 
ORDER BY COUNT(*) DESC
LIMIT 5;

# 도시의 인구가 많은 10개 국가코드
SELECT countrycode, SUM(population) 
FROM city
GROUP BY countrycode 
ORDER BY SUM(population) DESC
LIMIT 10;

# 도시의 인구가 많은 국가코드(6위 - 10위)
SELECT countrycode, SUM(population) 
FROM city
GROUP BY countrycode 
ORDER BY SUM(population) DESC
LIMIT 5 OFFSET 5;

/* Join */
# 도시의 인구가 많은 국가(6위 - 10위)
SELECT country.name, SUM(city.population) 
FROM city INNER JOIN country 
ON city.CountryCode=country.Code
GROUP BY city.countrycode 
ORDER BY SUM(city.population) DESC
LIMIT 5 OFFSET 5;

# 인구가 많은 전세계 도시 Top 10의 국가명, 도시명, 인구수
SELECT country.Name, city.Name, city.Population 
FROM city JOIN country 
ON city.CountryCode=country.Code
ORDER BY city.Population DESC LIMIT 10;

# 대륙별로 국가숫자, GNP의 합, 평균 국가별 GNP는?
SELECT continent, round(SUM(gnp),-3) as gnpSum,round(SUM(gnp),-3) AS gnpAvg
FROM country
GROUP BY continent;

# 아시아 대륙에서 인구가 가장 많은 도시 10개를 내림차순으로 보여줄 것
# (대륙명, 국가명, 도시명, 인구수)
SELECT country.Continent, country.Name, city.Name, city.Population
FROM country JOIN city
WHERE continent = 'Asia'
AND country.Code = city.countrycode
ORDER BY population DESC
LIMIT 10;

# 전 세계에서 인구가 가장 많은 10개 도시에서 사용하는 공식언어는?
# (도시명, 인구수, 언어명)
SELECT C.name, c.population, l.Language
FROM city C JOIN countrylanguage l 
ON c.CountryCode = l.CountryCode
WHERE l.IsOfficial = 'T'
ORDER BY c.Population DESC
LIMIT 10;
