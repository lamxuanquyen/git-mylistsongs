import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './song.html';

Template.song.events({
  'click .delete' (event) {
    if(confirm('Delete this song ?')) {
      Meteor.call('deletesong', this._id);
     // Songs.remove (this._id);
    }
  },
  'click .google' () {
   // console.log(this.Namesong);
    const win = window.open("https://www.google.com.vn/#q=lyric "+ this.Namesong, '_blank',"width=700,height=500");
    win.focus();
  },
});
