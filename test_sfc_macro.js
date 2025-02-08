//uh oh! uses spooky script.

function replaceMesh(sourceMesh, targetMesh) {
    if (sourceMesh && targetMesh) {
        const vertexData = globalSS.L.BABYLON.VertexData.ExtractFromMesh(sourceMesh);

        vertexData.applyToMesh(targetMesh);

        console.log("Mesh geometry replaced successfully!", sourceMesh.id);
    } else {
        console.error("One of the meshes was not found!");
    };
};

globalSS.L.BABYLON.SceneLoader.ImportMesh(
    "", // Empty string imports all meshes
    "", // Empty root URL uses the path provided
    "https://cdn.onlypuppy7.online/blendertest3.glb", // Path to GLB file
    undefined, // Scene to import into
    function (meshes) {
        console.log("Meshes loaded:", meshes);
        // Manipulate meshes if needed
        for (var m = 0; m < meshes.length; m++) {
            var mesh2 = meshes[m];
            mesh2.setEnabled(false);
            mesh2.isPickable = false;

            let meshInGlobalScene = globalSS.ss.globalScene.getMeshByID(mesh2.id);

            if (meshInGlobalScene) {
                replaceMesh(mesh2, meshInGlobalScene);
            };
        };
    }
);