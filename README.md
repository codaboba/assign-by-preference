# assign-by-preference 🗂

> 🗂 Assign users to group slots based on user preference and availability

`assign-by-preference` is a module that allows you input an array of objects containing individual data and their preferences for being organized into groups pertaining to various activities such as workshops, teams, classes, etc. and returns an object containing data about the group *(assignees, capacity, etc.)*. As it sorts users into groups, it assumes "preference" based on the indices of a user's preference object, with 0 being the highest preference. If a user's preferred group has no availability, the module will search for a group with the highest availability and place the user into that group.



## Installation

```bash
$ npm install --save assign-by-preference
```

## How to use it

**assignByPreference(users, groups [, options])** 

The table below describes the expected properties of each parameter.

#### Users

*Users is a list of objects which should contain the following key-value pairs* 

| Property    | Type             | Example                         | Description                                                  |
| ----------- | ---------------- | ------------------------------- | ------------------------------------------------------------ |
| key         | unique string    | `'jane-doe-1'`                  | a unique string to identify individual                       |
| preferences | array            | `['Coding 101', 'Cooking 201']` | a list of group preferences                                  |
| assignments | [optional] array | `['Coding 101']`                | a list of user's current assignments (*if no argument is passed, default value will be empty array [ ])* |

#### Groups

*Groups is a list of objects which should contain the following key-value pairs*

| Property | Type          | Example      | Description                            |
| -------- | ------------- | ------------ | -------------------------------------- |
| key      | unique string | `'Intro to Archery'` | a unique string to identify individual |
| capacity | number        | `23`         | total number of spaces in a group      |

#### Output
*Output will be an object containing a copy of the inputs containing new data about assignments or assignees. Original inputs are not mutated.*

| **Property** | **Type** | **Example**                                                  |
| ------------ | -------- | ------------------------------------------------------------ |
| users        | array    | ` [{key: 'Mandy', preferences: ['Ballet', 'Art History', 'Pottery'], assignments: []},    {key: 'Jin', preferences: ['Taekwondo', 'Ballet', 'Improv']}]` |
| groups       | array    | ` [{key: 'Art History', capacity: 2, assignees: []}, {key: 'Ballet',capacity: 2}, assignees: []]` |

#### Example Case
You are tasked with creating a class roster for Mandy, Jin, and Felicia. They need to pick their 2 electives for next year's class schedule. They get to list their top 3 preferences, which is represented by an array, with the elective at index 0 being the highest preference. However, each class only has enough room for 2 students. 
```javascript
const assignByPreference = require('assign-by-preference');

let users = [
    {
        key: 'Mandy',
        preferences: ['Ballet', 'Art History', 'Pottery']
    },
    {
        key: 'Jin',
        preferences: ['Taekwondo', 'Ballet', 'Improv']
    },
    {
        key: 'Felicia',
        preferences: ['Photoshop', 'Ballet', 'Pottery']
    }
];

let groups = [
    {
        key: 'Art History',
        capacity: 2
    },
    {
        key: 'Ballet',
        capacity: 2
    },
    {
        key: 'Improv',
        capacity: 2
    },
    {
        key: 'Photoshop',
        capacity: 2
    },
    {
        key: 'Pottery',
        capacity: 2
    },
    {
        key: 'Taekwondo',
        capacity: 2
    }
]
const result = assignByPreference(users, groups, {assignmentsPerUser: 2}).users;
console.log(result);
/*
[ { key: 'Mandy',
    preferences: [ 'Ballet', 'Art History', 'Pottery' ],
    assignments: [ 'Ballet', 'Art History' ] },
  { key: 'Jin',
    preferences: [ 'Taekwondo', 'Ballet', 'Improv' ],
    assignments: [ 'Taekwondo', 'Ballet' ] },
  { key: 'Felicia',
    preferences: [ 'Photoshop', 'Ballet', 'Pottery' ],
    assignments: [ 'Photoshop', 'Pottery' ] } ]
*/
```

#### Options

| Property                     | Type   | Description                                                  |
| ---------------------------- | ------ | ------------------------------------------------------------ |
| `options.assignmentsPerUser` | number | sets limit for number of groups to which user can be assigned *(if not defined, default value will be the minimum of two values: the number of groups that exist [preventing "double-assignment" ] or how ever many assignments per user that will not end up exceeding sum of all group capacities* |

**Example 1**

Number of users: `3`

Number of groups: `7`

Capacity of each group: `2`

Assignments per user: `4`

Explanation: There are more groups than users, but each group cannot accommodate every user. Therefore, the maximum number of assignments each user can have without exceeding each group's capacity is the value of 7 * 2 / 3, rounded down (4).

**Example 2**

Number of users: `3`

Number of groups: `7`

Capacity of each group: `5`

Assignments per user: `7`

Explanation: Realistically, users cannot be assigned to a group more than once. Therefore, every user will be assigned to every group once.

### License 

[MIT](https://github.com/codaboba/assign-by-preference/blob/master/LICENSE) © 2018 Hong Le