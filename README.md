This is a base node js project template, which anyone can use as it has been prepared, by keeping some of the most important code principles and project management recommendations. Feel free to change anything.

`src` -> Inside the src folder all the actual source code regarding the project will reside, this will not include any kind of tests. (You might want to make separate tests folder)

Lets take a look inside the `src` folder

- `config` -> In this folder anything and everything regarding any configurations or setup of a library or module will be done. For example: setting up `dotenv` so that we can use the environment variables anywhere in a cleaner fashion, this is done in the `server-config.js`. One more example can be to setup you logging library that can help you to prepare meaningful logs, so configuration for this library should also be done here.

- `routes` -> In the routes folder, we register a route and the corresponding middleware and controllers to it.

- `middlewares` -> they are just going to intercept the incoming requests where we can write our validators, authenticators etc.

- `controllers` -> they are kind of the last middlewares as post them you call you business layer to execute the budiness logic. In controllers we just receive the incoming requests and data and then pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output.

- `repositories` -> this folder contains all the logic using which we interact the DB by writing queries, all the raw queries or ORM queries will go here.

- `services` -> contains the buiness logic and interacts with repositories for data from the database

- `utils` -> contains helper methods, error classes etc.

### Setup the project

- Download this template from github and open it in your favourite text editor.
- Go inside the folder path and execute the following command:

```
npm install
```

- In the root directory create a `.env` file and add the following env variables
  ```
      PORT=<port number of your choice>
  ```
  ex:
  ```
      PORT=3000
  ```
- go inside the `src` folder and execute the following command:
  ```
    npx sequelize init
  ```
- By executing the above command you will get migrations and seeders folder along with a config.json inside the config folder.
- If you're setting up your development environment, then write the username of your db, password of your db and in dialect mention whatever db you are using for ex: mysql, mariadb etc
- If you're setting up test or prod environment, make sure you also replace the host with the hosted db url.

- To run the server execute

```
npm run dev
```

[Table connections diagram link for reference](https://miro.com/app/board/uXjVMxw9uvU=/)

### Get Foreign keys from a `flights` table

```
SELECT
        CONSTRAINT_NAME AS constraintName,
        COLUMN_NAME AS columnName,
        REFERENCED_TABLE_NAME AS referencedTableName,
        REFERENCED_COLUMN_NAME AS referencedColumnName
      FROM
        INFORMATION_SCHEMA.KEY_COLUMN_USAGE
      WHERE
        TABLE_NAME = 'flights' AND
        REFERENCED_TABLE_NAME IS NOT NULL;

```

or

```
select * from INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME ='flights' and CONSTRAINT_SCHEMA ='flights'
```

## Get cities name from airports using cityId

```
SELECT cities.name AS cityName
FROM airports
JOIN cities ON airports.cityId = cities.id
WHERE airports.id = 1;
```

## Join airports and cities using cityId of airports

```
SELECT airports.id AS airportId, airports.name AS airportName, airports.code AS airportCode, airports.address, cities.id AS cityId, cities.name AS cityName
FROM airports
JOIN cities ON airports.cityId = cities.id;
```

# Js to get date from ddmmyy to (2023-08-16T18:30:00) ISO 8601 date and time format and get the next date. Months are 0-indexed in js

```
    const day = parseInt(startDate.slice(0, 2));
    const month = parseInt(startDate.slice(2, 4)) - 1; // Months are 0-indexed in JavaScript
    const year = parseInt(startDate.slice(4, 8));
    const dateObject = new Date(year, month, day);

    const nextDay = new Date(dateObject);
    nextDay.setDate(dateObject.getDate() + 1);
```

# How "order" works for more than one parameters

if we have the sorting parameters "departureTime_ASC,price_DESC", it means we want to sort the data primarily by departureTime in ascending order (ASC), and if there are any ties in departureTime, we want to sort those tied rows by price in descending order (DESC).

# In our Flight model's departureAirportId in joined with Airport model's code and not id. So to join multiple cols "ON"

```
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.departureAirportId"),
              "=",
              Sequelize.col("Airport.code")
            ),
          },
```

# mysql code to get city name from Flights.departureAirportId = Airports.code and Airports.cityId =City.id

```
SELECT
    F.id,
    F.flightNumber,
    F.departureAirportId,
    A1.code AS departureAirportCode,
    A1.cityId AS departureCityId,
    C1.name AS departureCityName,
    F.arrivalAirportId,
    A2.code AS arrivalAirportCode,
    A2.cityId AS arrivalCityId,
    C2.name AS arrivalCityName
FROM
    Flights F
JOIN
    Airports A1 ON F.departureAirportId = A1.code
JOIN
    Airports A2 ON F.arrivalAirportId = A2.code
JOIN
    Cities C1 ON A1.cityId = C1.id
JOIN
    Cities C2 ON A2.cityId = C2.id;


```

or

```
SELECT
    depCity.name AS departureCityName,
    arrCity.name AS arrivalCityName
FROM
    Flights F
JOIN
    Airports depAirport ON F.departureAirportId = depAirport.code
JOIN
    Airports arrAirport ON F.arrivalAirportId = arrAirport.code
JOIN
    Cities depCity ON depAirport.cityId = depCity.id
JOIN
    Cities arrCity ON arrAirport.cityId = arrCity.id;

```

# Movie Table vs Airline Table

Airline --> row:int , col:str
1 A B C D E F  
2 A B C D E F

Movie --> row:str, col:int
A 1 2 3 4 5 6 7
B 1 2 3 4 5 6 7
C 1 2 3 4 5 6 7
