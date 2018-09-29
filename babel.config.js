// const presets = [
//   ["@babel/env", {
//     targets: {
//       edge: "17",
//       firefox: "60",
//       chrome: "67",
//       safari: "11.1"
//     },
//     useBuiltIns: "usage"
//   }]
// ];
const plugins = [
    "@babel/plugin-transform-flow-strip-types", 
    "@babel/plugin-transform-spread",
    "@babel/plugin-transform-destructuring",
]

// module.exports = { presets };
module.exports = { plugins };