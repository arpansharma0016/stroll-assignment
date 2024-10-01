const question = new Mongo.Collection('question');
const region = new Mongo.Collection('region');
const cycle = new Mongo.Collection('cycle');

module.exports = {
  question,
  region,
  cycle,
};
