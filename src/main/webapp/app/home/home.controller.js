(function() {
    'use strict';

    angular
        .module('hopefullyApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'Course', 'Pic'];

    function HomeController ($scope, Principal, LoginService, $state, Course, Pic) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();
        loadAll();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }
        function register () {
            $state.go('register');
        }
        function loadAll() {
            Course.getall().query(function(result) {
                vm.courses = result;
                vm.searchQuery = null;
                vm.len = vm.courses.length;

                vm.idx = new Array(vm.courses[vm.courses.length - 1].id+1);
                for (var i = 0; i < vm.courses.length; i ++) {
                    vm.idx[vm.courses[i].id] = i;
                    vm.courses[i].picture = [];
                    vm.courses[i].comment = [];

                }

                Pic.getpic().query(function (result) {
                    vm.pics = result;
                    for(var i = 0; i < vm.pics.length; i ++) {
                        vm.courses[vm.idx[vm.pics[i].coursepic.id]].picture.push(vm.pics[i]);
                    }
                     vm.tmp = vm.courses[0];

                    // vm.len = vm.courses[0].name;
                });
              //  vm.tmp = vm.courses[0].picture.length;

                // Comment.getcomment().query(function (result) {
                //     vm.comments = result;
                //     for (var i = 0; i < vm.comments.length; i ++) {
                //         vm.courses[vm.idx[vm.comments[i].targetcourse.id]].comment.push(vm.comments[i]);
                //     }
                //     //vm.courses[2].comment is an array
                //     vm.tmp = vm.courses[2].comment[0].review;
                // })



            });

        }
    }
})();
