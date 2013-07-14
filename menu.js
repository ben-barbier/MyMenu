
function MainCtrl($scope) {

  $scope.flatMenu = [
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

  $scope.formatMenu = function(flatMenu) {

    var menu = flatMenu;
    var menuWithDeep = computeDeep(menu);
    var menuWithoutDeepCharacters = removeDeepCharacters(menuWithDeep);
    var menuWithLinksInformations = findLinksInformations(menuWithoutDeepCharacters);
    var menuWithIsDeeperInformations = computeIfElementsAreDeeperThanPreviousElements(menuWithLinksInformations);
    var menuWithShallowInformations = computeShallowInformations(menuWithIsDeeperInformations);

    var htmlMenu = formatMenu(menuWithShallowInformations);

    return htmlMenu;

  };

  var formatMenu = function(menu) {
    var htmlMenu = "";

    htmlMenu += "<ul>";

    menu.forEach(function(elt) {
      if(elt.isDeeper) {
        htmlMenu += "<ul>";
      }
      for(var i=0;i<elt.shallow;i++) {
        htmlMenu += "</ul>";
      }
      if(elt.hasLink) {
        htmlMenu += "<li><a href=\"" + elt.linkURL + "\">" + elt.text + "</a></li>";
      } else {
        htmlMenu += "<li>" + elt.text + "</li>";
      }
    });

    htmlMenu += "</ul>";

    return htmlMenu;
  }

  var computeShallowInformations = function(menu) {
    var previousDeep = 0;
    menu.forEach(function(elt) {
      if (elt.isDeeper) {
        elt.shallow = 0;
      } else {
        elt.shallow = previousDeep - elt.deep;
      }
      previousDeep = elt.deep;
    });
    return menu;
  }

  var computeIfElementsAreDeeperThanPreviousElements = function(menu) {
    var previousDeep = 0;
    menu.forEach(function(elt) {
      elt.isDeeper = elt.deep > previousDeep;
      previousDeep = elt.deep;
    });
    return menu;
  }

  var findLinksInformations = function(menu) {
      menu.forEach(function(elt) {
          var parts = elt.text.split(" : ");
          if (parts.length == 2) {
              elt.text = parts[0];
              elt.linkURL = parts[1];
              elt.hasLink = true;
          } else {
              elt.hasLink = false;
          }
      });
      return menu;
  }

  var removeDeepCharacters = function(menuWithDeep) {
      menuWithDeep.forEach(function(elt) {
        if (elt.deep != 0) {
            elt.text = elt.text.substring(elt.deep + 1);
        }
      });
      return menuWithDeep;
  }

  var computeDeep = function(menu) {

      var menuWithDeep = new Array();

      menu.forEach(function(elt) {
        var entry = new Object();
        var deep = 0;
        for(var i=0;i<elt.length;i++) {
            if (elt[i]=="-"){
                deep++;
            } else {
                break;
            }
        }
        entry.deep = deep;
        entry.text = elt;
        menuWithDeep.push(entry);
    });

    return menuWithDeep;
  }

}