// const db = require("../config/db");
// const moment = require("moment");
// const axios = require("axios");
// const { sendEmailNotification } = require("../services/emailService");
// const {getContests}=require('../controllers/contest.controller')

// const cron=require('node-cron');

// // CLIST API Credentials
// // const CLIST_API_KEY = "YOUR_CLIST_API_KEY"; // Replace with your actual API key
// // const CLIST_USERNAME = "YOUR_CLIST_USERNAME"; // Replace with your CLIST username

// // const fetchContests = async () => {
// //   try {
// //     const response = await axios.get("https://clist.by/api/v2/contest/", {
// //       params: {
// //         api_key: CLIST_API_KEY,
// //         username: CLIST_USERNAME,
// //         upcoming: true, // Fetch only upcoming contests
// //         limit: 50, // Fetch max 50 contests
// //         order_by: "start",
// //       },
// //     });

// //     return response.data.objects; // Extract contest list
// //   } catch (error) {
// //     console.error("Error fetching contests from CLIST:", error);
// //     return [];
// //   }
// // };
// const checkAndNotifySubscribers = async () => {
//   try {
//     const subscribers = await db("users").where("subscribed", 1).select("email");
//     console.log(subscribers);
//     const contests = await getContests();
//     // console.log("hiiii");

//     const now = moment();
//     console.log(contests);

//     for (const contest of contests) {
//       const startMoment = moment(contest.start);
//       const timeUntilStart = startMoment.diff(now, "minutes");

//       // if (timeUntilStart === 30 || timeUntilStart === 5) {
//       //   for (const user of subscribers) {
//       //     await sendEmailNotification(user.email, contest.event, timeUntilStart);
//       //   }
//       // }
//       for (const user of subscribers) {
//         await sendEmailNotification(user.email, contest.event, timeUntilStart);
//       }
//     }
//   } catch (error) {
//     console.error("Error in contest notifications:", error);
//   }
// };


// const start = () => {
//   console.log("✅ Contest Notifier Started...");
//   cron.schedule("* * * * *", () => {
//     console.log("Running contest notifier job...");
//     checkAndNotifySubscribers();
//   });
// };

// module.exports={start};

const axios = require("axios");
const moment = require("moment");
const cron = require("node-cron");
const db = require("../config/db");
const { sendEmailNotification } = require("../services/emailService");
require("dotenv").config();

/**
 * Fetch contests directly from the API
 */
const fetchContests = async () => {
  try {
    const now = moment.utc();
    const nextWeek = moment.utc().add(7, "days");

    const response = await axios.get("https://clist.by/api/v1/contest/", {
      headers: {
        Authorization: `ApiKey ${process.env.CLIST_USERNAME}:${process.env.CLIST_API_KEY}`,
        Accept: "application/json",
      },
      params: {
        start__gte: now.format(),
        start__lt: nextWeek.format(),
        order_by: "start",
        resource__name__in: "codechef.com,codeforces.com,leetcode.com,atcoder.jp,geeksforgeeks.org",
      },
    });

    if (!response.data || !response.data.objects) {
      console.error("❌ No contests found or API response invalid");
      return [];
    }

    console.log("✅ Contests fetched successfully");
    return response.data.objects;
  } catch (error) {
    console.error("❌ Error fetching contests:", error.message);
    return []; // Return empty array on failure
  }
};

/**
 * Check contests and notify subscribers
 */
const checkAndNotifySubscribers = async () => {
  try {
    const subscribers = await db("users").where("subscribed", 1).select("email");

    if (!subscribers.length) {
      console.log("🚫 No subscribers found.");
      return;
    }

    console.log("📨 Subscribed Users:", subscribers);

    const contests = await fetchContests();
    // console.log(contests);

    if (!contests.length) {
      console.log("🚫 No contests available for notification.");
      return;
    }

    const now = moment();
    console.log(contests);

    for (const contest of contests) {
    
      // const startMoment = moment(contest.start);
      // const timeUntilStart = startMoment.diff(now, "minutes");

      // if (timeUntilStart === 30 || timeUntilStart === 5) {
      //   console.log(`🔔 Sending notifications for contest: ${contest.event}`);

      //   for (const user of subscribers) {
      //     await sendEmailNotification(user.email, contest.event, timeUntilStart);
      //   }
      // }
      for (const user of subscribers) {
        await sendEmailNotification(user.email, contest.event,contest.href);
      }
    }
  } catch (error) {
    console.error("❌ Error in contest notifications:", error.message);
  }
};

/**
 * Start the Contest Notifier
 */
const start = () => {
  console.log("✅ Contest Notifier Started...");
  cron.schedule("* * * * *", () => {
    console.log("⏳ Running contest notifier job...");
    checkAndNotifySubscribers();
  });
};

module.exports = { start };
