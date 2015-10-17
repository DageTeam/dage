# Däge #

Every day, 112 billion corporate emails are sent. All it takes is 1 email to change the course of a company.

What if your HR team can efficiently scan emails for harmful content? What if your security team can know if confidential emails are being put in the wrong hands? What if your sales team can track the content of the best and worst performing emails?

This is where Däge steps in. Däge actively and silently monitors outbound emails from your server, utilizing machine learning to identify emails that is important to your team, and notifying you whenever it finds noteworthy emails. With the ability to scan thousands of emails every minute, Däge provides your company the tools to know the content of your employees’ emails, without you dedicating valuable resources or time.

Let's look at Däge's functionalities:

1. Upon signin, the dashboard providing high-level insights into when flagged emails are sent, most flagged users, and detailed breakdowns of why emails were flagged. The attractive D3-sourced charts and tables provide an easy to understand overview of your company's digital health. Clicking on the dynamic 'New Flags' number dispatches an action to change the state tree to take you to the unread 'alerts' panel. 

2. The unread flagged emails panel allows you to receive new alerts on this screen. Every email has details on which keywords triggered the flag and the context the keyword exists in, allowing the admin or the lower level users to unflag emails to train DägeWatch. 

3. The all flagged emails panel archives all unflagged emails or those that have been read. 

4. DägeWatch flagged emails - confidence level

5. The customization panel allows the top level admin to manage custom filters and its related keywords. It features responsive adding and removing capabilities despite the need to query the database, thanks to the dynamic re-rendering capabilities based off the React state tree. 

6. The manage users panel allows admin users to manage lower-level users. Set permission groups broken down by department so  teams only see relevant flagged emails. 

All these features provides actionable intel to make it incredibily easy to secure your company's outbound email stream. 

#Architecture#

![alt text](http://s19.postimg.org/kmc6xsotv/Slide1.jpg)

Däge also features simple RESTful API calls from the front-end to back-end. However, it might be tedious/difficult to follow along the React/Redux structure if you have never had experiences with Redux way of creating new state trees through actions and reducers. We've provided several action/reducer map to elucidate how some of Däge's features are rendered. 

*Note: a) rectangular boxes represent the constants and the actions. b) words superimposed on the arrows represent the state changes caused by the reducers. c) the diamonds represent the different states within the state tree. 

**Emails**
![alt text](http://s19.postimg.org/mmy54vvlf/Redux_State_Tree_Actions_Trial_Blank.png)

**Filters** 
![alt text](http://s19.postimg.org/ek4k7b0dv/Blank_Flowchart_New_Page.png)

**Authentication** 
![alt text](http://s19.postimg.org/cqx258ptf/manage_users_flow_New_Page.png)

#HOW DOES THE DÄGEWATCH ALGORITHM SIFT THRU ALL EMAILS?

Let’s start with the fetching of the email. The mailListener.js, when ran, consistently listens for incoming emails sent to the provided email address setup. In our case, it is Dägeprotect@gmail.com. When the mailListener detects a new mail has been received, it will first sanitize the email subject and email body for apostrophes. A single apostrophe can break the SQL Statement, thus we need to escape it by appending another apostrophe to it. Then the insertEmail function will be called from the database.js file to insert the email into the database.

At this point, the program parses the email, which has been sent as an argument, into multiple columns, as defined in our schema. It will insert it into the emailTable, ready for the periodic Cron job to take further parse the email.

During our first pass, our flagging algorithm will check inside the emailTable for all ‘unchecked’ emails (emails which have not been checked by the flagging algorithm in flaggingAlgo.js). SQL will pass back an array of objects, each object being an individual email with additional metadata. The flagging algorithm will first check to see if it’s an empty array; if so, there’s nothing to do. Then it will loop thru the array of emails and mark the emails as checked in emailTable. 

After which it will get all the flagged words, defined in the keywordTable, and check to see if any flagged words are inside the email. If there are, the algorithm will then create a string that can inform the reader of the the context of the email.  Then it will insert the identifying information and context into the contextTable. The client facing dashboard will display the stored data: the flagged keyword, the context, the user who inserted the flagged keyword and also the user’s filter.

#TECHNOLOGIES USED:

-React
-Node
-Express
-SQLite
-Gulp
-Jasmine
-Karma
-Travis CI
-Google Cloud SQL
-Google Cloud BigTable
-AWS Elastic Beanstalk

#Deployment#

Run __BLANK__. That's it!

#Testing#

Make sure the Express server is running, then navigate to __BLANK__ and execute __BLANK__. 

#Contributing#

Please see _CONTRIBUTING.md for contributing best practices. Aside from our extensive comments within the codebase, we've tried our best to create easy-to-understand self-documenting code. Please try to keep this up when you are contributing. Thanks!

#Developers#
TEAM DÄGE: 
GT Deng
Anthony Liu
Max Li
Andrew Nguyen
Tito Esteves
