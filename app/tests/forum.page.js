import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class WorkoutLogPage {
  constructor() {
    this.pageId = `#${PageIDs.workoutlog}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Test that going to addPost page works and successfully adds a post */
  async gotoAddPost(testController) {
    await testController.click(`#${ComponentIDs.addPost}`);
    // Tests that adding a post works.
    await testController.typeText(`#${ComponentIDs.addPostTitle}`, 'Hello');
    await testController.typeText(`#${ComponentIDs.addPostContent}`, 'TestCafe.');
    await testController.click(`#${ComponentIDs.addPostSubmit} input.p-2.bg-white.border-1.rounded-1.mt-1`);
    await testController.click('button.swal-button.swal-button--confirm');
  }

  /** Ensure can add a comment */
  async addComment(testController) {
    await testController.click(`#${ComponentIDs.post}`);
    await testController.click(`#${ComponentIDs.addComment}`);
    await testController.typeText(`#${ComponentIDs.addCommentText}`, 'Testing comment with TestCafe');
    await testController.click(`#${ComponentIDs.submitComment} input.btn.btn-primary`);
    await testController.click('button.swal-button.swal-button--confirm');
  }

  /** Ensure can delete comment */
  async deleteComment(testController) {
    await testController.click(`#${ComponentIDs.deleteComment}`);
    await testController.click('button.swal-button.swal-button--confirm');
  }

  /** Delete entire post */
  async deletePost(testController) {
    await testController.click(`#${ComponentIDs.deletePost} button.btn.btn-danger`);
    await testController.click('button.swal-button.swal-button--confirm');
  }
}

export const workoutlogPage = new WorkoutLogPage();
