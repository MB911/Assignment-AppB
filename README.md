# Before Running STEP 6 Ensure the database and the table is ready, Follow these steps otherwise:

STEP A: Open Terminal
<br />
STEP B: Open mysql using the following command: **mysql -u root -p**
<br />
STEP C: Enter Passphrase (if you are not using any passphrase, remove or comment out line 20 of app.js)
<br />
STEP D: Create Database using the following command: **CREATE DATABASE assignment;**
STEP E: Switch to assignment database using the following command: **USE assignment;**
STEP F: Create table trade_data using the following command:
**CREATE TABLE trade_data( time_exchange TIMESTAMP DEFAULT NOW(), 
uuid VARCHAR(255) PRIMARY KEY, 
price DECIMAL(24,8), 
amount DECIMAL(24,8), 
transaction VARCHAR(255), 
symbol VARCHAR(255), 
type VARCHAR(20) DEFAULT "TRADE");**
<br />
STEP G: Run the following command that all the attributes of the database have been properly defined: **DESCRIBE trade_data;**
# Assignment-AppB
STEP 1: Download the zip file
<br />
STEP 2: Unzip the file
<br />
STEP 3: Open Terminal
<br />
STEP 4: Change Directory to Assignment-AppB-master/
<br />
STEP 5: Run the following command on the terminal: **npm install**
<br />
STEP 6: Run the following command on the terminal: **node index.js**
<br />
