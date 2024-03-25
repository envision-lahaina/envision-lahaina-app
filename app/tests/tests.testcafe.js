import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { communityPage } from './community.page';
import { workoutlogPage } from './workoutlog.page';
import { surveyPage } from './survey.page';
import { mappingPage } from './mapping.page';
import { dalle3Page } from './dalle3.page';
import { modelPage } from './model.page';
import { externalPage } from './external.page';
import { signupPage } from './signup.page';
import { editprofilePage } from './editprofile.page';
/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

/**
 *
 *
 * ENSURE THAT KEYS HAVE BEEN LOADED
 *
 * DO NOT COMMIT KEYS!!!
 *
 *
 * */

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

// ENSURE METEOR RESET
test('Test that signup works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignUpPage(testController);
  await signupPage.isDisplayed(testController);
  await signupPage.signupUser(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// Tests edit profile page
test('Test that editing account works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoEdit(testController);
  await editprofilePage.isDisplayed(testController);
  await editprofilePage.editUserInformation(testController);
});

test('Test that Community page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoCommunityPage(testController);
  await communityPage.isDisplayed(testController);
  await communityPage.hasCards(testController);
});

test('Test that Workout Log page and adding post/comment works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoWorkoutLogPage(testController);
  await workoutlogPage.isDisplayed(testController);
  await workoutlogPage.gotoAddPost(testController);
  await navBar.gotoWorkoutLogPage(testController);
  await workoutlogPage.isDisplayed(testController);
  await workoutlogPage.addComment(testController);
  await navBar.gotoWorkoutLogPage(testController);
  await workoutlogPage.isDisplayed(testController);
  await workoutlogPage.deleteComment(testController);
  await workoutlogPage.deletePost(testController);
});

test('Test that Survey page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoSurveyPage(testController);
  await surveyPage.isDisplayed(testController);
  await surveyPage.addSurvey(testController);
});

test('Test that Model page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoModel(testController);
  await modelPage.isDisplayed(testController);
  /** tests functionality of the google map implementation and add a mod card */
  await modelPage.clickMapAndAddCard(testController);
});

/** REQUIRES WORKING KEY: Key is currently not working */
test('Test that Dalle3 page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoDalle3(testController);
  await dalle3Page.isDisplayed(testController);
  /** Below code needs to have keys to work */
  await dalle3Page.generate(testController);
  await dalle3Page.isGenerated(testController);
});

test('Test that Mapping page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoMapping(testController);
  await mappingPage.isDisplayed(testController);
  await mappingPage.hasIframe(testController);
});

test('Test that External page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoExternal(testController);
  await externalPage.isDisplayed(testController);
  await externalPage.countLinks(testController);
});
