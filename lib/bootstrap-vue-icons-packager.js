const JSConcatPackager = require("parcel-bundler/src/packagers/JSConcatPackager");

class BootstrapVueIconPackager extends JSConcatPackager {
  constructor(bundle, bundler) {
    super(bundle, bundler);
  }

  async start() {
    super.start();
  }

  async addAsset(asset) {
    if (
      asset.relativeName.endsWith(
        "/node_modules/bootstrap-vue/esm/icons/icons.js"
      )
    ) {
      const regex = /\('b-icon',{attrs:{"icon":"([a-z-]*)"}}\)/gm;
      const icons = [];

      for (const a of this.bundle.assets) {
        if (a.basename.endsWith(".vue") && a.generated.js) {
          const content = a.generated.js;
          if (content.includes("('b-icon',")) {
            let m;
            while ((m = regex.exec(content)) !== null) {
              // This is necessary to avoid infinite loops with zero-width matches
              if (m.index === regex.lastIndex) {
                regex.lastIndex++;
              }

              // The result can be accessed through the `m`-variable.
              icons.push(this.snakeToPascalCase(m[1]));
            }
          }
        }
      }

      let total = 0;
      let removed = 0;

      asset.generated.js = asset.generated.js.replace(
        /makeIcon\("(\w+)",\s*'([^']+)'\)/gm,
        (match, p1, p2) => {
          total += p2.length;
          if (icons.includes(p1)) {
            return `makeIcon("${p1}",'${p2}')`;
          } else {
            removed += p2.length;
            return `makeIcon("${p1}","")`;
          }
        }
      );

      this.bundler.options.vueIcons = { total, removed };
    }
    super.addAsset(asset);
  }

  snakeToPascalCase(string) {
    return string.split("-").map(this.upperFirst).join("");
  }

  upperFirst(string) {
    return string.slice(0, 1).toUpperCase() + string.slice(1, string.length);
  }
}

module.exports = BootstrapVueIconPackager;
