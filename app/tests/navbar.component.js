import { Selector } from 'testcafe';
import { ComponentIDs } from '../imports/ui/utilities/ids';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector(`#${ComponentIDs.currentUserDropDown}`).exists;
    if (loggedInUser) {
      await testController.click(`#${ComponentIDs.currentUserDropDown}`);
      await testController.click(`#${ComponentIDs.navBarSignOut}`);
    }
  }

  async gotoSignInPage(testController) {
    await this.ensureLogout(testController);
    await testController.click(`#${ComponentIDs.loginDropDown}`);
    await testController.click(`#${ComponentIDs.navBarSignIn}`);
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    await testController.expect(Selector(`#${ComponentIDs.currentUserDropDown}`).innerText).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    await testController.expect(Selector(`#${ComponentIDs.currentUserDropDown}`).exists).ok();
    await testController.click(`#${ComponentIDs.currentUserDropDown}`);
    await testController.click(`#${ComponentIDs.navBarSignOut}`);
  }

  /** Go to edit profile page */
  async gotoEdit(testController) {
    await testController.expect(Selector(`#${ComponentIDs.currentUserDropDown}`).exists).ok();
    await testController.click(`#${ComponentIDs.currentUserDropDown}`);
    await testController.click(`#${ComponentIDs.navBarEditProfile}`);
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignUpPage(testController) {
    await this.ensureLogout(testController);
    await testController.click(`#${ComponentIDs.loginDropDown}`);
    await testController.click(`#${ComponentIDs.navBarSignUp}`);
  }

  async gotoWorkoutLogPage(testController) {
    await testController.click(`#${ComponentIDs.navBarCivicEngagementItem}`);
    await testController.click(`#${ComponentIDs.navBarToWorkoutLog}`);
  }

  /** Test that CE Workout Log page works */
  async gotoSurveyPage(testController) {
    await testController.click(`#${ComponentIDs.navBarCivicEngagementItem}`);
    await testController.click(`#${ComponentIDs.navBarToSurvey}`);
  }

  async gotoCommunityPage(testController) {
    await testController.click(`#${ComponentIDs.navBarCivicEngagementItem}`);
    await testController.click(`#${ComponentIDs.navBarToCommunity}`);
  }

  /** BEGIN VISUALIZE TOOLSET SECTION */
  async gotoModel(testController) {
    await testController.click(`#${ComponentIDs.navBarVisualizeToolsetItem}`);
    await testController.click(`#${ComponentIDs.navBarToModel}`);
  }

  async gotoDalle3(testController) {
    await testController.click(`#${ComponentIDs.navBarVisualizeToolsetItem}`);
    await testController.click(`#${ComponentIDs.navBarToDalle3}`);
  }

  async gotoMapping(testController) {
    await testController.click(`#${ComponentIDs.navBarVisualizeToolsetItem}`);
    await testController.click(`#${ComponentIDs.navBarToMapping}`);
  }

  async gotoExternal(testController) {
    await testController.click(`#${ComponentIDs.navBarVisualizeToolsetItem}`);
    await testController.click(`#${ComponentIDs.navBarToExternal}`);
  }
}

export const navBar = new NavBar();
