/*global app, Backbone, JST*/

atlaas.Views = atlaas.Views || {};

(function () {
    'use strict';

    atlaas.Views.AppView = Backbone.View.extend({

        el: 'body',

        events: {
            'click #toggle-sidebar'     : 'toggleSidebar'
        },

        initialize: function () {
            this.$mainContainer = $('#main-container');
            this.$pageContainer = $('#pages-container');
            this.$toggleSidebarBt = $('#toggle-sidebar');

            this.sidebarView  = new atlaas.Views.SidebarView();
        },

        render: function () {
            this.$pageContainer.empty();

            if (this.sidebarView.isVisible()) this.hideSidebar();

            return this;
        },

        renderMap: function () {
            this.render();
            var mapView = new atlaas.Views.Map.MapView();

            // Prepare DOM before initializing mapView cause Leaflet needs an existing element on init.
            this.$pageContainer.append(mapView.render('map').el);

            mapView.initMap();

            return this;
        },

        renderNews: function () {
            this.render();

            var newsView = new atlaas.Views.NewsView();
            this.$pageContainer.append(newsView.template());

            newsView.render();

            return this;
        },

        toggleSidebar: function (e) {
            e.preventDefault();
            e.stopPropagation();

            if(this.sidebarView.isVisible()) this.hideSidebar(); else this.showSidebar();
        },

        showSidebar: function () {
            var tween = TweenLite.to(this.$mainContainer, 0.6,
                {'x': '-220px',
                ease: Power2.easeInOut});

            $(this.sidebarView.el).attr('data-visible', 'visible');
            this.$mainContainer.attr('data-visible', 'hidden');
            
            this.$mainContainer.one('click.sidebar', _.bind(function (e) {
                e.stopPropagation();
                e.preventDefault();

                this.hideSidebar();
            }, this));
        },

        hideSidebar: function () {
            var tween = TweenLite.to(this.$mainContainer, 0.6,
                {'x': '0',
                ease: Power2.easeInOut});

            $(this.sidebarView.el).attr('data-visible', 'hidden');
            this.$mainContainer.attr('data-visible', 'visible');

            this.$mainContainer.off('click.sidebar');
        }

    });

})();
