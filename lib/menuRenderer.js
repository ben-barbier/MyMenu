var Entry = function(text) {
    this.text = text;
    this.displayedText = function() {
        var displayedText = text;
        if (this.getDeep() != 0) {
            displayedText = this.text.substring(this.getDeep() + 1);
        }
        if (this.hasLink()) {
            displayedText = displayedText.split(" : ")[0];
        }
        return displayedText;
    };
    this.isFolder = function() {
        return !this.hasLink() && !this.isDivider();
    };
    this.hasLink = function() {
        return this.text.indexOf(" : ") > -1;
    };
    this.isDivider = function() {
        return this.text.indexOf("DIVIDER") > -1;
    };
    this.getDeep = function() {
        var deep = 0;
        for (var i = 0; i < this.text.length; i++) {
            if (this.text[i] == "-") {
                deep++;
            } else {
                break;
            }
        }
        return deep;
    };
    this.shallow = 0;
    this.linkURL = function() {
        if (this.hasLink()) {
            return this.text.split(" : ")[1];
        }
    };
}

var displayMenu = function (flatMenu) {

    var menu = convertFlatMenuToArrayOfEntries(flatMenu);
    computeShallowInformations(menu);
    var htmlMenu = formatMenu(menu);
    return htmlMenu;

};

var convertFlatMenuToArrayOfEntries = function(flatMenu) {

    var menu = new Array();
    flatMenu.forEach(function (elt) {
        var entry = new Entry(elt);
        menu.push(entry);
    });
    return menu;

}

var computeShallowInformations = function (menu) {

    var previousDeep = 0;
    menu.forEach(function (entry) {
        entry.shallow = previousDeep - entry.getDeep();
        previousDeep = entry.getDeep();
    });

}

var formatMenu = function (menu) {
    var htmlMenu = "";

    htmlMenu += '<ul class="nav">';

    menu.forEach(function (entry) {

        for (var i = 0; i < entry.shallow; i++) {
            htmlMenu += "</ul></li>";
        }

        if (entry.isFolder() && entry.getDeep() == 0) {
            htmlMenu += '<li class="dropdown">';
            htmlMenu += '<a href="#" class="dropdown-toggle" data-toggle="dropdown">' + entry.displayedText() + ' <b class="caret"></b></a>';
            htmlMenu += '<ul class="dropdown-menu">';
        }

        if (entry.isFolder() && entry.getDeep() > 0) {
            htmlMenu += '<li class="dropdown-submenu">';
            htmlMenu += '<a tabindex="-1" href="#">' + entry.displayedText() + '</a>';
            htmlMenu += '<ul class="dropdown-menu">';
        }

        if (entry.hasLink()) {
            htmlMenu += '<li>' 
            + '<img style="margin-left: 10px;" src="http://www.google.com/s2/favicons?domain=' + entry.linkURL()+ '" />'
            + '<a href="' + entry.linkURL() + '" target="_blank">' + entry.displayedText() + '</a></li>';
        }

        if (entry.isDivider()) {
            htmlMenu += '<li class="divider"></li>';
        }

    });

    htmlMenu += "</ul>";

    return htmlMenu;
}
