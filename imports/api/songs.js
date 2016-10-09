import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Songs= new Mongo.Collection('songs');

if(Meteor.isServer) {
  Meteor.publish('songs', function () {
    // return Songs.find({owner: this.owner});
    return Songs.find({owner: this.userId});
  });
}

Meteor.methods({
  addsong(text,folder) {
    check(text, String);
    check(folder, String);
   
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Songs.insert ({
      Namesong: text,
      folder: folder,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  deletesong (id) {
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Songs.remove(id);
  },
})
