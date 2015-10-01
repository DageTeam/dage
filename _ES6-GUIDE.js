
/*******************
 * This is a VERY general and high level differences between ES5 and ES6 particularly in context of 
 * React and Redux. This assumes some basic knowledge of ES6.
 ******************/

/*******************
 * require statements vs import statements. note that ES6 only pulls PropTypes and Component from react
 ******************/

//ES5
var React = require('react');
var PropTypes = React.PropTypes;
var TodoTextInput = require('./TodoTextInput');

//ES6
import React, { PropTypes, Component } from 'react';
import TodoTextInput from './TodoTextInput';

/*******************
 * function definition within class declaraion. note the lack of "function" and commas between functions
 ******************/

//ES5
var Header = React.createClass({
  handleSave: function(text) {
  },

  render: function() {
    return (
      <header>
      </header>
    );
  },
});

//ES6
class Header extends Component {
  handleSave(text) {
  }

  render() {
    return (
      <header>
      </header>
    );
  }
}

/*******************
 * React component initial state: note the differences and lack of 'getInitialState' within ES6. Because
 * ES6 uses extends, you need to have a constructor AND the super(props, context) in order to establish
 * the constructor/'child' relationship and gain access to props and context functionality
 ******************/

//ES5
var TodoItem = React.createClass({
  getInitialState: function() {
    return {
      editing: false,
    };
  },
});

//ES6
class TodoItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false,
    };
  }
}

/*******************
 * Anonymous functions replaced with => (please note that as per our style guide, we do not plan on using
 * => for our anonymous function declarations. This is more for understanding Redux examples. The two
 * function blocks below are equivilant.
 ******************/

//ES5
var markedCount = todos.reduce(function(count, todo) {
    return todo.marked ? count + 1 : count;
  }, 0);

//ES6
const markedCount = todos.reduce((count, todo) =>
  todo.completed ? count + 1 : count, 0);

/*******************
 * Ensuring components update within the reducer file: Please note 2 things. First is that the line for 
 * handling undefined arguments ('state = state || initialState') is now handled within the argments 
 * list. 
 * Second thing to note is that coding in ES5 would require .concat(state) to 'create' a new reference 
 * for the state change listeners (something part of Redux--ask team for help, or consult this guide:
 * https://blog.andyet.com/2015/08/06/what-the-flux-lets-redux ). Notice that in ES6, ...state is used
 * to create a new state variable within memory to ensure Redux's shouldComponentUpdate function is 
 * triggered
 ******************/

//ES5
module.exports = function todos(state, action) {
  state = state || initialState
  switch (action.type) {
  case types.ADD_TODO:
    return [{
      id: (state.length === 0) ? 0 : state[0].id + 1,
      marked: false,
      text: action.text
    }].concat(state);
  }
}

//ES6
export default function todos(state = initialState, action) {
 switch (action.type) {
 case ADD_TODO:
   return [{
     id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
     completed: false,
     text: action.text
   }, ...state];
 }
}

/*******************
 * Last line = return in ES6. I am personally not a fan of this
 ******************/

 //ES5
 return state.map(function(todo) {
   return assign({}, todo, { marked: !areAllMarked })
 }); 

//ES6
return state.map(todo => Object.assign({}, todo, {
  completed: !areAllMarked
}));

/*******************
 * Dynamic property names & template strings-we can now assign object literals to a derived
 * property name. we have the ability to construct objects whose property names are determined 
 * by a JavaScript expression at runtime.
 ******************/

 //ES5
 var Form = React.createClass({
  onChange: function(inputName, e) {
    var stateToSet = {};
    stateToSet[inputName + 'Value'] = e.target.value;
    this.setState(stateToSet);
  },
 });

 //ES6
 class Form extends React.Component {
  onChange(inputName, e) {
    this.setState({
      [`${inputName}Value`]: e.target.value,
    });
  }
 } 

/*******************
 * Destructuring & spread attributes - when we want to pass down most of a parent component
 * props to a child component, but not all of them. 
 ******************/

 //ES6
 class MaximumPower extends React.Component {
  render() {
    var {
      className,
      ...others,  // contains all properties of this.props except for className
    } = this.props;
    return (
      <div className={className}> //here, we can pass down just className
        <Power {...others} /> //here, we pass down all properties of this.props except for className
      </div>
    );
  }
 }

/*******************
 * what's the same: setting state
 * TODO: add more examples as they come up
 ******************/

this.setState({ editing: false });

























