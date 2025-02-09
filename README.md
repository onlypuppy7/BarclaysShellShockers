# Barclay's Shell Model Injector

> built by onlypuppy7, based off LibertyMutual's code  
> [> repository link](https://github.com/onlypuppy7/BarclaysShellShockers)

## How to use

Create models in Blender with names that overwrite the original's. They MUST match.

Upload to somewhere. Add the link to the arrays at the beginning of the script. You can add multiple models if desired, as well as many URLs as you like. The order of execution is from first to last, so GLBs that have models that target the same meshes as ones prior will overwrite the previous data.

## As a library

Add this to the userdata meta:

```
@require
```

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

## FAQ

### Oh my god, onlypuppy7 made this! It's hacks and virus and a malware!

Please find a bathroom to do your business, because you appear to be full of shit.