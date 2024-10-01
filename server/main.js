import {question, region, cycle} from './collections';

Meteor.methods({
  createQuestion(title, regionName, cycleName) {
    const regionId = region.findOne({name: regionName})?._id;
    const cycleId = cycle.findOne({name: cycleName})?._id;
    const questions = question.insert({title, regionId, cycleId});
    return questions;
  },
  createRegion(name) {
    const regionId = region.insert({name});
    return regionId;
  },
  createCycle(name, startDate, endDate, duration) {
    const cycleId = cycle.insert({name, startDate, endDate, duration});
    return cycleId;
  },
  getQuestion(regionName, date) {
    const regionId = region.findOne({name: regionName})?._id;
    const cycleId = cycle.findOne({startDate: {$lte: date}, endDate: {$gte: date}})?._id;
    if (regionId && cycleId) {
      const questions = question.find({regionId, cycleId}).fetch();
      return questions;
    }
    return [];
  },
  getAllRegions() {
    const regions = region.find().fetch();
    return regions;
  },
  getAllCycles() {
    const cycles = cycle.find().fetch();
    return cycles;
  },
});
