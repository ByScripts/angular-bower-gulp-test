(function() {
  angular.module('chat', ['ipCookie', 'firebase']).config([
    '$locationProvider', function($locationProvider) {
      return $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
    }
  ]).run([
    '$rootScope', 'ipCookie', '$firebase', '$location', function($rootScope, ipCookie, $firebase, $location) {
      var roomId;
      roomId = $location.search().roomId;
      if (!roomId || !roomId.match(/[a-z0-9]+/)) {
        return;
      }
      $rootScope.roomId = roomId;
      $rootScope.messages = $firebase(new Firebase('https://spiky.firebaseio.com/messages/' + $location.search().roomId)).$asArray();
      return $rootScope.nickname = ipCookie('nickname');
    }
  ]).directive('byMessages', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/messages.html',
      controller: [
        '$rootScope', '$scope', 'ipCookie', function($rootScope, $scope, ipCookie) {
          this.setNickname = function(nickname) {
            $rootScope.nickname = nickname;
            return ipCookie('nickname', nickname, {
              expires: 30
            });
          };
          this.addMessage = function(content, nickname) {
            return $rootScope.messages.$add({
              content: content,
              nickname: nickname,
              createdAt: new Date().toISOString()
            });
          };
          return $scope.newNickname = $rootScope.nickname;
        }
      ],
      link: function(scope, element, attributes, controller) {
        scope.showHelp = false;
        scope.setNickname = function(nickname) {
          return controller.setNickname(nickname);
        };
        return scope.addMessage = function(content, nickname) {
          if (!nickname) {
            return alert('Veuillez entrer un nom d\'utilisateur');
          }
          controller.addMessage(content, nickname);
          return scope.newMessage = '';
        };
      }
    };
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,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TyxLQUFBLENBQU0sdUNBQU4sQ0FBUCxDQUFBO1dBQUE7QUFBQSxVQUNBLFVBQVUsQ0FBQyxVQUFYLENBQXNCLE9BQXRCLEVBQStCLFFBQS9CLENBREEsQ0FBQTtpQkFFQSxLQUFLLENBQUMsVUFBTixHQUFtQixHQUhGO1FBQUEsRUFQZjtNQUFBLENBaEJOO01BRHVCO0VBQUEsQ0FiekIsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhclxuLm1vZHVsZSAnY2hhdCcsIFsnaXBDb29raWUnLCAnZmlyZWJhc2UnXVxuLmNvbmZpZyBbJyRsb2NhdGlvblByb3ZpZGVyJywgKCRsb2NhdGlvblByb3ZpZGVyKSAtPlxuICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUgZW5hYmxlZDogdHJ1ZSwgcmVxdWlyZUJhc2U6IGZhbHNlXG5dXG4ucnVuIFsnJHJvb3RTY29wZScsICdpcENvb2tpZScsICckZmlyZWJhc2UnLCAnJGxvY2F0aW9uJywgKCRyb290U2NvcGUsIGlwQ29va2llLCAkZmlyZWJhc2UsICRsb2NhdGlvbikgLT5cbiAgcm9vbUlkID0gJGxvY2F0aW9uLnNlYXJjaCgpLnJvb21JZFxuICByZXR1cm4gaWYgIXJvb21JZCB8fCAhcm9vbUlkLm1hdGNoIC9bYS16MC05XSsvXG5cbiAgJHJvb3RTY29wZS5yb29tSWQgPSAgcm9vbUlkXG4gICRyb290U2NvcGUubWVzc2FnZXMgPSAkZmlyZWJhc2UobmV3IEZpcmViYXNlICdodHRwczovL3NwaWt5LmZpcmViYXNlaW8uY29tL21lc3NhZ2VzLycgKyAkbG9jYXRpb24uc2VhcmNoKCkucm9vbUlkKS4kYXNBcnJheSgpXG4gICRyb290U2NvcGUubmlja25hbWUgPSBpcENvb2tpZSAnbmlja25hbWUnXG5dXG4uZGlyZWN0aXZlICdieU1lc3NhZ2VzJywgLT5cbiAgcmVzdHJpY3Q6ICdFJ1xuICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9tZXNzYWdlcy5odG1sJ1xuICBjb250cm9sbGVyOiBbJyRyb290U2NvcGUnLCAnJHNjb3BlJywgJ2lwQ29va2llJywgKCRyb290U2NvcGUsICRzY29wZSwgaXBDb29raWUpLT5cbiAgICB0aGlzLnNldE5pY2tuYW1lID0gKG5pY2tuYW1lKSAtPlxuICAgICAgJHJvb3RTY29wZS5uaWNrbmFtZSA9IG5pY2tuYW1lXG4gICAgICBpcENvb2tpZSgnbmlja25hbWUnLCBuaWNrbmFtZSwgZXhwaXJlczogMzApXG5cbiAgICB0aGlzLmFkZE1lc3NhZ2UgPSAoY29udGVudCwgbmlja25hbWUpIC0+XG4gICAgICAkcm9vdFNjb3BlLm1lc3NhZ2VzLiRhZGQge1xuICAgICAgICBjb250ZW50OiBjb250ZW50XG4gICAgICAgIG5pY2tuYW1lOiBuaWNrbmFtZVxuICAgICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuICAgICAgfVxuXG4gICAgJHNjb3BlLm5ld05pY2tuYW1lID0gJHJvb3RTY29wZS5uaWNrbmFtZVxuICBdLFxuICBsaW5rOiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJpYnV0ZXMsIGNvbnRyb2xsZXIpLT5cblxuICAgIHNjb3BlLnNob3dIZWxwID0gZmFsc2VcblxuICAgIHNjb3BlLnNldE5pY2tuYW1lID0gKG5pY2tuYW1lKSAtPlxuICAgICAgY29udHJvbGxlci5zZXROaWNrbmFtZSBuaWNrbmFtZVxuXG4gICAgc2NvcGUuYWRkTWVzc2FnZSA9IChjb250ZW50LCBuaWNrbmFtZSkgLT5cbiAgICAgIHJldHVybiBhbGVydCAnVmV1aWxsZXogZW50cmVyIHVuIG5vbSBkXFwndXRpbGlzYXRldXInIGlmICFuaWNrbmFtZVxuICAgICAgY29udHJvbGxlci5hZGRNZXNzYWdlIGNvbnRlbnQsIG5pY2tuYW1lXG4gICAgICBzY29wZS5uZXdNZXNzYWdlID0gJyciXX0=