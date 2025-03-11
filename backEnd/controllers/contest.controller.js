const axios = require("axios");
const moment = require("moment");
const router = require("../routes/auth.routes");
const { default: knex } = require("knex");
require("dotenv").config();

exports.getContests = async (req, res) => {
  try {
    // Define the date range: from now to 7 days ahead
    const now = moment.utc();
    const nextWeek = moment.utc().add(7, "days");

    // Fetch contests from the CLIST API
    const response = await axios.get("https://clist.by/api/v1/contest/", {
      headers: {
        "Authorization": `ApiKey ${process.env.CLIST_USERNAME}:${process.env.CLIST_API_KEY}`,
        "Accept": "application/json"
      },
      params: {
        start__gte: now.format(),
        start__lt: nextWeek.format(),
        order_by: "start",
        resource__name__in: "codechef.com,codeforces.com,leetcode.com,atcoder.jp,geeksforgeeks.org"
        // why is it working when the parameter resource__name__in is not at all avilable need to cjeck i t?
      }
    });

    // console.log(response.data);

    // Check if the response contains data
    if (response.data && response.data.objects && response.data.objects.length > 0) {
      res.json(response.data.objects);
    } else {
      res.status(404).json({ message: "No upcoming contests found for the specified platforms." });
    }
  } catch (error) {
    // why like this you can also simply thorw an error also right ?
    console.error("Error fetching contests:", error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({
      message: "Error fetching contests",
      error: error.response ? error.response.data : error.message
    });
  }
};

// Controller to fetch Subscriptions
exports.getSubscription=async (req,res)=>{
  try{
    const {userId}=req.params;
    const subscriptions=await  knex('user_subscriptions').
    select('platfrom','subscriped')
    .where('user_id',userId);
    res.json(subscriptions);

  }catch(e){
    // throw new Error(e);
    res.status(500).json({"error":"Error Fetching Subscriptions."});
  }
}

// Controller to toggle or change subscriptions
exports.ChangeSubscription=async (req,res)=>{
  try{
    const {platform}=req.body;
    const {userId}=req.params;

    const existingsubscription=await knex("user_subscriptions")
    .where({user_id:userId,platform})
    .first();

    if(existingsubscription){
      await knex('user_transactions')
      .where({user_id: userId, platform})
      .del();
      return res.status(200).json({"message":"unscribed successfuly"});
    }
    else{
      await knex("user_subscriptions")
      .insert({user_id:userId,platfrom,subscribed:true})
      return res.status(200).json({"message":"subscribed successfuly"});
    }

  }catch(error){
    res.status(500).json({"error":"Error updating the user details"});
  }

}
