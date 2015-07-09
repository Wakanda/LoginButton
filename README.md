## LoginButton Widget for [Wakanda](http://wakanda.org)
The __LoginButton__ widget comes out of the box with all you need to build a login interface with the Wakanda Directory. Just add it into your page with two textInputs (to enter ‘login’ and ‘password’) and you are done. 


### Properties
This widget has the following properties:

It inherites the properties from the widgets Button except url.

* __mode__: Choose between login, logout or both
* __verify__: Verify the login status at startup and apply the redirection if needed
* __loginField__: The ID of the TextInput Widget used for the Login
* __passwordField__: The ID of the TextInput Widget used for the password
* __redirectUrl__: If the login is successful, the page will be redirected to this url
* __redirectUrlLogout__: If the logout is successful, the page will be redirected to this url

### Event
* __error__: Fired on login error
* __login__: Fired on login success
* __logout__: Fired on logout success

### More Information
You can install a custom widget by using the [Add-ons Extension](http://doc.wakanda.org/WakandaStudio/help/Title/en/page4263.html "Add-ons Extension"). For more information, refer to the [Installing a Custom Widget](http://doc.wakanda.org/WakandaStudio/help/Title/en/page3869.html#1056003 "Installing a Custom Widget") manual.

For more information about creating a custom widget, refer to the [Widgets v2 Creating a Widget](http://doc.wakanda.org/Wakanda/help/Title/en/page3849.html "Widgets v2 Creating a Widget") manual.
