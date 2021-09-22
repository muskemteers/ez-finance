# ez-finance REST API Documentation

Base API URI:
https://localhost:5000/v1

Note: Any API endpoint at any point can crash and send [500 Error Code (Internal Server Error)](https://www.youtube.com/watch?v=j9V78UbdzWI).

## Endpoints:

### Asset Allocation

`- /assets : Will Provide Overview of Assets `

Response Body (200-OK)

| Fields   | Data Type | Example |
| -------- | --------- | ------- |
| Equities | Number    | 50,000  |
| Debt     | Number    | 30,000  |
| Gold     | Number    | 8,500   |

- `/assets/equities : List of all equity investments`

Response Body (200-OK)

| Fields   | Data Type        | Example                                                                                             |
| -------- | ---------------- | --------------------------------------------------------------------------------------------------- |
| Equities | Array < Equity > | <pre>[<br> {<br> name: Compamy A,<br> currentValue: 10000,<br> investedValue: 8000<br> }<br>]</pre> |

- `/assets/debts : List of all debt-related investments`

Response Body (200-OK)

| Fields | Data Type       | Example                                                                                          |
| ------ | --------------- | ------------------------------------------------------------------------------------------------ |
| Debts  | Array < Debts > | <pre>[<br> {<br> name: Bank A,<br> currentValue: 10000,<br> investedValue: 8000<br> }<br>]</pre> |

- `/assets/golds : List of all gold-related investments`

Response Body (200-OK)

| Fields | Data Type       | Example                                                                                             |
| ------ | --------------- | --------------------------------------------------------------------------------------------------- |
| Golds  | Array < Golds > | <pre>[<br> {<br> name: Company A,<br> currentValue: 10000,<br> investedValue: 8000<br> }<br>]</pre> |

### Passive Income

- `/passive : Overview of Passive Income`

Response Body (200-OK)

| Fields     | Data Type | Example |
| ---------- | --------- | ------- |
| Dividends  | Number    | 50,000  |
| Gold Bonds | Number    | 30,000  |
| Rents      | Number    | 8,500   |

- `/passive/dividends : List of Dividends`

Response Body (200-OK)

| Fields    | Data Type           | Example                                                                                         |
| --------- | ------------------- | ----------------------------------------------------------------------------------------------- |
| Dividends | Array < Dividends > | <pre>[<br> {<br> name: Company A,<br> noOfShares: 150,<br> dividendAlloted: 10<br> }<br>]</pre> |

- `/passive/golds : List of Gold Bond Interests`

Response Body (200-OK)

| Fields | Data Type                | Example                                                                                                   |
| ------ | ------------------------ | --------------------------------------------------------------------------------------------------------- |
| Golds  | Array < GoldsInterests > | <pre>[<br> {<br> name: Company A,<br> duration: 4,<br> interest: 4, investedValue: 10000<br> }<br>]</pre> |

- `/passive/rents : List of rent from Properties`

Response Body (200-OK)

| Fields | Data Type       | Example                                                             |
| ------ | --------------- | ------------------------------------------------------------------- |
| Rents  | Array < Rents > | <pre>[<br> {<br> name: Location A,<br> rent: 10000<br> }<br>]</pre> |

### Income Tax

/incometax

### Strategies

/strategies/equities/:id?strategy=44ma
/strategies/mfs/:id?strategy=prevbest4

### Loan

`/loan : Overview of loans lended and borrowed`

Response Body (200-OK)

| Fields | Data Type      | Example                                                                                                                                   |
| ------ | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Loans  | Array < Loan > | <pre>[<br> {<br> name: Person/Institution A,<br> duration: 2,<br> interest: 10,<br> amount: 10000,<br> type: lend/borrow<br> }<br>]</pre> |

### Transactions

/transactions

Request Body (POST)

| Fields     | Data Type   | Example                                                               |
| ---------- | ----------- | --------------------------------------------------------------------- |
| entity     | String      | `equities/mfs & 6 other types`                                        |
| operation  | String      | `Buy/Sell/Modify/Delete`                                              |
| properties | JSON Object | <pre>{<br> name: XYZ MF,<br> amount: 123,<br> interest: 6%<br>}</pre> |

Response (With Message)

201 Created
200 OK
204 No Content
