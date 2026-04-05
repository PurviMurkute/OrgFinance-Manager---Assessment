// MINUTE, HOUR, DAY_OF_MONTH, MONTH, DAY_OF_WEEK
import cron from "cron";
import http from "http";
const job = new cron.CronJob("0 */14 * * * *", function () {
  http.get(`${process.env.SERVER_URL}/health`, (resp) => {
    if (resp.statusCode === 200) {
      console.log("Server is up");
    } else {
      console.log("Server is down", resp.statusCode);
    }
  });
});

export default job;
