"use strict";
// Generated from fontes\tradutores\python\Python3.g4 by ANTLR 4.9.0-SNAPSHOT
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Except_clauseContext = exports.With_itemContext = exports.With_stmtContext = exports.Try_stmtContext = exports.For_stmtContext = exports.While_stmtContext = exports.If_stmtContext = exports.Async_stmtContext = exports.Compound_stmtContext = exports.Assert_stmtContext = exports.Nonlocal_stmtContext = exports.Global_stmtContext = exports.Dotted_nameContext = exports.Dotted_as_namesContext = exports.Import_as_namesContext = exports.Dotted_as_nameContext = exports.Import_as_nameContext = exports.Import_fromContext = exports.Import_nameContext = exports.Import_stmtContext = exports.Raise_stmtContext = exports.Yield_stmtContext = exports.Return_stmtContext = exports.Continue_stmtContext = exports.Break_stmtContext = exports.Flow_stmtContext = exports.Pass_stmtContext = exports.Del_stmtContext = exports.AugassignContext = exports.Testlist_star_exprContext = exports.AnnassignContext = exports.Simple_assignContext = exports.Expr_stmtContext = exports.Small_stmtContext = exports.Simple_stmtContext = exports.StmtContext = exports.VfpdefContext = exports.VarargslistContext = exports.TfpdefContext = exports.TypedargslistContext = exports.ParametersContext = exports.FuncdefContext = exports.Async_funcdefContext = exports.DecoratedContext = exports.DecoratorsContext = exports.DecoratorContext = exports.Eval_inputContext = exports.File_inputContext = exports.Single_inputContext = exports.Python3Parser = void 0;
exports.Yield_argContext = exports.Yield_exprContext = exports.Encoding_declContext = exports.Comp_ifContext = exports.Comp_forContext = exports.Comp_iterContext = exports.ArgumentContext = exports.ArglistContext = exports.ClassdefContext = exports.DictorsetmakerContext = exports.TestlistContext = exports.ExprlistContext = exports.SliceopContext = exports.SubscriptContext = exports.SubscriptlistContext = exports.TrailerContext = exports.Testlist_compContext = exports.AtomContext = exports.Atom_exprContext = exports.PowerContext = exports.FactorContext = exports.TermContext = exports.Arith_exprContext = exports.Shift_exprContext = exports.And_exprContext = exports.Xor_exprContext = exports.ExprContext = exports.Star_exprContext = exports.Comp_opContext = exports.ComparisonContext = exports.Not_testContext = exports.And_testContext = exports.Or_testContext = exports.Lambdef_nocondContext = exports.LambdefContext = exports.Test_nocondContext = exports.TestContext = exports.SuiteContext = void 0;
const ATN_1 = require("antlr4ts/atn/ATN");
const ATNDeserializer_1 = require("antlr4ts/atn/ATNDeserializer");
const FailedPredicateException_1 = require("antlr4ts/FailedPredicateException");
const NoViableAltException_1 = require("antlr4ts/NoViableAltException");
const Parser_1 = require("antlr4ts/Parser");
const ParserRuleContext_1 = require("antlr4ts/ParserRuleContext");
const ParserATNSimulator_1 = require("antlr4ts/atn/ParserATNSimulator");
const RecognitionException_1 = require("antlr4ts/RecognitionException");
const Token_1 = require("antlr4ts/Token");
const VocabularyImpl_1 = require("antlr4ts/VocabularyImpl");
const Utils = __importStar(require("antlr4ts/misc/Utils"));
class Python3Parser extends Parser_1.Parser {
    // @Override
    // @NotNull
    get vocabulary() {
        return Python3Parser.VOCABULARY;
    }
    // tslint:enable:no-trailing-whitespace
    // @Override
    get grammarFileName() {
        return 'Python3.g4';
    }
    // @Override
    get ruleNames() {
        return Python3Parser.ruleNames;
    }
    // @Override
    get serializedATN() {
        return Python3Parser._serializedATN;
    }
    createFailedPredicateException(predicate, message) {
        return new FailedPredicateException_1.FailedPredicateException(this, predicate, message);
    }
    constructor(input) {
        super(input);
        this._interp = new ParserATNSimulator_1.ParserATNSimulator(Python3Parser._ATN, this);
    }
    // @RuleVersion(0)
    single_input() {
        let _localctx = new Single_inputContext(this._ctx, this.state);
        this.enterRule(_localctx, 0, Python3Parser.RULE_single_input);
        try {
            this.state = 179;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case Python3Parser.NEWLINE:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 174;
                        this.match(Python3Parser.NEWLINE);
                    }
                    break;
                case Python3Parser.STRING:
                case Python3Parser.NUMBER:
                case Python3Parser.RETURN:
                case Python3Parser.RAISE:
                case Python3Parser.FROM:
                case Python3Parser.IMPORT:
                case Python3Parser.GLOBAL:
                case Python3Parser.NONLOCAL:
                case Python3Parser.ASSERT:
                case Python3Parser.LAMBDA:
                case Python3Parser.NOT:
                case Python3Parser.NONE:
                case Python3Parser.TRUE:
                case Python3Parser.FALSE:
                case Python3Parser.YIELD:
                case Python3Parser.DEL:
                case Python3Parser.PASS:
                case Python3Parser.CONTINUE:
                case Python3Parser.BREAK:
                case Python3Parser.AWAIT:
                case Python3Parser.NAME:
                case Python3Parser.ELLIPSIS:
                case Python3Parser.STAR:
                case Python3Parser.OPEN_PAREN:
                case Python3Parser.OPEN_BRACK:
                case Python3Parser.ADD:
                case Python3Parser.MINUS:
                case Python3Parser.NOT_OP:
                case Python3Parser.OPEN_BRACE:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 175;
                        this.simple_stmt();
                    }
                    break;
                case Python3Parser.DEF:
                case Python3Parser.IF:
                case Python3Parser.WHILE:
                case Python3Parser.FOR:
                case Python3Parser.TRY:
                case Python3Parser.WITH:
                case Python3Parser.CLASS:
                case Python3Parser.ASYNC:
                case Python3Parser.AT:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 176;
                        this.compound_stmt();
                        this.state = 177;
                        this.match(Python3Parser.NEWLINE);
                    }
                    break;
                default:
                    throw new NoViableAltException_1.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    file_input() {
        let _localctx = new File_inputContext(this._ctx, this.state);
        this.enterRule(_localctx, 2, Python3Parser.RULE_file_input);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 185;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (((_la & ~0x1f) === 0 &&
                    ((1 << _la) &
                        ((1 << Python3Parser.STRING) |
                            (1 << Python3Parser.NUMBER) |
                            (1 << Python3Parser.DEF) |
                            (1 << Python3Parser.RETURN) |
                            (1 << Python3Parser.RAISE) |
                            (1 << Python3Parser.FROM) |
                            (1 << Python3Parser.IMPORT) |
                            (1 << Python3Parser.GLOBAL) |
                            (1 << Python3Parser.NONLOCAL) |
                            (1 << Python3Parser.ASSERT) |
                            (1 << Python3Parser.IF) |
                            (1 << Python3Parser.WHILE) |
                            (1 << Python3Parser.FOR) |
                            (1 << Python3Parser.TRY) |
                            (1 << Python3Parser.WITH) |
                            (1 << Python3Parser.LAMBDA) |
                            (1 << Python3Parser.NOT) |
                            (1 << Python3Parser.NONE) |
                            (1 << Python3Parser.TRUE) |
                            (1 << Python3Parser.FALSE) |
                            (1 << Python3Parser.CLASS))) !==
                        0) ||
                    (((_la - 32) & ~0x1f) === 0 &&
                        ((1 << (_la - 32)) &
                            ((1 << (Python3Parser.YIELD - 32)) |
                                (1 << (Python3Parser.DEL - 32)) |
                                (1 << (Python3Parser.PASS - 32)) |
                                (1 << (Python3Parser.CONTINUE - 32)) |
                                (1 << (Python3Parser.BREAK - 32)) |
                                (1 << (Python3Parser.ASYNC - 32)) |
                                (1 << (Python3Parser.AWAIT - 32)) |
                                (1 << (Python3Parser.NEWLINE - 32)) |
                                (1 << (Python3Parser.NAME - 32)) |
                                (1 << (Python3Parser.ELLIPSIS - 32)) |
                                (1 << (Python3Parser.STAR - 32)) |
                                (1 << (Python3Parser.OPEN_PAREN - 32)) |
                                (1 << (Python3Parser.OPEN_BRACK - 32)))) !==
                            0) ||
                    (((_la - 66) & ~0x1f) === 0 &&
                        ((1 << (_la - 66)) &
                            ((1 << (Python3Parser.ADD - 66)) |
                                (1 << (Python3Parser.MINUS - 66)) |
                                (1 << (Python3Parser.NOT_OP - 66)) |
                                (1 << (Python3Parser.OPEN_BRACE - 66)) |
                                (1 << (Python3Parser.AT - 66)))) !==
                            0)) {
                    {
                        this.state = 183;
                        this._errHandler.sync(this);
                        switch (this._input.LA(1)) {
                            case Python3Parser.NEWLINE:
                                {
                                    this.state = 181;
                                    this.match(Python3Parser.NEWLINE);
                                }
                                break;
                            case Python3Parser.STRING:
                            case Python3Parser.NUMBER:
                            case Python3Parser.DEF:
                            case Python3Parser.RETURN:
                            case Python3Parser.RAISE:
                            case Python3Parser.FROM:
                            case Python3Parser.IMPORT:
                            case Python3Parser.GLOBAL:
                            case Python3Parser.NONLOCAL:
                            case Python3Parser.ASSERT:
                            case Python3Parser.IF:
                            case Python3Parser.WHILE:
                            case Python3Parser.FOR:
                            case Python3Parser.TRY:
                            case Python3Parser.WITH:
                            case Python3Parser.LAMBDA:
                            case Python3Parser.NOT:
                            case Python3Parser.NONE:
                            case Python3Parser.TRUE:
                            case Python3Parser.FALSE:
                            case Python3Parser.CLASS:
                            case Python3Parser.YIELD:
                            case Python3Parser.DEL:
                            case Python3Parser.PASS:
                            case Python3Parser.CONTINUE:
                            case Python3Parser.BREAK:
                            case Python3Parser.ASYNC:
                            case Python3Parser.AWAIT:
                            case Python3Parser.NAME:
                            case Python3Parser.ELLIPSIS:
                            case Python3Parser.STAR:
                            case Python3Parser.OPEN_PAREN:
                            case Python3Parser.OPEN_BRACK:
                            case Python3Parser.ADD:
                            case Python3Parser.MINUS:
                            case Python3Parser.NOT_OP:
                            case Python3Parser.OPEN_BRACE:
                            case Python3Parser.AT:
                                {
                                    this.state = 182;
                                    this.stmt();
                                }
                                break;
                            default:
                                throw new NoViableAltException_1.NoViableAltException(this);
                        }
                    }
                    this.state = 187;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 188;
                this.match(Python3Parser.EOF);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    eval_input() {
        let _localctx = new Eval_inputContext(this._ctx, this.state);
        this.enterRule(_localctx, 4, Python3Parser.RULE_eval_input);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 190;
                this.testlist();
                this.state = 194;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === Python3Parser.NEWLINE) {
                    {
                        {
                            this.state = 191;
                            this.match(Python3Parser.NEWLINE);
                        }
                    }
                    this.state = 196;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 197;
                this.match(Python3Parser.EOF);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    decorator() {
        let _localctx = new DecoratorContext(this._ctx, this.state);
        this.enterRule(_localctx, 6, Python3Parser.RULE_decorator);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 199;
                this.match(Python3Parser.AT);
                this.state = 200;
                this.dotted_name();
                this.state = 206;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === Python3Parser.OPEN_PAREN) {
                    {
                        this.state = 201;
                        this.match(Python3Parser.OPEN_PAREN);
                        this.state = 203;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (((_la & ~0x1f) === 0 &&
                            ((1 << _la) &
                                ((1 << Python3Parser.STRING) |
                                    (1 << Python3Parser.NUMBER) |
                                    (1 << Python3Parser.LAMBDA) |
                                    (1 << Python3Parser.NOT) |
                                    (1 << Python3Parser.NONE) |
                                    (1 << Python3Parser.TRUE) |
                                    (1 << Python3Parser.FALSE))) !==
                                0) ||
                            (((_la - 38) & ~0x1f) === 0 &&
                                ((1 << (_la - 38)) &
                                    ((1 << (Python3Parser.AWAIT - 38)) |
                                        (1 << (Python3Parser.NAME - 38)) |
                                        (1 << (Python3Parser.ELLIPSIS - 38)) |
                                        (1 << (Python3Parser.STAR - 38)) |
                                        (1 << (Python3Parser.OPEN_PAREN - 38)) |
                                        (1 << (Python3Parser.POWER - 38)) |
                                        (1 << (Python3Parser.OPEN_BRACK - 38)) |
                                        (1 << (Python3Parser.ADD - 38)) |
                                        (1 << (Python3Parser.MINUS - 38)))) !==
                                    0) ||
                            _la === Python3Parser.NOT_OP ||
                            _la === Python3Parser.OPEN_BRACE) {
                            {
                                this.state = 202;
                                this.arglist();
                            }
                        }
                        this.state = 205;
                        this.match(Python3Parser.CLOSE_PAREN);
                    }
                }
                this.state = 208;
                this.match(Python3Parser.NEWLINE);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    decorators() {
        let _localctx = new DecoratorsContext(this._ctx, this.state);
        this.enterRule(_localctx, 8, Python3Parser.RULE_decorators);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 211;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                do {
                    {
                        {
                            this.state = 210;
                            this.decorator();
                        }
                    }
                    this.state = 213;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                } while (_la === Python3Parser.AT);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    decorated() {
        let _localctx = new DecoratedContext(this._ctx, this.state);
        this.enterRule(_localctx, 10, Python3Parser.RULE_decorated);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 215;
                this.decorators();
                this.state = 219;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case Python3Parser.CLASS:
                        {
                            this.state = 216;
                            this.classdef();
                        }
                        break;
                    case Python3Parser.DEF:
                        {
                            this.state = 217;
                            this.funcdef();
                        }
                        break;
                    case Python3Parser.ASYNC:
                        {
                            this.state = 218;
                            this.async_funcdef();
                        }
                        break;
                    default:
                        throw new NoViableAltException_1.NoViableAltException(this);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    async_funcdef() {
        let _localctx = new Async_funcdefContext(this._ctx, this.state);
        this.enterRule(_localctx, 12, Python3Parser.RULE_async_funcdef);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 221;
                this.match(Python3Parser.ASYNC);
                this.state = 222;
                this.funcdef();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    funcdef() {
        let _localctx = new FuncdefContext(this._ctx, this.state);
        this.enterRule(_localctx, 14, Python3Parser.RULE_funcdef);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 224;
                this.match(Python3Parser.DEF);
                this.state = 225;
                this.match(Python3Parser.NAME);
                this.state = 226;
                this.parameters();
                this.state = 229;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === Python3Parser.ARROW) {
                    {
                        this.state = 227;
                        this.match(Python3Parser.ARROW);
                        this.state = 228;
                        this.test();
                    }
                }
                this.state = 231;
                this.match(Python3Parser.COLON);
                this.state = 232;
                this.suite();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    parameters() {
        let _localctx = new ParametersContext(this._ctx, this.state);
        this.enterRule(_localctx, 16, Python3Parser.RULE_parameters);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 234;
                this.match(Python3Parser.OPEN_PAREN);
                this.state = 236;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (((_la - 40) & ~0x1f) === 0 &&
                    ((1 << (_la - 40)) &
                        ((1 << (Python3Parser.NAME - 40)) |
                            (1 << (Python3Parser.STAR - 40)) |
                            (1 << (Python3Parser.POWER - 40)))) !==
                        0) {
                    {
                        this.state = 235;
                        this.typedargslist();
                    }
                }
                this.state = 238;
                this.match(Python3Parser.CLOSE_PAREN);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    typedargslist() {
        let _localctx = new TypedargslistContext(this._ctx, this.state);
        this.enterRule(_localctx, 18, Python3Parser.RULE_typedargslist);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 321;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case Python3Parser.NAME:
                        {
                            this.state = 240;
                            this.tfpdef();
                            this.state = 243;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (_la === Python3Parser.ASSIGN) {
                                {
                                    this.state = 241;
                                    this.match(Python3Parser.ASSIGN);
                                    this.state = 242;
                                    this.test();
                                }
                            }
                            this.state = 253;
                            this._errHandler.sync(this);
                            _alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
                            while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                                if (_alt === 1) {
                                    {
                                        {
                                            this.state = 245;
                                            this.match(Python3Parser.COMMA);
                                            this.state = 246;
                                            this.tfpdef();
                                            this.state = 249;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                            if (_la === Python3Parser.ASSIGN) {
                                                {
                                                    this.state = 247;
                                                    this.match(Python3Parser.ASSIGN);
                                                    this.state = 248;
                                                    this.test();
                                                }
                                            }
                                        }
                                    }
                                }
                                this.state = 255;
                                this._errHandler.sync(this);
                                _alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
                            }
                            this.state = 289;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (_la === Python3Parser.COMMA) {
                                {
                                    this.state = 256;
                                    this.match(Python3Parser.COMMA);
                                    this.state = 287;
                                    this._errHandler.sync(this);
                                    switch (this._input.LA(1)) {
                                        case Python3Parser.STAR:
                                            {
                                                this.state = 257;
                                                this.match(Python3Parser.STAR);
                                                this.state = 259;
                                                this._errHandler.sync(this);
                                                _la = this._input.LA(1);
                                                if (_la === Python3Parser.NAME) {
                                                    {
                                                        this.state = 258;
                                                        this.tfpdef();
                                                    }
                                                }
                                                this.state = 269;
                                                this._errHandler.sync(this);
                                                _alt = this.interpreter.adaptivePredict(this._input, 15, this._ctx);
                                                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                                                    if (_alt === 1) {
                                                        {
                                                            {
                                                                this.state = 261;
                                                                this.match(Python3Parser.COMMA);
                                                                this.state = 262;
                                                                this.tfpdef();
                                                                this.state = 265;
                                                                this._errHandler.sync(this);
                                                                _la = this._input.LA(1);
                                                                if (_la === Python3Parser.ASSIGN) {
                                                                    {
                                                                        this.state = 263;
                                                                        this.match(Python3Parser.ASSIGN);
                                                                        this.state = 264;
                                                                        this.test();
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    this.state = 271;
                                                    this._errHandler.sync(this);
                                                    _alt = this.interpreter.adaptivePredict(this._input, 15, this._ctx);
                                                }
                                                this.state = 280;
                                                this._errHandler.sync(this);
                                                _la = this._input.LA(1);
                                                if (_la === Python3Parser.COMMA) {
                                                    {
                                                        this.state = 272;
                                                        this.match(Python3Parser.COMMA);
                                                        this.state = 278;
                                                        this._errHandler.sync(this);
                                                        _la = this._input.LA(1);
                                                        if (_la === Python3Parser.POWER) {
                                                            {
                                                                this.state = 273;
                                                                this.match(Python3Parser.POWER);
                                                                this.state = 274;
                                                                this.tfpdef();
                                                                this.state = 276;
                                                                this._errHandler.sync(this);
                                                                _la = this._input.LA(1);
                                                                if (_la === Python3Parser.COMMA) {
                                                                    {
                                                                        this.state = 275;
                                                                        this.match(Python3Parser.COMMA);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            break;
                                        case Python3Parser.POWER:
                                            {
                                                this.state = 282;
                                                this.match(Python3Parser.POWER);
                                                this.state = 283;
                                                this.tfpdef();
                                                this.state = 285;
                                                this._errHandler.sync(this);
                                                _la = this._input.LA(1);
                                                if (_la === Python3Parser.COMMA) {
                                                    {
                                                        this.state = 284;
                                                        this.match(Python3Parser.COMMA);
                                                    }
                                                }
                                            }
                                            break;
                                        case Python3Parser.CLOSE_PAREN:
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }
                        }
                        break;
                    case Python3Parser.STAR:
                        {
                            this.state = 291;
                            this.match(Python3Parser.STAR);
                            this.state = 293;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (_la === Python3Parser.NAME) {
                                {
                                    this.state = 292;
                                    this.tfpdef();
                                }
                            }
                            this.state = 303;
                            this._errHandler.sync(this);
                            _alt = this.interpreter.adaptivePredict(this._input, 24, this._ctx);
                            while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                                if (_alt === 1) {
                                    {
                                        {
                                            this.state = 295;
                                            this.match(Python3Parser.COMMA);
                                            this.state = 296;
                                            this.tfpdef();
                                            this.state = 299;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                            if (_la === Python3Parser.ASSIGN) {
                                                {
                                                    this.state = 297;
                                                    this.match(Python3Parser.ASSIGN);
                                                    this.state = 298;
                                                    this.test();
                                                }
                                            }
                                        }
                                    }
                                }
                                this.state = 305;
                                this._errHandler.sync(this);
                                _alt = this.interpreter.adaptivePredict(this._input, 24, this._ctx);
                            }
                            this.state = 314;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (_la === Python3Parser.COMMA) {
                                {
                                    this.state = 306;
                                    this.match(Python3Parser.COMMA);
                                    this.state = 312;
                                    this._errHandler.sync(this);
                                    _la = this._input.LA(1);
                                    if (_la === Python3Parser.POWER) {
                                        {
                                            this.state = 307;
                                            this.match(Python3Parser.POWER);
                                            this.state = 308;
                                            this.tfpdef();
                                            this.state = 310;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                            if (_la === Python3Parser.COMMA) {
                                                {
                                                    this.state = 309;
                                                    this.match(Python3Parser.COMMA);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case Python3Parser.POWER:
                        {
                            this.state = 316;
                            this.match(Python3Parser.POWER);
                            this.state = 317;
                            this.tfpdef();
                            this.state = 319;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (_la === Python3Parser.COMMA) {
                                {
                                    this.state = 318;
                                    this.match(Python3Parser.COMMA);
                                }
                            }
                        }
                        break;
                    default:
                        throw new NoViableAltException_1.NoViableAltException(this);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    tfpdef() {
        let _localctx = new TfpdefContext(this._ctx, this.state);
        this.enterRule(_localctx, 20, Python3Parser.RULE_tfpdef);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 323;
                this.match(Python3Parser.NAME);
                this.state = 326;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === Python3Parser.COLON) {
                    {
                        this.state = 324;
                        this.match(Python3Parser.COLON);
                        this.state = 325;
                        this.test();
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    varargslist() {
        let _localctx = new VarargslistContext(this._ctx, this.state);
        this.enterRule(_localctx, 22, Python3Parser.RULE_varargslist);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 409;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case Python3Parser.NAME:
                        {
                            this.state = 328;
                            this.vfpdef();
                            this.state = 331;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (_la === Python3Parser.ASSIGN) {
                                {
                                    this.state = 329;
                                    this.match(Python3Parser.ASSIGN);
                                    this.state = 330;
                                    this.test();
                                }
                            }
                            this.state = 341;
                            this._errHandler.sync(this);
                            _alt = this.interpreter.adaptivePredict(this._input, 33, this._ctx);
                            while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                                if (_alt === 1) {
                                    {
                                        {
                                            this.state = 333;
                                            this.match(Python3Parser.COMMA);
                                            this.state = 334;
                                            this.vfpdef();
                                            this.state = 337;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                            if (_la === Python3Parser.ASSIGN) {
                                                {
                                                    this.state = 335;
                                                    this.match(Python3Parser.ASSIGN);
                                                    this.state = 336;
                                                    this.test();
                                                }
                                            }
                                        }
                                    }
                                }
                                this.state = 343;
                                this._errHandler.sync(this);
                                _alt = this.interpreter.adaptivePredict(this._input, 33, this._ctx);
                            }
                            this.state = 377;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (_la === Python3Parser.COMMA) {
                                {
                                    this.state = 344;
                                    this.match(Python3Parser.COMMA);
                                    this.state = 375;
                                    this._errHandler.sync(this);
                                    switch (this._input.LA(1)) {
                                        case Python3Parser.STAR:
                                            {
                                                this.state = 345;
                                                this.match(Python3Parser.STAR);
                                                this.state = 347;
                                                this._errHandler.sync(this);
                                                _la = this._input.LA(1);
                                                if (_la === Python3Parser.NAME) {
                                                    {
                                                        this.state = 346;
                                                        this.vfpdef();
                                                    }
                                                }
                                                this.state = 357;
                                                this._errHandler.sync(this);
                                                _alt = this.interpreter.adaptivePredict(this._input, 36, this._ctx);
                                                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                                                    if (_alt === 1) {
                                                        {
                                                            {
                                                                this.state = 349;
                                                                this.match(Python3Parser.COMMA);
                                                                this.state = 350;
                                                                this.vfpdef();
                                                                this.state = 353;
                                                                this._errHandler.sync(this);
                                                                _la = this._input.LA(1);
                                                                if (_la === Python3Parser.ASSIGN) {
                                                                    {
                                                                        this.state = 351;
                                                                        this.match(Python3Parser.ASSIGN);
                                                                        this.state = 352;
                                                                        this.test();
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    this.state = 359;
                                                    this._errHandler.sync(this);
                                                    _alt = this.interpreter.adaptivePredict(this._input, 36, this._ctx);
                                                }
                                                this.state = 368;
                                                this._errHandler.sync(this);
                                                _la = this._input.LA(1);
                                                if (_la === Python3Parser.COMMA) {
                                                    {
                                                        this.state = 360;
                                                        this.match(Python3Parser.COMMA);
                                                        this.state = 366;
                                                        this._errHandler.sync(this);
                                                        _la = this._input.LA(1);
                                                        if (_la === Python3Parser.POWER) {
                                                            {
                                                                this.state = 361;
                                                                this.match(Python3Parser.POWER);
                                                                this.state = 362;
                                                                this.vfpdef();
                                                                this.state = 364;
                                                                this._errHandler.sync(this);
                                                                _la = this._input.LA(1);
                                                                if (_la === Python3Parser.COMMA) {
                                                                    {
                                                                        this.state = 363;
                                                                        this.match(Python3Parser.COMMA);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            break;
                                        case Python3Parser.POWER:
                                            {
                                                this.state = 370;
                                                this.match(Python3Parser.POWER);
                                                this.state = 371;
                                                this.vfpdef();
                                                this.state = 373;
                                                this._errHandler.sync(this);
                                                _la = this._input.LA(1);
                                                if (_la === Python3Parser.COMMA) {
                                                    {
                                                        this.state = 372;
                                                        this.match(Python3Parser.COMMA);
                                                    }
                                                }
                                            }
                                            break;
                                        case Python3Parser.COLON:
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }
                        }
                        break;
                    case Python3Parser.STAR:
                        {
                            this.state = 379;
                            this.match(Python3Parser.STAR);
                            this.state = 381;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (_la === Python3Parser.NAME) {
                                {
                                    this.state = 380;
                                    this.vfpdef();
                                }
                            }
                            this.state = 391;
                            this._errHandler.sync(this);
                            _alt = this.interpreter.adaptivePredict(this._input, 45, this._ctx);
                            while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                                if (_alt === 1) {
                                    {
                                        {
                                            this.state = 383;
                                            this.match(Python3Parser.COMMA);
                                            this.state = 384;
                                            this.vfpdef();
                                            this.state = 387;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                            if (_la === Python3Parser.ASSIGN) {
                                                {
                                                    this.state = 385;
                                                    this.match(Python3Parser.ASSIGN);
                                                    this.state = 386;
                                                    this.test();
                                                }
                                            }
                                        }
                                    }
                                }
                                this.state = 393;
                                this._errHandler.sync(this);
                                _alt = this.interpreter.adaptivePredict(this._input, 45, this._ctx);
                            }
                            this.state = 402;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (_la === Python3Parser.COMMA) {
                                {
                                    this.state = 394;
                                    this.match(Python3Parser.COMMA);
                                    this.state = 400;
                                    this._errHandler.sync(this);
                                    _la = this._input.LA(1);
                                    if (_la === Python3Parser.POWER) {
                                        {
                                            this.state = 395;
                                            this.match(Python3Parser.POWER);
                                            this.state = 396;
                                            this.vfpdef();
                                            this.state = 398;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                            if (_la === Python3Parser.COMMA) {
                                                {
                                                    this.state = 397;
                                                    this.match(Python3Parser.COMMA);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case Python3Parser.POWER:
                        {
                            this.state = 404;
                            this.match(Python3Parser.POWER);
                            this.state = 405;
                            this.vfpdef();
                            this.state = 407;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (_la === Python3Parser.COMMA) {
                                {
                                    this.state = 406;
                                    this.match(Python3Parser.COMMA);
                                }
                            }
                        }
                        break;
                    default:
                        throw new NoViableAltException_1.NoViableAltException(this);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    vfpdef() {
        let _localctx = new VfpdefContext(this._ctx, this.state);
        this.enterRule(_localctx, 24, Python3Parser.RULE_vfpdef);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 411;
                this.match(Python3Parser.NAME);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    stmt() {
        let _localctx = new StmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 26, Python3Parser.RULE_stmt);
        try {
            this.state = 415;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case Python3Parser.STRING:
                case Python3Parser.NUMBER:
                case Python3Parser.RETURN:
                case Python3Parser.RAISE:
                case Python3Parser.FROM:
                case Python3Parser.IMPORT:
                case Python3Parser.GLOBAL:
                case Python3Parser.NONLOCAL:
                case Python3Parser.ASSERT:
                case Python3Parser.LAMBDA:
                case Python3Parser.NOT:
                case Python3Parser.NONE:
                case Python3Parser.TRUE:
                case Python3Parser.FALSE:
                case Python3Parser.YIELD:
                case Python3Parser.DEL:
                case Python3Parser.PASS:
                case Python3Parser.CONTINUE:
                case Python3Parser.BREAK:
                case Python3Parser.AWAIT:
                case Python3Parser.NAME:
                case Python3Parser.ELLIPSIS:
                case Python3Parser.STAR:
                case Python3Parser.OPEN_PAREN:
                case Python3Parser.OPEN_BRACK:
                case Python3Parser.ADD:
                case Python3Parser.MINUS:
                case Python3Parser.NOT_OP:
                case Python3Parser.OPEN_BRACE:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 413;
                        this.simple_stmt();
                    }
                    break;
                case Python3Parser.DEF:
                case Python3Parser.IF:
                case Python3Parser.WHILE:
                case Python3Parser.FOR:
                case Python3Parser.TRY:
                case Python3Parser.WITH:
                case Python3Parser.CLASS:
                case Python3Parser.ASYNC:
                case Python3Parser.AT:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 414;
                        this.compound_stmt();
                    }
                    break;
                default:
                    throw new NoViableAltException_1.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    simple_stmt() {
        let _localctx = new Simple_stmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 28, Python3Parser.RULE_simple_stmt);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 417;
                this.small_stmt();
                this.state = 422;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 52, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 418;
                                this.match(Python3Parser.SEMI_COLON);
                                this.state = 419;
                                this.small_stmt();
                            }
                        }
                    }
                    this.state = 424;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 52, this._ctx);
                }
                this.state = 426;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === Python3Parser.SEMI_COLON) {
                    {
                        this.state = 425;
                        this.match(Python3Parser.SEMI_COLON);
                    }
                }
                this.state = 428;
                this.match(Python3Parser.NEWLINE);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    small_stmt() {
        let _localctx = new Small_stmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 30, Python3Parser.RULE_small_stmt);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 438;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case Python3Parser.STRING:
                    case Python3Parser.NUMBER:
                    case Python3Parser.LAMBDA:
                    case Python3Parser.NOT:
                    case Python3Parser.NONE:
                    case Python3Parser.TRUE:
                    case Python3Parser.FALSE:
                    case Python3Parser.AWAIT:
                    case Python3Parser.NAME:
                    case Python3Parser.ELLIPSIS:
                    case Python3Parser.STAR:
                    case Python3Parser.OPEN_PAREN:
                    case Python3Parser.OPEN_BRACK:
                    case Python3Parser.ADD:
                    case Python3Parser.MINUS:
                    case Python3Parser.NOT_OP:
                    case Python3Parser.OPEN_BRACE:
                        {
                            this.state = 430;
                            this.expr_stmt();
                        }
                        break;
                    case Python3Parser.DEL:
                        {
                            this.state = 431;
                            this.del_stmt();
                        }
                        break;
                    case Python3Parser.PASS:
                        {
                            this.state = 432;
                            this.pass_stmt();
                        }
                        break;
                    case Python3Parser.RETURN:
                    case Python3Parser.RAISE:
                    case Python3Parser.YIELD:
                    case Python3Parser.CONTINUE:
                    case Python3Parser.BREAK:
                        {
                            this.state = 433;
                            this.flow_stmt();
                        }
                        break;
                    case Python3Parser.FROM:
                    case Python3Parser.IMPORT:
                        {
                            this.state = 434;
                            this.import_stmt();
                        }
                        break;
                    case Python3Parser.GLOBAL:
                        {
                            this.state = 435;
                            this.global_stmt();
                        }
                        break;
                    case Python3Parser.NONLOCAL:
                        {
                            this.state = 436;
                            this.nonlocal_stmt();
                        }
                        break;
                    case Python3Parser.ASSERT:
                        {
                            this.state = 437;
                            this.assert_stmt();
                        }
                        break;
                    default:
                        throw new NoViableAltException_1.NoViableAltException(this);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    expr_stmt() {
        let _localctx = new Expr_stmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 32, Python3Parser.RULE_expr_stmt);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 440;
                this.testlist_star_expr();
                this.state = 448;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case Python3Parser.COLON:
                        {
                            this.state = 441;
                            this.annassign();
                        }
                        break;
                    case Python3Parser.ADD_ASSIGN:
                    case Python3Parser.SUB_ASSIGN:
                    case Python3Parser.MULT_ASSIGN:
                    case Python3Parser.AT_ASSIGN:
                    case Python3Parser.DIV_ASSIGN:
                    case Python3Parser.MOD_ASSIGN:
                    case Python3Parser.AND_ASSIGN:
                    case Python3Parser.OR_ASSIGN:
                    case Python3Parser.XOR_ASSIGN:
                    case Python3Parser.LEFT_SHIFT_ASSIGN:
                    case Python3Parser.RIGHT_SHIFT_ASSIGN:
                    case Python3Parser.POWER_ASSIGN:
                    case Python3Parser.IDIV_ASSIGN:
                        {
                            this.state = 442;
                            this.augassign();
                            this.state = 445;
                            this._errHandler.sync(this);
                            switch (this._input.LA(1)) {
                                case Python3Parser.YIELD:
                                    {
                                        this.state = 443;
                                        this.yield_expr();
                                    }
                                    break;
                                case Python3Parser.STRING:
                                case Python3Parser.NUMBER:
                                case Python3Parser.LAMBDA:
                                case Python3Parser.NOT:
                                case Python3Parser.NONE:
                                case Python3Parser.TRUE:
                                case Python3Parser.FALSE:
                                case Python3Parser.AWAIT:
                                case Python3Parser.NAME:
                                case Python3Parser.ELLIPSIS:
                                case Python3Parser.OPEN_PAREN:
                                case Python3Parser.OPEN_BRACK:
                                case Python3Parser.ADD:
                                case Python3Parser.MINUS:
                                case Python3Parser.NOT_OP:
                                case Python3Parser.OPEN_BRACE:
                                    {
                                        this.state = 444;
                                        this.testlist();
                                    }
                                    break;
                                default:
                                    throw new NoViableAltException_1.NoViableAltException(this);
                            }
                        }
                        break;
                    case Python3Parser.NEWLINE:
                    case Python3Parser.SEMI_COLON:
                    case Python3Parser.ASSIGN:
                        {
                            this.state = 447;
                            this.simple_assign();
                        }
                        break;
                    default:
                        throw new NoViableAltException_1.NoViableAltException(this);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    simple_assign() {
        let _localctx = new Simple_assignContext(this._ctx, this.state);
        this.enterRule(_localctx, 34, Python3Parser.RULE_simple_assign);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 457;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === Python3Parser.ASSIGN) {
                    {
                        {
                            this.state = 450;
                            this.match(Python3Parser.ASSIGN);
                            this.state = 453;
                            this._errHandler.sync(this);
                            switch (this._input.LA(1)) {
                                case Python3Parser.YIELD:
                                    {
                                        this.state = 451;
                                        this.yield_expr();
                                    }
                                    break;
                                case Python3Parser.STRING:
                                case Python3Parser.NUMBER:
                                case Python3Parser.LAMBDA:
                                case Python3Parser.NOT:
                                case Python3Parser.NONE:
                                case Python3Parser.TRUE:
                                case Python3Parser.FALSE:
                                case Python3Parser.AWAIT:
                                case Python3Parser.NAME:
                                case Python3Parser.ELLIPSIS:
                                case Python3Parser.STAR:
                                case Python3Parser.OPEN_PAREN:
                                case Python3Parser.OPEN_BRACK:
                                case Python3Parser.ADD:
                                case Python3Parser.MINUS:
                                case Python3Parser.NOT_OP:
                                case Python3Parser.OPEN_BRACE:
                                    {
                                        this.state = 452;
                                        this.testlist_star_expr();
                                    }
                                    break;
                                default:
                                    throw new NoViableAltException_1.NoViableAltException(this);
                            }
                        }
                    }
                    this.state = 459;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    annassign() {
        let _localctx = new AnnassignContext(this._ctx, this.state);
        this.enterRule(_localctx, 36, Python3Parser.RULE_annassign);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 460;
                this.match(Python3Parser.COLON);
                this.state = 461;
                this.test();
                this.state = 464;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === Python3Parser.ASSIGN) {
                    {
                        this.state = 462;
                        this.match(Python3Parser.ASSIGN);
                        this.state = 463;
                        this.test();
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    testlist_star_expr() {
        let _localctx = new Testlist_star_exprContext(this._ctx, this.state);
        this.enterRule(_localctx, 38, Python3Parser.RULE_testlist_star_expr);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 468;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case Python3Parser.STRING:
                    case Python3Parser.NUMBER:
                    case Python3Parser.LAMBDA:
                    case Python3Parser.NOT:
                    case Python3Parser.NONE:
                    case Python3Parser.TRUE:
                    case Python3Parser.FALSE:
                    case Python3Parser.AWAIT:
                    case Python3Parser.NAME:
                    case Python3Parser.ELLIPSIS:
                    case Python3Parser.OPEN_PAREN:
                    case Python3Parser.OPEN_BRACK:
                    case Python3Parser.ADD:
                    case Python3Parser.MINUS:
                    case Python3Parser.NOT_OP:
                    case Python3Parser.OPEN_BRACE:
                        {
                            this.state = 466;
                            this.test();
                        }
                        break;
                    case Python3Parser.STAR:
                        {
                            this.state = 467;
                            this.star_expr();
                        }
                        break;
                    default:
                        throw new NoViableAltException_1.NoViableAltException(this);
                }
                this.state = 477;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 62, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 470;
                                this.match(Python3Parser.COMMA);
                                this.state = 473;
                                this._errHandler.sync(this);
                                switch (this._input.LA(1)) {
                                    case Python3Parser.STRING:
                                    case Python3Parser.NUMBER:
                                    case Python3Parser.LAMBDA:
                                    case Python3Parser.NOT:
                                    case Python3Parser.NONE:
                                    case Python3Parser.TRUE:
                                    case Python3Parser.FALSE:
                                    case Python3Parser.AWAIT:
                                    case Python3Parser.NAME:
                                    case Python3Parser.ELLIPSIS:
                                    case Python3Parser.OPEN_PAREN:
                                    case Python3Parser.OPEN_BRACK:
                                    case Python3Parser.ADD:
                                    case Python3Parser.MINUS:
                                    case Python3Parser.NOT_OP:
                                    case Python3Parser.OPEN_BRACE:
                                        {
                                            this.state = 471;
                                            this.test();
                                        }
                                        break;
                                    case Python3Parser.STAR:
                                        {
                                            this.state = 472;
                                            this.star_expr();
                                        }
                                        break;
                                    default:
                                        throw new NoViableAltException_1.NoViableAltException(this);
                                }
                            }
                        }
                    }
                    this.state = 479;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 62, this._ctx);
                }
                this.state = 481;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === Python3Parser.COMMA) {
                    {
                        this.state = 480;
                        this.match(Python3Parser.COMMA);
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    augassign() {
        let _localctx = new AugassignContext(this._ctx, this.state);
        this.enterRule(_localctx, 40, Python3Parser.RULE_augassign);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 483;
                _la = this._input.LA(1);
                if (!(((_la - 83) & ~0x1f) === 0 &&
                    ((1 << (_la - 83)) &
                        ((1 << (Python3Parser.ADD_ASSIGN - 83)) |
                            (1 << (Python3Parser.SUB_ASSIGN - 83)) |
                            (1 << (Python3Parser.MULT_ASSIGN - 83)) |
                            (1 << (Python3Parser.AT_ASSIGN - 83)) |
                            (1 << (Python3Parser.DIV_ASSIGN - 83)) |
                            (1 << (Python3Parser.MOD_ASSIGN - 83)) |
                            (1 << (Python3Parser.AND_ASSIGN - 83)) |
                            (1 << (Python3Parser.OR_ASSIGN - 83)) |
                            (1 << (Python3Parser.XOR_ASSIGN - 83)) |
                            (1 << (Python3Parser.LEFT_SHIFT_ASSIGN - 83)) |
                            (1 << (Python3Parser.RIGHT_SHIFT_ASSIGN - 83)) |
                            (1 << (Python3Parser.POWER_ASSIGN - 83)) |
                            (1 << (Python3Parser.IDIV_ASSIGN - 83)))) !==
                        0)) {
                    this._errHandler.recoverInline(this);
                }
                else {
                    if (this._input.LA(1) === Token_1.Token.EOF) {
                        this.matchedEOF = true;
                    }
                    this._errHandler.reportMatch(this);
                    this.consume();
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    del_stmt() {
        let _localctx = new Del_stmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 42, Python3Parser.RULE_del_stmt);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 485;
                this.match(Python3Parser.DEL);
                this.state = 486;
                this.exprlist();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    pass_stmt() {
        let _localctx = new Pass_stmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 44, Python3Parser.RULE_pass_stmt);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 488;
                this.match(Python3Parser.PASS);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    flow_stmt() {
        let _localctx = new Flow_stmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 46, Python3Parser.RULE_flow_stmt);
        try {
            this.state = 495;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case Python3Parser.BREAK:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 490;
                        this.break_stmt();
                    }
                    break;
                case Python3Parser.CONTINUE:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 491;
                        this.continue_stmt();
                    }
                    break;
                case Python3Parser.RETURN:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 492;
                        this.return_stmt();
                    }
                    break;
                case Python3Parser.RAISE:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 493;
                        this.raise_stmt();
                    }
                    break;
                case Python3Parser.YIELD:
                    this.enterOuterAlt(_localctx, 5);
                    {
                        this.state = 494;
                        this.yield_stmt();
                    }
                    break;
                default:
                    throw new NoViableAltException_1.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    break_stmt() {
        let _localctx = new Break_stmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 48, Python3Parser.RULE_break_stmt);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 497;
                this.match(Python3Parser.BREAK);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    continue_stmt() {
        let _localctx = new Continue_stmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 50, Python3Parser.RULE_continue_stmt);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 499;
                this.match(Python3Parser.CONTINUE);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    return_stmt() {
        let _localctx = new Return_stmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 52, Python3Parser.RULE_return_stmt);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 501;
                this.match(Python3Parser.RETURN);
                this.state = 503;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (((_la & ~0x1f) === 0 &&
                    ((1 << _la) &
                        ((1 << Python3Parser.STRING) |
                            (1 << Python3Parser.NUMBER) |
                            (1 << Python3Parser.LAMBDA) |
                            (1 << Python3Parser.NOT) |
                            (1 << Python3Parser.NONE) |
                            (1 << Python3Parser.TRUE) |
                            (1 << Python3Parser.FALSE))) !==
                        0) ||
                    (((_la - 38) & ~0x1f) === 0 &&
                        ((1 << (_la - 38)) &
                            ((1 << (Python3Parser.AWAIT - 38)) |
                                (1 << (Python3Parser.NAME - 38)) |
                                (1 << (Python3Parser.ELLIPSIS - 38)) |
                                (1 << (Python3Parser.OPEN_PAREN - 38)) |
                                (1 << (Python3Parser.OPEN_BRACK - 38)) |
                                (1 << (Python3Parser.ADD - 38)) |
                                (1 << (Python3Parser.MINUS - 38)))) !==
                            0) ||
                    _la === Python3Parser.NOT_OP ||
                    _la === Python3Parser.OPEN_BRACE) {
                    {
                        this.state = 502;
                        this.testlist();
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    yield_stmt() {
        let _localctx = new Yield_stmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 54, Python3Parser.RULE_yield_stmt);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 505;
                this.yield_expr();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    raise_stmt() {
        let _localctx = new Raise_stmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 56, Python3Parser.RULE_raise_stmt);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 507;
                this.match(Python3Parser.RAISE);
                this.state = 513;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (((_la & ~0x1f) === 0 &&
                    ((1 << _la) &
                        ((1 << Python3Parser.STRING) |
                            (1 << Python3Parser.NUMBER) |
                            (1 << Python3Parser.LAMBDA) |
                            (1 << Python3Parser.NOT) |
                            (1 << Python3Parser.NONE) |
                            (1 << Python3Parser.TRUE) |
                            (1 << Python3Parser.FALSE))) !==
                        0) ||
                    (((_la - 38) & ~0x1f) === 0 &&
                        ((1 << (_la - 38)) &
                            ((1 << (Python3Parser.AWAIT - 38)) |
                                (1 << (Python3Parser.NAME - 38)) |
                                (1 << (Python3Parser.ELLIPSIS - 38)) |
                                (1 << (Python3Parser.OPEN_PAREN - 38)) |
                                (1 << (Python3Parser.OPEN_BRACK - 38)) |
                                (1 << (Python3Parser.ADD - 38)) |
                                (1 << (Python3Parser.MINUS - 38)))) !==
                            0) ||
                    _la === Python3Parser.NOT_OP ||
                    _la === Python3Parser.OPEN_BRACE) {
                    {
                        this.state = 508;
                        this.test();
                        this.state = 511;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (_la === Python3Parser.FROM) {
                            {
                                this.state = 509;
                                this.match(Python3Parser.FROM);
                                this.state = 510;
                                this.test();
                            }
                        }
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    import_stmt() {
        let _localctx = new Import_stmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 58, Python3Parser.RULE_import_stmt);
        try {
            this.state = 517;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case Python3Parser.IMPORT:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 515;
                        this.import_name();
                    }
                    break;
                case Python3Parser.FROM:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 516;
                        this.import_from();
                    }
                    break;
                default:
                    throw new NoViableAltException_1.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    import_name() {
        let _localctx = new Import_nameContext(this._ctx, this.state);
        this.enterRule(_localctx, 60, Python3Parser.RULE_import_name);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 519;
                this.match(Python3Parser.IMPORT);
                this.state = 520;
                this.dotted_as_names();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    import_from() {
        let _localctx = new Import_fromContext(this._ctx, this.state);
        this.enterRule(_localctx, 62, Python3Parser.RULE_import_from);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 522;
                    this.match(Python3Parser.FROM);
                    this.state = 535;
                    this._errHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this._input, 71, this._ctx)) {
                        case 1:
                            {
                                this.state = 526;
                                this._errHandler.sync(this);
                                _la = this._input.LA(1);
                                while (_la === Python3Parser.DOT || _la === Python3Parser.ELLIPSIS) {
                                    {
                                        {
                                            this.state = 523;
                                            _la = this._input.LA(1);
                                            if (!(_la === Python3Parser.DOT || _la === Python3Parser.ELLIPSIS)) {
                                                this._errHandler.recoverInline(this);
                                            }
                                            else {
                                                if (this._input.LA(1) === Token_1.Token.EOF) {
                                                    this.matchedEOF = true;
                                                }
                                                this._errHandler.reportMatch(this);
                                                this.consume();
                                            }
                                        }
                                    }
                                    this.state = 528;
                                    this._errHandler.sync(this);
                                    _la = this._input.LA(1);
                                }
                                this.state = 529;
                                this.dotted_name();
                            }
                            break;
                        case 2:
                            {
                                this.state = 531;
                                this._errHandler.sync(this);
                                _la = this._input.LA(1);
                                do {
                                    {
                                        {
                                            this.state = 530;
                                            _la = this._input.LA(1);
                                            if (!(_la === Python3Parser.DOT || _la === Python3Parser.ELLIPSIS)) {
                                                this._errHandler.recoverInline(this);
                                            }
                                            else {
                                                if (this._input.LA(1) === Token_1.Token.EOF) {
                                                    this.matchedEOF = true;
                                                }
                                                this._errHandler.reportMatch(this);
                                                this.consume();
                                            }
                                        }
                                    }
                                    this.state = 533;
                                    this._errHandler.sync(this);
                                    _la = this._input.LA(1);
                                } while (_la === Python3Parser.DOT || _la === Python3Parser.ELLIPSIS);
                            }
                            break;
                    }
                    this.state = 537;
                    this.match(Python3Parser.IMPORT);
                    this.state = 544;
                    this._errHandler.sync(this);
                    switch (this._input.LA(1)) {
                        case Python3Parser.STAR:
                            {
                                this.state = 538;
                                this.match(Python3Parser.STAR);
                            }
                            break;
                        case Python3Parser.OPEN_PAREN:
                            {
                                this.state = 539;
                                this.match(Python3Parser.OPEN_PAREN);
                                this.state = 540;
                                this.import_as_names();
                                this.state = 541;
                                this.match(Python3Parser.CLOSE_PAREN);
                            }
                            break;
                        case Python3Parser.NAME:
                            {
                                this.state = 543;
                                this.import_as_names();
                            }
                            break;
                        default:
                            throw new NoViableAltException_1.NoViableAltException(this);
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    import_as_name() {
        let _localctx = new Import_as_nameContext(this._ctx, this.state);
        this.enterRule(_localctx, 64, Python3Parser.RULE_import_as_name);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 546;
                this.match(Python3Parser.NAME);
                this.state = 549;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === Python3Parser.AS) {
                    {
                        this.state = 547;
                        this.match(Python3Parser.AS);
                        this.state = 548;
                        this.match(Python3Parser.NAME);
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    dotted_as_name() {
        let _localctx = new Dotted_as_nameContext(this._ctx, this.state);
        this.enterRule(_localctx, 66, Python3Parser.RULE_dotted_as_name);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 551;
                this.dotted_name();
                this.state = 554;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === Python3Parser.AS) {
                    {
                        this.state = 552;
                        this.match(Python3Parser.AS);
                        this.state = 553;
                        this.match(Python3Parser.NAME);
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    import_as_names() {
        let _localctx = new Import_as_namesContext(this._ctx, this.state);
        this.enterRule(_localctx, 68, Python3Parser.RULE_import_as_names);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 556;
                this.import_as_name();
                this.state = 561;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 75, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 557;
                                this.match(Python3Parser.COMMA);
                                this.state = 558;
                                this.import_as_name();
                            }
                        }
                    }
                    this.state = 563;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 75, this._ctx);
                }
                this.state = 565;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === Python3Parser.COMMA) {
                    {
                        this.state = 564;
                        this.match(Python3Parser.COMMA);
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    dotted_as_names() {
        let _localctx = new Dotted_as_namesContext(this._ctx, this.state);
        this.enterRule(_localctx, 70, Python3Parser.RULE_dotted_as_names);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 567;
                this.dotted_as_name();
                this.state = 572;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === Python3Parser.COMMA) {
                    {
                        {
                            this.state = 568;
                            this.match(Python3Parser.COMMA);
                            this.state = 569;
                            this.dotted_as_name();
                        }
                    }
                    this.state = 574;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    dotted_name() {
        let _localctx = new Dotted_nameContext(this._ctx, this.state);
        this.enterRule(_localctx, 72, Python3Parser.RULE_dotted_name);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 575;
                this.match(Python3Parser.NAME);
                this.state = 580;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === Python3Parser.DOT) {
                    {
                        {
                            this.state = 576;
                            this.match(Python3Parser.DOT);
                            this.state = 577;
                            this.match(Python3Parser.NAME);
                        }
                    }
                    this.state = 582;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    global_stmt() {
        let _localctx = new Global_stmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 74, Python3Parser.RULE_global_stmt);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 583;
                this.match(Python3Parser.GLOBAL);
                this.state = 584;
                this.match(Python3Parser.NAME);
                this.state = 589;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === Python3Parser.COMMA) {
                    {
                        {
                            this.state = 585;
                            this.match(Python3Parser.COMMA);
                            this.state = 586;
                            this.match(Python3Parser.NAME);
                        }
                    }
                    this.state = 591;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    nonlocal_stmt() {
        let _localctx = new Nonlocal_stmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 76, Python3Parser.RULE_nonlocal_stmt);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 592;
                this.match(Python3Parser.NONLOCAL);
                this.state = 593;
                this.match(Python3Parser.NAME);
                this.state = 598;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === Python3Parser.COMMA) {
                    {
                        {
                            this.state = 594;
                            this.match(Python3Parser.COMMA);
                            this.state = 595;
                            this.match(Python3Parser.NAME);
                        }
                    }
                    this.state = 600;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    assert_stmt() {
        let _localctx = new Assert_stmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 78, Python3Parser.RULE_assert_stmt);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 601;
                this.match(Python3Parser.ASSERT);
                this.state = 602;
                this.test();
                this.state = 605;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === Python3Parser.COMMA) {
                    {
                        this.state = 603;
                        this.match(Python3Parser.COMMA);
                        this.state = 604;
                        this.test();
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    compound_stmt() {
        let _localctx = new Compound_stmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 80, Python3Parser.RULE_compound_stmt);
        try {
            this.state = 616;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case Python3Parser.IF:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 607;
                        this.if_stmt();
                    }
                    break;
                case Python3Parser.WHILE:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 608;
                        this.while_stmt();
                    }
                    break;
                case Python3Parser.FOR:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 609;
                        this.for_stmt();
                    }
                    break;
                case Python3Parser.TRY:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 610;
                        this.try_stmt();
                    }
                    break;
                case Python3Parser.WITH:
                    this.enterOuterAlt(_localctx, 5);
                    {
                        this.state = 611;
                        this.with_stmt();
                    }
                    break;
                case Python3Parser.DEF:
                    this.enterOuterAlt(_localctx, 6);
                    {
                        this.state = 612;
                        this.funcdef();
                    }
                    break;
                case Python3Parser.CLASS:
                    this.enterOuterAlt(_localctx, 7);
                    {
                        this.state = 613;
                        this.classdef();
                    }
                    break;
                case Python3Parser.AT:
                    this.enterOuterAlt(_localctx, 8);
                    {
                        this.state = 614;
                        this.decorated();
                    }
                    break;
                case Python3Parser.ASYNC:
                    this.enterOuterAlt(_localctx, 9);
                    {
                        this.state = 615;
                        this.async_stmt();
                    }
                    break;
                default:
                    throw new NoViableAltException_1.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    async_stmt() {
        let _localctx = new Async_stmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 82, Python3Parser.RULE_async_stmt);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 618;
                this.match(Python3Parser.ASYNC);
                this.state = 622;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case Python3Parser.DEF:
                        {
                            this.state = 619;
                            this.funcdef();
                        }
                        break;
                    case Python3Parser.WITH:
                        {
                            this.state = 620;
                            this.with_stmt();
                        }
                        break;
                    case Python3Parser.FOR:
                        {
                            this.state = 621;
                            this.for_stmt();
                        }
                        break;
                    default:
                        throw new NoViableAltException_1.NoViableAltException(this);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    if_stmt() {
        let _localctx = new If_stmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 84, Python3Parser.RULE_if_stmt);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 624;
                this.match(Python3Parser.IF);
                this.state = 625;
                this.test();
                this.state = 626;
                this.match(Python3Parser.COLON);
                this.state = 627;
                this.suite();
                this.state = 635;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === Python3Parser.ELIF) {
                    {
                        {
                            this.state = 628;
                            this.match(Python3Parser.ELIF);
                            this.state = 629;
                            this.test();
                            this.state = 630;
                            this.match(Python3Parser.COLON);
                            this.state = 631;
                            this.suite();
                        }
                    }
                    this.state = 637;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 641;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === Python3Parser.ELSE) {
                    {
                        this.state = 638;
                        this.match(Python3Parser.ELSE);
                        this.state = 639;
                        this.match(Python3Parser.COLON);
                        this.state = 640;
                        this.suite();
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    while_stmt() {
        let _localctx = new While_stmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 86, Python3Parser.RULE_while_stmt);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 643;
                this.match(Python3Parser.WHILE);
                this.state = 644;
                this.test();
                this.state = 645;
                this.match(Python3Parser.COLON);
                this.state = 646;
                this.suite();
                this.state = 650;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === Python3Parser.ELSE) {
                    {
                        this.state = 647;
                        this.match(Python3Parser.ELSE);
                        this.state = 648;
                        this.match(Python3Parser.COLON);
                        this.state = 649;
                        this.suite();
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    for_stmt() {
        let _localctx = new For_stmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 88, Python3Parser.RULE_for_stmt);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 652;
                this.match(Python3Parser.FOR);
                this.state = 653;
                this.exprlist();
                this.state = 654;
                this.match(Python3Parser.IN);
                this.state = 655;
                this.testlist();
                this.state = 656;
                this.match(Python3Parser.COLON);
                this.state = 657;
                this.suite();
                this.state = 661;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === Python3Parser.ELSE) {
                    {
                        this.state = 658;
                        this.match(Python3Parser.ELSE);
                        this.state = 659;
                        this.match(Python3Parser.COLON);
                        this.state = 660;
                        this.suite();
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    try_stmt() {
        let _localctx = new Try_stmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 90, Python3Parser.RULE_try_stmt);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                {
                    this.state = 663;
                    this.match(Python3Parser.TRY);
                    this.state = 664;
                    this.match(Python3Parser.COLON);
                    this.state = 665;
                    this.suite();
                    this.state = 687;
                    this._errHandler.sync(this);
                    switch (this._input.LA(1)) {
                        case Python3Parser.EXCEPT:
                            {
                                this.state = 670;
                                this._errHandler.sync(this);
                                _la = this._input.LA(1);
                                do {
                                    {
                                        {
                                            this.state = 666;
                                            this.except_clause();
                                            this.state = 667;
                                            this.match(Python3Parser.COLON);
                                            this.state = 668;
                                            this.suite();
                                        }
                                    }
                                    this.state = 672;
                                    this._errHandler.sync(this);
                                    _la = this._input.LA(1);
                                } while (_la === Python3Parser.EXCEPT);
                                this.state = 677;
                                this._errHandler.sync(this);
                                _la = this._input.LA(1);
                                if (_la === Python3Parser.ELSE) {
                                    {
                                        this.state = 674;
                                        this.match(Python3Parser.ELSE);
                                        this.state = 675;
                                        this.match(Python3Parser.COLON);
                                        this.state = 676;
                                        this.suite();
                                    }
                                }
                                this.state = 682;
                                this._errHandler.sync(this);
                                _la = this._input.LA(1);
                                if (_la === Python3Parser.FINALLY) {
                                    {
                                        this.state = 679;
                                        this.match(Python3Parser.FINALLY);
                                        this.state = 680;
                                        this.match(Python3Parser.COLON);
                                        this.state = 681;
                                        this.suite();
                                    }
                                }
                            }
                            break;
                        case Python3Parser.FINALLY:
                            {
                                this.state = 684;
                                this.match(Python3Parser.FINALLY);
                                this.state = 685;
                                this.match(Python3Parser.COLON);
                                this.state = 686;
                                this.suite();
                            }
                            break;
                        default:
                            throw new NoViableAltException_1.NoViableAltException(this);
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    with_stmt() {
        let _localctx = new With_stmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 92, Python3Parser.RULE_with_stmt);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 689;
                this.match(Python3Parser.WITH);
                this.state = 690;
                this.with_item();
                this.state = 695;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === Python3Parser.COMMA) {
                    {
                        {
                            this.state = 691;
                            this.match(Python3Parser.COMMA);
                            this.state = 692;
                            this.with_item();
                        }
                    }
                    this.state = 697;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 698;
                this.match(Python3Parser.COLON);
                this.state = 699;
                this.suite();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    with_item() {
        let _localctx = new With_itemContext(this._ctx, this.state);
        this.enterRule(_localctx, 94, Python3Parser.RULE_with_item);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 701;
                this.test();
                this.state = 704;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === Python3Parser.AS) {
                    {
                        this.state = 702;
                        this.match(Python3Parser.AS);
                        this.state = 703;
                        this.expr();
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    except_clause() {
        let _localctx = new Except_clauseContext(this._ctx, this.state);
        this.enterRule(_localctx, 96, Python3Parser.RULE_except_clause);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 706;
                this.match(Python3Parser.EXCEPT);
                this.state = 712;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (((_la & ~0x1f) === 0 &&
                    ((1 << _la) &
                        ((1 << Python3Parser.STRING) |
                            (1 << Python3Parser.NUMBER) |
                            (1 << Python3Parser.LAMBDA) |
                            (1 << Python3Parser.NOT) |
                            (1 << Python3Parser.NONE) |
                            (1 << Python3Parser.TRUE) |
                            (1 << Python3Parser.FALSE))) !==
                        0) ||
                    (((_la - 38) & ~0x1f) === 0 &&
                        ((1 << (_la - 38)) &
                            ((1 << (Python3Parser.AWAIT - 38)) |
                                (1 << (Python3Parser.NAME - 38)) |
                                (1 << (Python3Parser.ELLIPSIS - 38)) |
                                (1 << (Python3Parser.OPEN_PAREN - 38)) |
                                (1 << (Python3Parser.OPEN_BRACK - 38)) |
                                (1 << (Python3Parser.ADD - 38)) |
                                (1 << (Python3Parser.MINUS - 38)))) !==
                            0) ||
                    _la === Python3Parser.NOT_OP ||
                    _la === Python3Parser.OPEN_BRACE) {
                    {
                        this.state = 707;
                        this.test();
                        this.state = 710;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (_la === Python3Parser.AS) {
                            {
                                this.state = 708;
                                this.match(Python3Parser.AS);
                                this.state = 709;
                                this.match(Python3Parser.NAME);
                            }
                        }
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    suite() {
        let _localctx = new SuiteContext(this._ctx, this.state);
        this.enterRule(_localctx, 98, Python3Parser.RULE_suite);
        let _la;
        try {
            this.state = 724;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case Python3Parser.STRING:
                case Python3Parser.NUMBER:
                case Python3Parser.RETURN:
                case Python3Parser.RAISE:
                case Python3Parser.FROM:
                case Python3Parser.IMPORT:
                case Python3Parser.GLOBAL:
                case Python3Parser.NONLOCAL:
                case Python3Parser.ASSERT:
                case Python3Parser.LAMBDA:
                case Python3Parser.NOT:
                case Python3Parser.NONE:
                case Python3Parser.TRUE:
                case Python3Parser.FALSE:
                case Python3Parser.YIELD:
                case Python3Parser.DEL:
                case Python3Parser.PASS:
                case Python3Parser.CONTINUE:
                case Python3Parser.BREAK:
                case Python3Parser.AWAIT:
                case Python3Parser.NAME:
                case Python3Parser.ELLIPSIS:
                case Python3Parser.STAR:
                case Python3Parser.OPEN_PAREN:
                case Python3Parser.OPEN_BRACK:
                case Python3Parser.ADD:
                case Python3Parser.MINUS:
                case Python3Parser.NOT_OP:
                case Python3Parser.OPEN_BRACE:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 714;
                        this.simple_stmt();
                    }
                    break;
                case Python3Parser.NEWLINE:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 715;
                        this.match(Python3Parser.NEWLINE);
                        this.state = 716;
                        this.match(Python3Parser.INDENT);
                        this.state = 718;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        do {
                            {
                                {
                                    this.state = 717;
                                    this.stmt();
                                }
                            }
                            this.state = 720;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        } while (((_la & ~0x1f) === 0 &&
                            ((1 << _la) &
                                ((1 << Python3Parser.STRING) |
                                    (1 << Python3Parser.NUMBER) |
                                    (1 << Python3Parser.DEF) |
                                    (1 << Python3Parser.RETURN) |
                                    (1 << Python3Parser.RAISE) |
                                    (1 << Python3Parser.FROM) |
                                    (1 << Python3Parser.IMPORT) |
                                    (1 << Python3Parser.GLOBAL) |
                                    (1 << Python3Parser.NONLOCAL) |
                                    (1 << Python3Parser.ASSERT) |
                                    (1 << Python3Parser.IF) |
                                    (1 << Python3Parser.WHILE) |
                                    (1 << Python3Parser.FOR) |
                                    (1 << Python3Parser.TRY) |
                                    (1 << Python3Parser.WITH) |
                                    (1 << Python3Parser.LAMBDA) |
                                    (1 << Python3Parser.NOT) |
                                    (1 << Python3Parser.NONE) |
                                    (1 << Python3Parser.TRUE) |
                                    (1 << Python3Parser.FALSE) |
                                    (1 << Python3Parser.CLASS))) !==
                                0) ||
                            (((_la - 32) & ~0x1f) === 0 &&
                                ((1 << (_la - 32)) &
                                    ((1 << (Python3Parser.YIELD - 32)) |
                                        (1 << (Python3Parser.DEL - 32)) |
                                        (1 << (Python3Parser.PASS - 32)) |
                                        (1 << (Python3Parser.CONTINUE - 32)) |
                                        (1 << (Python3Parser.BREAK - 32)) |
                                        (1 << (Python3Parser.ASYNC - 32)) |
                                        (1 << (Python3Parser.AWAIT - 32)) |
                                        (1 << (Python3Parser.NAME - 32)) |
                                        (1 << (Python3Parser.ELLIPSIS - 32)) |
                                        (1 << (Python3Parser.STAR - 32)) |
                                        (1 << (Python3Parser.OPEN_PAREN - 32)) |
                                        (1 << (Python3Parser.OPEN_BRACK - 32)))) !==
                                    0) ||
                            (((_la - 66) & ~0x1f) === 0 &&
                                ((1 << (_la - 66)) &
                                    ((1 << (Python3Parser.ADD - 66)) |
                                        (1 << (Python3Parser.MINUS - 66)) |
                                        (1 << (Python3Parser.NOT_OP - 66)) |
                                        (1 << (Python3Parser.OPEN_BRACE - 66)) |
                                        (1 << (Python3Parser.AT - 66)))) !==
                                    0));
                        this.state = 722;
                        this.match(Python3Parser.DEDENT);
                    }
                    break;
                default:
                    throw new NoViableAltException_1.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    test() {
        let _localctx = new TestContext(this._ctx, this.state);
        this.enterRule(_localctx, 100, Python3Parser.RULE_test);
        let _la;
        try {
            this.state = 735;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case Python3Parser.STRING:
                case Python3Parser.NUMBER:
                case Python3Parser.NOT:
                case Python3Parser.NONE:
                case Python3Parser.TRUE:
                case Python3Parser.FALSE:
                case Python3Parser.AWAIT:
                case Python3Parser.NAME:
                case Python3Parser.ELLIPSIS:
                case Python3Parser.OPEN_PAREN:
                case Python3Parser.OPEN_BRACK:
                case Python3Parser.ADD:
                case Python3Parser.MINUS:
                case Python3Parser.NOT_OP:
                case Python3Parser.OPEN_BRACE:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 726;
                        this.or_test();
                        this.state = 732;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (_la === Python3Parser.IF) {
                            {
                                this.state = 727;
                                this.match(Python3Parser.IF);
                                this.state = 728;
                                this.or_test();
                                this.state = 729;
                                this.match(Python3Parser.ELSE);
                                this.state = 730;
                                this.test();
                            }
                        }
                    }
                    break;
                case Python3Parser.LAMBDA:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 734;
                        this.lambdef();
                    }
                    break;
                default:
                    throw new NoViableAltException_1.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    test_nocond() {
        let _localctx = new Test_nocondContext(this._ctx, this.state);
        this.enterRule(_localctx, 102, Python3Parser.RULE_test_nocond);
        try {
            this.state = 739;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case Python3Parser.STRING:
                case Python3Parser.NUMBER:
                case Python3Parser.NOT:
                case Python3Parser.NONE:
                case Python3Parser.TRUE:
                case Python3Parser.FALSE:
                case Python3Parser.AWAIT:
                case Python3Parser.NAME:
                case Python3Parser.ELLIPSIS:
                case Python3Parser.OPEN_PAREN:
                case Python3Parser.OPEN_BRACK:
                case Python3Parser.ADD:
                case Python3Parser.MINUS:
                case Python3Parser.NOT_OP:
                case Python3Parser.OPEN_BRACE:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 737;
                        this.or_test();
                    }
                    break;
                case Python3Parser.LAMBDA:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 738;
                        this.lambdef_nocond();
                    }
                    break;
                default:
                    throw new NoViableAltException_1.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    lambdef() {
        let _localctx = new LambdefContext(this._ctx, this.state);
        this.enterRule(_localctx, 104, Python3Parser.RULE_lambdef);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 741;
                this.match(Python3Parser.LAMBDA);
                this.state = 743;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (((_la - 40) & ~0x1f) === 0 &&
                    ((1 << (_la - 40)) &
                        ((1 << (Python3Parser.NAME - 40)) |
                            (1 << (Python3Parser.STAR - 40)) |
                            (1 << (Python3Parser.POWER - 40)))) !==
                        0) {
                    {
                        this.state = 742;
                        this.varargslist();
                    }
                }
                this.state = 745;
                this.match(Python3Parser.COLON);
                this.state = 746;
                this.test();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    lambdef_nocond() {
        let _localctx = new Lambdef_nocondContext(this._ctx, this.state);
        this.enterRule(_localctx, 106, Python3Parser.RULE_lambdef_nocond);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 748;
                this.match(Python3Parser.LAMBDA);
                this.state = 750;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (((_la - 40) & ~0x1f) === 0 &&
                    ((1 << (_la - 40)) &
                        ((1 << (Python3Parser.NAME - 40)) |
                            (1 << (Python3Parser.STAR - 40)) |
                            (1 << (Python3Parser.POWER - 40)))) !==
                        0) {
                    {
                        this.state = 749;
                        this.varargslist();
                    }
                }
                this.state = 752;
                this.match(Python3Parser.COLON);
                this.state = 753;
                this.test_nocond();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    or_test() {
        let _localctx = new Or_testContext(this._ctx, this.state);
        this.enterRule(_localctx, 108, Python3Parser.RULE_or_test);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 755;
                this.and_test();
                this.state = 760;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === Python3Parser.OR) {
                    {
                        {
                            this.state = 756;
                            this.match(Python3Parser.OR);
                            this.state = 757;
                            this.and_test();
                        }
                    }
                    this.state = 762;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    and_test() {
        let _localctx = new And_testContext(this._ctx, this.state);
        this.enterRule(_localctx, 110, Python3Parser.RULE_and_test);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 763;
                this.not_test();
                this.state = 768;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === Python3Parser.AND) {
                    {
                        {
                            this.state = 764;
                            this.match(Python3Parser.AND);
                            this.state = 765;
                            this.not_test();
                        }
                    }
                    this.state = 770;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    not_test() {
        let _localctx = new Not_testContext(this._ctx, this.state);
        this.enterRule(_localctx, 112, Python3Parser.RULE_not_test);
        try {
            this.state = 774;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case Python3Parser.NOT:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 771;
                        this.match(Python3Parser.NOT);
                        this.state = 772;
                        this.not_test();
                    }
                    break;
                case Python3Parser.STRING:
                case Python3Parser.NUMBER:
                case Python3Parser.NONE:
                case Python3Parser.TRUE:
                case Python3Parser.FALSE:
                case Python3Parser.AWAIT:
                case Python3Parser.NAME:
                case Python3Parser.ELLIPSIS:
                case Python3Parser.OPEN_PAREN:
                case Python3Parser.OPEN_BRACK:
                case Python3Parser.ADD:
                case Python3Parser.MINUS:
                case Python3Parser.NOT_OP:
                case Python3Parser.OPEN_BRACE:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 773;
                        this.comparison();
                    }
                    break;
                default:
                    throw new NoViableAltException_1.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    comparison() {
        let _localctx = new ComparisonContext(this._ctx, this.state);
        this.enterRule(_localctx, 114, Python3Parser.RULE_comparison);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 776;
                this.expr();
                this.state = 782;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (((_la & ~0x1f) === 0 &&
                    ((1 << _la) &
                        ((1 << Python3Parser.IN) | (1 << Python3Parser.NOT) | (1 << Python3Parser.IS))) !==
                        0) ||
                    (((_la - 74) & ~0x1f) === 0 &&
                        ((1 << (_la - 74)) &
                            ((1 << (Python3Parser.LESS_THAN - 74)) |
                                (1 << (Python3Parser.GREATER_THAN - 74)) |
                                (1 << (Python3Parser.EQUALS - 74)) |
                                (1 << (Python3Parser.GT_EQ - 74)) |
                                (1 << (Python3Parser.LT_EQ - 74)) |
                                (1 << (Python3Parser.NOT_EQ_1 - 74)) |
                                (1 << (Python3Parser.NOT_EQ_2 - 74)))) !==
                            0)) {
                    {
                        {
                            this.state = 777;
                            this.comp_op();
                            this.state = 778;
                            this.expr();
                        }
                    }
                    this.state = 784;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    comp_op() {
        let _localctx = new Comp_opContext(this._ctx, this.state);
        this.enterRule(_localctx, 116, Python3Parser.RULE_comp_op);
        try {
            this.state = 798;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 107, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 785;
                        this.match(Python3Parser.LESS_THAN);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 786;
                        this.match(Python3Parser.GREATER_THAN);
                    }
                    break;
                case 3:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 787;
                        this.match(Python3Parser.EQUALS);
                    }
                    break;
                case 4:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 788;
                        this.match(Python3Parser.GT_EQ);
                    }
                    break;
                case 5:
                    this.enterOuterAlt(_localctx, 5);
                    {
                        this.state = 789;
                        this.match(Python3Parser.LT_EQ);
                    }
                    break;
                case 6:
                    this.enterOuterAlt(_localctx, 6);
                    {
                        this.state = 790;
                        this.match(Python3Parser.NOT_EQ_1);
                    }
                    break;
                case 7:
                    this.enterOuterAlt(_localctx, 7);
                    {
                        this.state = 791;
                        this.match(Python3Parser.NOT_EQ_2);
                    }
                    break;
                case 8:
                    this.enterOuterAlt(_localctx, 8);
                    {
                        this.state = 792;
                        this.match(Python3Parser.IN);
                    }
                    break;
                case 9:
                    this.enterOuterAlt(_localctx, 9);
                    {
                        this.state = 793;
                        this.match(Python3Parser.NOT);
                        this.state = 794;
                        this.match(Python3Parser.IN);
                    }
                    break;
                case 10:
                    this.enterOuterAlt(_localctx, 10);
                    {
                        this.state = 795;
                        this.match(Python3Parser.IS);
                    }
                    break;
                case 11:
                    this.enterOuterAlt(_localctx, 11);
                    {
                        this.state = 796;
                        this.match(Python3Parser.IS);
                        this.state = 797;
                        this.match(Python3Parser.NOT);
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    star_expr() {
        let _localctx = new Star_exprContext(this._ctx, this.state);
        this.enterRule(_localctx, 118, Python3Parser.RULE_star_expr);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 800;
                this.match(Python3Parser.STAR);
                this.state = 801;
                this.expr();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    expr() {
        let _localctx = new ExprContext(this._ctx, this.state);
        this.enterRule(_localctx, 120, Python3Parser.RULE_expr);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 803;
                this.xor_expr();
                this.state = 808;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === Python3Parser.OR_OP) {
                    {
                        {
                            this.state = 804;
                            this.match(Python3Parser.OR_OP);
                            this.state = 805;
                            this.xor_expr();
                        }
                    }
                    this.state = 810;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    xor_expr() {
        let _localctx = new Xor_exprContext(this._ctx, this.state);
        this.enterRule(_localctx, 122, Python3Parser.RULE_xor_expr);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 811;
                this.and_expr();
                this.state = 816;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === Python3Parser.XOR) {
                    {
                        {
                            this.state = 812;
                            this.match(Python3Parser.XOR);
                            this.state = 813;
                            this.and_expr();
                        }
                    }
                    this.state = 818;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    and_expr() {
        let _localctx = new And_exprContext(this._ctx, this.state);
        this.enterRule(_localctx, 124, Python3Parser.RULE_and_expr);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 819;
                this.shift_expr();
                this.state = 824;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === Python3Parser.AND_OP) {
                    {
                        {
                            this.state = 820;
                            this.match(Python3Parser.AND_OP);
                            this.state = 821;
                            this.shift_expr();
                        }
                    }
                    this.state = 826;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    shift_expr() {
        let _localctx = new Shift_exprContext(this._ctx, this.state);
        this.enterRule(_localctx, 126, Python3Parser.RULE_shift_expr);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 827;
                this.arith_expr();
                this.state = 832;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === Python3Parser.LEFT_SHIFT || _la === Python3Parser.RIGHT_SHIFT) {
                    {
                        {
                            this.state = 828;
                            _la = this._input.LA(1);
                            if (!(_la === Python3Parser.LEFT_SHIFT || _la === Python3Parser.RIGHT_SHIFT)) {
                                this._errHandler.recoverInline(this);
                            }
                            else {
                                if (this._input.LA(1) === Token_1.Token.EOF) {
                                    this.matchedEOF = true;
                                }
                                this._errHandler.reportMatch(this);
                                this.consume();
                            }
                            this.state = 829;
                            this.arith_expr();
                        }
                    }
                    this.state = 834;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    arith_expr() {
        let _localctx = new Arith_exprContext(this._ctx, this.state);
        this.enterRule(_localctx, 128, Python3Parser.RULE_arith_expr);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 835;
                this.term();
                this.state = 840;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === Python3Parser.ADD || _la === Python3Parser.MINUS) {
                    {
                        {
                            this.state = 836;
                            _la = this._input.LA(1);
                            if (!(_la === Python3Parser.ADD || _la === Python3Parser.MINUS)) {
                                this._errHandler.recoverInline(this);
                            }
                            else {
                                if (this._input.LA(1) === Token_1.Token.EOF) {
                                    this.matchedEOF = true;
                                }
                                this._errHandler.reportMatch(this);
                                this.consume();
                            }
                            this.state = 837;
                            this.term();
                        }
                    }
                    this.state = 842;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    term() {
        let _localctx = new TermContext(this._ctx, this.state);
        this.enterRule(_localctx, 130, Python3Parser.RULE_term);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 843;
                this.factor();
                this.state = 848;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (((_la - 51) & ~0x1f) === 0 &&
                    ((1 << (_la - 51)) &
                        ((1 << (Python3Parser.STAR - 51)) |
                            (1 << (Python3Parser.DIV - 51)) |
                            (1 << (Python3Parser.MOD - 51)) |
                            (1 << (Python3Parser.IDIV - 51)) |
                            (1 << (Python3Parser.AT - 51)))) !==
                        0) {
                    {
                        {
                            this.state = 844;
                            _la = this._input.LA(1);
                            if (!(((_la - 51) & ~0x1f) === 0 &&
                                ((1 << (_la - 51)) &
                                    ((1 << (Python3Parser.STAR - 51)) |
                                        (1 << (Python3Parser.DIV - 51)) |
                                        (1 << (Python3Parser.MOD - 51)) |
                                        (1 << (Python3Parser.IDIV - 51)) |
                                        (1 << (Python3Parser.AT - 51)))) !==
                                    0)) {
                                this._errHandler.recoverInline(this);
                            }
                            else {
                                if (this._input.LA(1) === Token_1.Token.EOF) {
                                    this.matchedEOF = true;
                                }
                                this._errHandler.reportMatch(this);
                                this.consume();
                            }
                            this.state = 845;
                            this.factor();
                        }
                    }
                    this.state = 850;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    factor() {
        let _localctx = new FactorContext(this._ctx, this.state);
        this.enterRule(_localctx, 132, Python3Parser.RULE_factor);
        let _la;
        try {
            this.state = 854;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case Python3Parser.ADD:
                case Python3Parser.MINUS:
                case Python3Parser.NOT_OP:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 851;
                        _la = this._input.LA(1);
                        if (!(((_la - 66) & ~0x1f) === 0 &&
                            ((1 << (_la - 66)) &
                                ((1 << (Python3Parser.ADD - 66)) |
                                    (1 << (Python3Parser.MINUS - 66)) |
                                    (1 << (Python3Parser.NOT_OP - 66)))) !==
                                0)) {
                            this._errHandler.recoverInline(this);
                        }
                        else {
                            if (this._input.LA(1) === Token_1.Token.EOF) {
                                this.matchedEOF = true;
                            }
                            this._errHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 852;
                        this.factor();
                    }
                    break;
                case Python3Parser.STRING:
                case Python3Parser.NUMBER:
                case Python3Parser.NONE:
                case Python3Parser.TRUE:
                case Python3Parser.FALSE:
                case Python3Parser.AWAIT:
                case Python3Parser.NAME:
                case Python3Parser.ELLIPSIS:
                case Python3Parser.OPEN_PAREN:
                case Python3Parser.OPEN_BRACK:
                case Python3Parser.OPEN_BRACE:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 853;
                        this.power();
                    }
                    break;
                default:
                    throw new NoViableAltException_1.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    power() {
        let _localctx = new PowerContext(this._ctx, this.state);
        this.enterRule(_localctx, 134, Python3Parser.RULE_power);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 856;
                this.atom_expr();
                this.state = 859;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === Python3Parser.POWER) {
                    {
                        this.state = 857;
                        this.match(Python3Parser.POWER);
                        this.state = 858;
                        this.factor();
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    atom_expr() {
        let _localctx = new Atom_exprContext(this._ctx, this.state);
        this.enterRule(_localctx, 136, Python3Parser.RULE_atom_expr);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 862;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === Python3Parser.AWAIT) {
                    {
                        this.state = 861;
                        this.match(Python3Parser.AWAIT);
                    }
                }
                this.state = 864;
                this.atom();
                this.state = 868;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (((_la - 49) & ~0x1f) === 0 &&
                    ((1 << (_la - 49)) &
                        ((1 << (Python3Parser.DOT - 49)) |
                            (1 << (Python3Parser.OPEN_PAREN - 49)) |
                            (1 << (Python3Parser.OPEN_BRACK - 49)))) !==
                        0) {
                    {
                        {
                            this.state = 865;
                            this.trailer();
                        }
                    }
                    this.state = 870;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    atom() {
        let _localctx = new AtomContext(this._ctx, this.state);
        this.enterRule(_localctx, 138, Python3Parser.RULE_atom);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 898;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case Python3Parser.OPEN_PAREN:
                        {
                            this.state = 871;
                            this.match(Python3Parser.OPEN_PAREN);
                            this.state = 874;
                            this._errHandler.sync(this);
                            switch (this._input.LA(1)) {
                                case Python3Parser.YIELD:
                                    {
                                        this.state = 872;
                                        this.yield_expr();
                                    }
                                    break;
                                case Python3Parser.STRING:
                                case Python3Parser.NUMBER:
                                case Python3Parser.LAMBDA:
                                case Python3Parser.NOT:
                                case Python3Parser.NONE:
                                case Python3Parser.TRUE:
                                case Python3Parser.FALSE:
                                case Python3Parser.AWAIT:
                                case Python3Parser.NAME:
                                case Python3Parser.ELLIPSIS:
                                case Python3Parser.STAR:
                                case Python3Parser.OPEN_PAREN:
                                case Python3Parser.OPEN_BRACK:
                                case Python3Parser.ADD:
                                case Python3Parser.MINUS:
                                case Python3Parser.NOT_OP:
                                case Python3Parser.OPEN_BRACE:
                                    {
                                        this.state = 873;
                                        this.testlist_comp();
                                    }
                                    break;
                                case Python3Parser.CLOSE_PAREN:
                                    break;
                                default:
                                    break;
                            }
                            this.state = 876;
                            this.match(Python3Parser.CLOSE_PAREN);
                        }
                        break;
                    case Python3Parser.OPEN_BRACK:
                        {
                            this.state = 877;
                            this.match(Python3Parser.OPEN_BRACK);
                            this.state = 879;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (((_la & ~0x1f) === 0 &&
                                ((1 << _la) &
                                    ((1 << Python3Parser.STRING) |
                                        (1 << Python3Parser.NUMBER) |
                                        (1 << Python3Parser.LAMBDA) |
                                        (1 << Python3Parser.NOT) |
                                        (1 << Python3Parser.NONE) |
                                        (1 << Python3Parser.TRUE) |
                                        (1 << Python3Parser.FALSE))) !==
                                    0) ||
                                (((_la - 38) & ~0x1f) === 0 &&
                                    ((1 << (_la - 38)) &
                                        ((1 << (Python3Parser.AWAIT - 38)) |
                                            (1 << (Python3Parser.NAME - 38)) |
                                            (1 << (Python3Parser.ELLIPSIS - 38)) |
                                            (1 << (Python3Parser.STAR - 38)) |
                                            (1 << (Python3Parser.OPEN_PAREN - 38)) |
                                            (1 << (Python3Parser.OPEN_BRACK - 38)) |
                                            (1 << (Python3Parser.ADD - 38)) |
                                            (1 << (Python3Parser.MINUS - 38)))) !==
                                        0) ||
                                _la === Python3Parser.NOT_OP ||
                                _la === Python3Parser.OPEN_BRACE) {
                                {
                                    this.state = 878;
                                    this.testlist_comp();
                                }
                            }
                            this.state = 881;
                            this.match(Python3Parser.CLOSE_BRACK);
                        }
                        break;
                    case Python3Parser.OPEN_BRACE:
                        {
                            this.state = 882;
                            this.match(Python3Parser.OPEN_BRACE);
                            this.state = 884;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (((_la & ~0x1f) === 0 &&
                                ((1 << _la) &
                                    ((1 << Python3Parser.STRING) |
                                        (1 << Python3Parser.NUMBER) |
                                        (1 << Python3Parser.LAMBDA) |
                                        (1 << Python3Parser.NOT) |
                                        (1 << Python3Parser.NONE) |
                                        (1 << Python3Parser.TRUE) |
                                        (1 << Python3Parser.FALSE))) !==
                                    0) ||
                                (((_la - 38) & ~0x1f) === 0 &&
                                    ((1 << (_la - 38)) &
                                        ((1 << (Python3Parser.AWAIT - 38)) |
                                            (1 << (Python3Parser.NAME - 38)) |
                                            (1 << (Python3Parser.ELLIPSIS - 38)) |
                                            (1 << (Python3Parser.STAR - 38)) |
                                            (1 << (Python3Parser.OPEN_PAREN - 38)) |
                                            (1 << (Python3Parser.POWER - 38)) |
                                            (1 << (Python3Parser.OPEN_BRACK - 38)) |
                                            (1 << (Python3Parser.ADD - 38)) |
                                            (1 << (Python3Parser.MINUS - 38)))) !==
                                        0) ||
                                _la === Python3Parser.NOT_OP ||
                                _la === Python3Parser.OPEN_BRACE) {
                                {
                                    this.state = 883;
                                    this.dictorsetmaker();
                                }
                            }
                            this.state = 886;
                            this.match(Python3Parser.CLOSE_BRACE);
                        }
                        break;
                    case Python3Parser.NAME:
                        {
                            this.state = 887;
                            this.match(Python3Parser.NAME);
                        }
                        break;
                    case Python3Parser.NUMBER:
                        {
                            this.state = 888;
                            this.match(Python3Parser.NUMBER);
                        }
                        break;
                    case Python3Parser.STRING:
                        {
                            this.state = 890;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            do {
                                {
                                    {
                                        this.state = 889;
                                        this.match(Python3Parser.STRING);
                                    }
                                }
                                this.state = 892;
                                this._errHandler.sync(this);
                                _la = this._input.LA(1);
                            } while (_la === Python3Parser.STRING);
                        }
                        break;
                    case Python3Parser.ELLIPSIS:
                        {
                            this.state = 894;
                            this.match(Python3Parser.ELLIPSIS);
                        }
                        break;
                    case Python3Parser.NONE:
                        {
                            this.state = 895;
                            this.match(Python3Parser.NONE);
                        }
                        break;
                    case Python3Parser.TRUE:
                        {
                            this.state = 896;
                            this.match(Python3Parser.TRUE);
                        }
                        break;
                    case Python3Parser.FALSE:
                        {
                            this.state = 897;
                            this.match(Python3Parser.FALSE);
                        }
                        break;
                    default:
                        throw new NoViableAltException_1.NoViableAltException(this);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    testlist_comp() {
        let _localctx = new Testlist_compContext(this._ctx, this.state);
        this.enterRule(_localctx, 140, Python3Parser.RULE_testlist_comp);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 902;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case Python3Parser.STRING:
                    case Python3Parser.NUMBER:
                    case Python3Parser.LAMBDA:
                    case Python3Parser.NOT:
                    case Python3Parser.NONE:
                    case Python3Parser.TRUE:
                    case Python3Parser.FALSE:
                    case Python3Parser.AWAIT:
                    case Python3Parser.NAME:
                    case Python3Parser.ELLIPSIS:
                    case Python3Parser.OPEN_PAREN:
                    case Python3Parser.OPEN_BRACK:
                    case Python3Parser.ADD:
                    case Python3Parser.MINUS:
                    case Python3Parser.NOT_OP:
                    case Python3Parser.OPEN_BRACE:
                        {
                            this.state = 900;
                            this.test();
                        }
                        break;
                    case Python3Parser.STAR:
                        {
                            this.state = 901;
                            this.star_expr();
                        }
                        break;
                    default:
                        throw new NoViableAltException_1.NoViableAltException(this);
                }
                this.state = 918;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case Python3Parser.FOR:
                    case Python3Parser.ASYNC:
                        {
                            this.state = 904;
                            this.comp_for();
                        }
                        break;
                    case Python3Parser.CLOSE_PAREN:
                    case Python3Parser.COMMA:
                    case Python3Parser.CLOSE_BRACK:
                        {
                            this.state = 912;
                            this._errHandler.sync(this);
                            _alt = this.interpreter.adaptivePredict(this._input, 125, this._ctx);
                            while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                                if (_alt === 1) {
                                    {
                                        {
                                            this.state = 905;
                                            this.match(Python3Parser.COMMA);
                                            this.state = 908;
                                            this._errHandler.sync(this);
                                            switch (this._input.LA(1)) {
                                                case Python3Parser.STRING:
                                                case Python3Parser.NUMBER:
                                                case Python3Parser.LAMBDA:
                                                case Python3Parser.NOT:
                                                case Python3Parser.NONE:
                                                case Python3Parser.TRUE:
                                                case Python3Parser.FALSE:
                                                case Python3Parser.AWAIT:
                                                case Python3Parser.NAME:
                                                case Python3Parser.ELLIPSIS:
                                                case Python3Parser.OPEN_PAREN:
                                                case Python3Parser.OPEN_BRACK:
                                                case Python3Parser.ADD:
                                                case Python3Parser.MINUS:
                                                case Python3Parser.NOT_OP:
                                                case Python3Parser.OPEN_BRACE:
                                                    {
                                                        this.state = 906;
                                                        this.test();
                                                    }
                                                    break;
                                                case Python3Parser.STAR:
                                                    {
                                                        this.state = 907;
                                                        this.star_expr();
                                                    }
                                                    break;
                                                default:
                                                    throw new NoViableAltException_1.NoViableAltException(this);
                                            }
                                        }
                                    }
                                }
                                this.state = 914;
                                this._errHandler.sync(this);
                                _alt = this.interpreter.adaptivePredict(this._input, 125, this._ctx);
                            }
                            this.state = 916;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (_la === Python3Parser.COMMA) {
                                {
                                    this.state = 915;
                                    this.match(Python3Parser.COMMA);
                                }
                            }
                        }
                        break;
                    default:
                        throw new NoViableAltException_1.NoViableAltException(this);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    trailer() {
        let _localctx = new TrailerContext(this._ctx, this.state);
        this.enterRule(_localctx, 142, Python3Parser.RULE_trailer);
        let _la;
        try {
            this.state = 931;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case Python3Parser.OPEN_PAREN:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 920;
                        this.match(Python3Parser.OPEN_PAREN);
                        this.state = 922;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (((_la & ~0x1f) === 0 &&
                            ((1 << _la) &
                                ((1 << Python3Parser.STRING) |
                                    (1 << Python3Parser.NUMBER) |
                                    (1 << Python3Parser.LAMBDA) |
                                    (1 << Python3Parser.NOT) |
                                    (1 << Python3Parser.NONE) |
                                    (1 << Python3Parser.TRUE) |
                                    (1 << Python3Parser.FALSE))) !==
                                0) ||
                            (((_la - 38) & ~0x1f) === 0 &&
                                ((1 << (_la - 38)) &
                                    ((1 << (Python3Parser.AWAIT - 38)) |
                                        (1 << (Python3Parser.NAME - 38)) |
                                        (1 << (Python3Parser.ELLIPSIS - 38)) |
                                        (1 << (Python3Parser.STAR - 38)) |
                                        (1 << (Python3Parser.OPEN_PAREN - 38)) |
                                        (1 << (Python3Parser.POWER - 38)) |
                                        (1 << (Python3Parser.OPEN_BRACK - 38)) |
                                        (1 << (Python3Parser.ADD - 38)) |
                                        (1 << (Python3Parser.MINUS - 38)))) !==
                                    0) ||
                            _la === Python3Parser.NOT_OP ||
                            _la === Python3Parser.OPEN_BRACE) {
                            {
                                this.state = 921;
                                this.arglist();
                            }
                        }
                        this.state = 924;
                        this.match(Python3Parser.CLOSE_PAREN);
                    }
                    break;
                case Python3Parser.OPEN_BRACK:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 925;
                        this.match(Python3Parser.OPEN_BRACK);
                        this.state = 926;
                        this.subscriptlist();
                        this.state = 927;
                        this.match(Python3Parser.CLOSE_BRACK);
                    }
                    break;
                case Python3Parser.DOT:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 929;
                        this.match(Python3Parser.DOT);
                        this.state = 930;
                        this.match(Python3Parser.NAME);
                    }
                    break;
                default:
                    throw new NoViableAltException_1.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    subscriptlist() {
        let _localctx = new SubscriptlistContext(this._ctx, this.state);
        this.enterRule(_localctx, 144, Python3Parser.RULE_subscriptlist);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 933;
                this.subscript();
                this.state = 938;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 130, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 934;
                                this.match(Python3Parser.COMMA);
                                this.state = 935;
                                this.subscript();
                            }
                        }
                    }
                    this.state = 940;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 130, this._ctx);
                }
                this.state = 942;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === Python3Parser.COMMA) {
                    {
                        this.state = 941;
                        this.match(Python3Parser.COMMA);
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    subscript() {
        let _localctx = new SubscriptContext(this._ctx, this.state);
        this.enterRule(_localctx, 146, Python3Parser.RULE_subscript);
        let _la;
        try {
            this.state = 955;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 135, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 944;
                        this.test();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 946;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (((_la & ~0x1f) === 0 &&
                            ((1 << _la) &
                                ((1 << Python3Parser.STRING) |
                                    (1 << Python3Parser.NUMBER) |
                                    (1 << Python3Parser.LAMBDA) |
                                    (1 << Python3Parser.NOT) |
                                    (1 << Python3Parser.NONE) |
                                    (1 << Python3Parser.TRUE) |
                                    (1 << Python3Parser.FALSE))) !==
                                0) ||
                            (((_la - 38) & ~0x1f) === 0 &&
                                ((1 << (_la - 38)) &
                                    ((1 << (Python3Parser.AWAIT - 38)) |
                                        (1 << (Python3Parser.NAME - 38)) |
                                        (1 << (Python3Parser.ELLIPSIS - 38)) |
                                        (1 << (Python3Parser.OPEN_PAREN - 38)) |
                                        (1 << (Python3Parser.OPEN_BRACK - 38)) |
                                        (1 << (Python3Parser.ADD - 38)) |
                                        (1 << (Python3Parser.MINUS - 38)))) !==
                                    0) ||
                            _la === Python3Parser.NOT_OP ||
                            _la === Python3Parser.OPEN_BRACE) {
                            {
                                this.state = 945;
                                this.test();
                            }
                        }
                        this.state = 948;
                        this.match(Python3Parser.COLON);
                        this.state = 950;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (((_la & ~0x1f) === 0 &&
                            ((1 << _la) &
                                ((1 << Python3Parser.STRING) |
                                    (1 << Python3Parser.NUMBER) |
                                    (1 << Python3Parser.LAMBDA) |
                                    (1 << Python3Parser.NOT) |
                                    (1 << Python3Parser.NONE) |
                                    (1 << Python3Parser.TRUE) |
                                    (1 << Python3Parser.FALSE))) !==
                                0) ||
                            (((_la - 38) & ~0x1f) === 0 &&
                                ((1 << (_la - 38)) &
                                    ((1 << (Python3Parser.AWAIT - 38)) |
                                        (1 << (Python3Parser.NAME - 38)) |
                                        (1 << (Python3Parser.ELLIPSIS - 38)) |
                                        (1 << (Python3Parser.OPEN_PAREN - 38)) |
                                        (1 << (Python3Parser.OPEN_BRACK - 38)) |
                                        (1 << (Python3Parser.ADD - 38)) |
                                        (1 << (Python3Parser.MINUS - 38)))) !==
                                    0) ||
                            _la === Python3Parser.NOT_OP ||
                            _la === Python3Parser.OPEN_BRACE) {
                            {
                                this.state = 949;
                                this.test();
                            }
                        }
                        this.state = 953;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (_la === Python3Parser.COLON) {
                            {
                                this.state = 952;
                                this.sliceop();
                            }
                        }
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    sliceop() {
        let _localctx = new SliceopContext(this._ctx, this.state);
        this.enterRule(_localctx, 148, Python3Parser.RULE_sliceop);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 957;
                this.match(Python3Parser.COLON);
                this.state = 959;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (((_la & ~0x1f) === 0 &&
                    ((1 << _la) &
                        ((1 << Python3Parser.STRING) |
                            (1 << Python3Parser.NUMBER) |
                            (1 << Python3Parser.LAMBDA) |
                            (1 << Python3Parser.NOT) |
                            (1 << Python3Parser.NONE) |
                            (1 << Python3Parser.TRUE) |
                            (1 << Python3Parser.FALSE))) !==
                        0) ||
                    (((_la - 38) & ~0x1f) === 0 &&
                        ((1 << (_la - 38)) &
                            ((1 << (Python3Parser.AWAIT - 38)) |
                                (1 << (Python3Parser.NAME - 38)) |
                                (1 << (Python3Parser.ELLIPSIS - 38)) |
                                (1 << (Python3Parser.OPEN_PAREN - 38)) |
                                (1 << (Python3Parser.OPEN_BRACK - 38)) |
                                (1 << (Python3Parser.ADD - 38)) |
                                (1 << (Python3Parser.MINUS - 38)))) !==
                            0) ||
                    _la === Python3Parser.NOT_OP ||
                    _la === Python3Parser.OPEN_BRACE) {
                    {
                        this.state = 958;
                        this.test();
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    exprlist() {
        let _localctx = new ExprlistContext(this._ctx, this.state);
        this.enterRule(_localctx, 150, Python3Parser.RULE_exprlist);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 963;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case Python3Parser.STRING:
                    case Python3Parser.NUMBER:
                    case Python3Parser.NONE:
                    case Python3Parser.TRUE:
                    case Python3Parser.FALSE:
                    case Python3Parser.AWAIT:
                    case Python3Parser.NAME:
                    case Python3Parser.ELLIPSIS:
                    case Python3Parser.OPEN_PAREN:
                    case Python3Parser.OPEN_BRACK:
                    case Python3Parser.ADD:
                    case Python3Parser.MINUS:
                    case Python3Parser.NOT_OP:
                    case Python3Parser.OPEN_BRACE:
                        {
                            this.state = 961;
                            this.expr();
                        }
                        break;
                    case Python3Parser.STAR:
                        {
                            this.state = 962;
                            this.star_expr();
                        }
                        break;
                    default:
                        throw new NoViableAltException_1.NoViableAltException(this);
                }
                this.state = 972;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 139, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 965;
                                this.match(Python3Parser.COMMA);
                                this.state = 968;
                                this._errHandler.sync(this);
                                switch (this._input.LA(1)) {
                                    case Python3Parser.STRING:
                                    case Python3Parser.NUMBER:
                                    case Python3Parser.NONE:
                                    case Python3Parser.TRUE:
                                    case Python3Parser.FALSE:
                                    case Python3Parser.AWAIT:
                                    case Python3Parser.NAME:
                                    case Python3Parser.ELLIPSIS:
                                    case Python3Parser.OPEN_PAREN:
                                    case Python3Parser.OPEN_BRACK:
                                    case Python3Parser.ADD:
                                    case Python3Parser.MINUS:
                                    case Python3Parser.NOT_OP:
                                    case Python3Parser.OPEN_BRACE:
                                        {
                                            this.state = 966;
                                            this.expr();
                                        }
                                        break;
                                    case Python3Parser.STAR:
                                        {
                                            this.state = 967;
                                            this.star_expr();
                                        }
                                        break;
                                    default:
                                        throw new NoViableAltException_1.NoViableAltException(this);
                                }
                            }
                        }
                    }
                    this.state = 974;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 139, this._ctx);
                }
                this.state = 976;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === Python3Parser.COMMA) {
                    {
                        this.state = 975;
                        this.match(Python3Parser.COMMA);
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    testlist() {
        let _localctx = new TestlistContext(this._ctx, this.state);
        this.enterRule(_localctx, 152, Python3Parser.RULE_testlist);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 978;
                this.test();
                this.state = 983;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 141, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 979;
                                this.match(Python3Parser.COMMA);
                                this.state = 980;
                                this.test();
                            }
                        }
                    }
                    this.state = 985;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 141, this._ctx);
                }
                this.state = 987;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === Python3Parser.COMMA) {
                    {
                        this.state = 986;
                        this.match(Python3Parser.COMMA);
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    dictorsetmaker() {
        let _localctx = new DictorsetmakerContext(this._ctx, this.state);
        this.enterRule(_localctx, 154, Python3Parser.RULE_dictorsetmaker);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 1037;
                this._errHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this._input, 153, this._ctx)) {
                    case 1:
                        {
                            {
                                this.state = 995;
                                this._errHandler.sync(this);
                                switch (this._input.LA(1)) {
                                    case Python3Parser.STRING:
                                    case Python3Parser.NUMBER:
                                    case Python3Parser.LAMBDA:
                                    case Python3Parser.NOT:
                                    case Python3Parser.NONE:
                                    case Python3Parser.TRUE:
                                    case Python3Parser.FALSE:
                                    case Python3Parser.AWAIT:
                                    case Python3Parser.NAME:
                                    case Python3Parser.ELLIPSIS:
                                    case Python3Parser.OPEN_PAREN:
                                    case Python3Parser.OPEN_BRACK:
                                    case Python3Parser.ADD:
                                    case Python3Parser.MINUS:
                                    case Python3Parser.NOT_OP:
                                    case Python3Parser.OPEN_BRACE:
                                        {
                                            this.state = 989;
                                            this.test();
                                            this.state = 990;
                                            this.match(Python3Parser.COLON);
                                            this.state = 991;
                                            this.test();
                                        }
                                        break;
                                    case Python3Parser.POWER:
                                        {
                                            this.state = 993;
                                            this.match(Python3Parser.POWER);
                                            this.state = 994;
                                            this.expr();
                                        }
                                        break;
                                    default:
                                        throw new NoViableAltException_1.NoViableAltException(this);
                                }
                                this.state = 1015;
                                this._errHandler.sync(this);
                                switch (this._input.LA(1)) {
                                    case Python3Parser.FOR:
                                    case Python3Parser.ASYNC:
                                        {
                                            this.state = 997;
                                            this.comp_for();
                                        }
                                        break;
                                    case Python3Parser.COMMA:
                                    case Python3Parser.CLOSE_BRACE:
                                        {
                                            this.state = 1009;
                                            this._errHandler.sync(this);
                                            _alt = this.interpreter.adaptivePredict(this._input, 145, this._ctx);
                                            while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                                                if (_alt === 1) {
                                                    {
                                                        {
                                                            this.state = 998;
                                                            this.match(Python3Parser.COMMA);
                                                            this.state = 1005;
                                                            this._errHandler.sync(this);
                                                            switch (this._input.LA(1)) {
                                                                case Python3Parser.STRING:
                                                                case Python3Parser.NUMBER:
                                                                case Python3Parser.LAMBDA:
                                                                case Python3Parser.NOT:
                                                                case Python3Parser.NONE:
                                                                case Python3Parser.TRUE:
                                                                case Python3Parser.FALSE:
                                                                case Python3Parser.AWAIT:
                                                                case Python3Parser.NAME:
                                                                case Python3Parser.ELLIPSIS:
                                                                case Python3Parser.OPEN_PAREN:
                                                                case Python3Parser.OPEN_BRACK:
                                                                case Python3Parser.ADD:
                                                                case Python3Parser.MINUS:
                                                                case Python3Parser.NOT_OP:
                                                                case Python3Parser.OPEN_BRACE:
                                                                    {
                                                                        this.state = 999;
                                                                        this.test();
                                                                        this.state = 1000;
                                                                        this.match(Python3Parser.COLON);
                                                                        this.state = 1001;
                                                                        this.test();
                                                                    }
                                                                    break;
                                                                case Python3Parser.POWER:
                                                                    {
                                                                        this.state = 1003;
                                                                        this.match(Python3Parser.POWER);
                                                                        this.state = 1004;
                                                                        this.expr();
                                                                    }
                                                                    break;
                                                                default:
                                                                    throw new NoViableAltException_1.NoViableAltException(this);
                                                            }
                                                        }
                                                    }
                                                }
                                                this.state = 1011;
                                                this._errHandler.sync(this);
                                                _alt = this.interpreter.adaptivePredict(this._input, 145, this._ctx);
                                            }
                                            this.state = 1013;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                            if (_la === Python3Parser.COMMA) {
                                                {
                                                    this.state = 1012;
                                                    this.match(Python3Parser.COMMA);
                                                }
                                            }
                                        }
                                        break;
                                    default:
                                        throw new NoViableAltException_1.NoViableAltException(this);
                                }
                            }
                        }
                        break;
                    case 2:
                        {
                            {
                                this.state = 1019;
                                this._errHandler.sync(this);
                                switch (this._input.LA(1)) {
                                    case Python3Parser.STRING:
                                    case Python3Parser.NUMBER:
                                    case Python3Parser.LAMBDA:
                                    case Python3Parser.NOT:
                                    case Python3Parser.NONE:
                                    case Python3Parser.TRUE:
                                    case Python3Parser.FALSE:
                                    case Python3Parser.AWAIT:
                                    case Python3Parser.NAME:
                                    case Python3Parser.ELLIPSIS:
                                    case Python3Parser.OPEN_PAREN:
                                    case Python3Parser.OPEN_BRACK:
                                    case Python3Parser.ADD:
                                    case Python3Parser.MINUS:
                                    case Python3Parser.NOT_OP:
                                    case Python3Parser.OPEN_BRACE:
                                        {
                                            this.state = 1017;
                                            this.test();
                                        }
                                        break;
                                    case Python3Parser.STAR:
                                        {
                                            this.state = 1018;
                                            this.star_expr();
                                        }
                                        break;
                                    default:
                                        throw new NoViableAltException_1.NoViableAltException(this);
                                }
                                this.state = 1035;
                                this._errHandler.sync(this);
                                switch (this._input.LA(1)) {
                                    case Python3Parser.FOR:
                                    case Python3Parser.ASYNC:
                                        {
                                            this.state = 1021;
                                            this.comp_for();
                                        }
                                        break;
                                    case Python3Parser.COMMA:
                                    case Python3Parser.CLOSE_BRACE:
                                        {
                                            this.state = 1029;
                                            this._errHandler.sync(this);
                                            _alt = this.interpreter.adaptivePredict(this._input, 150, this._ctx);
                                            while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                                                if (_alt === 1) {
                                                    {
                                                        {
                                                            this.state = 1022;
                                                            this.match(Python3Parser.COMMA);
                                                            this.state = 1025;
                                                            this._errHandler.sync(this);
                                                            switch (this._input.LA(1)) {
                                                                case Python3Parser.STRING:
                                                                case Python3Parser.NUMBER:
                                                                case Python3Parser.LAMBDA:
                                                                case Python3Parser.NOT:
                                                                case Python3Parser.NONE:
                                                                case Python3Parser.TRUE:
                                                                case Python3Parser.FALSE:
                                                                case Python3Parser.AWAIT:
                                                                case Python3Parser.NAME:
                                                                case Python3Parser.ELLIPSIS:
                                                                case Python3Parser.OPEN_PAREN:
                                                                case Python3Parser.OPEN_BRACK:
                                                                case Python3Parser.ADD:
                                                                case Python3Parser.MINUS:
                                                                case Python3Parser.NOT_OP:
                                                                case Python3Parser.OPEN_BRACE:
                                                                    {
                                                                        this.state = 1023;
                                                                        this.test();
                                                                    }
                                                                    break;
                                                                case Python3Parser.STAR:
                                                                    {
                                                                        this.state = 1024;
                                                                        this.star_expr();
                                                                    }
                                                                    break;
                                                                default:
                                                                    throw new NoViableAltException_1.NoViableAltException(this);
                                                            }
                                                        }
                                                    }
                                                }
                                                this.state = 1031;
                                                this._errHandler.sync(this);
                                                _alt = this.interpreter.adaptivePredict(this._input, 150, this._ctx);
                                            }
                                            this.state = 1033;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                            if (_la === Python3Parser.COMMA) {
                                                {
                                                    this.state = 1032;
                                                    this.match(Python3Parser.COMMA);
                                                }
                                            }
                                        }
                                        break;
                                    default:
                                        throw new NoViableAltException_1.NoViableAltException(this);
                                }
                            }
                        }
                        break;
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    classdef() {
        let _localctx = new ClassdefContext(this._ctx, this.state);
        this.enterRule(_localctx, 156, Python3Parser.RULE_classdef);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 1039;
                this.match(Python3Parser.CLASS);
                this.state = 1040;
                this.match(Python3Parser.NAME);
                this.state = 1046;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === Python3Parser.OPEN_PAREN) {
                    {
                        this.state = 1041;
                        this.match(Python3Parser.OPEN_PAREN);
                        this.state = 1043;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (((_la & ~0x1f) === 0 &&
                            ((1 << _la) &
                                ((1 << Python3Parser.STRING) |
                                    (1 << Python3Parser.NUMBER) |
                                    (1 << Python3Parser.LAMBDA) |
                                    (1 << Python3Parser.NOT) |
                                    (1 << Python3Parser.NONE) |
                                    (1 << Python3Parser.TRUE) |
                                    (1 << Python3Parser.FALSE))) !==
                                0) ||
                            (((_la - 38) & ~0x1f) === 0 &&
                                ((1 << (_la - 38)) &
                                    ((1 << (Python3Parser.AWAIT - 38)) |
                                        (1 << (Python3Parser.NAME - 38)) |
                                        (1 << (Python3Parser.ELLIPSIS - 38)) |
                                        (1 << (Python3Parser.STAR - 38)) |
                                        (1 << (Python3Parser.OPEN_PAREN - 38)) |
                                        (1 << (Python3Parser.POWER - 38)) |
                                        (1 << (Python3Parser.OPEN_BRACK - 38)) |
                                        (1 << (Python3Parser.ADD - 38)) |
                                        (1 << (Python3Parser.MINUS - 38)))) !==
                                    0) ||
                            _la === Python3Parser.NOT_OP ||
                            _la === Python3Parser.OPEN_BRACE) {
                            {
                                this.state = 1042;
                                this.arglist();
                            }
                        }
                        this.state = 1045;
                        this.match(Python3Parser.CLOSE_PAREN);
                    }
                }
                this.state = 1048;
                this.match(Python3Parser.COLON);
                this.state = 1049;
                this.suite();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    arglist() {
        let _localctx = new ArglistContext(this._ctx, this.state);
        this.enterRule(_localctx, 158, Python3Parser.RULE_arglist);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 1051;
                this.argument();
                this.state = 1056;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 156, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 1052;
                                this.match(Python3Parser.COMMA);
                                this.state = 1053;
                                this.argument();
                            }
                        }
                    }
                    this.state = 1058;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 156, this._ctx);
                }
                this.state = 1060;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === Python3Parser.COMMA) {
                    {
                        this.state = 1059;
                        this.match(Python3Parser.COMMA);
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    argument() {
        let _localctx = new ArgumentContext(this._ctx, this.state);
        this.enterRule(_localctx, 160, Python3Parser.RULE_argument);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 1074;
                this._errHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this._input, 159, this._ctx)) {
                    case 1:
                        {
                            this.state = 1062;
                            this.test();
                            this.state = 1064;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (_la === Python3Parser.FOR || _la === Python3Parser.ASYNC) {
                                {
                                    this.state = 1063;
                                    this.comp_for();
                                }
                            }
                        }
                        break;
                    case 2:
                        {
                            this.state = 1066;
                            this.test();
                            this.state = 1067;
                            this.match(Python3Parser.ASSIGN);
                            this.state = 1068;
                            this.test();
                        }
                        break;
                    case 3:
                        {
                            this.state = 1070;
                            this.match(Python3Parser.POWER);
                            this.state = 1071;
                            this.test();
                        }
                        break;
                    case 4:
                        {
                            this.state = 1072;
                            this.match(Python3Parser.STAR);
                            this.state = 1073;
                            this.test();
                        }
                        break;
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    comp_iter() {
        let _localctx = new Comp_iterContext(this._ctx, this.state);
        this.enterRule(_localctx, 162, Python3Parser.RULE_comp_iter);
        try {
            this.state = 1078;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case Python3Parser.FOR:
                case Python3Parser.ASYNC:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 1076;
                        this.comp_for();
                    }
                    break;
                case Python3Parser.IF:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 1077;
                        this.comp_if();
                    }
                    break;
                default:
                    throw new NoViableAltException_1.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    comp_for() {
        let _localctx = new Comp_forContext(this._ctx, this.state);
        this.enterRule(_localctx, 164, Python3Parser.RULE_comp_for);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 1081;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === Python3Parser.ASYNC) {
                    {
                        this.state = 1080;
                        this.match(Python3Parser.ASYNC);
                    }
                }
                this.state = 1083;
                this.match(Python3Parser.FOR);
                this.state = 1084;
                this.exprlist();
                this.state = 1085;
                this.match(Python3Parser.IN);
                this.state = 1086;
                this.or_test();
                this.state = 1088;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (((_la - 13) & ~0x1f) === 0 &&
                    ((1 << (_la - 13)) &
                        ((1 << (Python3Parser.IF - 13)) |
                            (1 << (Python3Parser.FOR - 13)) |
                            (1 << (Python3Parser.ASYNC - 13)))) !==
                        0) {
                    {
                        this.state = 1087;
                        this.comp_iter();
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    comp_if() {
        let _localctx = new Comp_ifContext(this._ctx, this.state);
        this.enterRule(_localctx, 166, Python3Parser.RULE_comp_if);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 1090;
                this.match(Python3Parser.IF);
                this.state = 1091;
                this.test_nocond();
                this.state = 1093;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (((_la - 13) & ~0x1f) === 0 &&
                    ((1 << (_la - 13)) &
                        ((1 << (Python3Parser.IF - 13)) |
                            (1 << (Python3Parser.FOR - 13)) |
                            (1 << (Python3Parser.ASYNC - 13)))) !==
                        0) {
                    {
                        this.state = 1092;
                        this.comp_iter();
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    encoding_decl() {
        let _localctx = new Encoding_declContext(this._ctx, this.state);
        this.enterRule(_localctx, 168, Python3Parser.RULE_encoding_decl);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 1095;
                this.match(Python3Parser.NAME);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    yield_expr() {
        let _localctx = new Yield_exprContext(this._ctx, this.state);
        this.enterRule(_localctx, 170, Python3Parser.RULE_yield_expr);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 1097;
                this.match(Python3Parser.YIELD);
                this.state = 1099;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (((_la & ~0x1f) === 0 &&
                    ((1 << _la) &
                        ((1 << Python3Parser.STRING) |
                            (1 << Python3Parser.NUMBER) |
                            (1 << Python3Parser.FROM) |
                            (1 << Python3Parser.LAMBDA) |
                            (1 << Python3Parser.NOT) |
                            (1 << Python3Parser.NONE) |
                            (1 << Python3Parser.TRUE) |
                            (1 << Python3Parser.FALSE))) !==
                        0) ||
                    (((_la - 38) & ~0x1f) === 0 &&
                        ((1 << (_la - 38)) &
                            ((1 << (Python3Parser.AWAIT - 38)) |
                                (1 << (Python3Parser.NAME - 38)) |
                                (1 << (Python3Parser.ELLIPSIS - 38)) |
                                (1 << (Python3Parser.OPEN_PAREN - 38)) |
                                (1 << (Python3Parser.OPEN_BRACK - 38)) |
                                (1 << (Python3Parser.ADD - 38)) |
                                (1 << (Python3Parser.MINUS - 38)))) !==
                            0) ||
                    _la === Python3Parser.NOT_OP ||
                    _la === Python3Parser.OPEN_BRACE) {
                    {
                        this.state = 1098;
                        this.yield_arg();
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    yield_arg() {
        let _localctx = new Yield_argContext(this._ctx, this.state);
        this.enterRule(_localctx, 172, Python3Parser.RULE_yield_arg);
        try {
            this.state = 1104;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case Python3Parser.FROM:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 1101;
                        this.match(Python3Parser.FROM);
                        this.state = 1102;
                        this.test();
                    }
                    break;
                case Python3Parser.STRING:
                case Python3Parser.NUMBER:
                case Python3Parser.LAMBDA:
                case Python3Parser.NOT:
                case Python3Parser.NONE:
                case Python3Parser.TRUE:
                case Python3Parser.FALSE:
                case Python3Parser.AWAIT:
                case Python3Parser.NAME:
                case Python3Parser.ELLIPSIS:
                case Python3Parser.OPEN_PAREN:
                case Python3Parser.OPEN_BRACK:
                case Python3Parser.ADD:
                case Python3Parser.MINUS:
                case Python3Parser.NOT_OP:
                case Python3Parser.OPEN_BRACE:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 1103;
                        this.testlist();
                    }
                    break;
                default:
                    throw new NoViableAltException_1.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    static get _ATN() {
        if (!Python3Parser.__ATN) {
            Python3Parser.__ATN = new ATNDeserializer_1.ATNDeserializer().deserialize(Utils.toCharArray(Python3Parser._serializedATN));
        }
        return Python3Parser.__ATN;
    }
}
exports.Python3Parser = Python3Parser;
Python3Parser.STRING = 1;
Python3Parser.NUMBER = 2;
Python3Parser.INTEGER = 3;
Python3Parser.DEF = 4;
Python3Parser.RETURN = 5;
Python3Parser.RAISE = 6;
Python3Parser.FROM = 7;
Python3Parser.IMPORT = 8;
Python3Parser.AS = 9;
Python3Parser.GLOBAL = 10;
Python3Parser.NONLOCAL = 11;
Python3Parser.ASSERT = 12;
Python3Parser.IF = 13;
Python3Parser.ELIF = 14;
Python3Parser.ELSE = 15;
Python3Parser.WHILE = 16;
Python3Parser.FOR = 17;
Python3Parser.IN = 18;
Python3Parser.TRY = 19;
Python3Parser.FINALLY = 20;
Python3Parser.WITH = 21;
Python3Parser.EXCEPT = 22;
Python3Parser.LAMBDA = 23;
Python3Parser.OR = 24;
Python3Parser.AND = 25;
Python3Parser.NOT = 26;
Python3Parser.IS = 27;
Python3Parser.NONE = 28;
Python3Parser.TRUE = 29;
Python3Parser.FALSE = 30;
Python3Parser.CLASS = 31;
Python3Parser.YIELD = 32;
Python3Parser.DEL = 33;
Python3Parser.PASS = 34;
Python3Parser.CONTINUE = 35;
Python3Parser.BREAK = 36;
Python3Parser.ASYNC = 37;
Python3Parser.AWAIT = 38;
Python3Parser.NEWLINE = 39;
Python3Parser.NAME = 40;
Python3Parser.STRING_LITERAL = 41;
Python3Parser.BYTES_LITERAL = 42;
Python3Parser.DECIMAL_INTEGER = 43;
Python3Parser.OCT_INTEGER = 44;
Python3Parser.HEX_INTEGER = 45;
Python3Parser.BIN_INTEGER = 46;
Python3Parser.FLOAT_NUMBER = 47;
Python3Parser.IMAG_NUMBER = 48;
Python3Parser.DOT = 49;
Python3Parser.ELLIPSIS = 50;
Python3Parser.STAR = 51;
Python3Parser.OPEN_PAREN = 52;
Python3Parser.CLOSE_PAREN = 53;
Python3Parser.COMMA = 54;
Python3Parser.COLON = 55;
Python3Parser.SEMI_COLON = 56;
Python3Parser.POWER = 57;
Python3Parser.ASSIGN = 58;
Python3Parser.OPEN_BRACK = 59;
Python3Parser.CLOSE_BRACK = 60;
Python3Parser.OR_OP = 61;
Python3Parser.XOR = 62;
Python3Parser.AND_OP = 63;
Python3Parser.LEFT_SHIFT = 64;
Python3Parser.RIGHT_SHIFT = 65;
Python3Parser.ADD = 66;
Python3Parser.MINUS = 67;
Python3Parser.DIV = 68;
Python3Parser.MOD = 69;
Python3Parser.IDIV = 70;
Python3Parser.NOT_OP = 71;
Python3Parser.OPEN_BRACE = 72;
Python3Parser.CLOSE_BRACE = 73;
Python3Parser.LESS_THAN = 74;
Python3Parser.GREATER_THAN = 75;
Python3Parser.EQUALS = 76;
Python3Parser.GT_EQ = 77;
Python3Parser.LT_EQ = 78;
Python3Parser.NOT_EQ_1 = 79;
Python3Parser.NOT_EQ_2 = 80;
Python3Parser.AT = 81;
Python3Parser.ARROW = 82;
Python3Parser.ADD_ASSIGN = 83;
Python3Parser.SUB_ASSIGN = 84;
Python3Parser.MULT_ASSIGN = 85;
Python3Parser.AT_ASSIGN = 86;
Python3Parser.DIV_ASSIGN = 87;
Python3Parser.MOD_ASSIGN = 88;
Python3Parser.AND_ASSIGN = 89;
Python3Parser.OR_ASSIGN = 90;
Python3Parser.XOR_ASSIGN = 91;
Python3Parser.LEFT_SHIFT_ASSIGN = 92;
Python3Parser.RIGHT_SHIFT_ASSIGN = 93;
Python3Parser.POWER_ASSIGN = 94;
Python3Parser.IDIV_ASSIGN = 95;
Python3Parser.SKIP_ = 96;
Python3Parser.UNKNOWN_CHAR = 97;
Python3Parser.INDENT = 98;
Python3Parser.DEDENT = 99;
Python3Parser.RULE_single_input = 0;
Python3Parser.RULE_file_input = 1;
Python3Parser.RULE_eval_input = 2;
Python3Parser.RULE_decorator = 3;
Python3Parser.RULE_decorators = 4;
Python3Parser.RULE_decorated = 5;
Python3Parser.RULE_async_funcdef = 6;
Python3Parser.RULE_funcdef = 7;
Python3Parser.RULE_parameters = 8;
Python3Parser.RULE_typedargslist = 9;
Python3Parser.RULE_tfpdef = 10;
Python3Parser.RULE_varargslist = 11;
Python3Parser.RULE_vfpdef = 12;
Python3Parser.RULE_stmt = 13;
Python3Parser.RULE_simple_stmt = 14;
Python3Parser.RULE_small_stmt = 15;
Python3Parser.RULE_expr_stmt = 16;
Python3Parser.RULE_simple_assign = 17;
Python3Parser.RULE_annassign = 18;
Python3Parser.RULE_testlist_star_expr = 19;
Python3Parser.RULE_augassign = 20;
Python3Parser.RULE_del_stmt = 21;
Python3Parser.RULE_pass_stmt = 22;
Python3Parser.RULE_flow_stmt = 23;
Python3Parser.RULE_break_stmt = 24;
Python3Parser.RULE_continue_stmt = 25;
Python3Parser.RULE_return_stmt = 26;
Python3Parser.RULE_yield_stmt = 27;
Python3Parser.RULE_raise_stmt = 28;
Python3Parser.RULE_import_stmt = 29;
Python3Parser.RULE_import_name = 30;
Python3Parser.RULE_import_from = 31;
Python3Parser.RULE_import_as_name = 32;
Python3Parser.RULE_dotted_as_name = 33;
Python3Parser.RULE_import_as_names = 34;
Python3Parser.RULE_dotted_as_names = 35;
Python3Parser.RULE_dotted_name = 36;
Python3Parser.RULE_global_stmt = 37;
Python3Parser.RULE_nonlocal_stmt = 38;
Python3Parser.RULE_assert_stmt = 39;
Python3Parser.RULE_compound_stmt = 40;
Python3Parser.RULE_async_stmt = 41;
Python3Parser.RULE_if_stmt = 42;
Python3Parser.RULE_while_stmt = 43;
Python3Parser.RULE_for_stmt = 44;
Python3Parser.RULE_try_stmt = 45;
Python3Parser.RULE_with_stmt = 46;
Python3Parser.RULE_with_item = 47;
Python3Parser.RULE_except_clause = 48;
Python3Parser.RULE_suite = 49;
Python3Parser.RULE_test = 50;
Python3Parser.RULE_test_nocond = 51;
Python3Parser.RULE_lambdef = 52;
Python3Parser.RULE_lambdef_nocond = 53;
Python3Parser.RULE_or_test = 54;
Python3Parser.RULE_and_test = 55;
Python3Parser.RULE_not_test = 56;
Python3Parser.RULE_comparison = 57;
Python3Parser.RULE_comp_op = 58;
Python3Parser.RULE_star_expr = 59;
Python3Parser.RULE_expr = 60;
Python3Parser.RULE_xor_expr = 61;
Python3Parser.RULE_and_expr = 62;
Python3Parser.RULE_shift_expr = 63;
Python3Parser.RULE_arith_expr = 64;
Python3Parser.RULE_term = 65;
Python3Parser.RULE_factor = 66;
Python3Parser.RULE_power = 67;
Python3Parser.RULE_atom_expr = 68;
Python3Parser.RULE_atom = 69;
Python3Parser.RULE_testlist_comp = 70;
Python3Parser.RULE_trailer = 71;
Python3Parser.RULE_subscriptlist = 72;
Python3Parser.RULE_subscript = 73;
Python3Parser.RULE_sliceop = 74;
Python3Parser.RULE_exprlist = 75;
Python3Parser.RULE_testlist = 76;
Python3Parser.RULE_dictorsetmaker = 77;
Python3Parser.RULE_classdef = 78;
Python3Parser.RULE_arglist = 79;
Python3Parser.RULE_argument = 80;
Python3Parser.RULE_comp_iter = 81;
Python3Parser.RULE_comp_for = 82;
Python3Parser.RULE_comp_if = 83;
Python3Parser.RULE_encoding_decl = 84;
Python3Parser.RULE_yield_expr = 85;
Python3Parser.RULE_yield_arg = 86;
// tslint:disable:no-trailing-whitespace
Python3Parser.ruleNames = [
    'single_input',
    'file_input',
    'eval_input',
    'decorator',
    'decorators',
    'decorated',
    'async_funcdef',
    'funcdef',
    'parameters',
    'typedargslist',
    'tfpdef',
    'varargslist',
    'vfpdef',
    'stmt',
    'simple_stmt',
    'small_stmt',
    'expr_stmt',
    'simple_assign',
    'annassign',
    'testlist_star_expr',
    'augassign',
    'del_stmt',
    'pass_stmt',
    'flow_stmt',
    'break_stmt',
    'continue_stmt',
    'return_stmt',
    'yield_stmt',
    'raise_stmt',
    'import_stmt',
    'import_name',
    'import_from',
    'import_as_name',
    'dotted_as_name',
    'import_as_names',
    'dotted_as_names',
    'dotted_name',
    'global_stmt',
    'nonlocal_stmt',
    'assert_stmt',
    'compound_stmt',
    'async_stmt',
    'if_stmt',
    'while_stmt',
    'for_stmt',
    'try_stmt',
    'with_stmt',
    'with_item',
    'except_clause',
    'suite',
    'test',
    'test_nocond',
    'lambdef',
    'lambdef_nocond',
    'or_test',
    'and_test',
    'not_test',
    'comparison',
    'comp_op',
    'star_expr',
    'expr',
    'xor_expr',
    'and_expr',
    'shift_expr',
    'arith_expr',
    'term',
    'factor',
    'power',
    'atom_expr',
    'atom',
    'testlist_comp',
    'trailer',
    'subscriptlist',
    'subscript',
    'sliceop',
    'exprlist',
    'testlist',
    'dictorsetmaker',
    'classdef',
    'arglist',
    'argument',
    'comp_iter',
    'comp_for',
    'comp_if',
    'encoding_decl',
    'yield_expr',
    'yield_arg',
];
Python3Parser._LITERAL_NAMES = [
    undefined,
    undefined,
    undefined,
    undefined,
    "'def'",
    "'return'",
    "'raise'",
    "'from'",
    "'import'",
    "'as'",
    "'global'",
    "'nonlocal'",
    "'assert'",
    "'if'",
    "'elif'",
    "'else'",
    "'while'",
    "'for'",
    "'in'",
    "'try'",
    "'finally'",
    "'with'",
    "'except'",
    "'lambda'",
    "'or'",
    "'and'",
    "'not'",
    "'is'",
    "'None'",
    "'True'",
    "'False'",
    "'class'",
    "'yield'",
    "'del'",
    "'pass'",
    "'continue'",
    "'break'",
    "'async'",
    "'await'",
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    "'.'",
    "'...'",
    "'*'",
    "'('",
    "')'",
    "','",
    "':'",
    "';'",
    "'**'",
    "'='",
    "'['",
    "']'",
    "'|'",
    "'^'",
    "'&'",
    "'<<'",
    "'>>'",
    "'+'",
    "'-'",
    "'/'",
    "'%'",
    "'//'",
    "'~'",
    "'{'",
    "'}'",
    "'<'",
    "'>'",
    "'=='",
    "'>='",
    "'<='",
    "'<>'",
    "'!='",
    "'@'",
    "'->'",
    "'+='",
    "'-='",
    "'*='",
    "'@='",
    "'/='",
    "'%='",
    "'&='",
    "'|='",
    "'^='",
    "'<<='",
    "'>>='",
    "'**='",
    "'//='",
];
Python3Parser._SYMBOLIC_NAMES = [
    undefined,
    'STRING',
    'NUMBER',
    'INTEGER',
    'DEF',
    'RETURN',
    'RAISE',
    'FROM',
    'IMPORT',
    'AS',
    'GLOBAL',
    'NONLOCAL',
    'ASSERT',
    'IF',
    'ELIF',
    'ELSE',
    'WHILE',
    'FOR',
    'IN',
    'TRY',
    'FINALLY',
    'WITH',
    'EXCEPT',
    'LAMBDA',
    'OR',
    'AND',
    'NOT',
    'IS',
    'NONE',
    'TRUE',
    'FALSE',
    'CLASS',
    'YIELD',
    'DEL',
    'PASS',
    'CONTINUE',
    'BREAK',
    'ASYNC',
    'AWAIT',
    'NEWLINE',
    'NAME',
    'STRING_LITERAL',
    'BYTES_LITERAL',
    'DECIMAL_INTEGER',
    'OCT_INTEGER',
    'HEX_INTEGER',
    'BIN_INTEGER',
    'FLOAT_NUMBER',
    'IMAG_NUMBER',
    'DOT',
    'ELLIPSIS',
    'STAR',
    'OPEN_PAREN',
    'CLOSE_PAREN',
    'COMMA',
    'COLON',
    'SEMI_COLON',
    'POWER',
    'ASSIGN',
    'OPEN_BRACK',
    'CLOSE_BRACK',
    'OR_OP',
    'XOR',
    'AND_OP',
    'LEFT_SHIFT',
    'RIGHT_SHIFT',
    'ADD',
    'MINUS',
    'DIV',
    'MOD',
    'IDIV',
    'NOT_OP',
    'OPEN_BRACE',
    'CLOSE_BRACE',
    'LESS_THAN',
    'GREATER_THAN',
    'EQUALS',
    'GT_EQ',
    'LT_EQ',
    'NOT_EQ_1',
    'NOT_EQ_2',
    'AT',
    'ARROW',
    'ADD_ASSIGN',
    'SUB_ASSIGN',
    'MULT_ASSIGN',
    'AT_ASSIGN',
    'DIV_ASSIGN',
    'MOD_ASSIGN',
    'AND_ASSIGN',
    'OR_ASSIGN',
    'XOR_ASSIGN',
    'LEFT_SHIFT_ASSIGN',
    'RIGHT_SHIFT_ASSIGN',
    'POWER_ASSIGN',
    'IDIV_ASSIGN',
    'SKIP_',
    'UNKNOWN_CHAR',
    'INDENT',
    'DEDENT',
];
Python3Parser.VOCABULARY = new VocabularyImpl_1.VocabularyImpl(Python3Parser._LITERAL_NAMES, Python3Parser._SYMBOLIC_NAMES, []);
Python3Parser._serializedATNSegments = 3;
Python3Parser._serializedATNSegment0 = '\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03e\u0455\x04\x02' +
    '\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07' +
    '\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04' +
    '\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04' +
    '\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04' +
    '\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04' +
    '\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04"\t"\x04#' +
    "\t#\x04$\t$\x04%\t%\x04&\t&\x04'\t'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
    '\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x044' +
    '\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04' +
    '=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04B\tB\x04C\tC\x04D\tD\x04E\tE\x04' +
    'F\tF\x04G\tG\x04H\tH\x04I\tI\x04J\tJ\x04K\tK\x04L\tL\x04M\tM\x04N\tN\x04' +
    'O\tO\x04P\tP\x04Q\tQ\x04R\tR\x04S\tS\x04T\tT\x04U\tU\x04V\tV\x04W\tW\x04' +
    'X\tX\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x05\x02\xB6\n\x02\x03\x03' +
    '\x03\x03\x07\x03\xBA\n\x03\f\x03\x0E\x03\xBD\v\x03\x03\x03\x03\x03\x03' +
    '\x04\x03\x04\x07\x04\xC3\n\x04\f\x04\x0E\x04\xC6\v\x04\x03\x04\x03\x04' +
    '\x03\x05\x03\x05\x03\x05\x03\x05\x05\x05\xCE\n\x05\x03\x05\x05\x05\xD1' +
    '\n\x05\x03\x05\x03\x05\x03\x06\x06\x06\xD6\n\x06\r\x06\x0E\x06\xD7\x03' +
    '\x07\x03\x07\x03\x07\x03\x07\x05\x07\xDE\n\x07\x03\b\x03\b\x03\b\x03\t' +
    '\x03\t\x03\t\x03\t\x03\t\x05\t\xE8\n\t\x03\t\x03\t\x03\t\x03\n\x03\n\x05' +
    '\n\xEF\n\n\x03\n\x03\n\x03\v\x03\v\x03\v\x05\v\xF6\n\v\x03\v\x03\v\x03' +
    '\v\x03\v\x05\v\xFC\n\v\x07\v\xFE\n\v\f\v\x0E\v\u0101\v\v\x03\v\x03\v\x03' +
    '\v\x05\v\u0106\n\v\x03\v\x03\v\x03\v\x03\v\x05\v\u010C\n\v\x07\v\u010E' +
    '\n\v\f\v\x0E\v\u0111\v\v\x03\v\x03\v\x03\v\x03\v\x05\v\u0117\n\v\x05\v' +
    '\u0119\n\v\x05\v\u011B\n\v\x03\v\x03\v\x03\v\x05\v\u0120\n\v\x05\v\u0122' +
    '\n\v\x05\v\u0124\n\v\x03\v\x03\v\x05\v\u0128\n\v\x03\v\x03\v\x03\v\x03' +
    '\v\x05\v\u012E\n\v\x07\v\u0130\n\v\f\v\x0E\v\u0133\v\v\x03\v\x03\v\x03' +
    '\v\x03\v\x05\v\u0139\n\v\x05\v\u013B\n\v\x05\v\u013D\n\v\x03\v\x03\v\x03' +
    '\v\x05\v\u0142\n\v\x05\v\u0144\n\v\x03\f\x03\f\x03\f\x05\f\u0149\n\f\x03' +
    '\r\x03\r\x03\r\x05\r\u014E\n\r\x03\r\x03\r\x03\r\x03\r\x05\r\u0154\n\r' +
    '\x07\r\u0156\n\r\f\r\x0E\r\u0159\v\r\x03\r\x03\r\x03\r\x05\r\u015E\n\r' +
    '\x03\r\x03\r\x03\r\x03\r\x05\r\u0164\n\r\x07\r\u0166\n\r\f\r\x0E\r\u0169' +
    '\v\r\x03\r\x03\r\x03\r\x03\r\x05\r\u016F\n\r\x05\r\u0171\n\r\x05\r\u0173' +
    '\n\r\x03\r\x03\r\x03\r\x05\r\u0178\n\r\x05\r\u017A\n\r\x05\r\u017C\n\r' +
    '\x03\r\x03\r\x05\r\u0180\n\r\x03\r\x03\r\x03\r\x03\r\x05\r\u0186\n\r\x07' +
    '\r\u0188\n\r\f\r\x0E\r\u018B\v\r\x03\r\x03\r\x03\r\x03\r\x05\r\u0191\n' +
    '\r\x05\r\u0193\n\r\x05\r\u0195\n\r\x03\r\x03\r\x03\r\x05\r\u019A\n\r\x05' +
    '\r\u019C\n\r\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x05\x0F\u01A2\n\x0F\x03\x10' +
    '\x03\x10\x03\x10\x07\x10\u01A7\n\x10\f\x10\x0E\x10\u01AA\v\x10\x03\x10' +
    '\x05\x10\u01AD\n\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03' +
    '\x11\x03\x11\x03\x11\x03\x11\x05\x11\u01B9\n\x11\x03\x12\x03\x12\x03\x12' +
    '\x03\x12\x03\x12\x05\x12\u01C0\n\x12\x03\x12\x05\x12\u01C3\n\x12\x03\x13' +
    '\x03\x13\x03\x13\x05\x13\u01C8\n\x13\x07\x13\u01CA\n\x13\f\x13\x0E\x13' +
    '\u01CD\v\x13\x03\x14\x03\x14\x03\x14\x03\x14\x05\x14\u01D3\n\x14\x03\x15' +
    '\x03\x15\x05\x15\u01D7\n\x15\x03\x15\x03\x15\x03\x15\x05\x15\u01DC\n\x15' +
    '\x07\x15\u01DE\n\x15\f\x15\x0E\x15\u01E1\v\x15\x03\x15\x05\x15\u01E4\n' +
    '\x15\x03\x16\x03\x16\x03\x17\x03\x17\x03\x17\x03\x18\x03\x18\x03\x19\x03' +
    '\x19\x03\x19\x03\x19\x03\x19\x05\x19\u01F2\n\x19\x03\x1A\x03\x1A\x03\x1B' +
    '\x03\x1B\x03\x1C\x03\x1C\x05\x1C\u01FA\n\x1C\x03\x1D\x03\x1D\x03\x1E\x03' +
    '\x1E\x03\x1E\x03\x1E\x05\x1E\u0202\n\x1E\x05\x1E\u0204\n\x1E\x03\x1F\x03' +
    '\x1F\x05\x1F\u0208\n\x1F\x03 \x03 \x03 \x03!\x03!\x07!\u020F\n!\f!\x0E' +
    '!\u0212\v!\x03!\x03!\x06!\u0216\n!\r!\x0E!\u0217\x05!\u021A\n!\x03!\x03' +
    '!\x03!\x03!\x03!\x03!\x03!\x05!\u0223\n!\x03"\x03"\x03"\x05"\u0228' +
    '\n"\x03#\x03#\x03#\x05#\u022D\n#\x03$\x03$\x03$\x07$\u0232\n$\f$\x0E' +
    '$\u0235\v$\x03$\x05$\u0238\n$\x03%\x03%\x03%\x07%\u023D\n%\f%\x0E%\u0240' +
    "\v%\x03&\x03&\x03&\x07&\u0245\n&\f&\x0E&\u0248\v&\x03'\x03'\x03'\x03" +
    "'\x07'\u024E\n'\f'\x0E'\u0251\v'\x03(\x03(\x03(\x03(\x07(\u0257" +
    '\n(\f(\x0E(\u025A\v(\x03)\x03)\x03)\x03)\x05)\u0260\n)\x03*\x03*\x03*' +
    '\x03*\x03*\x03*\x03*\x03*\x03*\x05*\u026B\n*\x03+\x03+\x03+\x03+\x05+' +
    '\u0271\n+\x03,\x03,\x03,\x03,\x03,\x03,\x03,\x03,\x03,\x07,\u027C\n,\f' +
    ',\x0E,\u027F\v,\x03,\x03,\x03,\x05,\u0284\n,\x03-\x03-\x03-\x03-\x03-' +
    '\x03-\x03-\x05-\u028D\n-\x03.\x03.\x03.\x03.\x03.\x03.\x03.\x03.\x03.' +
    '\x05.\u0298\n.\x03/\x03/\x03/\x03/\x03/\x03/\x03/\x06/\u02A1\n/\r/\x0E' +
    '/\u02A2\x03/\x03/\x03/\x05/\u02A8\n/\x03/\x03/\x03/\x05/\u02AD\n/\x03' +
    '/\x03/\x03/\x05/\u02B2\n/\x030\x030\x030\x030\x070\u02B8\n0\f0\x0E0\u02BB' +
    '\v0\x030\x030\x030\x031\x031\x031\x051\u02C3\n1\x032\x032\x032\x032\x05' +
    '2\u02C9\n2\x052\u02CB\n2\x033\x033\x033\x033\x063\u02D1\n3\r3\x0E3\u02D2' +
    '\x033\x033\x053\u02D7\n3\x034\x034\x034\x034\x034\x034\x054\u02DF\n4\x03' +
    '4\x054\u02E2\n4\x035\x035\x055\u02E6\n5\x036\x036\x056\u02EA\n6\x036\x03' +
    '6\x036\x037\x037\x057\u02F1\n7\x037\x037\x037\x038\x038\x038\x078\u02F9' +
    '\n8\f8\x0E8\u02FC\v8\x039\x039\x039\x079\u0301\n9\f9\x0E9\u0304\v9\x03' +
    ':\x03:\x03:\x05:\u0309\n:\x03;\x03;\x03;\x03;\x07;\u030F\n;\f;\x0E;\u0312' +
    '\v;\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x05' +
    '<\u0321\n<\x03=\x03=\x03=\x03>\x03>\x03>\x07>\u0329\n>\f>\x0E>\u032C\v' +
    '>\x03?\x03?\x03?\x07?\u0331\n?\f?\x0E?\u0334\v?\x03@\x03@\x03@\x07@\u0339' +
    '\n@\f@\x0E@\u033C\v@\x03A\x03A\x03A\x07A\u0341\nA\fA\x0EA\u0344\vA\x03' +
    'B\x03B\x03B\x07B\u0349\nB\fB\x0EB\u034C\vB\x03C\x03C\x03C\x07C\u0351\n' +
    'C\fC\x0EC\u0354\vC\x03D\x03D\x03D\x05D\u0359\nD\x03E\x03E\x03E\x05E\u035E' +
    '\nE\x03F\x05F\u0361\nF\x03F\x03F\x07F\u0365\nF\fF\x0EF\u0368\vF\x03G\x03' +
    'G\x03G\x05G\u036D\nG\x03G\x03G\x03G\x05G\u0372\nG\x03G\x03G\x03G\x05G' +
    '\u0377\nG\x03G\x03G\x03G\x03G\x06G\u037D\nG\rG\x0EG\u037E\x03G\x03G\x03' +
    'G\x03G\x05G\u0385\nG\x03H\x03H\x05H\u0389\nH\x03H\x03H\x03H\x03H\x05H' +
    '\u038F\nH\x07H\u0391\nH\fH\x0EH\u0394\vH\x03H\x05H\u0397\nH\x05H\u0399' +
    '\nH\x03I\x03I\x05I\u039D\nI\x03I\x03I\x03I\x03I\x03I\x03I\x03I\x05I\u03A6' +
    '\nI\x03J\x03J\x03J\x07J\u03AB\nJ\fJ\x0EJ\u03AE\vJ\x03J\x05J\u03B1\nJ\x03' +
    'K\x03K\x05K\u03B5\nK\x03K\x03K\x05K\u03B9\nK\x03K\x05K\u03BC\nK\x05K\u03BE' +
    '\nK\x03L\x03L\x05L\u03C2\nL\x03M\x03M\x05M\u03C6\nM\x03M\x03M\x03M\x05' +
    'M\u03CB\nM\x07M\u03CD\nM\fM\x0EM\u03D0\vM\x03M\x05M\u03D3\nM\x03N\x03' +
    'N\x03N\x07N\u03D8\nN\fN\x0EN\u03DB\vN\x03N\x05N\u03DE\nN\x03O\x03O\x03' +
    'O\x03O\x03O\x03O\x05O\u03E6\nO\x03O\x03O\x03O\x03O\x03O\x03O\x03O\x03' +
    'O\x05O\u03F0\nO\x07O\u03F2\nO\fO\x0EO\u03F5\vO\x03O\x05O\u03F8\nO\x05' +
    'O\u03FA\nO\x03O\x03O\x05O\u03FE\nO\x03O\x03O\x03O\x03O\x05O\u0404\nO\x07' +
    'O\u0406\nO\fO\x0EO\u0409\vO\x03O\x05O\u040C\nO\x05O\u040E\nO\x05O\u0410' +
    '\nO\x03P\x03P\x03P\x03P\x05P\u0416\nP\x03P\x05P\u0419\nP\x03P\x03P\x03' +
    'P\x03Q\x03Q\x03Q\x07Q\u0421\nQ\fQ\x0EQ\u0424\vQ\x03Q\x05Q\u0427\nQ\x03' +
    'R\x03R\x05R\u042B\nR\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x05R\u0435' +
    '\nR\x03S\x03S\x05S\u0439\nS\x03T\x05T\u043C\nT\x03T\x03T\x03T\x03T\x03' +
    'T\x05T\u0443\nT\x03U\x03U\x03U\x05U\u0448\nU\x03V\x03V\x03W\x03W\x05W' +
    '\u044E\nW\x03X\x03X\x03X\x05X\u0453\nX\x03X\x02\x02\x02Y\x02\x02\x04\x02' +
    '\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18' +
    '\x02\x1A\x02\x1C\x02\x1E\x02 \x02"\x02$\x02&\x02(\x02*\x02,\x02.\x02' +
    '0\x022\x024\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02' +
    'L\x02N\x02P\x02R\x02T\x02V\x02X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02f\x02' +
    'h\x02j\x02l\x02n\x02p\x02r\x02t\x02v\x02x\x02z\x02|\x02~\x02\x80\x02\x82' +
    '\x02\x84\x02\x86\x02\x88\x02\x8A\x02\x8C\x02\x8E\x02\x90\x02\x92\x02\x94' +
    '\x02\x96\x02\x98\x02\x9A\x02\x9C\x02\x9E\x02\xA0\x02\xA2\x02\xA4\x02\xA6' +
    '\x02\xA8\x02\xAA\x02\xAC\x02\xAE\x02\x02\b\x03\x02Ua\x03\x0234\x03\x02' +
    'BC\x03\x02DE\x05\x0255FHSS\x04\x02DEII\x02\u04D1\x02\xB5\x03\x02\x02\x02' +
    '\x04\xBB\x03\x02\x02\x02\x06\xC0\x03\x02\x02\x02\b\xC9\x03\x02\x02\x02' +
    '\n\xD5\x03\x02\x02\x02\f\xD9\x03\x02\x02\x02\x0E\xDF\x03\x02\x02\x02\x10' +
    '\xE2\x03\x02\x02\x02\x12\xEC\x03\x02\x02\x02\x14\u0143\x03\x02\x02\x02' +
    '\x16\u0145\x03\x02\x02\x02\x18\u019B\x03\x02\x02\x02\x1A\u019D\x03\x02' +
    '\x02\x02\x1C\u01A1\x03\x02\x02\x02\x1E\u01A3\x03\x02\x02\x02 \u01B8\x03' +
    '\x02\x02\x02"\u01BA\x03\x02\x02\x02$\u01CB\x03\x02\x02\x02&\u01CE\x03' +
    '\x02\x02\x02(\u01D6\x03\x02\x02\x02*\u01E5\x03\x02\x02\x02,\u01E7\x03' +
    '\x02\x02\x02.\u01EA\x03\x02\x02\x020\u01F1\x03\x02\x02\x022\u01F3\x03' +
    '\x02\x02\x024\u01F5\x03\x02\x02\x026\u01F7\x03\x02\x02\x028\u01FB\x03' +
    '\x02\x02\x02:\u01FD\x03\x02\x02\x02<\u0207\x03\x02\x02\x02>\u0209\x03' +
    '\x02\x02\x02@\u020C\x03\x02\x02\x02B\u0224\x03\x02\x02\x02D\u0229\x03' +
    '\x02\x02\x02F\u022E\x03\x02\x02\x02H\u0239\x03\x02\x02\x02J\u0241\x03' +
    '\x02\x02\x02L\u0249\x03\x02\x02\x02N\u0252\x03\x02\x02\x02P\u025B\x03' +
    '\x02\x02\x02R\u026A\x03\x02\x02\x02T\u026C\x03\x02\x02\x02V\u0272\x03' +
    '\x02\x02\x02X\u0285\x03\x02\x02\x02Z\u028E\x03\x02\x02\x02\\\u0299\x03' +
    '\x02\x02\x02^\u02B3\x03\x02\x02\x02`\u02BF\x03\x02\x02\x02b\u02C4\x03' +
    '\x02\x02\x02d\u02D6\x03\x02\x02\x02f\u02E1\x03\x02\x02\x02h\u02E5\x03' +
    '\x02\x02\x02j\u02E7\x03\x02\x02\x02l\u02EE\x03\x02\x02\x02n\u02F5\x03' +
    '\x02\x02\x02p\u02FD\x03\x02\x02\x02r\u0308\x03\x02\x02\x02t\u030A\x03' +
    '\x02\x02\x02v\u0320\x03\x02\x02\x02x\u0322\x03\x02\x02\x02z\u0325\x03' +
    '\x02\x02\x02|\u032D\x03\x02\x02\x02~\u0335\x03\x02\x02\x02\x80\u033D\x03' +
    '\x02\x02\x02\x82\u0345\x03\x02\x02\x02\x84\u034D\x03\x02\x02\x02\x86\u0358' +
    '\x03\x02\x02\x02\x88\u035A\x03\x02\x02\x02\x8A\u0360\x03\x02\x02\x02\x8C' +
    '\u0384\x03\x02\x02\x02\x8E\u0388\x03\x02\x02\x02\x90\u03A5\x03\x02\x02' +
    '\x02\x92\u03A7\x03\x02\x02\x02\x94\u03BD\x03\x02\x02\x02\x96\u03BF\x03' +
    '\x02\x02\x02\x98\u03C5\x03\x02\x02\x02\x9A\u03D4\x03\x02\x02\x02\x9C\u040F' +
    '\x03\x02\x02\x02\x9E\u0411\x03\x02\x02\x02\xA0\u041D\x03\x02\x02\x02\xA2' +
    '\u0434\x03\x02\x02\x02\xA4\u0438\x03\x02\x02\x02\xA6\u043B\x03\x02\x02' +
    '\x02\xA8\u0444\x03\x02\x02\x02\xAA\u0449\x03\x02\x02\x02\xAC\u044B\x03' +
    '\x02\x02\x02\xAE\u0452\x03\x02\x02\x02\xB0\xB6\x07)\x02\x02\xB1\xB6\x05' +
    '\x1E\x10\x02\xB2\xB3\x05R*\x02\xB3\xB4\x07)\x02\x02\xB4\xB6\x03\x02\x02' +
    '\x02\xB5\xB0\x03\x02\x02\x02\xB5\xB1\x03\x02\x02\x02\xB5\xB2\x03\x02\x02' +
    '\x02\xB6\x03\x03\x02\x02\x02\xB7\xBA\x07)\x02\x02\xB8\xBA\x05\x1C\x0F' +
    '\x02\xB9\xB7\x03\x02\x02\x02\xB9\xB8\x03\x02\x02\x02\xBA\xBD\x03\x02\x02' +
    '\x02\xBB\xB9\x03\x02\x02\x02\xBB\xBC\x03\x02\x02\x02\xBC\xBE\x03\x02\x02' +
    '\x02\xBD\xBB\x03\x02\x02\x02\xBE\xBF\x07\x02\x02\x03\xBF\x05\x03\x02\x02' +
    '\x02\xC0\xC4\x05\x9AN\x02\xC1\xC3\x07)\x02\x02\xC2\xC1\x03\x02\x02\x02' +
    '\xC3\xC6\x03\x02\x02\x02\xC4\xC2\x03\x02\x02\x02\xC4\xC5\x03\x02\x02\x02' +
    '\xC5\xC7\x03\x02\x02\x02\xC6\xC4\x03\x02\x02\x02\xC7\xC8\x07\x02\x02\x03' +
    '\xC8\x07\x03\x02\x02\x02\xC9\xCA\x07S\x02\x02\xCA\xD0\x05J&\x02\xCB\xCD' +
    '\x076\x02\x02\xCC\xCE\x05\xA0Q\x02\xCD\xCC\x03\x02\x02\x02\xCD\xCE\x03' +
    '\x02\x02\x02\xCE\xCF\x03\x02\x02\x02\xCF\xD1\x077\x02\x02\xD0\xCB\x03' +
    '\x02\x02\x02\xD0\xD1\x03\x02\x02\x02\xD1\xD2\x03\x02\x02\x02\xD2\xD3\x07' +
    ')\x02\x02\xD3\t\x03\x02\x02\x02\xD4\xD6\x05\b\x05\x02\xD5\xD4\x03\x02' +
    '\x02\x02\xD6\xD7\x03\x02\x02\x02\xD7\xD5\x03\x02\x02\x02\xD7\xD8\x03\x02' +
    '\x02\x02\xD8\v\x03\x02\x02\x02\xD9\xDD\x05\n\x06\x02\xDA\xDE\x05\x9EP' +
    '\x02\xDB\xDE\x05\x10\t\x02\xDC\xDE\x05\x0E\b\x02\xDD\xDA\x03\x02\x02\x02' +
    '\xDD\xDB\x03\x02\x02\x02\xDD\xDC\x03\x02\x02\x02\xDE\r\x03\x02\x02\x02' +
    "\xDF\xE0\x07'\x02\x02\xE0\xE1\x05\x10\t\x02\xE1\x0F\x03\x02\x02\x02\xE2" +
    '\xE3\x07\x06\x02\x02\xE3\xE4\x07*\x02\x02\xE4\xE7\x05\x12\n\x02\xE5\xE6' +
    '\x07T\x02\x02\xE6\xE8\x05f4\x02\xE7\xE5\x03\x02\x02\x02\xE7\xE8\x03\x02' +
    '\x02\x02\xE8\xE9\x03\x02\x02\x02\xE9\xEA\x079\x02\x02\xEA\xEB\x05d3\x02' +
    '\xEB\x11\x03\x02\x02\x02\xEC\xEE\x076\x02\x02\xED\xEF\x05\x14\v\x02\xEE' +
    '\xED\x03\x02\x02\x02\xEE\xEF\x03\x02\x02\x02\xEF\xF0\x03\x02\x02\x02\xF0' +
    '\xF1\x077\x02\x02\xF1\x13\x03\x02\x02\x02\xF2\xF5\x05\x16\f\x02\xF3\xF4' +
    '\x07<\x02\x02\xF4\xF6\x05f4\x02\xF5\xF3\x03\x02\x02\x02\xF5\xF6\x03\x02' +
    '\x02\x02\xF6\xFF\x03\x02\x02\x02\xF7\xF8\x078\x02\x02\xF8\xFB\x05\x16' +
    '\f\x02\xF9\xFA\x07<\x02\x02\xFA\xFC\x05f4\x02\xFB\xF9\x03\x02\x02\x02' +
    '\xFB\xFC\x03\x02\x02\x02\xFC\xFE\x03\x02\x02\x02\xFD\xF7\x03\x02\x02\x02' +
    '\xFE\u0101\x03\x02\x02\x02\xFF\xFD\x03\x02\x02\x02\xFF\u0100\x03\x02\x02' +
    '\x02\u0100\u0123\x03\x02\x02\x02\u0101\xFF\x03\x02\x02\x02\u0102\u0121' +
    '\x078\x02\x02\u0103\u0105\x075\x02\x02\u0104\u0106\x05\x16\f\x02\u0105' +
    '\u0104\x03\x02\x02\x02\u0105\u0106\x03\x02\x02\x02\u0106\u010F\x03\x02' +
    '\x02\x02\u0107\u0108\x078\x02\x02\u0108\u010B\x05\x16\f\x02\u0109\u010A' +
    '\x07<\x02\x02\u010A\u010C\x05f4\x02\u010B\u0109\x03\x02\x02\x02\u010B' +
    '\u010C\x03\x02\x02\x02\u010C\u010E\x03\x02\x02\x02\u010D\u0107\x03\x02' +
    '\x02\x02\u010E\u0111\x03\x02\x02\x02\u010F\u010D\x03\x02\x02\x02\u010F' +
    '\u0110\x03\x02\x02\x02\u0110\u011A\x03\x02\x02\x02\u0111\u010F\x03\x02' +
    '\x02\x02\u0112\u0118\x078\x02\x02\u0113\u0114\x07;\x02\x02\u0114\u0116' +
    '\x05\x16\f\x02\u0115\u0117\x078\x02\x02\u0116\u0115\x03\x02\x02\x02\u0116' +
    '\u0117\x03\x02\x02\x02\u0117\u0119\x03\x02\x02\x02\u0118\u0113\x03\x02' +
    '\x02\x02\u0118\u0119\x03\x02\x02\x02\u0119\u011B\x03\x02\x02\x02\u011A' +
    '\u0112\x03\x02\x02\x02\u011A\u011B\x03\x02\x02\x02\u011B\u0122\x03\x02' +
    '\x02\x02\u011C\u011D\x07;\x02\x02\u011D\u011F\x05\x16\f\x02\u011E\u0120' +
    '\x078\x02\x02\u011F\u011E\x03\x02\x02\x02\u011F\u0120\x03\x02\x02\x02' +
    '\u0120\u0122\x03\x02\x02\x02\u0121\u0103\x03\x02\x02\x02\u0121\u011C\x03' +
    '\x02\x02\x02\u0121\u0122\x03\x02\x02\x02\u0122\u0124\x03\x02\x02\x02\u0123' +
    '\u0102\x03\x02\x02\x02\u0123\u0124\x03\x02\x02\x02\u0124\u0144\x03\x02' +
    '\x02\x02\u0125\u0127\x075\x02\x02\u0126\u0128\x05\x16\f\x02\u0127\u0126' +
    '\x03\x02\x02\x02\u0127\u0128\x03\x02\x02\x02\u0128\u0131\x03\x02\x02\x02' +
    '\u0129\u012A\x078\x02\x02\u012A\u012D\x05\x16\f\x02\u012B\u012C\x07<\x02' +
    '\x02\u012C\u012E\x05f4\x02\u012D\u012B\x03\x02\x02\x02\u012D\u012E\x03' +
    '\x02\x02\x02\u012E\u0130\x03\x02\x02\x02\u012F\u0129\x03\x02\x02\x02\u0130' +
    '\u0133\x03\x02\x02\x02\u0131\u012F\x03\x02\x02\x02\u0131\u0132\x03\x02' +
    '\x02\x02\u0132\u013C\x03\x02\x02\x02\u0133\u0131\x03\x02\x02\x02\u0134' +
    '\u013A\x078\x02\x02\u0135\u0136\x07;\x02\x02\u0136\u0138\x05\x16\f\x02' +
    '\u0137\u0139\x078\x02\x02\u0138\u0137\x03\x02\x02\x02\u0138\u0139\x03' +
    '\x02\x02\x02\u0139\u013B\x03\x02\x02\x02\u013A\u0135\x03\x02\x02\x02\u013A' +
    '\u013B\x03\x02\x02\x02\u013B\u013D\x03\x02\x02\x02\u013C\u0134\x03\x02' +
    '\x02\x02\u013C\u013D\x03\x02\x02\x02\u013D\u0144\x03\x02\x02\x02\u013E' +
    '\u013F\x07;\x02\x02\u013F\u0141\x05\x16\f\x02\u0140\u0142\x078\x02\x02' +
    '\u0141\u0140\x03\x02\x02\x02\u0141\u0142\x03\x02\x02\x02\u0142\u0144\x03' +
    '\x02\x02\x02\u0143\xF2\x03\x02\x02\x02\u0143\u0125\x03\x02\x02\x02\u0143' +
    '\u013E\x03\x02\x02\x02\u0144\x15\x03\x02\x02\x02\u0145\u0148\x07*\x02' +
    '\x02\u0146\u0147\x079\x02\x02\u0147\u0149\x05f4\x02\u0148\u0146\x03\x02' +
    '\x02\x02\u0148\u0149\x03\x02\x02\x02\u0149\x17\x03\x02\x02\x02\u014A\u014D' +
    '\x05\x1A\x0E\x02\u014B\u014C\x07<\x02\x02\u014C\u014E\x05f4\x02\u014D' +
    '\u014B\x03\x02\x02\x02\u014D\u014E\x03\x02\x02\x02\u014E\u0157\x03\x02' +
    '\x02\x02\u014F\u0150\x078\x02\x02\u0150\u0153\x05\x1A\x0E\x02\u0151\u0152' +
    '\x07<\x02\x02\u0152\u0154\x05f4\x02\u0153\u0151\x03\x02\x02\x02\u0153' +
    '\u0154\x03\x02\x02\x02\u0154\u0156\x03\x02\x02\x02\u0155\u014F\x03\x02' +
    '\x02\x02\u0156\u0159\x03\x02\x02\x02\u0157\u0155\x03\x02\x02\x02\u0157' +
    '\u0158\x03\x02\x02\x02\u0158\u017B\x03\x02\x02\x02\u0159\u0157\x03\x02' +
    '\x02\x02\u015A\u0179\x078\x02\x02\u015B\u015D\x075\x02\x02\u015C\u015E' +
    '\x05\x1A\x0E\x02\u015D\u015C\x03\x02\x02\x02\u015D\u015E\x03\x02\x02\x02' +
    '\u015E\u0167\x03\x02\x02\x02\u015F\u0160\x078\x02\x02\u0160\u0163\x05' +
    '\x1A\x0E\x02\u0161\u0162\x07<\x02\x02\u0162\u0164\x05f4\x02\u0163\u0161' +
    '\x03\x02\x02\x02\u0163\u0164\x03\x02\x02\x02\u0164\u0166\x03\x02\x02\x02' +
    '\u0165\u015F\x03\x02\x02\x02\u0166\u0169\x03\x02\x02\x02\u0167\u0165\x03' +
    '\x02\x02\x02\u0167\u0168\x03\x02\x02\x02\u0168\u0172\x03\x02\x02\x02\u0169' +
    '\u0167\x03\x02\x02\x02\u016A\u0170\x078\x02\x02\u016B\u016C\x07;\x02\x02' +
    '\u016C\u016E\x05\x1A\x0E\x02\u016D\u016F\x078\x02\x02\u016E\u016D\x03' +
    '\x02\x02\x02\u016E\u016F\x03\x02\x02\x02\u016F\u0171\x03\x02\x02\x02\u0170' +
    '\u016B\x03\x02\x02\x02\u0170\u0171\x03\x02\x02\x02\u0171\u0173\x03\x02' +
    '\x02\x02\u0172\u016A\x03\x02\x02\x02\u0172\u0173\x03\x02\x02\x02\u0173' +
    '\u017A\x03\x02\x02\x02\u0174\u0175\x07;\x02\x02\u0175\u0177\x05\x1A\x0E' +
    '\x02\u0176\u0178\x078\x02\x02\u0177\u0176\x03\x02\x02\x02\u0177\u0178' +
    '\x03\x02\x02\x02\u0178\u017A\x03\x02\x02\x02\u0179\u015B\x03\x02\x02\x02' +
    '\u0179\u0174\x03\x02\x02\x02\u0179\u017A\x03\x02\x02\x02\u017A\u017C\x03' +
    '\x02\x02\x02\u017B\u015A\x03\x02\x02\x02\u017B\u017C\x03\x02\x02\x02\u017C' +
    '\u019C\x03\x02\x02\x02\u017D\u017F\x075\x02\x02\u017E\u0180\x05\x1A\x0E' +
    '\x02\u017F\u017E\x03\x02\x02\x02\u017F\u0180\x03\x02\x02\x02\u0180\u0189' +
    '\x03\x02\x02\x02\u0181\u0182\x078\x02\x02\u0182\u0185\x05\x1A\x0E\x02' +
    '\u0183\u0184\x07<\x02\x02\u0184\u0186\x05f4\x02\u0185\u0183\x03\x02\x02' +
    '\x02\u0185\u0186\x03\x02\x02\x02\u0186\u0188\x03\x02\x02\x02\u0187\u0181' +
    '\x03\x02\x02\x02\u0188\u018B\x03\x02\x02\x02\u0189\u0187\x03\x02\x02\x02' +
    '\u0189\u018A\x03\x02\x02\x02\u018A\u0194\x03\x02\x02\x02\u018B\u0189\x03' +
    '\x02\x02\x02\u018C\u0192\x078\x02\x02\u018D\u018E\x07;\x02\x02\u018E\u0190' +
    '\x05\x1A\x0E\x02\u018F\u0191\x078\x02\x02\u0190\u018F\x03\x02\x02\x02' +
    '\u0190\u0191\x03\x02\x02\x02\u0191\u0193\x03\x02\x02\x02\u0192\u018D\x03' +
    '\x02\x02\x02\u0192\u0193\x03\x02\x02\x02\u0193\u0195\x03\x02\x02\x02\u0194' +
    '\u018C\x03\x02\x02\x02\u0194\u0195\x03\x02\x02\x02\u0195\u019C\x03\x02' +
    '\x02\x02\u0196\u0197\x07;\x02\x02\u0197\u0199\x05\x1A\x0E\x02\u0198\u019A' +
    '\x078\x02\x02\u0199\u0198\x03\x02\x02\x02\u0199\u019A\x03\x02\x02\x02' +
    '\u019A\u019C\x03\x02\x02\x02\u019B\u014A\x03\x02\x02\x02\u019B\u017D\x03' +
    '\x02\x02\x02\u019B\u0196\x03\x02\x02\x02\u019C\x19\x03\x02\x02\x02\u019D' +
    '\u019E\x07*\x02\x02\u019E\x1B\x03\x02\x02\x02\u019F\u01A2\x05\x1E\x10' +
    '\x02\u01A0\u01A2\x05R*\x02\u01A1\u019F\x03\x02\x02\x02\u01A1\u01A0\x03' +
    '\x02\x02\x02\u01A2\x1D\x03\x02\x02\x02\u01A3\u01A8\x05 \x11\x02\u01A4' +
    '\u01A5\x07:\x02\x02\u01A5\u01A7\x05 \x11\x02\u01A6\u01A4\x03\x02\x02\x02' +
    '\u01A7\u01AA\x03\x02';
Python3Parser._serializedATNSegment1 = '\x02\x02\u01A8\u01A6\x03\x02\x02\x02\u01A8\u01A9\x03\x02\x02\x02\u01A9' +
    '\u01AC\x03\x02\x02\x02\u01AA\u01A8\x03\x02\x02\x02\u01AB\u01AD\x07:\x02' +
    '\x02\u01AC\u01AB\x03\x02\x02\x02\u01AC\u01AD\x03\x02\x02\x02\u01AD\u01AE' +
    '\x03\x02\x02\x02\u01AE\u01AF\x07)\x02\x02\u01AF\x1F\x03\x02\x02\x02\u01B0' +
    '\u01B9\x05"\x12\x02\u01B1\u01B9\x05,\x17\x02\u01B2\u01B9\x05.\x18\x02' +
    "\u01B3\u01B9\x050\x19\x02\u01B4\u01B9\x05<\x1F\x02\u01B5\u01B9\x05L'" +
    '\x02\u01B6\u01B9\x05N(\x02\u01B7\u01B9\x05P)\x02\u01B8\u01B0\x03\x02\x02' +
    '\x02\u01B8\u01B1\x03\x02\x02\x02\u01B8\u01B2\x03\x02\x02\x02\u01B8\u01B3' +
    '\x03\x02\x02\x02\u01B8\u01B4\x03\x02\x02\x02\u01B8\u01B5\x03\x02\x02\x02' +
    '\u01B8\u01B6\x03\x02\x02\x02\u01B8\u01B7\x03\x02\x02\x02\u01B9!\x03\x02' +
    '\x02\x02\u01BA\u01C2\x05(\x15\x02\u01BB\u01C3\x05&\x14\x02\u01BC\u01BF' +
    '\x05*\x16\x02\u01BD\u01C0\x05\xACW\x02\u01BE\u01C0\x05\x9AN\x02\u01BF' +
    '\u01BD\x03\x02\x02\x02\u01BF\u01BE\x03\x02\x02\x02\u01C0\u01C3\x03\x02' +
    '\x02\x02\u01C1\u01C3\x05$\x13\x02\u01C2\u01BB\x03\x02\x02\x02\u01C2\u01BC' +
    '\x03\x02\x02\x02\u01C2\u01C1\x03\x02\x02\x02\u01C3#\x03\x02\x02\x02\u01C4' +
    '\u01C7\x07<\x02\x02\u01C5\u01C8\x05\xACW\x02\u01C6\u01C8\x05(\x15\x02' +
    '\u01C7\u01C5\x03\x02\x02\x02\u01C7\u01C6\x03\x02\x02\x02\u01C8\u01CA\x03' +
    '\x02\x02\x02\u01C9\u01C4\x03\x02\x02\x02\u01CA\u01CD\x03\x02\x02\x02\u01CB' +
    '\u01C9\x03\x02\x02\x02\u01CB\u01CC\x03\x02\x02\x02\u01CC%\x03\x02\x02' +
    '\x02\u01CD\u01CB\x03\x02\x02\x02\u01CE\u01CF\x079\x02\x02\u01CF\u01D2' +
    '\x05f4\x02\u01D0\u01D1\x07<\x02\x02\u01D1\u01D3\x05f4\x02\u01D2\u01D0' +
    "\x03\x02\x02\x02\u01D2\u01D3\x03\x02\x02\x02\u01D3'\x03\x02\x02\x02\u01D4" +
    '\u01D7\x05f4\x02\u01D5\u01D7\x05x=\x02\u01D6\u01D4\x03\x02\x02\x02\u01D6' +
    '\u01D5\x03\x02\x02\x02\u01D7\u01DF\x03\x02\x02\x02\u01D8\u01DB\x078\x02' +
    '\x02\u01D9\u01DC\x05f4\x02\u01DA\u01DC\x05x=\x02\u01DB\u01D9\x03\x02\x02' +
    '\x02\u01DB\u01DA\x03\x02\x02\x02\u01DC\u01DE\x03\x02\x02\x02\u01DD\u01D8' +
    '\x03\x02\x02\x02\u01DE\u01E1\x03\x02\x02\x02\u01DF\u01DD\x03\x02\x02\x02' +
    '\u01DF\u01E0\x03\x02\x02\x02\u01E0\u01E3\x03\x02\x02\x02\u01E1\u01DF\x03' +
    '\x02\x02\x02\u01E2\u01E4\x078\x02\x02\u01E3\u01E2\x03\x02\x02\x02\u01E3' +
    '\u01E4\x03\x02\x02\x02\u01E4)\x03\x02\x02\x02\u01E5\u01E6\t\x02\x02\x02' +
    '\u01E6+\x03\x02\x02\x02\u01E7\u01E8\x07#\x02\x02\u01E8\u01E9\x05\x98M' +
    '\x02\u01E9-\x03\x02\x02\x02\u01EA\u01EB\x07$\x02\x02\u01EB/\x03\x02\x02' +
    '\x02\u01EC\u01F2\x052\x1A\x02\u01ED\u01F2\x054\x1B\x02\u01EE\u01F2\x05' +
    '6\x1C\x02\u01EF\u01F2\x05:\x1E\x02\u01F0\u01F2\x058\x1D\x02\u01F1\u01EC' +
    '\x03\x02\x02\x02\u01F1\u01ED\x03\x02\x02\x02\u01F1\u01EE\x03\x02\x02\x02' +
    '\u01F1\u01EF\x03\x02\x02\x02\u01F1\u01F0\x03\x02\x02\x02\u01F21\x03\x02' +
    '\x02\x02\u01F3\u01F4\x07&\x02\x02\u01F43\x03\x02\x02\x02\u01F5\u01F6\x07' +
    '%\x02\x02\u01F65\x03\x02\x02\x02\u01F7\u01F9\x07\x07\x02\x02\u01F8\u01FA' +
    '\x05\x9AN\x02\u01F9\u01F8\x03\x02\x02\x02\u01F9\u01FA\x03\x02\x02\x02' +
    '\u01FA7\x03\x02\x02\x02\u01FB\u01FC\x05\xACW\x02\u01FC9\x03\x02\x02\x02' +
    '\u01FD\u0203\x07\b\x02\x02\u01FE\u0201\x05f4\x02\u01FF\u0200\x07\t\x02' +
    '\x02\u0200\u0202\x05f4\x02\u0201\u01FF\x03\x02\x02\x02\u0201\u0202\x03' +
    '\x02\x02\x02\u0202\u0204\x03\x02\x02\x02\u0203\u01FE\x03\x02\x02\x02\u0203' +
    '\u0204\x03\x02\x02\x02\u0204;\x03\x02\x02\x02\u0205\u0208\x05> \x02\u0206' +
    '\u0208\x05@!\x02\u0207\u0205\x03\x02\x02\x02\u0207\u0206\x03\x02\x02\x02' +
    '\u0208=\x03\x02\x02\x02\u0209\u020A\x07\n\x02\x02\u020A\u020B\x05H%\x02' +
    '\u020B?\x03\x02\x02\x02\u020C\u0219\x07\t\x02\x02\u020D\u020F\t\x03\x02' +
    '\x02\u020E\u020D\x03\x02\x02\x02\u020F\u0212\x03\x02\x02\x02\u0210\u020E' +
    '\x03\x02\x02\x02\u0210\u0211\x03\x02\x02\x02\u0211\u0213\x03\x02\x02\x02' +
    '\u0212\u0210\x03\x02\x02\x02\u0213\u021A\x05J&\x02\u0214\u0216\t\x03\x02' +
    '\x02\u0215\u0214\x03\x02\x02\x02\u0216\u0217\x03\x02\x02\x02\u0217\u0215' +
    '\x03\x02\x02\x02\u0217\u0218\x03\x02\x02\x02\u0218\u021A\x03\x02\x02\x02' +
    '\u0219\u0210\x03\x02\x02\x02\u0219\u0215\x03\x02\x02\x02\u021A\u021B\x03' +
    '\x02\x02\x02\u021B\u0222\x07\n\x02\x02\u021C\u0223\x075\x02\x02\u021D' +
    '\u021E\x076\x02\x02\u021E\u021F\x05F$\x02\u021F\u0220\x077\x02\x02\u0220' +
    '\u0223\x03\x02\x02\x02\u0221\u0223\x05F$\x02\u0222\u021C\x03\x02\x02\x02' +
    '\u0222\u021D\x03\x02\x02\x02\u0222\u0221\x03\x02\x02\x02\u0223A\x03\x02' +
    '\x02\x02\u0224\u0227\x07*\x02\x02\u0225\u0226\x07\v\x02\x02\u0226\u0228' +
    '\x07*\x02\x02\u0227\u0225\x03\x02\x02\x02\u0227\u0228\x03\x02\x02\x02' +
    '\u0228C\x03\x02\x02\x02\u0229\u022C\x05J&\x02\u022A\u022B\x07\v\x02\x02' +
    '\u022B\u022D\x07*\x02\x02\u022C\u022A\x03\x02\x02\x02\u022C\u022D\x03' +
    '\x02\x02\x02\u022DE\x03\x02\x02\x02\u022E\u0233\x05B"\x02\u022F\u0230' +
    '\x078\x02\x02\u0230\u0232\x05B"\x02\u0231\u022F\x03\x02\x02\x02\u0232' +
    '\u0235\x03\x02\x02\x02\u0233\u0231\x03\x02\x02\x02\u0233\u0234\x03\x02' +
    '\x02\x02\u0234\u0237\x03\x02\x02\x02\u0235\u0233\x03\x02\x02\x02\u0236' +
    '\u0238\x078\x02\x02\u0237\u0236\x03\x02\x02\x02\u0237\u0238\x03\x02\x02' +
    '\x02\u0238G\x03\x02\x02\x02\u0239\u023E\x05D#\x02\u023A\u023B\x078\x02' +
    '\x02\u023B\u023D\x05D#\x02\u023C\u023A\x03\x02\x02\x02\u023D\u0240\x03' +
    '\x02\x02\x02\u023E\u023C\x03\x02\x02\x02\u023E\u023F\x03\x02\x02\x02\u023F' +
    'I\x03\x02\x02\x02\u0240\u023E\x03\x02\x02\x02\u0241\u0246\x07*\x02\x02' +
    '\u0242\u0243\x073\x02\x02\u0243\u0245\x07*\x02\x02\u0244\u0242\x03\x02' +
    '\x02\x02\u0245\u0248\x03\x02\x02\x02\u0246\u0244\x03\x02\x02\x02\u0246' +
    '\u0247\x03\x02\x02\x02\u0247K\x03\x02\x02\x02\u0248\u0246\x03\x02\x02' +
    '\x02\u0249\u024A\x07\f\x02\x02\u024A\u024F\x07*\x02\x02\u024B\u024C\x07' +
    '8\x02\x02\u024C\u024E\x07*\x02\x02\u024D\u024B\x03\x02\x02\x02\u024E\u0251' +
    '\x03\x02\x02\x02\u024F\u024D\x03\x02\x02\x02\u024F\u0250\x03\x02\x02\x02' +
    '\u0250M\x03\x02\x02\x02\u0251\u024F\x03\x02\x02\x02\u0252\u0253\x07\r' +
    '\x02\x02\u0253\u0258\x07*\x02\x02\u0254\u0255\x078\x02\x02\u0255\u0257' +
    '\x07*\x02\x02\u0256\u0254\x03\x02\x02\x02\u0257\u025A\x03\x02\x02\x02' +
    '\u0258\u0256\x03\x02\x02\x02\u0258\u0259\x03\x02\x02\x02\u0259O\x03\x02' +
    '\x02\x02\u025A\u0258\x03\x02\x02\x02\u025B\u025C\x07\x0E\x02\x02\u025C' +
    '\u025F\x05f4\x02\u025D\u025E\x078\x02\x02\u025E\u0260\x05f4\x02\u025F' +
    '\u025D\x03\x02\x02\x02\u025F\u0260\x03\x02\x02\x02\u0260Q\x03\x02\x02' +
    '\x02\u0261\u026B\x05V,\x02\u0262\u026B\x05X-\x02\u0263\u026B\x05Z.\x02' +
    '\u0264\u026B\x05\\/\x02\u0265\u026B\x05^0\x02\u0266\u026B\x05\x10\t\x02' +
    '\u0267\u026B\x05\x9EP\x02\u0268\u026B\x05\f\x07\x02\u0269\u026B\x05T+' +
    '\x02\u026A\u0261\x03\x02\x02\x02\u026A\u0262\x03\x02\x02\x02\u026A\u0263' +
    '\x03\x02\x02\x02\u026A\u0264\x03\x02\x02\x02\u026A\u0265\x03\x02\x02\x02' +
    '\u026A\u0266\x03\x02\x02\x02\u026A\u0267\x03\x02\x02\x02\u026A\u0268\x03' +
    '\x02\x02\x02\u026A\u0269\x03\x02\x02\x02\u026BS\x03\x02\x02\x02\u026C' +
    "\u0270\x07'\x02\x02\u026D\u0271\x05\x10\t\x02\u026E\u0271\x05^0\x02\u026F" +
    '\u0271\x05Z.\x02\u0270\u026D\x03\x02\x02\x02\u0270\u026E\x03\x02\x02\x02' +
    '\u0270\u026F\x03\x02\x02\x02\u0271U\x03\x02\x02\x02\u0272\u0273\x07\x0F' +
    '\x02\x02\u0273\u0274\x05f4\x02\u0274\u0275\x079\x02\x02\u0275\u027D\x05' +
    'd3\x02\u0276\u0277\x07\x10\x02\x02\u0277\u0278\x05f4\x02\u0278\u0279\x07' +
    '9\x02\x02\u0279\u027A\x05d3\x02\u027A\u027C\x03\x02\x02\x02\u027B\u0276' +
    '\x03\x02\x02\x02\u027C\u027F\x03\x02\x02\x02\u027D\u027B\x03\x02\x02\x02' +
    '\u027D\u027E\x03\x02\x02\x02\u027E\u0283\x03\x02\x02\x02\u027F\u027D\x03' +
    '\x02\x02\x02\u0280\u0281\x07\x11\x02\x02\u0281\u0282\x079\x02\x02\u0282' +
    '\u0284\x05d3\x02\u0283\u0280\x03\x02\x02\x02\u0283\u0284\x03\x02\x02\x02' +
    '\u0284W\x03\x02\x02\x02\u0285\u0286\x07\x12\x02\x02\u0286\u0287\x05f4' +
    '\x02\u0287\u0288\x079\x02\x02\u0288\u028C\x05d3\x02\u0289\u028A\x07\x11' +
    '\x02\x02\u028A\u028B\x079\x02\x02\u028B\u028D\x05d3\x02\u028C\u0289\x03' +
    '\x02\x02\x02\u028C\u028D\x03\x02\x02\x02\u028DY\x03\x02\x02\x02\u028E' +
    '\u028F\x07\x13\x02\x02\u028F\u0290\x05\x98M\x02\u0290\u0291\x07\x14\x02' +
    '\x02\u0291\u0292\x05\x9AN\x02\u0292\u0293\x079\x02\x02\u0293\u0297\x05' +
    'd3\x02\u0294\u0295\x07\x11\x02\x02\u0295\u0296\x079\x02\x02\u0296\u0298' +
    '\x05d3\x02\u0297\u0294\x03\x02\x02\x02\u0297\u0298\x03\x02\x02\x02\u0298' +
    '[\x03\x02\x02\x02\u0299\u029A\x07\x15\x02\x02\u029A\u029B\x079\x02\x02' +
    '\u029B\u02B1\x05d3\x02\u029C\u029D\x05b2\x02\u029D\u029E\x079\x02\x02' +
    '\u029E\u029F\x05d3\x02\u029F\u02A1\x03\x02\x02\x02\u02A0\u029C\x03\x02' +
    '\x02\x02\u02A1\u02A2\x03\x02\x02\x02\u02A2\u02A0\x03\x02\x02\x02\u02A2' +
    '\u02A3\x03\x02\x02\x02\u02A3\u02A7\x03\x02\x02\x02\u02A4\u02A5\x07\x11' +
    '\x02\x02\u02A5\u02A6\x079\x02\x02\u02A6\u02A8\x05d3\x02\u02A7\u02A4\x03' +
    '\x02\x02\x02\u02A7\u02A8\x03\x02\x02\x02\u02A8\u02AC\x03\x02\x02\x02\u02A9' +
    '\u02AA\x07\x16\x02\x02\u02AA\u02AB\x079\x02\x02\u02AB\u02AD\x05d3\x02' +
    '\u02AC\u02A9\x03\x02\x02\x02\u02AC\u02AD\x03\x02\x02\x02\u02AD\u02B2\x03' +
    '\x02\x02\x02\u02AE\u02AF\x07\x16\x02\x02\u02AF\u02B0\x079\x02\x02\u02B0' +
    '\u02B2\x05d3\x02\u02B1\u02A0\x03\x02\x02\x02\u02B1\u02AE\x03\x02\x02\x02' +
    '\u02B2]\x03\x02\x02\x02\u02B3\u02B4\x07\x17\x02\x02\u02B4\u02B9\x05`1' +
    '\x02\u02B5\u02B6\x078\x02\x02\u02B6\u02B8\x05`1\x02\u02B7\u02B5\x03\x02' +
    '\x02\x02\u02B8\u02BB\x03\x02\x02\x02\u02B9\u02B7\x03\x02\x02\x02\u02B9' +
    '\u02BA\x03\x02\x02\x02\u02BA\u02BC\x03\x02\x02\x02\u02BB\u02B9\x03\x02' +
    '\x02\x02\u02BC\u02BD\x079\x02\x02\u02BD\u02BE\x05d3\x02\u02BE_\x03\x02' +
    '\x02\x02\u02BF\u02C2\x05f4\x02\u02C0\u02C1\x07\v\x02\x02\u02C1\u02C3\x05' +
    'z>\x02\u02C2\u02C0\x03\x02\x02\x02\u02C2\u02C3\x03\x02\x02\x02\u02C3a' +
    '\x03\x02\x02\x02\u02C4\u02CA\x07\x18\x02\x02\u02C5\u02C8\x05f4\x02\u02C6' +
    '\u02C7\x07\v\x02\x02\u02C7\u02C9\x07*\x02\x02\u02C8\u02C6\x03\x02\x02' +
    '\x02\u02C8\u02C9\x03\x02\x02\x02\u02C9\u02CB\x03\x02\x02\x02\u02CA\u02C5' +
    '\x03\x02\x02\x02\u02CA\u02CB\x03\x02\x02\x02\u02CBc\x03\x02\x02\x02\u02CC' +
    '\u02D7\x05\x1E\x10\x02\u02CD\u02CE\x07)\x02\x02\u02CE\u02D0\x07d\x02\x02' +
    '\u02CF\u02D1\x05\x1C\x0F\x02\u02D0\u02CF\x03\x02\x02\x02\u02D1\u02D2\x03' +
    '\x02\x02\x02\u02D2\u02D0\x03\x02\x02\x02\u02D2\u02D3\x03\x02\x02\x02\u02D3' +
    '\u02D4\x03\x02\x02\x02\u02D4\u02D5\x07e\x02\x02\u02D5\u02D7\x03\x02\x02' +
    '\x02\u02D6\u02CC\x03\x02\x02\x02\u02D6\u02CD\x03\x02\x02\x02\u02D7e\x03' +
    '\x02\x02\x02\u02D8\u02DE\x05n8\x02\u02D9\u02DA\x07\x0F\x02\x02\u02DA\u02DB' +
    '\x05n8\x02\u02DB\u02DC\x07\x11\x02\x02\u02DC\u02DD\x05f4\x02\u02DD\u02DF' +
    '\x03\x02\x02\x02\u02DE\u02D9\x03\x02\x02\x02\u02DE\u02DF\x03\x02\x02\x02' +
    '\u02DF\u02E2\x03\x02\x02\x02\u02E0\u02E2\x05j6\x02\u02E1\u02D8\x03\x02' +
    '\x02\x02\u02E1\u02E0\x03\x02\x02\x02\u02E2g\x03\x02\x02\x02\u02E3\u02E6' +
    '\x05n8\x02\u02E4\u02E6\x05l7\x02\u02E5\u02E3\x03\x02\x02\x02\u02E5\u02E4' +
    '\x03\x02\x02\x02\u02E6i\x03\x02\x02\x02\u02E7\u02E9\x07\x19\x02\x02\u02E8' +
    '\u02EA\x05\x18\r\x02\u02E9\u02E8\x03\x02\x02\x02\u02E9\u02EA\x03\x02\x02' +
    '\x02\u02EA\u02EB\x03\x02\x02\x02\u02EB\u02EC\x079\x02\x02\u02EC\u02ED' +
    '\x05f4\x02\u02EDk\x03\x02\x02\x02\u02EE\u02F0\x07\x19\x02\x02\u02EF\u02F1' +
    '\x05\x18\r\x02\u02F0\u02EF\x03\x02\x02\x02\u02F0\u02F1\x03\x02\x02\x02' +
    '\u02F1\u02F2\x03\x02\x02\x02\u02F2\u02F3\x079\x02\x02\u02F3\u02F4\x05' +
    'h5\x02\u02F4m\x03\x02\x02\x02\u02F5\u02FA\x05p9\x02\u02F6\u02F7\x07\x1A' +
    '\x02\x02\u02F7\u02F9\x05p9\x02\u02F8\u02F6\x03\x02\x02\x02\u02F9\u02FC' +
    '\x03\x02\x02\x02\u02FA\u02F8\x03\x02\x02\x02\u02FA\u02FB\x03\x02\x02\x02' +
    '\u02FBo\x03\x02\x02\x02\u02FC\u02FA\x03\x02\x02\x02\u02FD\u0302\x05r:' +
    '\x02\u02FE\u02FF\x07\x1B\x02\x02\u02FF\u0301\x05r:\x02\u0300\u02FE\x03' +
    '\x02\x02\x02\u0301\u0304\x03\x02\x02\x02\u0302\u0300\x03\x02\x02\x02\u0302' +
    '\u0303\x03\x02\x02\x02\u0303q\x03\x02\x02\x02\u0304\u0302\x03\x02\x02' +
    '\x02\u0305\u0306\x07\x1C\x02\x02\u0306\u0309\x05r:\x02\u0307\u0309\x05' +
    't;\x02\u0308\u0305\x03\x02\x02\x02\u0308\u0307\x03\x02\x02\x02\u0309s' +
    '\x03\x02\x02\x02\u030A\u0310\x05z>\x02\u030B\u030C\x05v<\x02\u030C\u030D' +
    '\x05z>\x02\u030D\u030F\x03\x02\x02\x02\u030E\u030B\x03\x02\x02\x02\u030F' +
    '\u0312\x03\x02\x02\x02\u0310\u030E\x03\x02\x02\x02\u0310\u0311\x03\x02' +
    '\x02\x02\u0311u\x03\x02\x02\x02\u0312\u0310\x03\x02\x02\x02\u0313\u0321' +
    '\x07L\x02\x02\u0314\u0321\x07M\x02\x02\u0315\u0321\x07N\x02\x02\u0316' +
    '\u0321\x07O\x02\x02\u0317\u0321\x07P\x02\x02\u0318\u0321\x07Q\x02\x02' +
    '\u0319\u0321\x07R\x02\x02\u031A\u0321\x07\x14\x02\x02\u031B\u031C\x07' +
    '\x1C\x02\x02\u031C\u0321\x07\x14\x02\x02\u031D\u0321\x07\x1D\x02\x02\u031E' +
    '\u031F\x07\x1D\x02\x02\u031F\u0321\x07\x1C\x02\x02\u0320\u0313\x03\x02' +
    '\x02\x02\u0320\u0314\x03\x02\x02\x02\u0320\u0315\x03\x02\x02\x02\u0320' +
    '\u0316\x03\x02\x02\x02\u0320\u0317\x03\x02\x02\x02\u0320\u0318\x03\x02' +
    '\x02\x02\u0320\u0319\x03\x02\x02\x02\u0320\u031A\x03\x02\x02\x02\u0320' +
    '\u031B\x03\x02\x02\x02\u0320\u031D\x03\x02\x02\x02\u0320\u031E\x03\x02' +
    '\x02\x02\u0321w\x03\x02\x02\x02\u0322\u0323\x075\x02\x02\u0323\u0324\x05' +
    'z>\x02\u0324y\x03\x02\x02\x02\u0325\u032A\x05|?\x02\u0326\u0327\x07?\x02' +
    '\x02\u0327\u0329\x05|?\x02\u0328\u0326\x03\x02\x02\x02\u0329\u032C\x03' +
    '\x02\x02\x02\u032A\u0328\x03\x02\x02\x02\u032A\u032B\x03\x02\x02\x02\u032B' +
    '{\x03\x02\x02\x02\u032C\u032A\x03\x02\x02\x02\u032D\u0332\x05~@\x02\u032E' +
    '\u032F\x07@\x02\x02\u032F\u0331\x05~@\x02\u0330\u032E\x03\x02\x02\x02' +
    '\u0331\u0334\x03\x02\x02\x02\u0332\u0330\x03\x02\x02\x02\u0332\u0333\x03' +
    '\x02\x02\x02\u0333}\x03\x02\x02\x02\u0334\u0332\x03\x02\x02\x02\u0335' +
    '\u033A\x05\x80A\x02\u0336\u0337\x07A\x02\x02\u0337\u0339\x05\x80A\x02' +
    '\u0338\u0336\x03\x02\x02\x02\u0339\u033C\x03\x02\x02\x02\u033A\u0338\x03' +
    '\x02\x02\x02\u033A\u033B\x03\x02\x02\x02\u033B\x7F\x03\x02\x02\x02\u033C' +
    '\u033A\x03\x02\x02\x02\u033D\u0342\x05\x82B\x02\u033E\u033F\t\x04\x02' +
    '\x02\u033F\u0341\x05\x82B\x02\u0340\u033E\x03\x02\x02\x02\u0341\u0344' +
    '\x03\x02\x02\x02\u0342\u0340\x03\x02\x02\x02\u0342\u0343\x03\x02\x02\x02' +
    '\u0343\x81\x03\x02\x02\x02\u0344\u0342\x03\x02\x02\x02\u0345\u034A\x05' +
    '\x84C\x02\u0346\u0347\t\x05\x02\x02\u0347\u0349\x05\x84C\x02\u0348\u0346' +
    '\x03\x02\x02\x02\u0349\u034C\x03\x02\x02\x02\u034A\u0348\x03\x02\x02\x02' +
    '\u034A\u034B\x03\x02\x02\x02\u034B\x83\x03\x02\x02\x02\u034C\u034A\x03' +
    '\x02\x02\x02\u034D\u0352\x05\x86D\x02\u034E\u034F\t\x06\x02\x02\u034F' +
    '\u0351\x05\x86D\x02\u0350\u034E\x03\x02\x02\x02\u0351\u0354\x03\x02\x02' +
    '\x02\u0352\u0350\x03\x02\x02\x02\u0352\u0353\x03\x02\x02\x02\u0353\x85' +
    '\x03\x02\x02\x02\u0354\u0352\x03\x02\x02\x02\u0355\u0356\t\x07\x02\x02' +
    '\u0356\u0359\x05\x86D\x02\u0357\u0359\x05\x88E\x02\u0358\u0355\x03\x02' +
    '\x02\x02\u0358\u0357\x03\x02\x02\x02\u0359\x87\x03\x02\x02\x02\u035A\u035D' +
    '\x05\x8AF\x02\u035B\u035C\x07;\x02\x02\u035C\u035E\x05\x86D\x02\u035D' +
    '\u035B\x03\x02\x02\x02\u035D\u035E\x03\x02\x02\x02\u035E\x89\x03\x02\x02' +
    '\x02\u035F\u0361\x07(\x02\x02\u0360\u035F\x03\x02\x02\x02\u0360\u0361' +
    '\x03\x02\x02\x02\u0361\u0362\x03\x02\x02\x02\u0362\u0366\x05\x8CG\x02' +
    '\u0363\u0365\x05\x90I\x02\u0364\u0363\x03\x02\x02\x02\u0365\u0368\x03' +
    '\x02\x02\x02\u0366\u0364\x03\x02\x02\x02\u0366\u0367\x03\x02\x02\x02\u0367' +
    '\x8B\x03\x02\x02\x02\u0368\u0366\x03\x02\x02\x02\u0369\u036C\x076\x02' +
    '\x02\u036A\u036D\x05\xACW\x02\u036B\u036D\x05\x8EH\x02\u036C\u036A\x03' +
    '\x02\x02\x02\u036C\u036B\x03\x02\x02\x02\u036C\u036D\x03\x02\x02\x02\u036D' +
    '\u036E\x03\x02\x02\x02\u036E\u0385\x077\x02\x02\u036F\u0371\x07=\x02\x02' +
    '\u0370\u0372\x05\x8EH\x02\u0371\u0370\x03\x02\x02\x02\u0371\u0372\x03' +
    '\x02\x02\x02\u0372\u0373\x03\x02\x02\x02\u0373\u0385\x07>\x02\x02\u0374' +
    '\u0376\x07J\x02\x02\u0375\u0377\x05\x9CO\x02\u0376\u0375\x03\x02\x02\x02' +
    '\u0376\u0377\x03\x02\x02\x02\u0377\u0378\x03\x02\x02\x02\u0378\u0385\x07' +
    'K\x02\x02\u0379\u0385\x07*\x02\x02\u037A\u0385\x07\x04\x02\x02\u037B\u037D' +
    '\x07\x03\x02\x02\u037C\u037B\x03\x02\x02\x02\u037D\u037E\x03\x02\x02\x02' +
    '\u037E\u037C\x03\x02\x02\x02\u037E\u037F\x03\x02\x02\x02\u037F\u0385\x03' +
    '\x02\x02\x02\u0380\u0385\x074\x02\x02\u0381\u0385\x07\x1E\x02\x02\u0382' +
    '\u0385\x07\x1F\x02\x02\u0383\u0385\x07 \x02\x02\u0384\u0369\x03\x02\x02' +
    '\x02\u0384\u036F\x03\x02\x02\x02\u0384\u0374\x03\x02\x02\x02\u0384\u0379' +
    '\x03\x02\x02\x02\u0384\u037A\x03\x02\x02\x02\u0384\u037C\x03\x02\x02\x02' +
    '\u0384\u0380\x03\x02\x02\x02\u0384\u0381\x03\x02\x02\x02\u0384\u0382\x03' +
    '\x02\x02\x02\u0384\u0383\x03\x02\x02\x02\u0385\x8D\x03\x02\x02\x02\u0386' +
    '\u0389\x05f4\x02\u0387\u0389\x05x=\x02\u0388\u0386\x03\x02\x02\x02\u0388' +
    '\u0387\x03\x02\x02\x02\u0389\u0398\x03\x02\x02\x02\u038A\u0399\x05\xA6' +
    'T\x02\u038B\u038E\x078\x02\x02\u038C\u038F\x05f4\x02\u038D\u038F\x05x' +
    '=\x02\u038E\u038C\x03\x02\x02\x02\u038E\u038D\x03\x02\x02\x02\u038F\u0391' +
    '\x03\x02\x02\x02\u0390\u038B\x03\x02\x02\x02\u0391\u0394\x03\x02\x02\x02' +
    '\u0392\u0390\x03\x02\x02\x02\u0392\u0393\x03\x02\x02\x02\u0393\u0396\x03' +
    '\x02\x02\x02\u0394\u0392\x03\x02\x02\x02\u0395\u0397\x078\x02\x02\u0396' +
    '\u0395\x03\x02\x02\x02\u0396\u0397\x03\x02\x02\x02\u0397\u0399\x03\x02' +
    '\x02\x02\u0398\u038A\x03\x02\x02\x02\u0398\u0392\x03\x02\x02\x02\u0399' +
    '\x8F\x03\x02\x02\x02\u039A\u039C\x076\x02\x02\u039B\u039D\x05\xA0Q\x02' +
    '\u039C\u039B\x03\x02\x02\x02\u039C\u039D\x03\x02\x02\x02\u039D\u039E\x03' +
    '\x02\x02\x02\u039E\u03A6\x077\x02\x02\u039F\u03A0\x07=\x02\x02\u03A0\u03A1' +
    '\x05\x92J\x02\u03A1\u03A2\x07>\x02\x02\u03A2\u03A6\x03\x02\x02\x02\u03A3' +
    '\u03A4\x073\x02\x02\u03A4\u03A6\x07*\x02\x02\u03A5\u039A\x03\x02\x02\x02' +
    '\u03A5\u039F\x03\x02\x02\x02\u03A5\u03A3\x03\x02\x02\x02\u03A6\x91\x03' +
    '\x02\x02\x02\u03A7\u03AC\x05\x94K\x02\u03A8\u03A9\x078\x02\x02\u03A9\u03AB' +
    '\x05\x94K\x02\u03AA\u03A8\x03\x02\x02\x02\u03AB\u03AE\x03\x02\x02\x02' +
    '\u03AC\u03AA\x03\x02\x02\x02\u03AC\u03AD\x03\x02\x02\x02\u03AD\u03B0\x03' +
    '\x02\x02\x02\u03AE\u03AC\x03\x02\x02\x02\u03AF\u03B1\x078\x02\x02\u03B0' +
    '\u03AF\x03\x02\x02\x02\u03B0\u03B1\x03\x02\x02\x02\u03B1\x93\x03\x02\x02' +
    '\x02\u03B2\u03BE\x05f4\x02\u03B3\u03B5\x05f4\x02\u03B4\u03B3\x03\x02\x02' +
    '\x02\u03B4\u03B5\x03\x02\x02\x02\u03B5\u03B6\x03\x02\x02\x02\u03B6\u03B8' +
    '\x079\x02\x02\u03B7\u03B9\x05f4\x02\u03B8\u03B7\x03\x02\x02\x02\u03B8' +
    '\u03B9\x03\x02\x02\x02\u03B9\u03BB\x03\x02\x02\x02\u03BA\u03BC\x05\x96' +
    'L\x02\u03BB\u03BA\x03\x02\x02\x02\u03BB\u03BC\x03\x02\x02\x02\u03BC\u03BE' +
    '\x03\x02\x02\x02\u03BD\u03B2\x03\x02\x02\x02\u03BD\u03B4\x03\x02\x02\x02' +
    '\u03BE\x95\x03\x02\x02\x02\u03BF\u03C1\x079\x02\x02\u03C0\u03C2\x05f4' +
    '\x02\u03C1\u03C0\x03\x02\x02\x02\u03C1\u03C2\x03\x02\x02\x02\u03C2\x97' +
    '\x03\x02\x02\x02\u03C3\u03C6\x05z>\x02\u03C4\u03C6\x05x=\x02\u03C5\u03C3' +
    '\x03\x02\x02\x02\u03C5\u03C4\x03\x02\x02\x02\u03C6\u03CE\x03\x02\x02\x02' +
    '\u03C7\u03CA\x078\x02\x02\u03C8\u03CB\x05z>\x02\u03C9\u03CB\x05x=\x02' +
    '\u03CA\u03C8\x03\x02\x02\x02\u03CA\u03C9\x03\x02\x02\x02\u03CB\u03CD\x03' +
    '\x02\x02\x02\u03CC\u03C7\x03\x02\x02\x02\u03CD\u03D0\x03\x02\x02\x02\u03CE' +
    '\u03CC\x03\x02\x02\x02\u03CE\u03CF\x03\x02\x02\x02\u03CF\u03D2\x03\x02' +
    '\x02\x02\u03D0\u03CE\x03\x02\x02\x02\u03D1\u03D3\x078\x02\x02\u03D2\u03D1' +
    '\x03\x02\x02\x02\u03D2\u03D3\x03\x02\x02\x02\u03D3\x99\x03\x02\x02\x02' +
    '\u03D4\u03D9\x05f4\x02\u03D5\u03D6\x078\x02\x02\u03D6\u03D8\x05f4\x02' +
    '\u03D7\u03D5\x03\x02\x02\x02\u03D8\u03DB\x03\x02\x02\x02\u03D9\u03D7\x03' +
    '\x02\x02\x02\u03D9\u03DA\x03\x02\x02\x02\u03DA\u03DD\x03\x02\x02\x02\u03DB' +
    '\u03D9\x03\x02\x02\x02\u03DC\u03DE\x078\x02\x02\u03DD\u03DC\x03\x02\x02' +
    '\x02\u03DD\u03DE\x03\x02\x02\x02\u03DE\x9B\x03\x02\x02\x02\u03DF\u03E0' +
    '\x05f4\x02\u03E0\u03E1\x079\x02\x02\u03E1\u03E2\x05f4\x02\u03E2\u03E6' +
    '\x03\x02\x02\x02\u03E3\u03E4\x07;\x02\x02\u03E4\u03E6\x05z>\x02\u03E5' +
    '\u03DF\x03\x02\x02\x02\u03E5\u03E3\x03\x02\x02\x02\u03E6\u03F9\x03\x02' +
    '\x02\x02\u03E7\u03FA\x05\xA6T\x02\u03E8\u03EF\x078\x02\x02\u03E9\u03EA' +
    '\x05f4\x02\u03EA\u03EB\x079\x02\x02\u03EB\u03EC\x05f4\x02\u03EC\u03F0' +
    '\x03\x02\x02\x02\u03ED\u03EE\x07;\x02\x02\u03EE\u03F0\x05z>\x02\u03EF' +
    '\u03E9\x03\x02\x02\x02\u03EF\u03ED\x03\x02\x02\x02\u03F0\u03F2\x03\x02' +
    '\x02\x02\u03F1\u03E8\x03\x02\x02\x02\u03F2\u03F5\x03\x02\x02\x02\u03F3' +
    '\u03F1\x03\x02\x02\x02\u03F3\u03F4\x03\x02\x02\x02\u03F4\u03F7\x03\x02' +
    '\x02\x02\u03F5\u03F3\x03\x02\x02\x02\u03F6\u03F8\x078\x02\x02\u03F7\u03F6' +
    '\x03\x02\x02\x02\u03F7\u03F8\x03\x02\x02\x02\u03F8\u03FA\x03\x02\x02\x02' +
    '\u03F9\u03E7\x03\x02\x02\x02\u03F9\u03F3\x03\x02\x02\x02\u03FA\u0410\x03' +
    '\x02\x02\x02\u03FB\u03FE\x05f4\x02\u03FC\u03FE\x05x=\x02\u03FD\u03FB\x03' +
    '\x02\x02\x02\u03FD\u03FC\x03\x02\x02\x02\u03FE\u040D\x03\x02\x02\x02\u03FF' +
    '\u040E\x05\xA6T\x02\u0400\u0403\x078\x02\x02\u0401\u0404\x05f4\x02\u0402' +
    '\u0404\x05x=\x02\u0403\u0401\x03\x02\x02\x02\u0403\u0402\x03\x02\x02\x02' +
    '\u0404\u0406\x03\x02\x02\x02\u0405\u0400\x03\x02\x02\x02\u0406\u0409\x03' +
    '\x02\x02\x02\u0407\u0405\x03\x02\x02\x02\u0407\u0408\x03\x02\x02\x02\u0408' +
    '\u040B\x03\x02\x02\x02\u0409\u0407\x03\x02\x02\x02\u040A\u040C\x078\x02' +
    '\x02\u040B\u040A\x03\x02\x02\x02\u040B\u040C\x03\x02\x02\x02\u040C\u040E' +
    '\x03\x02\x02\x02\u040D\u03FF\x03\x02\x02\x02\u040D\u0407\x03\x02\x02\x02' +
    '\u040E\u0410\x03\x02\x02\x02\u040F\u03E5\x03\x02\x02\x02\u040F\u03FD\x03' +
    '\x02\x02\x02\u0410\x9D\x03\x02\x02\x02\u0411\u0412\x07!\x02\x02\u0412' +
    '\u0418\x07*\x02\x02\u0413\u0415\x076\x02\x02\u0414\u0416\x05\xA0Q\x02' +
    '\u0415\u0414\x03\x02\x02\x02\u0415\u0416\x03\x02\x02\x02\u0416\u0417\x03' +
    '\x02\x02\x02\u0417\u0419\x077\x02\x02\u0418\u0413\x03\x02\x02\x02\u0418' +
    '\u0419\x03\x02\x02\x02\u0419\u041A\x03\x02\x02\x02\u041A\u041B\x079\x02' +
    '\x02\u041B\u041C\x05d3\x02\u041C\x9F\x03\x02\x02\x02\u041D\u0422\x05\xA2' +
    'R\x02\u041E\u041F\x078\x02\x02\u041F\u0421\x05\xA2R\x02\u0420\u041E\x03' +
    '\x02\x02\x02\u0421\u0424\x03\x02\x02\x02\u0422\u0420\x03\x02\x02\x02\u0422' +
    '\u0423\x03\x02\x02\x02\u0423\u0426\x03\x02\x02\x02\u0424\u0422\x03\x02' +
    '\x02\x02\u0425\u0427\x078\x02\x02\u0426\u0425\x03\x02\x02\x02\u0426\u0427' +
    '\x03\x02\x02\x02\u0427\xA1\x03\x02\x02\x02\u0428\u042A\x05f4\x02\u0429' +
    '\u042B\x05\xA6T\x02\u042A\u0429\x03\x02\x02\x02\u042A\u042B\x03\x02\x02' +
    '\x02\u042B\u0435\x03\x02\x02\x02\u042C\u042D\x05f4\x02\u042D\u042E\x07' +
    '<\x02\x02\u042E\u042F\x05f4\x02\u042F\u0435\x03\x02\x02\x02\u0430\u0431' +
    '\x07;\x02\x02\u0431\u0435\x05f4\x02\u0432\u0433\x075\x02\x02\u0433\u0435' +
    '\x05f4\x02\u0434\u0428\x03\x02\x02\x02\u0434\u042C\x03\x02\x02\x02\u0434' +
    '\u0430\x03\x02\x02\x02\u0434\u0432\x03\x02\x02\x02\u0435\xA3\x03\x02\x02' +
    '\x02\u0436\u0439\x05\xA6T\x02\u0437\u0439\x05\xA8U\x02\u0438\u0436\x03' +
    '\x02\x02\x02\u0438\u0437\x03\x02\x02\x02\u0439\xA5\x03\x02\x02\x02\u043A' +
    "\u043C\x07'\x02\x02\u043B\u043A\x03\x02\x02\x02\u043B\u043C\x03\x02\x02" +
    '\x02\u043C\u043D\x03\x02\x02\x02\u043D\u043E\x07\x13\x02\x02\u043E\u043F' +
    '\x05\x98M\x02\u043F\u0440\x07\x14\x02\x02\u0440\u0442\x05n8\x02\u0441' +
    '\u0443\x05\xA4S\x02\u0442\u0441\x03\x02\x02\x02\u0442\u0443\x03\x02\x02' +
    '\x02\u0443\xA7\x03\x02\x02\x02\u0444\u0445\x07\x0F\x02\x02\u0445\u0447' +
    '\x05h5\x02\u0446\u0448\x05\xA4S\x02\u0447\u0446\x03\x02\x02\x02\u0447' +
    '\u0448\x03\x02\x02\x02\u0448\xA9\x03\x02\x02\x02\u0449\u044A\x07*\x02' +
    '\x02\u044A\xAB\x03\x02\x02\x02\u044B\u044D\x07"\x02\x02\u044C\u044E\x05' +
    '\xAEX\x02\u044D\u044C\x03\x02\x02\x02\u044D\u044E\x03\x02\x02\x02\u044E' +
    '\xAD\x03\x02\x02\x02\u044F\u0450\x07\t\x02\x02';
Python3Parser._serializedATNSegment2 = '\u0450\u0453\x05f4\x02\u0451\u0453\x05\x9AN\x02\u0452\u044F\x03\x02\x02' +
    '\x02\u0452\u0451\x03\x02\x02\x02\u0453\xAF\x03\x02\x02\x02\xA8\xB5\xB9' +
    '\xBB\xC4\xCD\xD0\xD7\xDD\xE7\xEE\xF5\xFB\xFF\u0105\u010B\u010F\u0116\u0118' +
    '\u011A\u011F\u0121\u0123\u0127\u012D\u0131\u0138\u013A\u013C\u0141\u0143' +
    '\u0148\u014D\u0153\u0157\u015D\u0163\u0167\u016E\u0170\u0172\u0177\u0179' +
    '\u017B\u017F\u0185\u0189\u0190\u0192\u0194\u0199\u019B\u01A1\u01A8\u01AC' +
    '\u01B8\u01BF\u01C2\u01C7\u01CB\u01D2\u01D6\u01DB\u01DF\u01E3\u01F1\u01F9' +
    '\u0201\u0203\u0207\u0210\u0217\u0219\u0222\u0227\u022C\u0233\u0237\u023E' +
    '\u0246\u024F\u0258\u025F\u026A\u0270\u027D\u0283\u028C\u0297\u02A2\u02A7' +
    '\u02AC\u02B1\u02B9\u02C2\u02C8\u02CA\u02D2\u02D6\u02DE\u02E1\u02E5\u02E9' +
    '\u02F0\u02FA\u0302\u0308\u0310\u0320\u032A\u0332\u033A\u0342\u034A\u0352' +
    '\u0358\u035D\u0360\u0366\u036C\u0371\u0376\u037E\u0384\u0388\u038E\u0392' +
    '\u0396\u0398\u039C\u03A5\u03AC\u03B0\u03B4\u03B8\u03BB\u03BD\u03C1\u03C5' +
    '\u03CA\u03CE\u03D2\u03D9\u03DD\u03E5\u03EF\u03F3\u03F7\u03F9\u03FD\u0403' +
    '\u0407\u040B\u040D\u040F\u0415\u0418\u0422\u0426\u042A\u0434\u0438\u043B' +
    '\u0442\u0447\u044D\u0452';
Python3Parser._serializedATN = Utils.join([
    Python3Parser._serializedATNSegment0,
    Python3Parser._serializedATNSegment1,
    Python3Parser._serializedATNSegment2,
], '');
class Single_inputContext extends ParserRuleContext_1.ParserRuleContext {
    NEWLINE() {
        return this.tryGetToken(Python3Parser.NEWLINE, 0);
    }
    simple_stmt() {
        return this.tryGetRuleContext(0, Simple_stmtContext);
    }
    compound_stmt() {
        return this.tryGetRuleContext(0, Compound_stmtContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_single_input;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterSingle_input) {
            listener.enterSingle_input(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitSingle_input) {
            listener.exitSingle_input(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitSingle_input) {
            return visitor.visitSingle_input(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Single_inputContext = Single_inputContext;
class File_inputContext extends ParserRuleContext_1.ParserRuleContext {
    EOF() {
        return this.getToken(Python3Parser.EOF, 0);
    }
    NEWLINE(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.NEWLINE);
        }
        else {
            return this.getToken(Python3Parser.NEWLINE, i);
        }
    }
    stmt(i) {
        if (i === undefined) {
            return this.getRuleContexts(StmtContext);
        }
        else {
            return this.getRuleContext(i, StmtContext);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_file_input;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterFile_input) {
            listener.enterFile_input(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitFile_input) {
            listener.exitFile_input(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitFile_input) {
            return visitor.visitFile_input(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.File_inputContext = File_inputContext;
class Eval_inputContext extends ParserRuleContext_1.ParserRuleContext {
    testlist() {
        return this.getRuleContext(0, TestlistContext);
    }
    EOF() {
        return this.getToken(Python3Parser.EOF, 0);
    }
    NEWLINE(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.NEWLINE);
        }
        else {
            return this.getToken(Python3Parser.NEWLINE, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_eval_input;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterEval_input) {
            listener.enterEval_input(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitEval_input) {
            listener.exitEval_input(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitEval_input) {
            return visitor.visitEval_input(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Eval_inputContext = Eval_inputContext;
class DecoratorContext extends ParserRuleContext_1.ParserRuleContext {
    AT() {
        return this.getToken(Python3Parser.AT, 0);
    }
    dotted_name() {
        return this.getRuleContext(0, Dotted_nameContext);
    }
    NEWLINE() {
        return this.getToken(Python3Parser.NEWLINE, 0);
    }
    OPEN_PAREN() {
        return this.tryGetToken(Python3Parser.OPEN_PAREN, 0);
    }
    CLOSE_PAREN() {
        return this.tryGetToken(Python3Parser.CLOSE_PAREN, 0);
    }
    arglist() {
        return this.tryGetRuleContext(0, ArglistContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_decorator;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterDecorator) {
            listener.enterDecorator(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitDecorator) {
            listener.exitDecorator(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitDecorator) {
            return visitor.visitDecorator(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.DecoratorContext = DecoratorContext;
class DecoratorsContext extends ParserRuleContext_1.ParserRuleContext {
    decorator(i) {
        if (i === undefined) {
            return this.getRuleContexts(DecoratorContext);
        }
        else {
            return this.getRuleContext(i, DecoratorContext);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_decorators;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterDecorators) {
            listener.enterDecorators(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitDecorators) {
            listener.exitDecorators(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitDecorators) {
            return visitor.visitDecorators(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.DecoratorsContext = DecoratorsContext;
class DecoratedContext extends ParserRuleContext_1.ParserRuleContext {
    decorators() {
        return this.getRuleContext(0, DecoratorsContext);
    }
    classdef() {
        return this.tryGetRuleContext(0, ClassdefContext);
    }
    funcdef() {
        return this.tryGetRuleContext(0, FuncdefContext);
    }
    async_funcdef() {
        return this.tryGetRuleContext(0, Async_funcdefContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_decorated;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterDecorated) {
            listener.enterDecorated(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitDecorated) {
            listener.exitDecorated(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitDecorated) {
            return visitor.visitDecorated(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.DecoratedContext = DecoratedContext;
class Async_funcdefContext extends ParserRuleContext_1.ParserRuleContext {
    ASYNC() {
        return this.getToken(Python3Parser.ASYNC, 0);
    }
    funcdef() {
        return this.getRuleContext(0, FuncdefContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_async_funcdef;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterAsync_funcdef) {
            listener.enterAsync_funcdef(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitAsync_funcdef) {
            listener.exitAsync_funcdef(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAsync_funcdef) {
            return visitor.visitAsync_funcdef(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Async_funcdefContext = Async_funcdefContext;
class FuncdefContext extends ParserRuleContext_1.ParserRuleContext {
    DEF() {
        return this.getToken(Python3Parser.DEF, 0);
    }
    NAME() {
        return this.getToken(Python3Parser.NAME, 0);
    }
    parameters() {
        return this.getRuleContext(0, ParametersContext);
    }
    COLON() {
        return this.getToken(Python3Parser.COLON, 0);
    }
    suite() {
        return this.getRuleContext(0, SuiteContext);
    }
    ARROW() {
        return this.tryGetToken(Python3Parser.ARROW, 0);
    }
    test() {
        return this.tryGetRuleContext(0, TestContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_funcdef;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterFuncdef) {
            listener.enterFuncdef(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitFuncdef) {
            listener.exitFuncdef(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitFuncdef) {
            return visitor.visitFuncdef(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.FuncdefContext = FuncdefContext;
class ParametersContext extends ParserRuleContext_1.ParserRuleContext {
    OPEN_PAREN() {
        return this.getToken(Python3Parser.OPEN_PAREN, 0);
    }
    CLOSE_PAREN() {
        return this.getToken(Python3Parser.CLOSE_PAREN, 0);
    }
    typedargslist() {
        return this.tryGetRuleContext(0, TypedargslistContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_parameters;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterParameters) {
            listener.enterParameters(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitParameters) {
            listener.exitParameters(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitParameters) {
            return visitor.visitParameters(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ParametersContext = ParametersContext;
class TypedargslistContext extends ParserRuleContext_1.ParserRuleContext {
    tfpdef(i) {
        if (i === undefined) {
            return this.getRuleContexts(TfpdefContext);
        }
        else {
            return this.getRuleContext(i, TfpdefContext);
        }
    }
    STAR() {
        return this.tryGetToken(Python3Parser.STAR, 0);
    }
    POWER() {
        return this.tryGetToken(Python3Parser.POWER, 0);
    }
    ASSIGN(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.ASSIGN);
        }
        else {
            return this.getToken(Python3Parser.ASSIGN, i);
        }
    }
    test(i) {
        if (i === undefined) {
            return this.getRuleContexts(TestContext);
        }
        else {
            return this.getRuleContext(i, TestContext);
        }
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.COMMA);
        }
        else {
            return this.getToken(Python3Parser.COMMA, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_typedargslist;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterTypedargslist) {
            listener.enterTypedargslist(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitTypedargslist) {
            listener.exitTypedargslist(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitTypedargslist) {
            return visitor.visitTypedargslist(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.TypedargslistContext = TypedargslistContext;
class TfpdefContext extends ParserRuleContext_1.ParserRuleContext {
    NAME() {
        return this.getToken(Python3Parser.NAME, 0);
    }
    COLON() {
        return this.tryGetToken(Python3Parser.COLON, 0);
    }
    test() {
        return this.tryGetRuleContext(0, TestContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_tfpdef;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterTfpdef) {
            listener.enterTfpdef(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitTfpdef) {
            listener.exitTfpdef(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitTfpdef) {
            return visitor.visitTfpdef(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.TfpdefContext = TfpdefContext;
class VarargslistContext extends ParserRuleContext_1.ParserRuleContext {
    vfpdef(i) {
        if (i === undefined) {
            return this.getRuleContexts(VfpdefContext);
        }
        else {
            return this.getRuleContext(i, VfpdefContext);
        }
    }
    STAR() {
        return this.tryGetToken(Python3Parser.STAR, 0);
    }
    POWER() {
        return this.tryGetToken(Python3Parser.POWER, 0);
    }
    ASSIGN(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.ASSIGN);
        }
        else {
            return this.getToken(Python3Parser.ASSIGN, i);
        }
    }
    test(i) {
        if (i === undefined) {
            return this.getRuleContexts(TestContext);
        }
        else {
            return this.getRuleContext(i, TestContext);
        }
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.COMMA);
        }
        else {
            return this.getToken(Python3Parser.COMMA, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_varargslist;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterVarargslist) {
            listener.enterVarargslist(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitVarargslist) {
            listener.exitVarargslist(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitVarargslist) {
            return visitor.visitVarargslist(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.VarargslistContext = VarargslistContext;
class VfpdefContext extends ParserRuleContext_1.ParserRuleContext {
    NAME() {
        return this.getToken(Python3Parser.NAME, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_vfpdef;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterVfpdef) {
            listener.enterVfpdef(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitVfpdef) {
            listener.exitVfpdef(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitVfpdef) {
            return visitor.visitVfpdef(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.VfpdefContext = VfpdefContext;
class StmtContext extends ParserRuleContext_1.ParserRuleContext {
    simple_stmt() {
        return this.tryGetRuleContext(0, Simple_stmtContext);
    }
    compound_stmt() {
        return this.tryGetRuleContext(0, Compound_stmtContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterStmt) {
            listener.enterStmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitStmt) {
            listener.exitStmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitStmt) {
            return visitor.visitStmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.StmtContext = StmtContext;
class Simple_stmtContext extends ParserRuleContext_1.ParserRuleContext {
    small_stmt(i) {
        if (i === undefined) {
            return this.getRuleContexts(Small_stmtContext);
        }
        else {
            return this.getRuleContext(i, Small_stmtContext);
        }
    }
    NEWLINE() {
        return this.getToken(Python3Parser.NEWLINE, 0);
    }
    SEMI_COLON(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.SEMI_COLON);
        }
        else {
            return this.getToken(Python3Parser.SEMI_COLON, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_simple_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterSimple_stmt) {
            listener.enterSimple_stmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitSimple_stmt) {
            listener.exitSimple_stmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitSimple_stmt) {
            return visitor.visitSimple_stmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Simple_stmtContext = Simple_stmtContext;
class Small_stmtContext extends ParserRuleContext_1.ParserRuleContext {
    expr_stmt() {
        return this.tryGetRuleContext(0, Expr_stmtContext);
    }
    del_stmt() {
        return this.tryGetRuleContext(0, Del_stmtContext);
    }
    pass_stmt() {
        return this.tryGetRuleContext(0, Pass_stmtContext);
    }
    flow_stmt() {
        return this.tryGetRuleContext(0, Flow_stmtContext);
    }
    import_stmt() {
        return this.tryGetRuleContext(0, Import_stmtContext);
    }
    global_stmt() {
        return this.tryGetRuleContext(0, Global_stmtContext);
    }
    nonlocal_stmt() {
        return this.tryGetRuleContext(0, Nonlocal_stmtContext);
    }
    assert_stmt() {
        return this.tryGetRuleContext(0, Assert_stmtContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_small_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterSmall_stmt) {
            listener.enterSmall_stmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitSmall_stmt) {
            listener.exitSmall_stmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitSmall_stmt) {
            return visitor.visitSmall_stmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Small_stmtContext = Small_stmtContext;
class Expr_stmtContext extends ParserRuleContext_1.ParserRuleContext {
    testlist_star_expr() {
        return this.getRuleContext(0, Testlist_star_exprContext);
    }
    annassign() {
        return this.tryGetRuleContext(0, AnnassignContext);
    }
    augassign() {
        return this.tryGetRuleContext(0, AugassignContext);
    }
    simple_assign() {
        return this.tryGetRuleContext(0, Simple_assignContext);
    }
    yield_expr() {
        return this.tryGetRuleContext(0, Yield_exprContext);
    }
    testlist() {
        return this.tryGetRuleContext(0, TestlistContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_expr_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterExpr_stmt) {
            listener.enterExpr_stmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitExpr_stmt) {
            listener.exitExpr_stmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitExpr_stmt) {
            return visitor.visitExpr_stmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Expr_stmtContext = Expr_stmtContext;
class Simple_assignContext extends ParserRuleContext_1.ParserRuleContext {
    ASSIGN(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.ASSIGN);
        }
        else {
            return this.getToken(Python3Parser.ASSIGN, i);
        }
    }
    yield_expr(i) {
        if (i === undefined) {
            return this.getRuleContexts(Yield_exprContext);
        }
        else {
            return this.getRuleContext(i, Yield_exprContext);
        }
    }
    testlist_star_expr(i) {
        if (i === undefined) {
            return this.getRuleContexts(Testlist_star_exprContext);
        }
        else {
            return this.getRuleContext(i, Testlist_star_exprContext);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_simple_assign;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterSimple_assign) {
            listener.enterSimple_assign(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitSimple_assign) {
            listener.exitSimple_assign(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitSimple_assign) {
            return visitor.visitSimple_assign(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Simple_assignContext = Simple_assignContext;
class AnnassignContext extends ParserRuleContext_1.ParserRuleContext {
    COLON() {
        return this.getToken(Python3Parser.COLON, 0);
    }
    test(i) {
        if (i === undefined) {
            return this.getRuleContexts(TestContext);
        }
        else {
            return this.getRuleContext(i, TestContext);
        }
    }
    ASSIGN() {
        return this.tryGetToken(Python3Parser.ASSIGN, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_annassign;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterAnnassign) {
            listener.enterAnnassign(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitAnnassign) {
            listener.exitAnnassign(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAnnassign) {
            return visitor.visitAnnassign(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.AnnassignContext = AnnassignContext;
class Testlist_star_exprContext extends ParserRuleContext_1.ParserRuleContext {
    test(i) {
        if (i === undefined) {
            return this.getRuleContexts(TestContext);
        }
        else {
            return this.getRuleContext(i, TestContext);
        }
    }
    star_expr(i) {
        if (i === undefined) {
            return this.getRuleContexts(Star_exprContext);
        }
        else {
            return this.getRuleContext(i, Star_exprContext);
        }
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.COMMA);
        }
        else {
            return this.getToken(Python3Parser.COMMA, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_testlist_star_expr;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterTestlist_star_expr) {
            listener.enterTestlist_star_expr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitTestlist_star_expr) {
            listener.exitTestlist_star_expr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitTestlist_star_expr) {
            return visitor.visitTestlist_star_expr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Testlist_star_exprContext = Testlist_star_exprContext;
class AugassignContext extends ParserRuleContext_1.ParserRuleContext {
    ADD_ASSIGN() {
        return this.tryGetToken(Python3Parser.ADD_ASSIGN, 0);
    }
    SUB_ASSIGN() {
        return this.tryGetToken(Python3Parser.SUB_ASSIGN, 0);
    }
    MULT_ASSIGN() {
        return this.tryGetToken(Python3Parser.MULT_ASSIGN, 0);
    }
    AT_ASSIGN() {
        return this.tryGetToken(Python3Parser.AT_ASSIGN, 0);
    }
    DIV_ASSIGN() {
        return this.tryGetToken(Python3Parser.DIV_ASSIGN, 0);
    }
    MOD_ASSIGN() {
        return this.tryGetToken(Python3Parser.MOD_ASSIGN, 0);
    }
    AND_ASSIGN() {
        return this.tryGetToken(Python3Parser.AND_ASSIGN, 0);
    }
    OR_ASSIGN() {
        return this.tryGetToken(Python3Parser.OR_ASSIGN, 0);
    }
    XOR_ASSIGN() {
        return this.tryGetToken(Python3Parser.XOR_ASSIGN, 0);
    }
    LEFT_SHIFT_ASSIGN() {
        return this.tryGetToken(Python3Parser.LEFT_SHIFT_ASSIGN, 0);
    }
    RIGHT_SHIFT_ASSIGN() {
        return this.tryGetToken(Python3Parser.RIGHT_SHIFT_ASSIGN, 0);
    }
    POWER_ASSIGN() {
        return this.tryGetToken(Python3Parser.POWER_ASSIGN, 0);
    }
    IDIV_ASSIGN() {
        return this.tryGetToken(Python3Parser.IDIV_ASSIGN, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_augassign;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterAugassign) {
            listener.enterAugassign(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitAugassign) {
            listener.exitAugassign(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAugassign) {
            return visitor.visitAugassign(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.AugassignContext = AugassignContext;
class Del_stmtContext extends ParserRuleContext_1.ParserRuleContext {
    DEL() {
        return this.getToken(Python3Parser.DEL, 0);
    }
    exprlist() {
        return this.getRuleContext(0, ExprlistContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_del_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterDel_stmt) {
            listener.enterDel_stmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitDel_stmt) {
            listener.exitDel_stmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitDel_stmt) {
            return visitor.visitDel_stmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Del_stmtContext = Del_stmtContext;
class Pass_stmtContext extends ParserRuleContext_1.ParserRuleContext {
    PASS() {
        return this.getToken(Python3Parser.PASS, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_pass_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterPass_stmt) {
            listener.enterPass_stmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitPass_stmt) {
            listener.exitPass_stmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitPass_stmt) {
            return visitor.visitPass_stmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Pass_stmtContext = Pass_stmtContext;
class Flow_stmtContext extends ParserRuleContext_1.ParserRuleContext {
    break_stmt() {
        return this.tryGetRuleContext(0, Break_stmtContext);
    }
    continue_stmt() {
        return this.tryGetRuleContext(0, Continue_stmtContext);
    }
    return_stmt() {
        return this.tryGetRuleContext(0, Return_stmtContext);
    }
    raise_stmt() {
        return this.tryGetRuleContext(0, Raise_stmtContext);
    }
    yield_stmt() {
        return this.tryGetRuleContext(0, Yield_stmtContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_flow_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterFlow_stmt) {
            listener.enterFlow_stmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitFlow_stmt) {
            listener.exitFlow_stmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitFlow_stmt) {
            return visitor.visitFlow_stmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Flow_stmtContext = Flow_stmtContext;
class Break_stmtContext extends ParserRuleContext_1.ParserRuleContext {
    BREAK() {
        return this.getToken(Python3Parser.BREAK, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_break_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterBreak_stmt) {
            listener.enterBreak_stmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitBreak_stmt) {
            listener.exitBreak_stmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitBreak_stmt) {
            return visitor.visitBreak_stmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Break_stmtContext = Break_stmtContext;
class Continue_stmtContext extends ParserRuleContext_1.ParserRuleContext {
    CONTINUE() {
        return this.getToken(Python3Parser.CONTINUE, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_continue_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterContinue_stmt) {
            listener.enterContinue_stmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitContinue_stmt) {
            listener.exitContinue_stmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitContinue_stmt) {
            return visitor.visitContinue_stmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Continue_stmtContext = Continue_stmtContext;
class Return_stmtContext extends ParserRuleContext_1.ParserRuleContext {
    RETURN() {
        return this.getToken(Python3Parser.RETURN, 0);
    }
    testlist() {
        return this.tryGetRuleContext(0, TestlistContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_return_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterReturn_stmt) {
            listener.enterReturn_stmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitReturn_stmt) {
            listener.exitReturn_stmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitReturn_stmt) {
            return visitor.visitReturn_stmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Return_stmtContext = Return_stmtContext;
class Yield_stmtContext extends ParserRuleContext_1.ParserRuleContext {
    yield_expr() {
        return this.getRuleContext(0, Yield_exprContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_yield_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterYield_stmt) {
            listener.enterYield_stmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitYield_stmt) {
            listener.exitYield_stmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitYield_stmt) {
            return visitor.visitYield_stmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Yield_stmtContext = Yield_stmtContext;
class Raise_stmtContext extends ParserRuleContext_1.ParserRuleContext {
    RAISE() {
        return this.getToken(Python3Parser.RAISE, 0);
    }
    test(i) {
        if (i === undefined) {
            return this.getRuleContexts(TestContext);
        }
        else {
            return this.getRuleContext(i, TestContext);
        }
    }
    FROM() {
        return this.tryGetToken(Python3Parser.FROM, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_raise_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterRaise_stmt) {
            listener.enterRaise_stmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitRaise_stmt) {
            listener.exitRaise_stmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitRaise_stmt) {
            return visitor.visitRaise_stmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Raise_stmtContext = Raise_stmtContext;
class Import_stmtContext extends ParserRuleContext_1.ParserRuleContext {
    import_name() {
        return this.tryGetRuleContext(0, Import_nameContext);
    }
    import_from() {
        return this.tryGetRuleContext(0, Import_fromContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_import_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterImport_stmt) {
            listener.enterImport_stmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitImport_stmt) {
            listener.exitImport_stmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitImport_stmt) {
            return visitor.visitImport_stmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Import_stmtContext = Import_stmtContext;
class Import_nameContext extends ParserRuleContext_1.ParserRuleContext {
    IMPORT() {
        return this.getToken(Python3Parser.IMPORT, 0);
    }
    dotted_as_names() {
        return this.getRuleContext(0, Dotted_as_namesContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_import_name;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterImport_name) {
            listener.enterImport_name(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitImport_name) {
            listener.exitImport_name(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitImport_name) {
            return visitor.visitImport_name(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Import_nameContext = Import_nameContext;
class Import_fromContext extends ParserRuleContext_1.ParserRuleContext {
    FROM() {
        return this.tryGetToken(Python3Parser.FROM, 0);
    }
    IMPORT() {
        return this.tryGetToken(Python3Parser.IMPORT, 0);
    }
    dotted_name() {
        return this.tryGetRuleContext(0, Dotted_nameContext);
    }
    STAR() {
        return this.tryGetToken(Python3Parser.STAR, 0);
    }
    OPEN_PAREN() {
        return this.tryGetToken(Python3Parser.OPEN_PAREN, 0);
    }
    import_as_names() {
        return this.tryGetRuleContext(0, Import_as_namesContext);
    }
    CLOSE_PAREN() {
        return this.tryGetToken(Python3Parser.CLOSE_PAREN, 0);
    }
    DOT(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.DOT);
        }
        else {
            return this.getToken(Python3Parser.DOT, i);
        }
    }
    ELLIPSIS(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.ELLIPSIS);
        }
        else {
            return this.getToken(Python3Parser.ELLIPSIS, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_import_from;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterImport_from) {
            listener.enterImport_from(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitImport_from) {
            listener.exitImport_from(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitImport_from) {
            return visitor.visitImport_from(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Import_fromContext = Import_fromContext;
class Import_as_nameContext extends ParserRuleContext_1.ParserRuleContext {
    NAME(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.NAME);
        }
        else {
            return this.getToken(Python3Parser.NAME, i);
        }
    }
    AS() {
        return this.tryGetToken(Python3Parser.AS, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_import_as_name;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterImport_as_name) {
            listener.enterImport_as_name(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitImport_as_name) {
            listener.exitImport_as_name(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitImport_as_name) {
            return visitor.visitImport_as_name(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Import_as_nameContext = Import_as_nameContext;
class Dotted_as_nameContext extends ParserRuleContext_1.ParserRuleContext {
    dotted_name() {
        return this.getRuleContext(0, Dotted_nameContext);
    }
    AS() {
        return this.tryGetToken(Python3Parser.AS, 0);
    }
    NAME() {
        return this.tryGetToken(Python3Parser.NAME, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_dotted_as_name;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterDotted_as_name) {
            listener.enterDotted_as_name(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitDotted_as_name) {
            listener.exitDotted_as_name(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitDotted_as_name) {
            return visitor.visitDotted_as_name(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Dotted_as_nameContext = Dotted_as_nameContext;
class Import_as_namesContext extends ParserRuleContext_1.ParserRuleContext {
    import_as_name(i) {
        if (i === undefined) {
            return this.getRuleContexts(Import_as_nameContext);
        }
        else {
            return this.getRuleContext(i, Import_as_nameContext);
        }
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.COMMA);
        }
        else {
            return this.getToken(Python3Parser.COMMA, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_import_as_names;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterImport_as_names) {
            listener.enterImport_as_names(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitImport_as_names) {
            listener.exitImport_as_names(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitImport_as_names) {
            return visitor.visitImport_as_names(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Import_as_namesContext = Import_as_namesContext;
class Dotted_as_namesContext extends ParserRuleContext_1.ParserRuleContext {
    dotted_as_name(i) {
        if (i === undefined) {
            return this.getRuleContexts(Dotted_as_nameContext);
        }
        else {
            return this.getRuleContext(i, Dotted_as_nameContext);
        }
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.COMMA);
        }
        else {
            return this.getToken(Python3Parser.COMMA, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_dotted_as_names;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterDotted_as_names) {
            listener.enterDotted_as_names(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitDotted_as_names) {
            listener.exitDotted_as_names(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitDotted_as_names) {
            return visitor.visitDotted_as_names(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Dotted_as_namesContext = Dotted_as_namesContext;
class Dotted_nameContext extends ParserRuleContext_1.ParserRuleContext {
    NAME(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.NAME);
        }
        else {
            return this.getToken(Python3Parser.NAME, i);
        }
    }
    DOT(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.DOT);
        }
        else {
            return this.getToken(Python3Parser.DOT, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_dotted_name;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterDotted_name) {
            listener.enterDotted_name(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitDotted_name) {
            listener.exitDotted_name(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitDotted_name) {
            return visitor.visitDotted_name(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Dotted_nameContext = Dotted_nameContext;
class Global_stmtContext extends ParserRuleContext_1.ParserRuleContext {
    GLOBAL() {
        return this.getToken(Python3Parser.GLOBAL, 0);
    }
    NAME(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.NAME);
        }
        else {
            return this.getToken(Python3Parser.NAME, i);
        }
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.COMMA);
        }
        else {
            return this.getToken(Python3Parser.COMMA, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_global_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterGlobal_stmt) {
            listener.enterGlobal_stmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitGlobal_stmt) {
            listener.exitGlobal_stmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitGlobal_stmt) {
            return visitor.visitGlobal_stmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Global_stmtContext = Global_stmtContext;
class Nonlocal_stmtContext extends ParserRuleContext_1.ParserRuleContext {
    NONLOCAL() {
        return this.getToken(Python3Parser.NONLOCAL, 0);
    }
    NAME(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.NAME);
        }
        else {
            return this.getToken(Python3Parser.NAME, i);
        }
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.COMMA);
        }
        else {
            return this.getToken(Python3Parser.COMMA, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_nonlocal_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterNonlocal_stmt) {
            listener.enterNonlocal_stmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitNonlocal_stmt) {
            listener.exitNonlocal_stmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitNonlocal_stmt) {
            return visitor.visitNonlocal_stmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Nonlocal_stmtContext = Nonlocal_stmtContext;
class Assert_stmtContext extends ParserRuleContext_1.ParserRuleContext {
    ASSERT() {
        return this.getToken(Python3Parser.ASSERT, 0);
    }
    test(i) {
        if (i === undefined) {
            return this.getRuleContexts(TestContext);
        }
        else {
            return this.getRuleContext(i, TestContext);
        }
    }
    COMMA() {
        return this.tryGetToken(Python3Parser.COMMA, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_assert_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterAssert_stmt) {
            listener.enterAssert_stmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitAssert_stmt) {
            listener.exitAssert_stmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAssert_stmt) {
            return visitor.visitAssert_stmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Assert_stmtContext = Assert_stmtContext;
class Compound_stmtContext extends ParserRuleContext_1.ParserRuleContext {
    if_stmt() {
        return this.tryGetRuleContext(0, If_stmtContext);
    }
    while_stmt() {
        return this.tryGetRuleContext(0, While_stmtContext);
    }
    for_stmt() {
        return this.tryGetRuleContext(0, For_stmtContext);
    }
    try_stmt() {
        return this.tryGetRuleContext(0, Try_stmtContext);
    }
    with_stmt() {
        return this.tryGetRuleContext(0, With_stmtContext);
    }
    funcdef() {
        return this.tryGetRuleContext(0, FuncdefContext);
    }
    classdef() {
        return this.tryGetRuleContext(0, ClassdefContext);
    }
    decorated() {
        return this.tryGetRuleContext(0, DecoratedContext);
    }
    async_stmt() {
        return this.tryGetRuleContext(0, Async_stmtContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_compound_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterCompound_stmt) {
            listener.enterCompound_stmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitCompound_stmt) {
            listener.exitCompound_stmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitCompound_stmt) {
            return visitor.visitCompound_stmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Compound_stmtContext = Compound_stmtContext;
class Async_stmtContext extends ParserRuleContext_1.ParserRuleContext {
    ASYNC() {
        return this.getToken(Python3Parser.ASYNC, 0);
    }
    funcdef() {
        return this.tryGetRuleContext(0, FuncdefContext);
    }
    with_stmt() {
        return this.tryGetRuleContext(0, With_stmtContext);
    }
    for_stmt() {
        return this.tryGetRuleContext(0, For_stmtContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_async_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterAsync_stmt) {
            listener.enterAsync_stmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitAsync_stmt) {
            listener.exitAsync_stmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAsync_stmt) {
            return visitor.visitAsync_stmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Async_stmtContext = Async_stmtContext;
class If_stmtContext extends ParserRuleContext_1.ParserRuleContext {
    IF() {
        return this.getToken(Python3Parser.IF, 0);
    }
    test(i) {
        if (i === undefined) {
            return this.getRuleContexts(TestContext);
        }
        else {
            return this.getRuleContext(i, TestContext);
        }
    }
    COLON(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.COLON);
        }
        else {
            return this.getToken(Python3Parser.COLON, i);
        }
    }
    suite(i) {
        if (i === undefined) {
            return this.getRuleContexts(SuiteContext);
        }
        else {
            return this.getRuleContext(i, SuiteContext);
        }
    }
    ELIF(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.ELIF);
        }
        else {
            return this.getToken(Python3Parser.ELIF, i);
        }
    }
    ELSE() {
        return this.tryGetToken(Python3Parser.ELSE, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_if_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterIf_stmt) {
            listener.enterIf_stmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitIf_stmt) {
            listener.exitIf_stmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitIf_stmt) {
            return visitor.visitIf_stmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.If_stmtContext = If_stmtContext;
class While_stmtContext extends ParserRuleContext_1.ParserRuleContext {
    WHILE() {
        return this.getToken(Python3Parser.WHILE, 0);
    }
    test() {
        return this.getRuleContext(0, TestContext);
    }
    COLON(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.COLON);
        }
        else {
            return this.getToken(Python3Parser.COLON, i);
        }
    }
    suite(i) {
        if (i === undefined) {
            return this.getRuleContexts(SuiteContext);
        }
        else {
            return this.getRuleContext(i, SuiteContext);
        }
    }
    ELSE() {
        return this.tryGetToken(Python3Parser.ELSE, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_while_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterWhile_stmt) {
            listener.enterWhile_stmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitWhile_stmt) {
            listener.exitWhile_stmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitWhile_stmt) {
            return visitor.visitWhile_stmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.While_stmtContext = While_stmtContext;
class For_stmtContext extends ParserRuleContext_1.ParserRuleContext {
    FOR() {
        return this.getToken(Python3Parser.FOR, 0);
    }
    exprlist() {
        return this.getRuleContext(0, ExprlistContext);
    }
    IN() {
        return this.getToken(Python3Parser.IN, 0);
    }
    testlist() {
        return this.getRuleContext(0, TestlistContext);
    }
    COLON(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.COLON);
        }
        else {
            return this.getToken(Python3Parser.COLON, i);
        }
    }
    suite(i) {
        if (i === undefined) {
            return this.getRuleContexts(SuiteContext);
        }
        else {
            return this.getRuleContext(i, SuiteContext);
        }
    }
    ELSE() {
        return this.tryGetToken(Python3Parser.ELSE, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_for_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterFor_stmt) {
            listener.enterFor_stmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitFor_stmt) {
            listener.exitFor_stmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitFor_stmt) {
            return visitor.visitFor_stmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.For_stmtContext = For_stmtContext;
class Try_stmtContext extends ParserRuleContext_1.ParserRuleContext {
    TRY() {
        return this.tryGetToken(Python3Parser.TRY, 0);
    }
    COLON(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.COLON);
        }
        else {
            return this.getToken(Python3Parser.COLON, i);
        }
    }
    suite(i) {
        if (i === undefined) {
            return this.getRuleContexts(SuiteContext);
        }
        else {
            return this.getRuleContext(i, SuiteContext);
        }
    }
    FINALLY() {
        return this.tryGetToken(Python3Parser.FINALLY, 0);
    }
    except_clause(i) {
        if (i === undefined) {
            return this.getRuleContexts(Except_clauseContext);
        }
        else {
            return this.getRuleContext(i, Except_clauseContext);
        }
    }
    ELSE() {
        return this.tryGetToken(Python3Parser.ELSE, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_try_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterTry_stmt) {
            listener.enterTry_stmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitTry_stmt) {
            listener.exitTry_stmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitTry_stmt) {
            return visitor.visitTry_stmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Try_stmtContext = Try_stmtContext;
class With_stmtContext extends ParserRuleContext_1.ParserRuleContext {
    WITH() {
        return this.getToken(Python3Parser.WITH, 0);
    }
    with_item(i) {
        if (i === undefined) {
            return this.getRuleContexts(With_itemContext);
        }
        else {
            return this.getRuleContext(i, With_itemContext);
        }
    }
    COLON() {
        return this.getToken(Python3Parser.COLON, 0);
    }
    suite() {
        return this.getRuleContext(0, SuiteContext);
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.COMMA);
        }
        else {
            return this.getToken(Python3Parser.COMMA, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_with_stmt;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterWith_stmt) {
            listener.enterWith_stmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitWith_stmt) {
            listener.exitWith_stmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitWith_stmt) {
            return visitor.visitWith_stmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.With_stmtContext = With_stmtContext;
class With_itemContext extends ParserRuleContext_1.ParserRuleContext {
    test() {
        return this.getRuleContext(0, TestContext);
    }
    AS() {
        return this.tryGetToken(Python3Parser.AS, 0);
    }
    expr() {
        return this.tryGetRuleContext(0, ExprContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_with_item;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterWith_item) {
            listener.enterWith_item(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitWith_item) {
            listener.exitWith_item(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitWith_item) {
            return visitor.visitWith_item(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.With_itemContext = With_itemContext;
class Except_clauseContext extends ParserRuleContext_1.ParserRuleContext {
    EXCEPT() {
        return this.getToken(Python3Parser.EXCEPT, 0);
    }
    test() {
        return this.tryGetRuleContext(0, TestContext);
    }
    AS() {
        return this.tryGetToken(Python3Parser.AS, 0);
    }
    NAME() {
        return this.tryGetToken(Python3Parser.NAME, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_except_clause;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterExcept_clause) {
            listener.enterExcept_clause(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitExcept_clause) {
            listener.exitExcept_clause(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitExcept_clause) {
            return visitor.visitExcept_clause(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Except_clauseContext = Except_clauseContext;
class SuiteContext extends ParserRuleContext_1.ParserRuleContext {
    simple_stmt() {
        return this.tryGetRuleContext(0, Simple_stmtContext);
    }
    NEWLINE() {
        return this.tryGetToken(Python3Parser.NEWLINE, 0);
    }
    INDENT() {
        return this.tryGetToken(Python3Parser.INDENT, 0);
    }
    DEDENT() {
        return this.tryGetToken(Python3Parser.DEDENT, 0);
    }
    stmt(i) {
        if (i === undefined) {
            return this.getRuleContexts(StmtContext);
        }
        else {
            return this.getRuleContext(i, StmtContext);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_suite;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterSuite) {
            listener.enterSuite(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitSuite) {
            listener.exitSuite(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitSuite) {
            return visitor.visitSuite(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.SuiteContext = SuiteContext;
class TestContext extends ParserRuleContext_1.ParserRuleContext {
    or_test(i) {
        if (i === undefined) {
            return this.getRuleContexts(Or_testContext);
        }
        else {
            return this.getRuleContext(i, Or_testContext);
        }
    }
    IF() {
        return this.tryGetToken(Python3Parser.IF, 0);
    }
    ELSE() {
        return this.tryGetToken(Python3Parser.ELSE, 0);
    }
    test() {
        return this.tryGetRuleContext(0, TestContext);
    }
    lambdef() {
        return this.tryGetRuleContext(0, LambdefContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_test;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterTest) {
            listener.enterTest(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitTest) {
            listener.exitTest(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitTest) {
            return visitor.visitTest(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.TestContext = TestContext;
class Test_nocondContext extends ParserRuleContext_1.ParserRuleContext {
    or_test() {
        return this.tryGetRuleContext(0, Or_testContext);
    }
    lambdef_nocond() {
        return this.tryGetRuleContext(0, Lambdef_nocondContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_test_nocond;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterTest_nocond) {
            listener.enterTest_nocond(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitTest_nocond) {
            listener.exitTest_nocond(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitTest_nocond) {
            return visitor.visitTest_nocond(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Test_nocondContext = Test_nocondContext;
class LambdefContext extends ParserRuleContext_1.ParserRuleContext {
    LAMBDA() {
        return this.getToken(Python3Parser.LAMBDA, 0);
    }
    COLON() {
        return this.getToken(Python3Parser.COLON, 0);
    }
    test() {
        return this.getRuleContext(0, TestContext);
    }
    varargslist() {
        return this.tryGetRuleContext(0, VarargslistContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_lambdef;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterLambdef) {
            listener.enterLambdef(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitLambdef) {
            listener.exitLambdef(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitLambdef) {
            return visitor.visitLambdef(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.LambdefContext = LambdefContext;
class Lambdef_nocondContext extends ParserRuleContext_1.ParserRuleContext {
    LAMBDA() {
        return this.getToken(Python3Parser.LAMBDA, 0);
    }
    COLON() {
        return this.getToken(Python3Parser.COLON, 0);
    }
    test_nocond() {
        return this.getRuleContext(0, Test_nocondContext);
    }
    varargslist() {
        return this.tryGetRuleContext(0, VarargslistContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_lambdef_nocond;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterLambdef_nocond) {
            listener.enterLambdef_nocond(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitLambdef_nocond) {
            listener.exitLambdef_nocond(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitLambdef_nocond) {
            return visitor.visitLambdef_nocond(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Lambdef_nocondContext = Lambdef_nocondContext;
class Or_testContext extends ParserRuleContext_1.ParserRuleContext {
    and_test(i) {
        if (i === undefined) {
            return this.getRuleContexts(And_testContext);
        }
        else {
            return this.getRuleContext(i, And_testContext);
        }
    }
    OR(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.OR);
        }
        else {
            return this.getToken(Python3Parser.OR, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_or_test;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterOr_test) {
            listener.enterOr_test(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitOr_test) {
            listener.exitOr_test(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitOr_test) {
            return visitor.visitOr_test(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Or_testContext = Or_testContext;
class And_testContext extends ParserRuleContext_1.ParserRuleContext {
    not_test(i) {
        if (i === undefined) {
            return this.getRuleContexts(Not_testContext);
        }
        else {
            return this.getRuleContext(i, Not_testContext);
        }
    }
    AND(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.AND);
        }
        else {
            return this.getToken(Python3Parser.AND, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_and_test;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterAnd_test) {
            listener.enterAnd_test(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitAnd_test) {
            listener.exitAnd_test(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAnd_test) {
            return visitor.visitAnd_test(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.And_testContext = And_testContext;
class Not_testContext extends ParserRuleContext_1.ParserRuleContext {
    NOT() {
        return this.tryGetToken(Python3Parser.NOT, 0);
    }
    not_test() {
        return this.tryGetRuleContext(0, Not_testContext);
    }
    comparison() {
        return this.tryGetRuleContext(0, ComparisonContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_not_test;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterNot_test) {
            listener.enterNot_test(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitNot_test) {
            listener.exitNot_test(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitNot_test) {
            return visitor.visitNot_test(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Not_testContext = Not_testContext;
class ComparisonContext extends ParserRuleContext_1.ParserRuleContext {
    expr(i) {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }
        else {
            return this.getRuleContext(i, ExprContext);
        }
    }
    comp_op(i) {
        if (i === undefined) {
            return this.getRuleContexts(Comp_opContext);
        }
        else {
            return this.getRuleContext(i, Comp_opContext);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_comparison;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterComparison) {
            listener.enterComparison(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitComparison) {
            listener.exitComparison(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitComparison) {
            return visitor.visitComparison(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ComparisonContext = ComparisonContext;
class Comp_opContext extends ParserRuleContext_1.ParserRuleContext {
    LESS_THAN() {
        return this.tryGetToken(Python3Parser.LESS_THAN, 0);
    }
    GREATER_THAN() {
        return this.tryGetToken(Python3Parser.GREATER_THAN, 0);
    }
    EQUALS() {
        return this.tryGetToken(Python3Parser.EQUALS, 0);
    }
    GT_EQ() {
        return this.tryGetToken(Python3Parser.GT_EQ, 0);
    }
    LT_EQ() {
        return this.tryGetToken(Python3Parser.LT_EQ, 0);
    }
    NOT_EQ_1() {
        return this.tryGetToken(Python3Parser.NOT_EQ_1, 0);
    }
    NOT_EQ_2() {
        return this.tryGetToken(Python3Parser.NOT_EQ_2, 0);
    }
    IN() {
        return this.tryGetToken(Python3Parser.IN, 0);
    }
    NOT() {
        return this.tryGetToken(Python3Parser.NOT, 0);
    }
    IS() {
        return this.tryGetToken(Python3Parser.IS, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_comp_op;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterComp_op) {
            listener.enterComp_op(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitComp_op) {
            listener.exitComp_op(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitComp_op) {
            return visitor.visitComp_op(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Comp_opContext = Comp_opContext;
class Star_exprContext extends ParserRuleContext_1.ParserRuleContext {
    STAR() {
        return this.getToken(Python3Parser.STAR, 0);
    }
    expr() {
        return this.getRuleContext(0, ExprContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_star_expr;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterStar_expr) {
            listener.enterStar_expr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitStar_expr) {
            listener.exitStar_expr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitStar_expr) {
            return visitor.visitStar_expr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Star_exprContext = Star_exprContext;
class ExprContext extends ParserRuleContext_1.ParserRuleContext {
    xor_expr(i) {
        if (i === undefined) {
            return this.getRuleContexts(Xor_exprContext);
        }
        else {
            return this.getRuleContext(i, Xor_exprContext);
        }
    }
    OR_OP(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.OR_OP);
        }
        else {
            return this.getToken(Python3Parser.OR_OP, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_expr;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterExpr) {
            listener.enterExpr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitExpr) {
            listener.exitExpr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitExpr) {
            return visitor.visitExpr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ExprContext = ExprContext;
class Xor_exprContext extends ParserRuleContext_1.ParserRuleContext {
    and_expr(i) {
        if (i === undefined) {
            return this.getRuleContexts(And_exprContext);
        }
        else {
            return this.getRuleContext(i, And_exprContext);
        }
    }
    XOR(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.XOR);
        }
        else {
            return this.getToken(Python3Parser.XOR, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_xor_expr;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterXor_expr) {
            listener.enterXor_expr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitXor_expr) {
            listener.exitXor_expr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitXor_expr) {
            return visitor.visitXor_expr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Xor_exprContext = Xor_exprContext;
class And_exprContext extends ParserRuleContext_1.ParserRuleContext {
    shift_expr(i) {
        if (i === undefined) {
            return this.getRuleContexts(Shift_exprContext);
        }
        else {
            return this.getRuleContext(i, Shift_exprContext);
        }
    }
    AND_OP(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.AND_OP);
        }
        else {
            return this.getToken(Python3Parser.AND_OP, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_and_expr;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterAnd_expr) {
            listener.enterAnd_expr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitAnd_expr) {
            listener.exitAnd_expr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAnd_expr) {
            return visitor.visitAnd_expr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.And_exprContext = And_exprContext;
class Shift_exprContext extends ParserRuleContext_1.ParserRuleContext {
    arith_expr(i) {
        if (i === undefined) {
            return this.getRuleContexts(Arith_exprContext);
        }
        else {
            return this.getRuleContext(i, Arith_exprContext);
        }
    }
    LEFT_SHIFT(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.LEFT_SHIFT);
        }
        else {
            return this.getToken(Python3Parser.LEFT_SHIFT, i);
        }
    }
    RIGHT_SHIFT(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.RIGHT_SHIFT);
        }
        else {
            return this.getToken(Python3Parser.RIGHT_SHIFT, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_shift_expr;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterShift_expr) {
            listener.enterShift_expr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitShift_expr) {
            listener.exitShift_expr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitShift_expr) {
            return visitor.visitShift_expr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Shift_exprContext = Shift_exprContext;
class Arith_exprContext extends ParserRuleContext_1.ParserRuleContext {
    term(i) {
        if (i === undefined) {
            return this.getRuleContexts(TermContext);
        }
        else {
            return this.getRuleContext(i, TermContext);
        }
    }
    ADD(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.ADD);
        }
        else {
            return this.getToken(Python3Parser.ADD, i);
        }
    }
    MINUS(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.MINUS);
        }
        else {
            return this.getToken(Python3Parser.MINUS, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_arith_expr;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterArith_expr) {
            listener.enterArith_expr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitArith_expr) {
            listener.exitArith_expr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitArith_expr) {
            return visitor.visitArith_expr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Arith_exprContext = Arith_exprContext;
class TermContext extends ParserRuleContext_1.ParserRuleContext {
    factor(i) {
        if (i === undefined) {
            return this.getRuleContexts(FactorContext);
        }
        else {
            return this.getRuleContext(i, FactorContext);
        }
    }
    STAR(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.STAR);
        }
        else {
            return this.getToken(Python3Parser.STAR, i);
        }
    }
    AT(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.AT);
        }
        else {
            return this.getToken(Python3Parser.AT, i);
        }
    }
    DIV(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.DIV);
        }
        else {
            return this.getToken(Python3Parser.DIV, i);
        }
    }
    MOD(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.MOD);
        }
        else {
            return this.getToken(Python3Parser.MOD, i);
        }
    }
    IDIV(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.IDIV);
        }
        else {
            return this.getToken(Python3Parser.IDIV, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_term;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterTerm) {
            listener.enterTerm(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitTerm) {
            listener.exitTerm(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitTerm) {
            return visitor.visitTerm(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.TermContext = TermContext;
class FactorContext extends ParserRuleContext_1.ParserRuleContext {
    factor() {
        return this.tryGetRuleContext(0, FactorContext);
    }
    ADD() {
        return this.tryGetToken(Python3Parser.ADD, 0);
    }
    MINUS() {
        return this.tryGetToken(Python3Parser.MINUS, 0);
    }
    NOT_OP() {
        return this.tryGetToken(Python3Parser.NOT_OP, 0);
    }
    power() {
        return this.tryGetRuleContext(0, PowerContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_factor;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterFactor) {
            listener.enterFactor(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitFactor) {
            listener.exitFactor(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitFactor) {
            return visitor.visitFactor(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.FactorContext = FactorContext;
class PowerContext extends ParserRuleContext_1.ParserRuleContext {
    atom_expr() {
        return this.getRuleContext(0, Atom_exprContext);
    }
    POWER() {
        return this.tryGetToken(Python3Parser.POWER, 0);
    }
    factor() {
        return this.tryGetRuleContext(0, FactorContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_power;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterPower) {
            listener.enterPower(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitPower) {
            listener.exitPower(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitPower) {
            return visitor.visitPower(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.PowerContext = PowerContext;
class Atom_exprContext extends ParserRuleContext_1.ParserRuleContext {
    atom() {
        return this.getRuleContext(0, AtomContext);
    }
    AWAIT() {
        return this.tryGetToken(Python3Parser.AWAIT, 0);
    }
    trailer(i) {
        if (i === undefined) {
            return this.getRuleContexts(TrailerContext);
        }
        else {
            return this.getRuleContext(i, TrailerContext);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_atom_expr;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterAtom_expr) {
            listener.enterAtom_expr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitAtom_expr) {
            listener.exitAtom_expr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAtom_expr) {
            return visitor.visitAtom_expr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Atom_exprContext = Atom_exprContext;
class AtomContext extends ParserRuleContext_1.ParserRuleContext {
    OPEN_PAREN() {
        return this.tryGetToken(Python3Parser.OPEN_PAREN, 0);
    }
    CLOSE_PAREN() {
        return this.tryGetToken(Python3Parser.CLOSE_PAREN, 0);
    }
    OPEN_BRACK() {
        return this.tryGetToken(Python3Parser.OPEN_BRACK, 0);
    }
    CLOSE_BRACK() {
        return this.tryGetToken(Python3Parser.CLOSE_BRACK, 0);
    }
    OPEN_BRACE() {
        return this.tryGetToken(Python3Parser.OPEN_BRACE, 0);
    }
    CLOSE_BRACE() {
        return this.tryGetToken(Python3Parser.CLOSE_BRACE, 0);
    }
    NAME() {
        return this.tryGetToken(Python3Parser.NAME, 0);
    }
    NUMBER() {
        return this.tryGetToken(Python3Parser.NUMBER, 0);
    }
    ELLIPSIS() {
        return this.tryGetToken(Python3Parser.ELLIPSIS, 0);
    }
    NONE() {
        return this.tryGetToken(Python3Parser.NONE, 0);
    }
    TRUE() {
        return this.tryGetToken(Python3Parser.TRUE, 0);
    }
    FALSE() {
        return this.tryGetToken(Python3Parser.FALSE, 0);
    }
    yield_expr() {
        return this.tryGetRuleContext(0, Yield_exprContext);
    }
    testlist_comp() {
        return this.tryGetRuleContext(0, Testlist_compContext);
    }
    dictorsetmaker() {
        return this.tryGetRuleContext(0, DictorsetmakerContext);
    }
    STRING(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.STRING);
        }
        else {
            return this.getToken(Python3Parser.STRING, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_atom;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterAtom) {
            listener.enterAtom(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitAtom) {
            listener.exitAtom(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAtom) {
            return visitor.visitAtom(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.AtomContext = AtomContext;
class Testlist_compContext extends ParserRuleContext_1.ParserRuleContext {
    test(i) {
        if (i === undefined) {
            return this.getRuleContexts(TestContext);
        }
        else {
            return this.getRuleContext(i, TestContext);
        }
    }
    star_expr(i) {
        if (i === undefined) {
            return this.getRuleContexts(Star_exprContext);
        }
        else {
            return this.getRuleContext(i, Star_exprContext);
        }
    }
    comp_for() {
        return this.tryGetRuleContext(0, Comp_forContext);
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.COMMA);
        }
        else {
            return this.getToken(Python3Parser.COMMA, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_testlist_comp;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterTestlist_comp) {
            listener.enterTestlist_comp(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitTestlist_comp) {
            listener.exitTestlist_comp(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitTestlist_comp) {
            return visitor.visitTestlist_comp(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Testlist_compContext = Testlist_compContext;
class TrailerContext extends ParserRuleContext_1.ParserRuleContext {
    OPEN_PAREN() {
        return this.tryGetToken(Python3Parser.OPEN_PAREN, 0);
    }
    CLOSE_PAREN() {
        return this.tryGetToken(Python3Parser.CLOSE_PAREN, 0);
    }
    arglist() {
        return this.tryGetRuleContext(0, ArglistContext);
    }
    OPEN_BRACK() {
        return this.tryGetToken(Python3Parser.OPEN_BRACK, 0);
    }
    subscriptlist() {
        return this.tryGetRuleContext(0, SubscriptlistContext);
    }
    CLOSE_BRACK() {
        return this.tryGetToken(Python3Parser.CLOSE_BRACK, 0);
    }
    DOT() {
        return this.tryGetToken(Python3Parser.DOT, 0);
    }
    NAME() {
        return this.tryGetToken(Python3Parser.NAME, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_trailer;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterTrailer) {
            listener.enterTrailer(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitTrailer) {
            listener.exitTrailer(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitTrailer) {
            return visitor.visitTrailer(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.TrailerContext = TrailerContext;
class SubscriptlistContext extends ParserRuleContext_1.ParserRuleContext {
    subscript(i) {
        if (i === undefined) {
            return this.getRuleContexts(SubscriptContext);
        }
        else {
            return this.getRuleContext(i, SubscriptContext);
        }
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.COMMA);
        }
        else {
            return this.getToken(Python3Parser.COMMA, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_subscriptlist;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterSubscriptlist) {
            listener.enterSubscriptlist(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitSubscriptlist) {
            listener.exitSubscriptlist(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitSubscriptlist) {
            return visitor.visitSubscriptlist(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.SubscriptlistContext = SubscriptlistContext;
class SubscriptContext extends ParserRuleContext_1.ParserRuleContext {
    test(i) {
        if (i === undefined) {
            return this.getRuleContexts(TestContext);
        }
        else {
            return this.getRuleContext(i, TestContext);
        }
    }
    COLON() {
        return this.tryGetToken(Python3Parser.COLON, 0);
    }
    sliceop() {
        return this.tryGetRuleContext(0, SliceopContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_subscript;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterSubscript) {
            listener.enterSubscript(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitSubscript) {
            listener.exitSubscript(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitSubscript) {
            return visitor.visitSubscript(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.SubscriptContext = SubscriptContext;
class SliceopContext extends ParserRuleContext_1.ParserRuleContext {
    COLON() {
        return this.getToken(Python3Parser.COLON, 0);
    }
    test() {
        return this.tryGetRuleContext(0, TestContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_sliceop;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterSliceop) {
            listener.enterSliceop(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitSliceop) {
            listener.exitSliceop(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitSliceop) {
            return visitor.visitSliceop(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.SliceopContext = SliceopContext;
class ExprlistContext extends ParserRuleContext_1.ParserRuleContext {
    expr(i) {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }
        else {
            return this.getRuleContext(i, ExprContext);
        }
    }
    star_expr(i) {
        if (i === undefined) {
            return this.getRuleContexts(Star_exprContext);
        }
        else {
            return this.getRuleContext(i, Star_exprContext);
        }
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.COMMA);
        }
        else {
            return this.getToken(Python3Parser.COMMA, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_exprlist;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterExprlist) {
            listener.enterExprlist(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitExprlist) {
            listener.exitExprlist(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitExprlist) {
            return visitor.visitExprlist(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ExprlistContext = ExprlistContext;
class TestlistContext extends ParserRuleContext_1.ParserRuleContext {
    test(i) {
        if (i === undefined) {
            return this.getRuleContexts(TestContext);
        }
        else {
            return this.getRuleContext(i, TestContext);
        }
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.COMMA);
        }
        else {
            return this.getToken(Python3Parser.COMMA, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_testlist;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterTestlist) {
            listener.enterTestlist(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitTestlist) {
            listener.exitTestlist(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitTestlist) {
            return visitor.visitTestlist(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.TestlistContext = TestlistContext;
class DictorsetmakerContext extends ParserRuleContext_1.ParserRuleContext {
    test(i) {
        if (i === undefined) {
            return this.getRuleContexts(TestContext);
        }
        else {
            return this.getRuleContext(i, TestContext);
        }
    }
    COLON(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.COLON);
        }
        else {
            return this.getToken(Python3Parser.COLON, i);
        }
    }
    POWER(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.POWER);
        }
        else {
            return this.getToken(Python3Parser.POWER, i);
        }
    }
    expr(i) {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }
        else {
            return this.getRuleContext(i, ExprContext);
        }
    }
    comp_for() {
        return this.tryGetRuleContext(0, Comp_forContext);
    }
    star_expr(i) {
        if (i === undefined) {
            return this.getRuleContexts(Star_exprContext);
        }
        else {
            return this.getRuleContext(i, Star_exprContext);
        }
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.COMMA);
        }
        else {
            return this.getToken(Python3Parser.COMMA, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_dictorsetmaker;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterDictorsetmaker) {
            listener.enterDictorsetmaker(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitDictorsetmaker) {
            listener.exitDictorsetmaker(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitDictorsetmaker) {
            return visitor.visitDictorsetmaker(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.DictorsetmakerContext = DictorsetmakerContext;
class ClassdefContext extends ParserRuleContext_1.ParserRuleContext {
    CLASS() {
        return this.getToken(Python3Parser.CLASS, 0);
    }
    NAME() {
        return this.getToken(Python3Parser.NAME, 0);
    }
    COLON() {
        return this.getToken(Python3Parser.COLON, 0);
    }
    suite() {
        return this.getRuleContext(0, SuiteContext);
    }
    OPEN_PAREN() {
        return this.tryGetToken(Python3Parser.OPEN_PAREN, 0);
    }
    CLOSE_PAREN() {
        return this.tryGetToken(Python3Parser.CLOSE_PAREN, 0);
    }
    arglist() {
        return this.tryGetRuleContext(0, ArglistContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_classdef;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterClassdef) {
            listener.enterClassdef(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitClassdef) {
            listener.exitClassdef(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitClassdef) {
            return visitor.visitClassdef(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ClassdefContext = ClassdefContext;
class ArglistContext extends ParserRuleContext_1.ParserRuleContext {
    argument(i) {
        if (i === undefined) {
            return this.getRuleContexts(ArgumentContext);
        }
        else {
            return this.getRuleContext(i, ArgumentContext);
        }
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(Python3Parser.COMMA);
        }
        else {
            return this.getToken(Python3Parser.COMMA, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_arglist;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterArglist) {
            listener.enterArglist(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitArglist) {
            listener.exitArglist(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitArglist) {
            return visitor.visitArglist(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ArglistContext = ArglistContext;
class ArgumentContext extends ParserRuleContext_1.ParserRuleContext {
    test(i) {
        if (i === undefined) {
            return this.getRuleContexts(TestContext);
        }
        else {
            return this.getRuleContext(i, TestContext);
        }
    }
    ASSIGN() {
        return this.tryGetToken(Python3Parser.ASSIGN, 0);
    }
    POWER() {
        return this.tryGetToken(Python3Parser.POWER, 0);
    }
    STAR() {
        return this.tryGetToken(Python3Parser.STAR, 0);
    }
    comp_for() {
        return this.tryGetRuleContext(0, Comp_forContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_argument;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterArgument) {
            listener.enterArgument(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitArgument) {
            listener.exitArgument(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitArgument) {
            return visitor.visitArgument(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ArgumentContext = ArgumentContext;
class Comp_iterContext extends ParserRuleContext_1.ParserRuleContext {
    comp_for() {
        return this.tryGetRuleContext(0, Comp_forContext);
    }
    comp_if() {
        return this.tryGetRuleContext(0, Comp_ifContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_comp_iter;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterComp_iter) {
            listener.enterComp_iter(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitComp_iter) {
            listener.exitComp_iter(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitComp_iter) {
            return visitor.visitComp_iter(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Comp_iterContext = Comp_iterContext;
class Comp_forContext extends ParserRuleContext_1.ParserRuleContext {
    FOR() {
        return this.getToken(Python3Parser.FOR, 0);
    }
    exprlist() {
        return this.getRuleContext(0, ExprlistContext);
    }
    IN() {
        return this.getToken(Python3Parser.IN, 0);
    }
    or_test() {
        return this.getRuleContext(0, Or_testContext);
    }
    ASYNC() {
        return this.tryGetToken(Python3Parser.ASYNC, 0);
    }
    comp_iter() {
        return this.tryGetRuleContext(0, Comp_iterContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_comp_for;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterComp_for) {
            listener.enterComp_for(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitComp_for) {
            listener.exitComp_for(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitComp_for) {
            return visitor.visitComp_for(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Comp_forContext = Comp_forContext;
class Comp_ifContext extends ParserRuleContext_1.ParserRuleContext {
    IF() {
        return this.getToken(Python3Parser.IF, 0);
    }
    test_nocond() {
        return this.getRuleContext(0, Test_nocondContext);
    }
    comp_iter() {
        return this.tryGetRuleContext(0, Comp_iterContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_comp_if;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterComp_if) {
            listener.enterComp_if(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitComp_if) {
            listener.exitComp_if(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitComp_if) {
            return visitor.visitComp_if(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Comp_ifContext = Comp_ifContext;
class Encoding_declContext extends ParserRuleContext_1.ParserRuleContext {
    NAME() {
        return this.getToken(Python3Parser.NAME, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_encoding_decl;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterEncoding_decl) {
            listener.enterEncoding_decl(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitEncoding_decl) {
            listener.exitEncoding_decl(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitEncoding_decl) {
            return visitor.visitEncoding_decl(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Encoding_declContext = Encoding_declContext;
class Yield_exprContext extends ParserRuleContext_1.ParserRuleContext {
    YIELD() {
        return this.getToken(Python3Parser.YIELD, 0);
    }
    yield_arg() {
        return this.tryGetRuleContext(0, Yield_argContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_yield_expr;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterYield_expr) {
            listener.enterYield_expr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitYield_expr) {
            listener.exitYield_expr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitYield_expr) {
            return visitor.visitYield_expr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Yield_exprContext = Yield_exprContext;
class Yield_argContext extends ParserRuleContext_1.ParserRuleContext {
    FROM() {
        return this.tryGetToken(Python3Parser.FROM, 0);
    }
    test() {
        return this.tryGetRuleContext(0, TestContext);
    }
    testlist() {
        return this.tryGetRuleContext(0, TestlistContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return Python3Parser.RULE_yield_arg;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterYield_arg) {
            listener.enterYield_arg(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitYield_arg) {
            listener.exitYield_arg(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitYield_arg) {
            return visitor.visitYield_arg(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Yield_argContext = Yield_argContext;
//# sourceMappingURL=python3-parser.js.map