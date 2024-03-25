import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/profile';
import { WorkoutLogs } from '../../api/workoutlog/workoutlog';
import { Surveys } from '../../api/survey/survey';
import { Votes } from '../../api/vote/vote';
import { ModCards } from '../../api/modcard/modcard';

const addProfile = (profile) => {
  console.log(`  Adding: ${profile.firstName} (${profile.owner})`);
  Profiles.collection.insert(profile);
};

if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.forEach(data => addProfile(data));
  }
}

const createLog = (log) => {
  console.log(`  Creating: ${log.title} (${log.owner})`);
  WorkoutLogs.collection.insert(log);
};

if (WorkoutLogs.collection.find().count() === 0) {
  if (Meteor.settings.defaultLogs) {
    console.log('Creating default logs.');
    Meteor.settings.defaultLogs.forEach(data => createLog(data));
  }
}

const addSurvey = (survey) => {
  console.log(`  Adding: ${survey.owner}`);
  Surveys.collection.insert(survey);
};

if (Surveys.collection.find().count() === 0) {
  if (Meteor.settings.defaultSurveys) {
    console.log('Creating default surveys.');
    Meteor.settings.defaultSurveys.forEach(data => addSurvey(data));
  }
}

const addVote = (vote) => {
  console.log(`  Adding: ${vote.owner}`);
  Votes.collection.insert(vote);
};

if (Votes.collection.find().count() === 0) {
  if (Meteor.settings.defaultVotes) {
    console.log('Creating default votes.');
    Meteor.settings.defaultVotes.forEach(data => addVote(data));
  }
}

// const addComment = (comment) => {
//   console.log(`  Adding: ${comment.owner}`);
//   Comments.collection.insert(comment);
// };

// if (Comments.collection.find().count() === 0) {
//   if (Meteor.settings.defaultComments) {
//     console.log('Creating default comments.');
//     Meteor.settings.defaultComments.forEach(data => addComment(data));
//   }
// }

const addModCard = (modcard) => {
  console.log(`  Adding: ${modcard.address}`);
  ModCards.collection.insert(modcard);
};

if (ModCards.collection.find().count() === 0) {
  if (Meteor.settings.defaultModCards) {
    console.log('Creating default modcards.');
    Meteor.settings.defaultModCards.forEach(data => addModCard(data));
  }
}
