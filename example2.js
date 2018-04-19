var assignByPreference = require('./');
const util = require('util');
const pretty = obj => util.inspect(obj,{compact: false, colors:true});

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
