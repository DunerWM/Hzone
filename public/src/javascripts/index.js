var globalM = angular.module("myapp", []);
globalM.controller('stateFormCtrl', function ($scope, $http) {
    $scope.state = {
        content: null
    };
    $scope.stateSubmit = function () {
        $http({
            method: 'post',
            url: '/state/send',
            data: $scope.state,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
            if (data.success) {
                console.log(data);
            } else {
                console.log(data.message);
            }
        });
    };
});
globalM.directive('stateEmotions', function () {
    return {
        restrict: 'A',
        templateUrl: '/template/emotions',
        link: function (scope, element, attrs) {
            emojify.setConfig({
                only_crawl_id: null,            // 限制哪些id使用emoji
                img_dir: 'build/images/emoji',  // emoji图片目录
                ignored_tags: {                // 忽略以下元素，1为忽略，null为不忽略
                    'SCRIPT': 1,
                    'TEXTAREA': 1,
                    'A': 1,
                    'PRE': 1,
                    'CODE': 1
                }
            });
            emojify.run();
            element.find('img').bind('click', function() {
                textareaInput(this.title);
            });
            element.find('a').bind('click', function() {
                var tabs = document.querySelectorAll(".emotions-bar a");
               for(var i = 0; i < tabs.length; i++) {
                   tabs[i].classList.remove("current");
               }
                this.classList.add("current");
                changeTab(this.getAttribute("data-for"));
            });
        }
    };
});

function getCursortPosition (ctrl) {//获取光标位置函数
    var CaretPos = 0;	// IE Support
    if (document.selection) {
        ctrl.focus ();
        var Sel = document.selection.createRange ();
        Sel.moveStart ('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    }
    else if (ctrl.selectionStart || ctrl.selectionStart == '0'){
        CaretPos = ctrl.selectionStart;
    }
    return (CaretPos);
}

function setCaretPosition(ctrl, pos){//设置光标位置函数
    if(ctrl.setSelectionRange)
    {
        ctrl.focus();
        ctrl.setSelectionRange(pos,pos);
    }
    else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

function textareaInput(str) {
    var textareaObj = document.querySelector('#postStates');
    var cursorPosition = getCursortPosition(textareaObj);
    var textareaValue = textareaObj.value || '';
    var _textareaValue = "";
    var _cursorPosition;
    if(cursorPosition == textareaValue.length) {
        _textareaValue = textareaValue + str;
        _cursorPosition = _textareaValue.length;
    }else{
        var textareaFront = textareaValue.substring(0,cursorPosition);
        var textareaEnd = textareaValue.substring(cursorPosition);
        _textareaValue = textareaFront + str + textareaEnd;
        _cursorPosition = cursorPosition + str.length;
    }
    textareaObj.value = _textareaValue;
    setCaretPosition(textareaObj, _cursorPosition);
}

function changeTab(_id) {
    console.log(_id);
    var emotionsLists = document.querySelectorAll(".emotions-list");
    for(var i = 0; i < emotionsLists.length; i++) {
        emotionsLists[i].style.display = "none";
    }
    document.querySelector("#"+_id).style.display = "block";
}