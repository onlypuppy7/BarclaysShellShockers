let globalScene = BARCLAYS.ss.globalScene;

BARCLAYS.ss.SceneLoader.ImportMesh(
    "", // Empty string imports all meshes
    "", // Empty root URL uses the path provided
    "https://cdn.onlypuppy7.online/animtest3.glb", // Path to GLB file
    undefined, // Scene to import into
    function (meshes, particleSystems, skeletons, animationGroups) {
        console.log("meshes loaded:", meshes);
        console.log("particleSystems loaded:", particleSystems);
        console.log("skeletons loaded:", skeletons);
        console.log("animationGroups loaded:", animationGroups);

        window.m = {meshes, particleSystems, skeletons, animationGroups}

        // Check if animations are present
        if (animationGroups && animationGroups.length > 0) {
            console.log("Animations in the GLB file:");
            animationGroups.forEach((group, index) => {
                console.log(`Animation ${index + 1}: ${group.name}`);
            });
        } else {
            console.log("No animations found in the GLB file.");
        };

        // Continue mesh manipulation if needed
        for (var m = 0; m < meshes.length; m++) {
            var mesh2 = meshes[m];

            if (mesh2.id !== "__root__") {
                mesh2.setEnabled(false);
                mesh2.isPickable = false;
    
                mesh2.animations = animationGroups;
    
                function replaceMesh(sourceMesh, targetMesh) {
                    if (sourceMesh && targetMesh) {
                        const vertexData = BARCLAYS.ss.VertexData.ExtractFromMesh(sourceMesh);
                        vertexData.applyToMesh(targetMesh);
                        BARCLAYS.log("Mesh geometry replaced successfully!", sourceMesh.id);
                    } else {
                        console.error("One of the meshes was not found!");
                    };
                };
    
                let meshInGlobalScene = globalScene.getMeshByID(mesh2.id);
    
                if (meshInGlobalScene) {
                    replaceMesh(mesh2, meshInGlobalScene);
    
                    mesh2.animations.forEach((anim, index) => {
                        let animName = anim.name;
                        let animInGlobalScene = meshInGlobalScene.getAnimationByName(animName);
    
                        if (animInGlobalScene) {
                            let tempTargeted = anim._targetedAnimations;
    
                            tempTargeted.forEach((targeted, index) => {
                                tempTargeted[index].target = targeted.target;
                            });
    
                            animInGlobalScene._targetedAnimations = tempTargeted;
    
                            console.log(`Animation ${index + 1} (${animName}) replaced successfully!`);
                        };
                    });
                };
                
                try {
                    mesh2.dispose(false, true);
                } catch (error) {
                    try {
                        mesh2.dispose(false, false);
                    } catch (error) {
                        console.warn("Failed to dispose mesh:", mesh2.id);
                    };
                };
            };
        };
    },
);
