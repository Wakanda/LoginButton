(function(LoginButton) {
    "use strict";

	LoginButton.setWidth(92);
	LoginButton.setHeight(34);

    LoginButton.addStates(':hover', ':active', ':focus', ':disabled');
    LoginButton.addStates('.logout');

    LoginButton.customizeProperty('verify', { title: 'Verify login at startup', description: 'Verify the login at startup and apply the url redirection if needed' });
    LoginButton.customizeProperty('titleLogin',        { category: 'Login' });
    LoginButton.customizeProperty('loginField',        { category: 'Login', title: 'Login field ID' });
    LoginButton.customizeProperty('passwordField',     { category: 'Login', title: 'Password field ID' });
    LoginButton.customizeProperty('redirectUrl',       { category: 'Login', title: 'Login URL redirect' });
    LoginButton.customizeProperty('titleLogout',       { category: 'Logout' });
    LoginButton.customizeProperty('redirectUrlLogout', { category: 'Logout', title: 'Logout URL redirect' });

    LoginButton.addEvents({ 
        'name':'action' 
    },{ 
        'name':'error', 
        'category':'Login Events' 
    },{ 
        'name':'login', 
        'category':'Login Events'
    },{
        'name':'logout', 
        'category':'Logout Events'
    });


    var renderProperties = function() {
        this.titleLogin.show();
        this.loginField.show();
        this.passwordField.show();
        this.redirectUrl.show();

        this.titleLogout.show();
        this.redirectUrlLogout.show();

        if (this.mode() === 'login') {
            this.titleLogout.hide();
            this.redirectUrlLogout.hide();
        }
        if (this.mode() === 'logout') {
            this.titleLogin.hide();
            this.loginField.hide();
            this.passwordField.hide();
            this.redirectUrl.hide();
        }
    };

    LoginButton.doAfter('init', function() {
        this.mode.onChange(renderProperties);
        renderProperties.call(this);
    });
});
