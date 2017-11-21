(function() {
    'use strict';

    angular
        .module('hopefullyApp')
        .controller('CourseDetailReadController', CourseDetailReadController);

    CourseDetailReadController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'pics', 'comments', 'Comment','Pic', 'Course', 'Copyuser', 'User'];

    function CourseDetailReadController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, pics, comments, Comment, Pic, Course, Copyuser, User) {
        var vm = this;

        vm.course = entity;
        vm.picture = pics;
        vm.coms = comments;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('hopefullyApp:courseUpdate', function(event, result) {
            vm.course = result;
            vm.picture = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
