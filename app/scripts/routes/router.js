/*global app, Backbone*/

atlaas.Routers = atlaas.Routers || {};

(function () {
    'use strict';

    atlaas.Routers.AppRouter = Backbone.Router.extend({
    	routes: {
    		"": "home",
    		"news": "news"
    	}
    });

})();
