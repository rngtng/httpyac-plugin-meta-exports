# httpyac-plugin-meta-exports

[HttpYac plugin](https://httpyac.github.io) to simplify global variable exports from a response

[![build](https://github.com/rngtng/httpyac-plugin-meta-exports/actions/workflows/main.yml/badge.svg)](https://github.com/rngtng/httpyac-plugin-meta-exports/actions/workflows/main.yml)

## Installation

```
npm install httpyac-plugin-meta-exports --save
```

## Usage

Plugin adds support for an additional meta data field `@exports`. With that, a response value export to global variable gets a nice reading oneliner. See:


```
###
# @name setId
# @exports id = response.id
GET http://localhost:8080/1

###
# @name getId
# @ref setId
GET http://localhost:8080/{{id}}

```

is short for

```
###
# @name setId
GET http://localhost:8080/1

{{
  exports.id = response.parsedBody.id
}}

###
# @name getId
# @ref setId
GET http://localhost:8080/{{id}}

```

### Caveats

It's s super simple POC approach. Under the hood js `eval` is called.
