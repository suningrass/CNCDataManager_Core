System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Header;
    return {
        setters: [],
        execute: function () {
            Header = function (user) {
                return {
                    templateUrl: './app/views/directives/header.html',
                    restrict: 'E',
                    scope: true,
                    link: function (scope, ele, attr) {
                    }
                };
            };
            Header.$inject = ['User'];
            exports_1("default", Header);
        }
    };
});