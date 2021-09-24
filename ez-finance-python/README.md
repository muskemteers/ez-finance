# python part of project

MUTUAL FUND DATABASE

CREATE DATABASE mf_historical_data;

USE mf_historical_data;

CREATE TABLE mf_info (
scheme_code VARCHAR(20) PRIMARY KEY,
scheme_name VARCHAR(200) NOT NULL,
fund_house VARCHAR(100) NOT NULL,
scheme_type VARCHAR(100) NOT NULL,
scheme_category VARCHAR(100) NOT NULL,
scheme_start_date DATE NOT NULL
);

CREATE TABLE historical_nav(
scheme_code VARCHAR(20) NOT NULL,
date DATE NOT NULL,
nav DOUBLE NOT NULL,
PRIMARY KEY(scheme_code,date),
FOREIGN KEY (scheme_code) REFERENCES mf_info(scheme_code)
);
