function MainCtrl($scope) {

  $scope.menu = [
    {"title" : "Applications", "menu" : [
      {"title" : "Integration", "menu" : [
        {"title" : "Application 1", "link" : "#application1-int"},
        {"title" : "Application 2", "link" : "#application2-int"}
      ]},
      {"title" : "Pre-Production", "menu" : [
        {"title" : "Application 1", "link" : "#application1-preprod"},
        {"title" : "Application 2", "link" : "#application2-preprod"}
      ]},
      {"title" : "Production", "menu" : [
        {"title" : "Application 1", "link" : "#application1-prod"},
        {"title" : "Application 2", "link" : "#application2-prod"}
      ]}
    ]},
    {"title" : "Tools", "menu" : [
      {"title" : "Tool 1", "link" : "#tool1"},
      {"title" : "Tool 2", "link" : "#tool2"},
      {"title" : "Tool 3", "link" : "#tool3"},
      {"title" : "Tool 4", "link" : "#tool4"}
    ]},
    {"title" : "Folders", "menu" : [
      {"title" : "Folder 1", "link" : "#folder1"},
      {"title" : "Folder 2", "link" : "#folder2"}
    ]}
  ];

}