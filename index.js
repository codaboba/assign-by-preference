module.exports = assignByPreference;

function assignByPreference(users, groups, options) {

  // copy inputs
  const usersCopy = users.map(currentUser => {
    let newObj = Object.assign({}, currentUser);
    return newObj;
  });
  const groupsCopy = groups.map(currentGroup => {
    let newObj = Object.assign({}, currentGroup);
    newObj.assignees = [];
    newObj.availability = newObj.capacity - newObj.assignees.length;
    return newObj;
  });

  let sumOfGroupCapacity = groupsCopy.reduce(((sum, a) => sum + a.capacity), 0);

  let sumUsers = usersCopy.length;

  options = options || {};
  options.assignmentsPerUser = options.assignmentsPerUser || 0;

  // calculates max number of groups users can be in
  // if users can be assigned to more groups than which exists, groupsCopy.length value is used
  // this prevents users from being assigned to a group more than once
  // otherwise smaller number is assigned so that assignmentsPerUser does not exceed sumOfGroupCapacity
  if (options.assignmentsPerUser === 0) {
    options.assignmentsPerUser = Math.min(groupsCopy.length, Math.floor(sumOfGroupCapacity / sumUsers));
  }

  const groupTable = groupsCopy.reduce((table, currentGroup) => {
    table[currentGroup.key] = currentGroup;
    return table;
  }, {});

  const userTable = usersCopy.reduce((table, currentUser) => {
    table[currentUser.key] = currentUser;
    return table;
  }, {});


  // assigning by preference
  // index 0 = first (highest) preference
  for (let a = 0; a < usersCopy.length; a++) {
    const currentUser = usersCopy[a];

    for (let b = 0; b < currentUser.preferences.length; b++) {
      const groupLookupKey = currentUser.preferences[b];
      let currentGroup = groupTable[groupLookupKey];

      if (currentUser.assignments) {
        currentUser.assignments = currentUser.assignments.slice();
      } else {
        currentUser.assignments = [];
      }

      const userAssignmentsFull = currentUser.assignments.length === options.assignmentsPerUser;

      if (userAssignmentsFull) {
        break;
      }

      if (!currentGroup) {
        throw new Error(`Cannot find Group based on user (key: ${currentUser.key}) preference: ${lookupKey}`);
      }

      // if user preference has no availability, assign user to next group with the most availability
      if (currentGroup.availability === 0) {
        if (b < (currentUser.preferences.length - 1)) {
          continue;
        } else {
          const openGroup = findGroupWithAvailability(currentUser);
          addUserToGroup(currentUser, openGroup);
        }



      } else if (currentGroup.availability > 0) {
        addUserToGroup(currentUser, currentGroup);
      }
    }

  }

  return {
    users: usersCopy,
    groups: groupsCopy
  };

  function findGroupWithAvailability(user) {
    const groupWithAvailability = groupsCopy.reduce((openGroup, currentGroup) => {
      let groupHasMoreAvailability = currentGroup.availability > openGroup.availability;
      let userIsInGroup = user.assignments.includes(currentGroup.key);

      if (groupHasMoreAvailability && !userIsInGroup) {
        return currentGroup;
      }

      return openGroup;
    });

    return groupWithAvailability;
  }

  function addUserToGroup(user, targetGroup) {
    // update availability
    targetGroup.availability -= 1;
    targetGroup.assignees.push(user.key);

    // update user assignments
    user.assignments.push(targetGroup.key);
  }
}
