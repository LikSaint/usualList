'use string'

var purchaseApp = angular.module('purchaseApp', ['ngAnimate', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);
purchaseApp.controller('purchaseController', function ($scope, $uibModal, $log) {
    $scope.list = {
        items: [
            {name: "Создать элемент", date: new Date(2011,11,12), comment: 'Нужно создать элемент', creater: 'Ольга' },
            {name: "Дать ему имя", date:  new Date(2011,10,12), comment: 'Нужно дать ему имя', creater: 'Игорь' },
            {name: "Переименовать", date:  new Date(2011,11,12), comment: 'Нужно переименовать элемент', creater: 'Олег' },
            {name: "Удалить", date: new Date(2011,11,10), comment: 'Нужно удалить элемент', creater: 'Света' }
        ]
    };
    $scope.animationsEnabled = true;
    $scope.delete = function (item) {
        $scope.list.items.remove(item);
    }
    $scope.open = function (currentItem) {

        $scope.currentItem = currentItem;

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: "",
            scope: $scope,
            resolve: {
            }
        });

        modalInstance.result.then(function (items) {
            if (!$scope.currentItem) {
                $scope.list.items.push({
                    name: items.name,
                    date: items.date,
                    comment: items.comment,
                    creater: items.creater
                });
            } else {
                $scope.currentItem.name = items.name;
                $scope.currentItem.comment = items.comment;
                $scope.currentItem.date = items.date;
                $scope.currentItem.creater = items.creater;
            }

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.sortField = undefined;
    $scope.reverse = false;

    $scope.sort = function (fieldName) {
        if ($scope.sortField === fieldName) {
            $scope.reverse = !$scope.reverse;
        } else {
            $scope.sortField = fieldName;
            $scope.reverse = false;
        }
    };

    $scope.isSortUp = function (fieldName) {
        return $scope.sortField === fieldName && !$scope.reverse;
    };
    $scope.isSortDown = function (fieldName) {
        return $scope.sortField === fieldName && $scope.reverse;
    };

});

angular.module('purchaseApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {
    if ($scope.currentItem) {
        $scope.date = $scope.currentItem.date;
        $scope.comment = $scope.currentItem.comment;
        $scope.name = $scope.currentItem.name;
        $scope.creater = $scope.currentItem.creater;
    } else{
        $scope.date = new Date();
    }
    $scope.addItem = function () {
        $uibModalInstance.close($scope);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
//Добавим метод remove, для удобного удаления элемента в массиве.
Array.prototype.remove = function(value) {
    var idx = this.indexOf(value);
    if (idx != -1) {
        return this.splice(idx, 1);
    }
    return false;
};
/* Директивы на проверку валидации полей больше не нужны. Удалить жалко =)
purchaseApp.directive('commentcheck', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (comment) {
                if (comment && !(/[^[/|,|!|?|;|:|"|'|\w|\s|\n|[а-я]|[0-9]]]*!/ig.test(comment)) && comment.length < 512) {
                    ctrl.$setValidity('commentcheck', true);
                    return comment;
                } else {
                    ctrl.$setValidity('commentcheck', false);
                    return undefined;
                }
            });
        }
    };
});
purchaseApp.directive('moneycheck', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (money) {
                if (/-?[1-9]+.?[1-9]{0,2}/.test(money) && (money < 1000 && money > -1000 && money != 0)) {
                    ctrl.$setValidity('moneycheck', true);
                    return money;
                } else {
                    ctrl.$setValidity('moneycheck', false);
                    return undefined;
                }
            });
        }
    };
});
*/

