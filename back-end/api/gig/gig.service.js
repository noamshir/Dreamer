const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
const ObjectId = require("mongodb").ObjectId;
module.exports = {
  query,
  getById,
  remove,
  update
};
async function query(filterBy = {}) {
  try {
    const collection = await dbService.getCollection("gig");
    const gigs = await collection.find({}).toArray();
    return gigs;
  } catch (err) {
    logger.error(`erorr while finding gigs`, err);
    throw err;
  }
}

async function getById(gigId) {
  try {
    const collection = await dbService.getCollection("gig");
    const gig = await collection.findOne({ _id: ObjectId(gigId) });
    return gig;
  } catch (err) {
    logger.error(`while finding gig ${gigId}`, err);
    throw err;
  }
}

async function remove(id){
  try{
    const collection = await dbService.getCollection("gig");
    await collection.deleteOne({ _id: ObjectId(id) });
    return;
  }
  catch(err){
    logger.error(`cannot remove gig ${id}`, err);
    throw err;
  }
}

async function update (updatedGig){
  try {
    const collection = await dbService.getCollection("gig");
    await collection.updateOne({ _id: updatedGig._id }, { $set: updatedGig });
    return updatedGig;
  } catch (err) {
    logger.error(`cannot update gig ${updatedGig._id}`, err);
    throw err;
  }
}
