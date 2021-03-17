module.exports = (bundler) => {
  if (bundler.options.scopeHoist) {
    bundler.addPackager(
      "js",
      require.resolve("./lib/bootstrap-vue-icons-packager")
    );

    bundler.on("bundled", (mainBundle) => {
      console.log(
        "Removed " +
          bundler.options.vueIcons.removed +
          " bytes for unused bootstrap-vue icons"
      );
    });
  }
};
