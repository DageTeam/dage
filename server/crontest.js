var CronJob = require('cron').CronJob;
var job = new CronJob('* * * * * * ', function() {
  /*
   * Runs every weekday (Monday through Friday)
   * at 11:30:00 AM. It does not run on Saturday
   * or Sunday.
   */
   console.log('run cron');
  }, function(){
  },
  true,
  "America/Los_Angeles");
  true /* Start the job right now */
  // timeZone /* Time zone of this job. */
  job.start();