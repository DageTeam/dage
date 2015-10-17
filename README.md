# Däge #

This is our GIT WorkFlow:

![Alt text](/screenshots/gitWorkflow.png?raw=true "GIT WorkFlow")


This is our Database Schema:

![Alt text](/screenshots/databaseSchema.png?raw=true "Database Schema")



#HOW DOES OUR PROPRIETARY ALGORITHM SIFT THRU ALL EMAILS?
Let’s start with the fetching of the email. The mailListener.js, when ran, consistently listens for incoming emails sent to the provided email address setup. In our case, it is dageprotect@gmail.com. When the mailListener detects a new mail has been received, it will first sanitize the email subject and email body for apostrophes. A single apostrophe can break the SQL Statement, thus we need to escape it by appending another apostrophe to it. Then the insertEmail function will be called from the database.js file to insert the email into the database.

At this point, the program parses the email, which has been sent as an argument, into multiple columns, as defined in our schema. It will insert it into the emailTable, ready for the periodic Cron job to take further parse the email.

During our first pass, our flagging algorithm will check inside the emailTable for all ‘unchecked’ emails (emails which have not been checked by the flagging algorithm in flaggingAlgo.js). SQL will pass back an array of objects, each object being an individual email with additional metadata. The flagging algorithm will first check to see if it’s an empty array; if so, there’s nothing to do. Then it will loop thru the array of emails and mark the emails as checked in emailTable. 

After which it will get all the flagged words, defined in the keywordTable, and check to see if any flagged words are inside the email. If there are, the algorithm will then create a string that can inform the reader of the the context of the email.  Then it will insert the identifying information and context into the contextTable. The client facing dashboard will display the stored data: the flagged keyword, the context, the user who inserted the flagged keyword and also the user’s filter.



#TECHNOLOGIES USED:

- React
- Node
- Express
- SQLite
- Gulp
- Jasmine
- Karma
- Travis CI
- Google Cloud SQL
- Google Cloud BigTable
- Amazon Web Services Elastic Beanstalk
