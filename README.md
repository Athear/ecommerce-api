# ecommerce-api

![license:MIT](https://img.shields.io/badge/license-MIT-green)

## Description

An API back-end for an online store.

-----

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Questions](#questions)


-----

## Installation

Install the server with ``` npm i ```.

Run the contents on db\schema.sql in your mysql instance to create the database.

If you want seed data to get you started, run ```npm run seed```



## Usage

This is an API-only implementation, so all data will be accessed through routes.

The data available in this application is arranged into Categories, Products, and Tags.

Categories have a one-to-many relationship with Products. Products and Tags have a many-to-many relationship.



#### Routes and route options

The routes available correspond to these objects:

- /api/categories

- /api/products

- /api tags

All routes share the following options:

- `GET / `  Return all objects available on that path, along with their associations
- `GET /ID`  Return a single object corresponding to  ID (an integer),  along with associations
- `POST`  Create a new object of that type. [See below](#Creating and Updating)
- `PUT /ID`  Update an existing object. [See below](#Creating and Updating)
- `DELETE /ID`  Remove the object with the provided ID



#### Creating and Updating

Creating and updating require a JSON object passed in the body of the request specific to the route.

###### Category
```json
{"category_name":"Capes" }
```
###### Tags
```json
{  "tag_name":"clasps" }
```
###### Products
```json
{
  "product_name": "Stylish Cape",
  "price": 200.00,
  "stock": 4,
  "tagIds": [7,5,8]
}
```
For Products,  all properties are optional. At least one must be included.



-----



## Links

[GitHub repo](https://github.com/Athear/ecommerce-api)

[Walk-through video](https://drive.google.com/file/d/1mzTu1qdO8gSWrN8bvTgbje1q8-Hk8A5I/view)



## License

Licensed under the [MIT](https://spdx.org/licenses/MIT.html) license.



## Questions

For additional questions, find me on [GitHub](https://github.com/athear)
