# Meal Scheduler Frontend

### ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

## Summary

- [Description](#description)
- [Running Application](#running-application)
- [Running Docker](#running-application-on-docker)
- [Environment Variables](#environment-variables)
- [Citation](#citation)

## Description

React frontend open project for managing meals orders in Brazilian Federal Institutes of Technology.

## Running application

```sh
yarn start
```

## Running application on Docker

```sh
docker build . -t <your username>/meal-front
docker run -p 80:3000 --name meal-front -d meal-front
```

## Environment Variables Example

```
# APP
PUBLIC_URL=jandaya

# API
REACT_APP_API_URL=http://localhost:3333

# Configs
REACT_APP_TIME_LIMIT_MORNING=15
REACT_APP_TIME_LIMIT_AFTERNOON=17
REACT_APP_TIME_LIMIT_NIGHT=21
```

Please refer to [Backend Project](https://github.com/vauxgomes/meal-scheduler-backend) for a better understanding of this application and its Environment Variables

## Citation

In case you want to cite this project:

```bibtex
@software{Gomes_Meal_Scheduler_Frontend_2022,
    author = {Gomes, Vaux Sandino Diniz},
    month = {4},
    title = {{Meal Scheduler Frontend}},
    version = {1.0.0},
    year = {2022}
}
```
