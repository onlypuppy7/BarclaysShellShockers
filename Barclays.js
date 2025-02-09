// ==UserScript==
// @name         Shell Shockers Model Injector: Barclay's
// @namespace    https://github.com/onlypuppy7/BarclaysShellShockers/
// @license      GPL-3.0
// @version      2.0.0
// @author       onlypuppy7
// @description  Import whatever model URLs you need - template and example code
// @match        https://shellshock.io/*
// @grant        none
// @run-at       document-start
// @icon         https://github.com/onlypuppy7/BarclaysShellShockers/blob/main/logo.png?raw=true

// @downloadURL  https://update.greasyfork.org/scripts/526219/user.js
// @updateURL    https://update.greasyfork.org/scripts/526219/meta.js

// @require      https://update.greasyfork.org/scripts/526336/1534125/Barclay%27s%20Library.js
// ==/UserScript==

//this script is a template for using the Barclays library to import models into Shell Shockers

BARCLAYS.modelURLs = [
    //put model urls here. glb format ONLY.
    //please refer to the library's documentation for more information

    //examples:
    // "https://cdn.onlypuppy7.online/hattestWide2.glb", //makes the top hat WIDE
    // "https://cdn.onlypuppy7.online/guntest3.glb", //replaces crackshot with legacy crackshot
    // "https://cdn.onlypuppy7.online/blendertest7.glb", //replaces castle brick with the blender default cube because why not (screws up lightmap)
    "https://cdn.onlypuppy7.online/eggmodeltest.glb", //

    // "/models/full/egg.glb", //replaces the replaced egg with the default egg, useful for reverting changes
];

//as this script has no injection mechanism, we use the library's built in one
BARCLAYS.init();

//just to make it obvious
BARCLAYS.log("Script started.");

//if at a stage you would like to make more model changes, you can run code like this:
/* //(uncomment to use)
BARCLAYS.replaceModels([
    "https://link.to/your/model.glb",
]);
*/

//if you need to restore the original models, you can run this:
// BARCLAYS.restoreModels();
//note: dont run this over and over again, it will cause performance issues

//uncomment to expose the BARCLAYS object to the console/window
// window.BARCLAYS = BARCLAYS;