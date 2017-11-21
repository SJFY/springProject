(function() {
    'use strict';

    angular
        .module('hopefullyApp')
        .controller('CopyuserController', CopyuserController);

    CopyuserController.$inject = ['DataUtils', 'Copyuser', 'CopyuserSearch', 'Principal', 'Course', 'Comment'];

    function CopyuserController(DataUtils, Copyuser, CopyuserSearch, Principal, Course, Comment) {

        var vm = this;

        vm.courses = [];
        vm.copyusers = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        Principal.identity().then(function(account) {
            vm.account = account;
            vm.isAuthenticated = Principal.isAuthenticated;
            Copyuser.getbyuser().get({id:vm.account.id}, function (result) {
                vm.copyuser = result;
                vm.tmp = vm.copyuser.id;
                Comment.getbycu().query({id: vm.copyuser.id}, function (result) {
                    vm.cucomment = result;
                    vm.searchQuery = null;
                })
            })
        });

        function loadAll() {
            Course.getcourse().query(function(result) {
                vm.courses = result;
                vm.searchQuery = null;

            });



            // Copyuser.getcopyuser().query(function(result) {
            //     vm.copyusers = result;
            //     vm.searchQuery = null;
            //     vm.len = vm.account.login;
            //     for (var i = 0; i < vm.copyusers.length; i++) {
            //         if (vm.copyusers[i].user.login === vm.len) {
            //             vm.copyuser = vm.copyusers[i];
            //         }
            //     }
            //     if (vm.copyuser === null) {
            //         vm.added = false;
            //     }
            //     else {
            //         vm.added = true;
            //     }
            // });
            vm.tmp = vm.account;


        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            CopyuserSearch.query({query: vm.searchQuery}, function(result) {
                vm.copyusers = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
