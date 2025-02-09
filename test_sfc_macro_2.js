BARCLAYS.ss.SceneLoader.ImportMesh(
    "", // Empty string imports all meshes
    "", // Empty root URL uses the path provided
    "https://cdn.onlypuppy7.online/eggmodeltest2.glb", // Path to GLB file
    BARCLAYS.ss.itemRenderer.scene, // Scene to import into
    function (meshes) {
        console.log("Meshes loaded:", meshes);
        // Manipulate meshes if needed
        for (var m = 0; m < meshes.length; m++) {
            var mesh2 = meshes[m];


            function replaceMesh(sourceMesh, targetMesh) {
                if (sourceMesh && targetMesh) {
                    const vertexData = BARCLAYS.ss.VertexData.ExtractFromMesh(sourceMesh);

                    vertexData.applyToMesh(targetMesh);

                    BARCLAYS.log("Mesh geometry replaced successfully!", sourceMesh.id);
                } else {
                    console.error("One of the meshes was not found!");
                };
            };

            let meshInGlobalScene = BARCLAYS.ss.globalScene.getMeshByID(mesh2.id);

            if (meshInGlobalScene) {
                replaceMesh(mesh2, meshInGlobalScene);
            };

        };
    }
);