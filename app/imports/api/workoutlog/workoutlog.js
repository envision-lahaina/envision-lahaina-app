import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class WorkoutLogCollection {
  constructor() {
    this.name = 'WorkoutLogCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      date: Date,
      title: String,
      description: String,
      image: { type: String, optional: true },
      createdAt: Date,
      owner: String,
      activityDurationHours: {
        type: SimpleSchema.Integer,
        optional: true,
        min: 0,
        max: 24,
      },
      activityDurationMinutes: {
        type: SimpleSchema.Integer,
        optional: true,
        min: 0,
        max: 59,
      },
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

export const WorkoutLogs = new WorkoutLogCollection();
