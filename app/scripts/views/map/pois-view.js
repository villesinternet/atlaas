/*global atlaas, Backbone, JST*/

atlaas.Views = atlaas.Views || {};

(function () {
    'use strict';

    atlaas.Views.Map.PoisView = Backbone.View.extend({

        el: '.results-menu__wrapper',

        collectionView: [],

        initialize: function () {
            // Initialy, display a poi summary
            var query = {
                source: JSON.stringify({
                    size: 50,
                    query: {
                        match_all: {}
                    }
                })
            };

            this.listenTo(this.collection, "reset", this.render);
            this.collection.fetch({ reset: true, data: query });
        },

        render: function () {
            this.collectionView = _.map(this.collection.models, function (_model) {
                return new atlaas.Views.Map.PoiView({ model: _model });
            });

            this.poisResults = _.map(this.collection.models, function (_model) {
                return new atlaas.Views.Map.PoiResultView({ model: _model });
            });

            this.$el.html(_.map(this.poisResults, function (_result) {
                return _result.render().el;
            }));

            return this;
        },

        renderResults: function () {

        },

        addOne: function(_model, _locationIndex) {
            var poi = new atlaas.Views.Map.PoiView({ model: _model });
            this.collectionView.push(poi);
        }

    });

})();
