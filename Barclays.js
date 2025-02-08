// ==UserScript==
// @name         Shell Shockers Model Injector: Barclay's
// @namespace    https://github.com/onlypuppy7/BarclaysShellShockers/
// @license      GPL-3.0
// @version      1.1.0
// @author       onlypuppy7
// @description  Import whatever model URLs you need - template and example code
// @match        https://shellshock.io/*
// @grant        none
// @run-at       document-start
// @icon         https://github.com/onlypuppy7/BarclaysShellShockers/blob/main/logo.png?raw=true
// ==/UserScript==

//This script is based off LibertyMutual by onlypuppy7
//This script is more of a template than a functioning tool. If you're modifying this, you can add a GUI to start!


const modelURLs = [
    //put model urls here. glb format ONLY.
    //put replacements for any model

    //examples:
    "https://cdn.onlypuppy7.online/blendertest3.glb", //makes the top hat WIDE
    "https://cdn.onlypuppy7.online/guntest3.glb", //replaces crackshot with legacy crackshot
];

const BARCLAYS = {
    modelURLs: [],
    log: function (...args) { //yeah, i got inspired. what about it?
        console.log(
            "%c%s",
            `color: white; font-weight: bold; background:rgb(0, 85, 128); padding: 2px 6px; border-radius: 5px; margin-right: 5px;`,
            `Barclay's`,
            ...args
        );
    },
    init: function () { //setup the script injection. separated out to enable users to put the injection code into their own scripts with different loading mechanisms.
        let originalReplace = String.prototype.replace;
    
        String.prototype.originalReplace = function() {
            return originalReplace.apply(this, arguments);
        };

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
                    BARCLAYS.log("shellshock.js intercepted");
                    return BARCLAYS.applyBarclays(originalXHRGetResponse.get.call(this));
                };
                return originalXHRGetResponse.get.call(this);
            }
        });
    },
    applyBarclays: function (js) {
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
        
        const fetchTextContent = function(url) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false); // make the request synchronous
            xhr.send();
            if (xhr.status === 200) {
                return xhr.responseText;
            } else {
                console.error("Error fetching text content. Status:", xhr.status);
                return null;
            };
        };
    
        createAnonFunction("BARCLAYS", function(ss) {
            BARCLAYS.log("BARCLAYS ACTIVE!");
            window.globalBarclays = ss;
    
            function replaceMesh(sourceMesh, targetMesh) {
                if (sourceMesh && targetMesh) {
                    const vertexData = ss.VertexData.ExtractFromMesh(sourceMesh);
            
                    vertexData.applyToMesh(targetMesh);
            
                    BARCLAYS.log("Mesh geometry replaced successfully!", sourceMesh.id);
                } else {
                    console.error("One of the meshes was not found!");
                };
            };
            
            modelURLs.forEach(function(url) {
                ss.SceneLoader.ImportMesh(
                    "", // Empty string imports all meshes
                    "", // Empty root URL uses the path provided
                    url, // Path to GLB file
                    undefined, // Scene to import into
                    function (meshes) {
                        BARCLAYS.log("Meshes loaded:", meshes.map(mesh => mesh.id));
                        // Manipulate meshes if needed
                        for (var m = 0; m < meshes.length; m++) {
                            var mesh2 = meshes[m];
                            mesh2.setEnabled(false);
                            mesh2.isPickable = false;
                
                            let meshInGlobalScene = ss.globalScene.getMeshByID(mesh2.id);
                
                            if (meshInGlobalScene) {
                                replaceMesh(mesh2, meshInGlobalScene);
                            };
                        };
                    }
                );
            });
        });

        let clientKeys;
        onlineClientKeys = fetchTextContent("https://raw.githubusercontent.com/StateFarmNetwork/client-keys/main/barclays_latest.json"); //credit: me :D

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
        BARCLAYS.log(H);

        let injectionString="";
        
        const modifyJS = function(find,replace) {
            let oldJS = js;
            js = js.originalReplace(find,replace);
            if (oldJS !== js) {
                BARCLAYS.log("%cReplacement successful! Injected code: "+replace, 'color: green; font-weight: bold; font-size: 0.6em; text-decoration: italic;');
            } else {
                BARCLAYS.log("%cReplacement failed! Attempted to replace "+find+" with: "+replace, 'color: red; font-weight: bold; font-size: 0.6em; text-decoration: italic;');
            };
        };

        BARCLAYS.log('%cATTEMPTING TO START BARCLAYS', 'color: magenta; font-weight: bold; font-size: 1.5em; text-decoration: underline;');
        const variableNameRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/; //prevent adding spooky code
        for (let name in H) {
            deobf = H[name];
            if (variableNameRegex.test(deobf)) {
                injectionString = `${injectionString}${name}: (() => { try { return ${deobf}; } catch (error) { return "value_undefined"; } })(),`;
            } else {
                alert("Message from the Barclays Devs: WARNING! The keys inputted contain non-variable characters! There is a possibility that this could run code unintended by the Barclays team, although possibly there is also a mistake. Do NOT proceed with using this, and report to the Barclays developers what is printed in the console.");
                BARCLAYS.log("REPORT THIS IN THE DISCORD SERVER:", clientKeys);
                const crashplease = "balls";
                crashplease = "balls2";
            };
        };
        BARCLAYS.log("Barclay's injectionString:", injectionString);

        modifyJS(`"object meshes loaded"),`, `"object meshes loaded"),window["${functionNames.BARCLAYS}"]({${injectionString}}),`);

        // BARCLAYS.log(js);
        return js;
    },
};

BARCLAYS.modelURLs = modelURLs;
BARCLAYS.init();