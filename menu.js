
function MainCtrl($scope) {

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

  $scope.formatMenu = function(menu) {

    var result = "";
    var previousDeep = 0;

    result += "<ul>";
    for(var i=0;i<menu.length;i++) {
      deep = computeDeep(menu[i]);
      if (deep>previousDeep) {result += "<ul>";}
      if (deep<previousDeep) {result += "</ul>";}
      result += formatMenuElement(menu[i], deep);
      previousDeep = deep;
    }
    result += "</ul>";

    return result;
  };

  var computeDeep = function(elt) {
  	var deep = 0;
  	for(var i=0;i<elt.length;i++) {
      if (elt[i]=="-"){
      	deep++;
      } else {
      	break;
      }
  	}
  	return deep;
  }

  var formatMenuElement = function(menuElement, deep) {

    var parts = menuElement.split(" : ");
    var title = parts[0];
    var elt = "";

    title = formatTitle(title);

    elt += "<li>";
    if (parts.length == 1) {
      elt += title;
    }
    if (parts.length == 2) {
      var url = parts[1];
      elt += "<a href=\"" + url + "\">" + title + "</a>";
    }
    elt += "</li>";
    return elt;
  }

  var formatTitle = function(title) {
    for(var i=0;i<title.length;i++) {
      if (title[i] == "-" || title[i] == " ") {
      	title = title.slice(1);
      }
    }
  	return title;
  }

}