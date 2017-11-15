(function() {
    'use strict';

    angular
        .module('hopefullyApp')
        .controller('AllCoursesController', AllCoursesController);
    AllCoursesController.$inject = ['DataUtils', 'Course', 'CourseSearch', 'Pic'];
    function AllCoursesController(DataUtils, Course, CourseSearch, Pic) {

        var vm = this;

        vm.courses = [];
        vm.pics = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Course.getall().query(function(result) {
                vm.courses = result;
                vm.searchQuery = null;


                vm.idx = new Array(vm.courses[vm.courses.length - 1].id+1);
                for (var i = 0; i < vm.courses.length; i ++) {
                    vm.idx[vm.courses[i].id] = i;
                    vm.courses[i].picture = [];
                }

                Pic.getpic().query(function (result) {
                    vm.pics = result;
                    for(var i = 0; i < vm.pics.length; i ++) {
                        vm.courses[vm.idx[vm.pics[i].coursepic.id]].picture.push(vm.pics[i]);
                    }
                    vm.tmp = vm.courses[2].picture.length;
                   // vm.len = vm.courses[0].name;
                });



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
