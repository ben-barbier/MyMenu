angular.module('MyMenu', [])
    .filter('formatMenuElement', function () {
        return function (text) {

          var parts = text.split(" : ");
          var title = parts[0];
          var elt = "";

          if (parts.length == 1) {
            elt += title;
          }
          if (parts.length == 2) {
            var url = parts[1];
            elt += "<a href=\"" + url + "\">" + title + "</a>";
          }
          
          return elt;
        };
    });

function MainCtrl($scope) {

  $scope.deep = 0;
  $scope.menu = [
    "Applications",
    "- Integration",
    "-- Application 1 : #application1-int",
    "-- Application 2 : #application2-int",
    "- Pre-Production",
    "-- Application 1 : #application1-preprod",
    "-- Application 2 : #application2-preprod",
    "- Production",
    "-- Application 1 : #application1-prod",
    "-- Application 2 : #application2-prod",
    "Tools",
    "- Tool 1 : #tool1",
    "- Tool 2 : #tool2",
    "- Tool 3 : #tool3",
    "- Tool 4 : #tool4",
    "Folders",
    "- Folder 1 : #folder1",
    "- Folder 2 : #folder2"
  ];

}