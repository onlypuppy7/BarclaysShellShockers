# Barclay's - Shell Shockers Model Injector

> built by onlypuppy7, based off libertymutual's code  
> [> repository link](https://github.com/onlypuppy7/BarclaysShellShockers)
> 
> [> greasyfork example script link](https://greasyfork.org/en/scripts/526219)  
> [> greasyfork library link](https://greasyfork.org/en/scripts/526336)

## How to use

### 1. Setup

**Grab the game's original model files as reference.**

> NOTE: The old URLs for models are OUTDATED!
>
> Going to simply /models/\[model\].glb will only give you the default models.
>
> You must go to /models/full/ links.
> 
> Examples:
> 
> https://shellshock.io/models/full/egg.glb  
> https://shellshock.io/models/full/gun_m24.glb  

### 2a. Replacing models

**Create models in Blender with names that will overwrite the original's.**
   
> They MUST match.

### 2b. Replacing animations

\{Guide coming soon.\}

### 3. Importing into Barclay's

**Upload to some file hoster.**
   
> GitHub usually works best for this type of thing.

**Add the link to the arrays at the beginning of the example script.**

> You can add multiple models if desired, as well as many URLs as you like. The order of execution is from first to last, so GLBs that have models that target the same meshes as ones prior will overwrite the previous data.

## Adding Barclay's to your project as a library

Add this line to the userscript meta, it will initiate the Barclay's library.

```
// @require      https://update.greasyfork.org/scripts/526336/user.js
```

> If you don't like the idea of adding that, or you have an environment where you can't add libraries, then the code from the link can safely just be inserted into your code.

Then, to set the script's models add this:

```js
BARCLAYS.modelURLs = [
    "https://link.to.file/model.glb",
];
```

After this, you need to decide how you want the script injecting. If you want to let Barclay's inject itself, add this:

```js
BARCLAYS.init();
```

Otherwise, you can pass in the game's js from your own injection mechanism, for example like this:

```js
js = BARCLAYS.applyBarclays(js);
```

Optionally, if you need to reinject models or such you can run this:

```js
BARCLAYS.replaceModels([
    "https://link.to/your/model.glb",
]);
```

## FAQ

### Oh my god, onlypuppy7 made this! It's hacks and virus and a malware!

Please find a bathroom to do your business, because you appear to be full of shit.