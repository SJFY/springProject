(function() {
    'use strict';
    angular
        .module('hopefullyApp')
        .factory('Questionair', Questionair);

    Questionair.$inject = ['$resource'];

    function Questionair ($resource) {
        var resourceUrl =  'api/questionairs/:id';

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
