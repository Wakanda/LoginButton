
WAF.define('LoginButton', ['waf-core/widget'], function(widget) {
    "use strict";

    var login = widget.create('LoginButton', {
        tagName: 'button',
        mode: widget.property({
            type: 'enum',
            values: {
                both: 'Both',
                login: 'Login only',
                logout: 'Logout only'
            },
            defaultValue: 'both'
        }),
        verify: widget.property({ type: 'boolean', defaultValue: true }),
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

            if (userName === null || password === null) {
            	that.user = null;
                that.fire('error', {event:event, user: userName});
                that.render();
                return;
            }

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
        checkState: function(startup) {
            var that = this;
            if (WAF.directory) {
                WAF.directory.currentUser({
                    onSuccess: function(event) {
                        that.user = event.result;
                        that.render();
                        if (startup) {
                            var rurl = that.user ? that.redirectUrl() : that.redirectUrlLogout();
                            if (rurl) {
                                document.location.href = rurl;
                            }
                        }
                    }
                });
            }
        },
        render: function() {
            switch(this.mode()) {
                case 'login':
                    this.node.innerHTML = '<span>' + this.titleLogin() + '</span>';
                    this.node.disabled = this.user;
                    break;
                case 'logout':
                    this.node.innerHTML = '<span>' + this.titleLogout() + '</span>';
                    this.node.disabled = !this.user;
                    break;
                default:
                    this.node.innerHTML = '<span>' + (this.user ? this.titleLogout() : this.titleLogin()) + '</span>';
                    break;
            }
        },
        init: function() {

            var that = this;

            this.render();
            this.titleLogin.onChange(this.render);
            this.titleLogout.onChange(this.render);
            this.mode.onChange(this.render);


            this.user = null;

            this.checkState(this.verify());

            $(this.node).on('click', this.click.bind(this));
        },
        click: function() {
            if (this.user === null) {
                this._login();
            } else {
                this._logout();
            }
        }
    });
    login.addClass('btn btn-default');

    return login;

});
