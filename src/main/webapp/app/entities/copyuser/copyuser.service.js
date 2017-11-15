(function() {
    'use strict';
    angular
        .module('hopefullyApp')
        .factory('Copyuser', Copyuser);

    Copyuser.$inject = ['$resource'];

    function Copyuser ($resource) {
        var resourceUrl =  'api/copyusers/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
