# assign-by-preference 🗂

> 🗂 Assign users to group slots based on user preference and availability


`assign-by-preference` is a module that allows you input an array of objects containing individual data and their preferences for being organized into groups pertaining to various activities such as workshops, teams, classes, etc. and returns an object containing data about the group *(assignees, capacity, etc.)*. As it sorts users into groups, it assumes "preference" based on the indices of a user's preference object, with 0 being the highest preference. If a user's preferred group has no availability, the module will search for a group with the highest availability and place the user into that group.



## How to use it

**assignByPreference(users, groups [, options])** 

The table below describes the expected properties of each parameter.

#### Users

*Users is a list of objects which should contain the following key-value pairs* 

| Property    | Type             | Example                         | Description                                                  |
| ----------- | ---------------- | ------------------------------- | ------------------------------------------------------------ |
| key         | unique string    | `jane-doe-1`                    | a unique string to identify individual                       |
| preferences | array            | `['coding 101', 'cooking 201']` | a list of group preferences                                  |
| assignments | [optional] array | `['coding 101']`                | a list of user's current assignments (*if no argument is passed, default value will be empty array [ ])* |

#### Groups

*Groups is a list of objects which should contain the following key-value pairs*

| Property | Type          | Example      | Description                            |
| -------- | ------------- | ------------ | -------------------------------------- |
| key      | unique string | `'Intro to Archery'` | a unique string to identify individual |
| capacity | number        | `23`         | total number of spaces in a group      |

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

