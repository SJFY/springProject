(function() {
    'use strict';

    angular
        .module('hopefullyApp')
        .controller('AllCoursesController', AllCoursesController);
    AllCoursesController.$inject = ['$scope', 'DataUtils', 'Course', 'CourseSearch', 'Pic', 'Principal', 'Copyuser', 'Comment'];
    function AllCoursesController($scope, DataUtils, Course, CourseSearch, Pic, Principal, Copyuser, Comment) {

        var vm = this;

        vm.courses = [];
        vm.pics = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;
        vm.clear = clear;
        vm.search = search;
     //   vm.select = select;
        vm.loadAll = loadAll;
        vm.filttext = {};
      //  vm.filttext.category = "Fitness";

        loadAll();

        Principal.identity().then(function(account) {
            vm.account = account;
            vm.tmp = vm.account;
            vm.isAuthenticated = Principal.isAuthenticated;
            Copyuser.getbyuser().get({id:vm.account.id}, function (result) {
                vm.copyuser = result;

            })
        });

        // function select (setTab) {
        //     if (setTab === 2) {
        //         vm.tmp = "Fitness";
        //     }
        //     if (setTab === 3) {
        //         vm.filttext.category = "Music";
        //     }
        //     if (setTab === 4) {
        //         vm.filttext.category = "Language";
        //     }
        //     if (setTab === 5) {
        //         vm.filttext.category = "IT";
        //     }
        //     if (setTab === 6) {
        //         vm.filttext.category = "Academic";
        //     }
        //     if (setTab === 7) {
        //         vm.filttext.category = "Lifestyle";
        //     }
        //     else {
        //         vm.filttext.category = "";
        //     }
        //    // vm.tmp = vm.filttext.category;
        // };

        // $scope.select = function(setTab) {
        //     if (setTab === 2) {
        //         vm.filttext.category = "Fitness";
        //     }
        //     if (setTab === 3) {
        //         vm.filttext.category = "Music";
        //     }
        //     if (setTab === 4) {
        //         vm.filttext.category = "Language";
        //     }
        //     if (setTab === 5) {
        //         vm.filttext.category = "IT";
        //     }
        //     if (setTab === 6) {
        //         vm.filttext.category = "Academic";
        //     }
        //     if (setTab === 7) {
        //         vm.filttext.category = "Lifestyle";
        //     }
        //     else {
        //         vm.filttext.category = "";
        //     }
        // };

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
                   // vm.tmp = vm.courses[1].picture.length;
                   // vm.len = vm.courses[0].name;
                });

                Comment.getcomment().query(function (result) {
                    vm.comments = result;
                    for (var i = 0; i < vm.comments.length; i ++) {
                        vm.courses[vm.idx[vm.comments[i].targetcourse.id]].comment.push(vm.comments[i]);
                    }
                    //vm.courses[2].comment is an array
                   // vm.tmp = vm.courses[2].comment[0].review;
                })



            });

        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            CourseSearch.query({query: vm.searchQuery}, function(result) {
                vm.courses = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }
    }
})();
