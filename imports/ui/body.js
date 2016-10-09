import { Template } from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';

import {Songs} from '../api/songs.js';
import { $ } from 'meteor/jquery';
import './song.js';
import './body.html';
/*
if(Meteor.isClient) {
  Meteor.subscribe('songs');
}*/
Meteor.subscribe('songs');


Template.body.onCreated(function bodyOnCreated(){
  this.state = new ReactiveDict();
});

Template.body.helpers({
  songs() {
    const instance= Template.instance();
    if (instance.state.get('tagfilter')) {
      //console.log(instance.state.get('tagfilter')); 
      return Songs.find({folder: { $in: instance.state.get('tagfilter') } });
    }
    return Songs.find({}, {sort: {createdAt:-1}});
  },

  counter() {
     return Songs.find().count();
  },

  tags() {
    let songs = Songs.find({}).fetch();
    let tags = [];

    songs.forEach((song) => {
      if (!song.folder)
        return;
      
      if (tags.indexOf(song.folder) > -1)
        return;
      tags.push(song.folder);
    });

    return tags;
  },
});

Template.body.events({
  'submit .new-song' (event) {
     event.preventDefault();
    
     const text = event.target.title.value;

     const folder = event.target.folder.value;
     //console.log(folder);
     Meteor.call('addsong', text, folder);
     /*
     Songs.insert ({
       Namesong:text,
       folder: folder,
       createdAt: new Date(),
       owner: Meteor.userId(),
       username: Meteor.user().username, //lay usename (khong can thiet)
     });
     */
     event.target.title.value = '';
     event.target.folder.value = '';
  },

  'change .dropdown-menu input'(event,instance) {
    let $checkedElements = $(event.target).parents('.dropdown-menu')
         .find('input:checked');
    let tags=[];

    $checkedElements.each(function () {
      let name = $(this).attr('name');
      tags.push(name);
    });

    instance.state.set('tagfilter', tags);
    
  },
});

