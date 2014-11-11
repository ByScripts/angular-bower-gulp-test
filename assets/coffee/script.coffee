angular
.module 'chat', ['ipCookie', 'firebase']
.config ['$locationProvider', ($locationProvider) ->
  $locationProvider.html5Mode enabled: true, requireBase: false
]
.run ['$rootScope', 'ipCookie', '$firebase', '$location', ($rootScope, ipCookie, $firebase, $location) ->
  roomId = $location.search().roomId
  return if !roomId || !roomId.match /[a-z0-9]+/

  $rootScope.roomId =  roomId
  $rootScope.messages = $firebase(new Firebase 'https://spiky.firebaseio.com/messages/' + $location.search().roomId).$asArray()
  $rootScope.nickname = ipCookie 'nickname'
]
.directive 'byMessages', ->
  restrict: 'E'
  templateUrl: 'templates/messages.html'
  controller: ['$rootScope', '$scope', 'ipCookie', ($rootScope, $scope, ipCookie)->
    this.setNickname = (nickname) ->
      $rootScope.nickname = nickname
      ipCookie('nickname', nickname, expires: 30)

    this.addMessage = (content, nickname) ->
      $rootScope.messages.$add {
        content: content
        nickname: nickname
        createdAt: new Date().toISOString()
      }

    $scope.newNickname = $rootScope.nickname
  ],
  link: (scope, element, attributes, controller)->

    scope.showHelp = false

    scope.setNickname = (nickname) ->
      controller.setNickname nickname

    scope.addMessage = (content, nickname) ->
      return alert 'Veuillez entrer un nom d\'utilisateur' if !nickname
      controller.addMessage content, nickname
      scope.newMessage = ''