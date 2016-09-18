import test from 'ava'
import chai from 'chai'
import targaryen from 'targaryen'
import { generate } from 'firebase-bolt'
import { readFileSync } from 'fs'
import { database } from 'firebase'

// configure targaryen
chai.use(targaryen.chai)
const expect = chai.expect
const users = targaryen.users
// add some fake users
users.Alex = {uid: 'XXd5r6CyNZf4roaLBgzFzcwJfRZ2'}
users.Jonh = {uid: 'YYd5r6CyNZf4roaLBgzFzcwJfRZ2'}

const rulesPath = '../rules.bolt'


test.beforeEach(t => {
  targaryen.setFirebaseData(require('./data.json'));
  const rules = generate(readFileSync('../rules.bolt', encoding='utf-8'))
  targaryen.setFirebaseRules(rules);
});

test('read rooms', t => {
    expect(users.unauthenticated).can.read.path('/rooms')
})

test('create room', t => {
  const newRoom = {name: 'New Room', createdAt: database.ServerValue.TIMESTAMP}

  expect(users.unauthenticated).cannot
    .write(newRoom)
    .to.path('/rooms/854edcd0-7a62-11e6-8b77-86f30ca893d3')
  expect(users.password).can
    .write(newRoom)
    .to.path('/rooms/854edcd0-7a62-11e6-8b77-86f30ca893d3')
})

test('read room members', t => {
  expect(users.unauthenticated).can.read
    .path('/rooms-members/854ecee8-7a62-11e6-8b77-86f30ca893d3')
})

test('add myself as a room member', t => {
  expect(users.Jonh).can
    .write({joinedAt: database.ServerValue.TIMESTAMP})
    .to.path('/rooms-members/854ecee8-7a62-11e6-8b77-86f30ca893d3/YYd5r6CyNZf4roaLBgzFzcwJfRZ2')

    // can't add somebody else
    expect(users.Alex).cannot
      .write({joinedAt: database.ServerValue.TIMESTAMP})
      .to.path('/rooms-members/854ecee8-7a62-11e6-8b77-86f30ca893d3/YYd5r6CyNZf4roaLBgzFzcwJfRZ2')
})

test('read room messages', t => {
  expect(users.Alex).can.read
    .path('/rooms-messages/854ecee8-7a62-11e6-8b77-86f30ca893d3')

  // Jonh is not part of the room
  expect(users.Jonh).cannot.read
    .path('/rooms-messages/854ecee8-7a62-11e6-8b77-86f30ca893d3')
})


test('write messages to the room', t => {
  const message = {
    user: {
      displayName: 'Alex',
      id: 'XXd5r6CyNZf4roaLBgzFzcwJfRZ2',
      photoURL: 'none',
    },
    message: 'Hi again!',
    sentAt: database.ServerValue.TIMESTAMP
  }
  expect(users.Alex).can
    .write(message)
    .to.path('/rooms-messages/854ecee8-7a62-11e6-8b77-86f30ca893d3/f1aff870-7a6a-11e6-8b77-86f30ca893d3')

    // Jonh is not room member
    expect(users.Jonh).cannot
      .write(message)
      .to.path('/rooms-messages/854ecee8-7a62-11e6-8b77-86f30ca893d3/f1aff870-7a6a-11e6-8b77-86f30ca893d3')
})
