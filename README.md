# SKILL TEST - BACKEND DEVELOPER

## 1. Fizz Buzz And Palindrome App
### How to Use
1. Clone this repository
2. Open terminal and go to the directory
3. Run `npm install`
4. Run `npm build`
5. Run `npm start`

### Run Test
1. Run `npm test`

### Test Result
![Test Result](https://github.com/bagusvalentinoo/node-js-typescript-fizzbuzz-palindrome/blob/master/test-results/test-result.jpg)

### Test Coverage Result
![Test Coverage Result](https://raw.githubusercontent.com/bagusvalentinoo/node-js-typescript-fizzbuzz-palindrome/master/test-results/coverage/test-coverage-result.jpg)

See Detail: /test-results/coverage/lcov-report/index.html

## 2. Buat QUERY untuk menampilkan customerNumber siapa saja yang memesan productLine Classic Cars dimana total hitung atau COUNT productionline tersebut lebih besar dari 23.

### Query
```mysql query
SELECT o.customerNumber
FROM orders o
JOIN orderdetails od ON o.orderNumber = od.orderNumber
JOIN products p ON od.productCode = p.productCode
WHERE p.productLine = 'Classic Cars'
GROUP BY o.customerNumber
HAVING COUNT(p.productLine) > 23;
```

### Output
![Ouput query 2](https://raw.githubusercontent.com/bagusvalentinoo/node-js-typescript-fizzbuzz-palindrome/master/query_2b.jpg)

## 3. a) Buat stored procedure pada mysql untuk mengekstrak isi dari ksm_kurs_pajak menjadi 1 table kurs pajak dimana table ini akan terdiri dari kolom sebagai berikut. Store procedure ini haruslah mempunyai start transaction dan juga error handling rollback keseluruhan transaksi  seperti apabila table kurs pajak sudah ada isinya maka stored procedure akan di roll back dari start transaction (perhatikan petunjuk awal di no 2 harap dibaca kembali jangan langsung loncat ke baris ini)

### Query
```mysql query
DELIMITER //

CREATE PROCEDURE extract_kurs_pajak()
BEGIN
    DECLARE tableExists INT DEFAULT 0;
    DECLARE tableHasData INT DEFAULT 0;
    DECLARE currentDate DATE;
    
    -- Check if kurs_pajak table exists
    SELECT COUNT(*) INTO tableExists FROM information_schema.tables WHERE table_schema = 'classicmodels' AND table_name = 'kurs_pajak';
    
    IF tableExists > 0 THEN
        -- Check if kurs_pajak table has data
        SELECT COUNT(*) INTO tableHasData FROM kurs_pajak;
        IF tableHasData = 0 THEN
            -- Insert data into existing kurs_pajak table
            SET currentDate = (SELECT MIN(start_date) FROM ksm_kurs_pajak);
            WHILE currentDate <= (SELECT MAX(end_date) FROM ksm_kurs_pajak) DO
                INSERT INTO kurs_pajak (id_ksm_kurs_pajak, kurs_rate, tgl, curr_id)
                SELECT id, kurs_rate, currentDate, curr_id
                FROM ksm_kurs_pajak
                WHERE currentDate BETWEEN start_date AND end_date;
                
                -- Increment date by one day
                SET currentDate = DATE_ADD(currentDate, INTERVAL 1 DAY);
            END WHILE;
        ELSE
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Error: kurs_pajak table already exists with data. Rolling back transaction.';
        END IF;
    ELSE
        -- Create kurs_pajak table and insert data
        BEGIN
            CREATE TABLE kurs_pajak (
                id_ksm_kurs_pajak INT,
                kurs_rate DECIMAL(10, 4),
                tgl DATE,
                curr_id INT,
                FOREIGN KEY (id_ksm_kurs_pajak) REFERENCES ksm_kurs_pajak(id)
            );

            SET currentDate = (SELECT MIN(start_date) FROM ksm_kurs_pajak);
            WHILE currentDate <= (SELECT MAX(end_date) FROM ksm_kurs_pajak) DO
                INSERT INTO kurs_pajak (id_ksm_kurs_pajak, kurs_rate, tgl, curr_id)
                SELECT id, kurs_rate, currentDate, curr_id
                FROM ksm_kurs_pajak
                WHERE currentDate BETWEEN start_date AND end_date;

                -- Increment date by one day
                SET currentDate = DATE_ADD(currentDate, INTERVAL 1 DAY);
            END WHILE;
        END;
    END IF;
END //

DELIMITER ;
```

### Output
![Output Query 3a 1](https://raw.githubusercontent.com/bagusvalentinoo/node-js-typescript-fizzbuzz-palindrome/master/query_complex_3b_1.jpg)

![Output Query 3a 2](https://raw.githubusercontent.com/bagusvalentinoo/node-js-typescript-fizzbuzz-palindrome/master/query_complex_3b_2.jpg)

![Output Query 3a 3](https://raw.githubusercontent.com/bagusvalentinoo/node-js-typescript-fizzbuzz-palindrome/master/query_complex_3b_3.jpg)

![Output Query 3a 4](https://raw.githubusercontent.com/bagusvalentinoo/node-js-typescript-fizzbuzz-palindrome/master/query_complex_3b_4.jpg)

## 3 b) Buatlah function pada mysql untuk mencari tanggal terkecil dari string yang ter-concatenated seperti berikut '2016-04-22, 2016-07-20, 2015-03-29, 2023-07-03' apabila fungsi tersebut dipanggil maka output yang dihasilkan adalah 2015-03-29

### Query
```mysql query
DELIMITER //

CREATE FUNCTION find_minimum_date(input_string TEXT)
RETURNS DATE
READS SQL DATA
BEGIN
    SET @min_date = NULL;
    SET @date_cursor = 1;
    SET @separator = ',';
    SET @date_length = LENGTH(input_string);

    WHILE @date_cursor <= @date_length DO
        SET @current_date = SUBSTRING_INDEX(SUBSTRING_INDEX(input_string, @separator, @date_cursor), @separator, -1);
        SET @current_date = STR_TO_DATE(@current_date, '%Y-%m-%d');

        IF @min_date IS NULL OR @current_date < @min_date THEN
            SET @min_date = @current_date;
        END IF;

        SET @date_cursor = @date_cursor + 1;
    END WHILE;

    RETURN @min_date;
END //

DELIMITER ;
```

### Output

```mysql query
SELECT find_minimum_date('2016-04-22, 2016-07-20, 2015-03-29, 2023-07-03') AS 'minimum_date';
```

![Output Query 3b 1](https://raw.githubusercontent.com/bagusvalentinoo/node-js-typescript-fizzbuzz-palindrome/master/query_complex_3b_5.jpg)
