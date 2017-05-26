# fitness-log-backend
Backend API to provide data for fitness-log-frontend app.

Using express router in node.js to get data from mongodb database about the user and their records in specific exercises. We're using monk to communicate with mongo. The current foundation of the database user schema is the following:

[
  {
    "_id": "592809f2a432030d6ac1887f",
    "nickname": "mmsmsy",
    "info": {
      "name": "Mateusz",
      "gender": "male",
      "age": 26
    },
    "exercises": {
      "squats": [],
      "legpresses": [],
      "deadlifts": [],
      "benchpresses": [],
      "pullups": [],
      "shoulderpress": [],
      "curls": []
    }
  }
]
