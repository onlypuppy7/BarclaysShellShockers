// ==UserScript==
// @name         Shell Shockers Model Injector: Barclay's
// @namespace    https://github.com/onlypuppy7/BarclaysShellShockers/
// @license      GPL-3.0
// @version      1.0.0
// @author       onlypuppy7
// @description  Import whatever model URLs you need - template and example code
// @match        https://shellshock.io/*
// @grant        none
// @run-at       document-start
// @icon         https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBVinVXDiU6RX7S3WI7Y8GfE5ajR3tUODdeQ&s
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js
// ==/UserScript==

//This script is based off LibertyMutual by onlypuppy7
//This script is more of a template than a functioning tool. If you're modifying this, you can add a GUI to start!

const objectModelURLs = [
    "https://cdn.onlypuppy7.online/eggtest.glb"
    //put model urls here. glb format ONLY.
    //add "prompt" to make it prompt.
    //put replacements for anything EXCEPT maps here (eg egg (hats), guns, etc)
];

const mapModelURLs = [
    //these models are loaded in a different sequence, currently only consisting of ["map"]
    //so to ensure the correct order, put any models that overwrite map models here
    //same format as objects.
];

(function () {
    // crackedshell is a script executor for chromebooks
    let crackedShell = typeof $WEBSOCKET !== 'undefined';

    let originalReplace = String.prototype.replace;

    String.prototype.originalReplace = function() {
        return originalReplace.apply(this, arguments);
    };

    //Credit for script injection code: AI. ChatGPT prompt: "tampermonkey script. how can i make it grab a javascript file as it's loaded. if it detects the javascript file, make it apply modifications to it via regex? using XMLHttpRequest"
    //Credit for idea to use XMLHttpRequest: A3+++
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRGetResponse = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, 'response');
    let shellshockjs
    XMLHttpRequest.prototype.open = function(...args) {
        const url = args[1];
        if (url && url.includes("js/shellshock.js")) {
            shellshockjs = this;
        };
        originalXHROpen.apply(this, args);
    };
    Object.defineProperty(XMLHttpRequest.prototype, 'response', {
        get: function() {
            if (this===shellshockjs) {
                return applyBarclays(originalXHRGetResponse.get.call(this));
            };
            return originalXHRGetResponse.get.call(this);
        }
    });
    //VAR STUFF
    let F=[];
    let H={};
    let functionNames=[];

    //scrambled... geddit????
    const getScrambled=function(){return Array.from({length: 10}, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('')}
    const createAnonFunction=function(name,func){
        const funcName=getScrambled();
        window[funcName]=func;
        F[name]=window[funcName];
        functionNames[name]=funcName
    };
    const findKeyWithProperty = function(obj, propertyToFind) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (key === propertyToFind) {
                    return [key];
                } else if (
                    typeof obj[key] === 'object' &&
                    obj[key] !== null &&
                    obj[key].hasOwnProperty(propertyToFind)
                ) {
                    return key;
                };
            };
        };
        // Property not found
        return null;
    };
    const fetchTextContent = function(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false); // Make the request synchronous
        xhr.send();
        if (xhr.status === 200) {
            return xhr.responseText;
        } else {
            console.error("Error fetching text content. Status:", xhr.status);
            return null;
        };
    };

    const applyBarclays = function(js) {
        // support crackedshell's harsh rewriting system
        // more info @ https://github.com/VillainsRule/CrackedShell
        let clientKeyJS = js;
        if (crackedShell) clientKeyJS = fetchTextContent('/js/shellshock.og.js');

        let hash = CryptoJS.SHA256(clientKeyJS).toString(CryptoJS.enc.Hex);
        let clientKeys;
        onlineClientKeys = fetchTextContent("https://raw.githubusercontent.com/StateFarmNetwork/client-keys/main/barclays_"+hash+".json"); //credit: me :D

        if (onlineClientKeys == "value_undefined" || onlineClientKeys == null) {
            let userInput = prompt('Valid keys could not be retrieved online. Enter keys if you have them. Join the SFNetwork Discord server to generate keys! https://discord.gg/HYJG3jXVJF', '');
            if (userInput !== null && userInput !== '') {
                alert('Aight, let\'s try this. If it is invalid, it will just crash.');
                clientKeys = JSON.parse(userInput);
            } else {
                alert('You did not enter anything, this is gonna crash lmao.');
            };
        } else {
            clientKeys = JSON.parse(onlineClientKeys);
        };

        H = clientKeys.vars;
        console.log(H);

        let injectionString="";
        
        const modifyJS = function(find,replace) {
            let oldJS = js;
            js = js.originalReplace(find,replace);
            if (oldJS !== js) {
                console.log("%cReplacement successful! Injected code: "+replace, 'color: green; font-weight: bold; font-size: 0.6em; text-decoration: italic;');
            } else {
                console.log("%cReplacement failed! Attempted to replace "+find+" with: "+replace, 'color: red; font-weight: bold; font-size: 0.6em; text-decoration: italic;');
            };
        };

        console.log('%cATTEMPTING TO START BARCLAYS', 'color: magenta; font-weight: bold; font-size: 1.5em; text-decoration: underline;');
        const variableNameRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/; //prevent adding spooky code
        for (let name in H) {
            deobf = H[name];
            if (variableNameRegex.test(deobf)) {
                injectionString = `${injectionString}${name}: (() => { try { return ${deobf}; } catch (error) { return "value_undefined"; } })(),`;
            } else {
                alert("Message from the Barclays Devs: WARNING! The keys inputted contain non-variable characters! There is a possibility that this could run code unintended by the Barclays team, although possibly there is also a mistake. Do NOT proceed with using this, and report to the Barclays developers what is printed in the console.");
                console.log("REPORT THIS IN THE DISCORD SERVER:", clientKeys);
                const crashplease = "balls";
                crashplease = "balls2";
            };
        };
        console.log(injectionString);

        //adding ours to the list
        let regex = `${H.loadMeshes}\\\([a-zA-Z$_,]+\\\)\\\{`;
        let match = new RegExp(regex).exec(js);
        console.log("loadMeshes regex", regex, match);
        modifyJS(match[0],match[0]+`window["${functionNames.BARCLAYS}"](arguments);`);
        //setting it to "" where it applies
        modifyJS(`addTask\(\);!`,`addTask\(\);[${H.rootUrl},${H.meshPath}]=window["${functionNames.setRootUrl}"](${H.rootUrl}, ${H.meshIdx}, ${H.meshPath}, arguments);console.log([${H.rootUrl},${H.meshPath}]);!`);

        modifyJS("Not playing in iframe", "BARCLAYS ACTIVE!");
        // console.log(js);
        return js;
    };

    createAnonFunction("retrieveFunctions",function(vars) { ss=vars ; F.BARCLAYS() });

    let meshNames = [];

    createAnonFunction("BARCLAYS", function(args) {
        meshNames = args[1];
        window.globalArgs = args;

        function addMesh(meshName, array) {
            // meshName = meshName.includes(".") ? meshName.substring(0, meshName.lastIndexOf(".")) : meshName;
            array.unshift(meshName);
        };
        
        if (meshNames.includes("map")) {
            mapModelURLs.forEach(item => addMesh(item, meshNames));
        } else {
            objectModelURLs.forEach(item => addMesh(item, meshNames));
        };

        console.log("BARCLAYS: BARCLAYS", meshNames);
    });

    createAnonFunction("setRootUrl", function(rootUrl, meshIdx, meshPath, args) {
        let meshName = meshNames[meshIdx];

        if (meshName.includes("://")) rootUrl = "";

        function removeGLBExtension(fileName) {
            const regex = /(\.[a-z0-9]+)\.glb(\?.*)?$/i;
            return fileName.replace(regex, '$1$2');
        };

        meshPath = removeGLBExtension(meshPath);

        console.log("BARCLAYS: setRootUrl", rootUrl, meshIdx, meshPath, meshName);
        
        return [rootUrl, meshPath];
    });
})();