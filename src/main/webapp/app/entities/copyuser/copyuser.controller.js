(function() {
    'use strict';

    angular
        .module('hopefullyApp')
        .controller('CopyuserController', CopyuserController);

    CopyuserController.$inject = ['DataUtils', 'Copyuser', 'CopyuserSearch', 'Principal'];

    function CopyuserController(DataUtils, Copyuser, CopyuserSearch, Principal) {

        var vm = this;

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
        });

        function loadAll() {
            Copyuser.query(function(result) {
                vm.copyusers = result;
                vm.searchQuery = null;
                vm.len = vm.account.login;
                for (var i = 0; i < vm.copyusers.length; i++) {
                    if (vm.copyusers[i].user.login === vm.len) {
                        vm.copyuser = vm.copyusers[i];
                    }
                }
                if (vm.copyuser === null) {
                    vm.added = false;
                }
                else {
                    vm.added = true;
                }
            });
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
