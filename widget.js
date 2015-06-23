
WAF.define('LoginButton', ['waf-core/widget'], function(widget) {
    "use strict";

    var login = widget.create('LoginButton', {
    	tagName: 'button',
    	titleLogin: widget.property({ type: 'string', defaultValue: 'Login' }),
    	titleLogout: widget.property({ type: 'string', defaultValue: 'Logout' }),
        redirectUrl: widget.property({
            type: 'string',
            description: "If the login is successful, the page will be redirected to this url",
            bindable: true
        }),
        redirectUrlLogout: widget.property({
            type: 'string',
            description: "If the logout is successful, the page will be redirected to this url",
            bindable: true
        }),
        loginField: widget.property({
            type: 'string',
            description: "",
            bindable: false
        }),
        passwordField: widget.property({
            type: 'string',
            description: "",
            bindable: false
        }),
        _login: function() {

            var that = this;

            if (!WAF.directory) return;
            
            var loginElementID = this.loginField() || null;
            var pwdElementID = this.passwordField() || null;
            if (loginElementID === null || pwdElementID === null) return;
     
            var loginElement = $$(loginElementID);
            var pwdElement = $$(pwdElementID);
               
            if ((!loginElement.value || !pwdElement.value)) return;

            var userName = loginElement.value() || null;
            var password = pwdElement.value() || null;

            if (userName === null || password === null) return;

            WAF.directory.login({
                onSuccess:function(event) {
                    if (event.result === true) {
                        that.user = userName;
                        that.fire('login', {event:event, user: userName});
                        var rurl = that.redirectUrl();
                        if (rurl) {
                            document.location.href = rurl;
                        }
                    } else {
                        that.user = null;
                        that.fire('error', {event:event, user: userName});
                    }

                    that.render();
                }
            }, userName, password);            
        },
        _logout: function() {
            var that = this;
            WAF.directory.logout({
                onSuccess:function(event) {
                    that.fire('logout', {event:event, user: that.user});
                    that.user = null;
                    var rurl = that.redirectUrlLogout();
                    if (rurl) {
                        document.location.href = rurl;
                    } else {
                        that.checkState();    
                    }
                }
            });
        },
        checkState: function() {
            var that = this;
            WAF.directory.currentUser({
                onSuccess: function(event) {
                    that.user = event.result;
                    that.render();
                }
            });
        },
		render: function() {
			this.node.innerHTML = '<span>' + (this.user ? this.titleLogout() : this.titleLogin()) + '</span>';
		},
        init: function() {

            var that = this;

			this.render();
            this.titleLogin.onChange(this.render);
            this.titleLogout.onChange(this.render);

            this.addClass('btn btn-default');
            
            this.user = null;

            this.checkState();
             
            $(this.node).on('click', function() {
                if (that.user === null) {
                    that._login();
                } else {
                    that._logout();
                }
            });
        }
    });
            
    return login;

});
