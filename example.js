var assignByPreference = require('./');

const util = require('util');
const pretty = obj => util.inspect(obj,{compact: false, colors:true});

// first parameter
function createUsers(key, preferences, assignments) {
  return {
    key,
    preferences,
    assignments: assignments || []
  }
}

let user0 = createUsers('Jane', ['Coding 101', 'Boba 101', 'Recycling 101', 'Scuba Diving 101'], ['Baking 101']);
let user1 = createUsers('Dave', ['Makeup 101', 'Scuba Diving 101', 'Coding 101', 'Recycling 101']);
let user2 = createUsers('Lin', ['Cooking 101', 'Horseriding 101', 'Boba 101', 'Coding 101']);
let users = [user0, user1, user2];

// second parameter
function createGroup(key,capacity) {
  return {
    key,
    capacity
  }
}

let group0 = createGroup('Coding 101', 2);
let group1 = createGroup('Boba 101', 2);
let group2 = createGroup('Recycling 101', 2);
let group3 = createGroup('Cooking 101', 2);
let group4 = createGroup('Scuba Diving 101', 2);
let group5 = createGroup('Makeup 101', 2);
let group6 = createGroup('Horseriding 101', 2);

let groups = [group0, group1, group2, group3, group4, group5, group6];

// module with options.assignmentsPerUser undefined
console.log(pretty(assignByPreference(users,groups).groups));
console.log(pretty(assignByPreference(users,groups).users));

// module with options.assigmentsPerUser defined
console.log(pretty(assignByPreference(users,groups,{assignmentsPerUser: 1}).users));
