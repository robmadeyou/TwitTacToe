TwitTacToe
==========

Twitter tic tac toe bot, made to keep people entertained! :)

<a href="https://twitter.com/Tictactoe_bot"> <img src="http://s18.postimg.org/4svlkcvx5/Tic_Tac_Toe.jpg" align="center"> </a>

Okay... I'll admit it, it's not my best work, but then again it's not my worst; and hey, it works?! :)


###Requirements

Twit package from npm, simply open npm and type install twit. Simple


Okay, so now to get to work, I'll show you how to set up the twitter account to be able to make posts via the twitter api using Node.js

1. Firstly, you're going to need to create a twitter account, if you already have one that's great!
2. Head on to the [Twitter Dev page](https://dev.twitter.com/) and sign in on the top right hand side
3. Go to the [apps page](https://dev.twitter.com/apps) and on the right hand side you should see a button saying "Create a new application" Click it
4. Enter all the apropriate details in the fields and create the application.
      Name = App name
      Description = App description
      Website = Enter your or a default website (I used http://Google.com both times, just a placeholder, can be changed later on)
      CallBack URL = If you don't have one, leave it blank
5. After creating the app you should be redirected to a page with all the app settings, before you do anything else you need to change one parameter. Under settings change the application type to Read and Write, this will let the app post from the server.
6. Now go back to the Details page and click on "Create my access token" this will be used later in the config
7. When you get the codes generated (you might have to refresh to see the codes) we are going to need to copy some values to the TicTacToe.js file. On lines 7 - 10 replace the dots in the semi-colons with the values you see on your dev page

That should be it, you might want to change the name that the bot is listening for to the name of your twitter account so it knows when it's being spoken at.

Happy coding!


##If you have any other questions or suggestions or anything of that matter Email me at robmadeyou@gmail.com
