"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./egua-classico"), exports);
__exportStar(require("./mapler/interpretador-mapler"), exports);
__exportStar(require("./mapler/interpretador-mapler-com-depuracao"), exports);
__exportStar(require("./portugol-ipt/interpretador-portugol-ipt"), exports);
__exportStar(require("./portugol-studio/interpretador-portugol-studio"), exports);
__exportStar(require("./portugol-studio/interpretador-portugol-studio-com-depuracao"), exports);
__exportStar(require("./potigol/interpretador-potigol"), exports);
__exportStar(require("./visualg/interpretador-visualg"), exports);
__exportStar(require("./visualg/interpretador-visualg-com-depuracao"), exports);
__exportStar(require("./birl/interpretador-birl"), exports);
//# sourceMappingURL=index.js.map